import os
import subprocess
import tempfile
import warnings

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
from supabase import create_client
from sentence_transformers import SentenceTransformer
from faster_whisper import WhisperModel
from resemblyzer import VoiceEncoder, preprocess_wav
from openai import OpenAI

warnings.filterwarnings("ignore")

app = FastAPI()

# ---------------------------
# CORS
# ---------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# ENV VARIABLES
# ---------------------------

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

# ---------------------------
# LOAD MODELS ONCE
# ---------------------------

print("Loading models...")

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

whisper_model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

voice_encoder = VoiceEncoder()

print("Models loaded")

# ---------------------------
# AUDIO CONVERSION
# ---------------------------

def convert_audio(webm_path):

    print("Converting audio...")

    wav_path = webm_path.replace(".webm", ".wav")

    subprocess.run([
        "ffmpeg",
        "-y",
        "-i", webm_path,
        "-vn",
        "-ar", "16000",
        "-ac", "1",
        wav_path
    ])

    return wav_path


# ---------------------------
# TRANSCRIPTION
# ---------------------------

def transcribe_audio(audio_file):

    print("Starting transcription...")

    segments, info = whisper_model.transcribe(
        audio_file,
        beam_size=1
    )

    transcript = ""

    for segment in segments:

        line = f"[{segment.start:.2f}s → {segment.end:.2f}s] {segment.text}"

        print(line)

        transcript += line + "\n"

    print("Transcription finished")

    return transcript


# ---------------------------
# SPEAKER EMBEDDING
# ---------------------------

def detect_speakers(audio_file):

    print("Running speaker detection")

    wav = preprocess_wav(audio_file)

    embedding = voice_encoder.embed_utterance(wav)

    print("Speaker embedding shape:", embedding.shape)

    return embedding


# ---------------------------
# CHUNK TEXT
# ---------------------------

def chunk_text(text, size=500, overlap=50):

    chunks = []

    start = 0

    while start < len(text):

        end = start + size

        chunk = text[start:end]

        chunks.append(chunk)

        start = end - overlap

    return chunks


# ---------------------------
# STORE EMBEDDINGS
# ---------------------------

def store_embeddings(chunks):

    print("Saving embeddings to Supabase")

    data = []

    for chunk in chunks:

        embedding = embedding_model.encode(chunk).tolist()

        data.append({
            "content": chunk,
            "embedding": embedding
        })

    supabase.table("meeting_vectors").insert(data).execute()

    print("Embeddings stored")


# ---------------------------
# AUDIO ROUTE
# ---------------------------

@app.post("/audio")
async def process_audio(file: UploadFile = File(...)):

    print("\nAudio received from frontend")

    audio_bytes = await file.read()

    # temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp:

        temp.write(audio_bytes)

        webm_path = temp.name

    wav_path = convert_audio(webm_path)

    transcript = transcribe_audio(wav_path)

    detect_speakers(wav_path)

    chunks = chunk_text(transcript)

    print("Chunks created:", len(chunks))

    store_embeddings(chunks)

    return {
        "message": "Audio processed",
        "transcript": transcript
    }


# ---------------------------
# QUESTION ANSWERING
# ---------------------------

@app.post("/ask")
async def ask_question(query: dict):

    question = query["question"]

    print("\nUser Question:", question)

    query_embedding = embedding_model.encode(question).tolist()

    vector_results = supabase.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_count": 3
        }
    ).execute()

    vector_context = [r["content"] for r in vector_results.data]

    keyword_results = supabase.rpc(
        "keyword_search",
        {
            "query": question,
            "match_count": 3
        }
    ).execute()

    keyword_context = [r["content"] for r in keyword_results.data]

    combined_context = list(set(vector_context + keyword_context))

    context = "\n".join(combined_context)

    prompt = f"""
Answer using ONLY this context.

Context:
{context}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    answer = response.choices[0].message.content

    return {
        "answer": answer
    }