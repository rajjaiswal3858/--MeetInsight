# 🎙️ MeetInsight – AI Meeting Assistant

MeetInsight is an AI-powered meeting assistant that processes meeting audio, converts it into text, stores semantic embeddings, and allows intelligent question answering based on the meeting transcript.

It combines speech recognition, vector search, and LLM reasoning to make meeting information searchable and interactive.

---

# 🚀 Features

- 🎤 Audio upload API
- 🔄 Audio conversion (WEBM → MP3/WAV)
- 📝 Speech transcription using **Faster-Whisper**
- 🧑‍🤝‍🧑 Speaker voice embedding using **Resemblyzer**
- ✂️ Intelligent text chunking
- 🔢 Semantic vector embeddings
- 🗄️ Storage in **Supabase vector database**
- 🔍 Hybrid search (Vector search + Keyword search)
- 🧠 Reranking of retrieved results
- 🤖 Retrieval-Augmented Generation (RAG)
- ❓ AI-powered question answering from meetings

---

# 🧠 How It Works

MeetInsight processes meeting audio and converts it into structured knowledge that can be queried using natural language.

---

# 🧰 Tech Stack

Backend
- FastAPI
- Python

AI / ML
- Faster-Whisper
- Sentence Transformers
- Resemblyzer

Database
- Supabase
- pgvector

AI Models
- OpenRouter / OpenAI

Frontend
- HTML
- CSS
- JavaScript

Tools
- FFmpeg

---

## Run the Project

Follow these steps to run the MeetInsight project locally.

1. Clone the repository

git clone https://github.com/rajjaiswal3858/--MeetInsight.git
cd --MeetInsight

2. Create a virtual environment

python -m venv venv

3. Activate the virtual environment

Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

4. Install the required dependencies

pip install -r requirements.txt

5. Make sure FFmpeg is installed

Check installation:

ffmpeg -version

If FFmpeg is not installed, download it from:
https://ffmpeg.org/download.html

6. Create a .env file in the project root and add:

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENROUTER_API_KEY=your_openrouter_api_key

7. Run the backend server

uvicorn 1:app --reload

8. Open the API in your browser

http://127.0.0.1:8000




## 🚀 Project Flow

MeetInsight processes meeting audio and allows users to ask questions based on the meeting content.

### 🔊 1. Audio Recording / Upload
Meeting audio is recorded from the frontend and sent to the backend server.

### 🎧 2. Audio Conversion
The received audio is converted into the required format using **FFmpeg**.

### 📝 3. Speech Transcription
**Faster-Whisper** converts the speech from the audio into text.

### 🧑‍🤝‍🧑 4. Speaker Processing
**Resemblyzer** generates voice embeddings to analyze speaker characteristics.

### ✂️ 5. Text Chunking
The transcript is divided into smaller chunks for efficient processing.

### 🔢 6. Vector Embedding
**Sentence Transformers** convert text chunks into vector embeddings.

### 🗄️ 7. Storage
Embeddings and transcript chunks are stored in a **Supabase vector database**.

### 🔍 8. Retrieval
When a user asks a question, the system retrieves relevant chunks using **vector similarity + keyword search**.

### 🤖 9. AI Response
The retrieved context is sent to an **LLM via OpenRouter** to generate an intelligent answer.

### ✅ Final Output
The system returns an **AI-generated answer based on the meeting transcript**.


🎤 Audio → 📝 Whisper → ✂️ Chunking → 🔢 Embeddings → 🗄️ Supabase → 🔍 Retrieval → 🤖 LLM → ✅ Answer





