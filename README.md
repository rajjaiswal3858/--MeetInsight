<<<<<<< HEAD
# MeetInsight --- AI Meeting Assistant

MeetInsight is an AI-powered meeting assistant that processes meeting
audio, converts it into structured text, generates semantic embeddings,
and enables intelligent question answering based on meeting transcripts.

The system integrates speech recognition, semantic vector search, and
large language models to transform raw meeting recordings into
searchable knowledge.

MeetInsight is designed to run locally and demonstrates an end-to-end AI
pipeline including audio processing, transcription, embedding
generation, vector storage, and retrieval-augmented generation.
=======
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
>>>>>>> fdd452e8d2055bd37f32177a675086ef35555aab

------------------------------------------------------------------------

# Overview

MeetInsight processes meeting recordings and converts them into
structured knowledge that can be queried using natural language.

The system follows a pipeline architecture:

Audio Processing → Transcription → Text Chunking → Vector Embedding →
Vector Database → Retrieval → LLM Response.

Users can upload meeting audio and ask questions about the meeting
content. The system retrieves relevant transcript segments and generates
intelligent answers.

------------------------------------------------------------------------

# Features

-   Audio upload API
-   Audio conversion using FFmpeg (WEBM → MP3/WAV)
-   Speech transcription using Faster-Whisper
-   Speaker voice embedding using Resemblyzer
-   Intelligent transcript chunking
-   Semantic embeddings generation
-   Vector storage using Supabase and pgvector
-   Hybrid retrieval (vector search + keyword search)
-   Reranking of retrieved results
-   Retrieval-Augmented Generation (RAG)
-   Natural-language question answering from meeting transcripts

------------------------------------------------------------------------

# Tech Stack

## Backend

Python\
FastAPI

## AI / ML

Faster-Whisper\
Sentence Transformers\
Resemblyzer

## Database

Supabase\
pgvector

## AI Models

OpenRouter\
OpenAI-compatible models

## Frontend

HTML\
CSS\
JavaScript

## Tools

FFmpeg

------------------------------------------------------------------------

# Project Structure

    meetinsight/
    │
    ├── app.py
    │
    ├── audio/
    │   └── audio_processing.py
    │
    ├── transcription/
    │   └── whisper_transcriber.py
    │
    ├── embeddings/
    │   └── embedding_generator.py
    │
    ├── retrieval/
    │   ├── vector_search.py
    │   └── reranker.py
    │
    ├── database/
    │   └── supabase_client.py
    │
    ├── llm/
    │   └── openrouter_client.py
    │
    ├── requirements.txt
    ├── .env.example
    └── README.md

------------------------------------------------------------------------

# Setup Instructions

## 1. Clone the Repository

    git clone https://github.com/rajjaiswal3858/--MeetInsight.git
    cd --MeetInsight

------------------------------------------------------------------------

## 2. Create Virtual Environment

    python -m venv venv

Activate:

**Windows**

    venv\Scripts\activate

**Mac / Linux**

    source venv/bin/activate

------------------------------------------------------------------------

## 3. Install Dependencies

    pip install -r requirements.txt

------------------------------------------------------------------------

## 4. Install FFmpeg

Check installation:

    ffmpeg -version

If FFmpeg is not installed, download it from:

https://ffmpeg.org/download.html

------------------------------------------------------------------------

## 5. Configure Environment Variables

Create a `.env` file in the project root:

    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    OPENROUTER_API_KEY=your_openrouter_api_key

------------------------------------------------------------------------

<<<<<<< HEAD
## 6. Run the Backend Server

    uvicorn app:app --reload

The API will be available at:

    http://127.0.0.1:8000

Swagger documentation:

    http://127.0.0.1:8000/docs

------------------------------------------------------------------------

# System Architecture

MeetInsight follows a Retrieval-Augmented Generation (RAG) architecture.

    Meeting Audio
          ↓
    Audio Conversion (FFmpeg)
          ↓
    Speech Transcription (Faster-Whisper)
          ↓
    Speaker Processing (Resemblyzer)
          ↓
    Text Chunking
          ↓
    Embedding Generation
          ↓
    Vector Storage (Supabase + pgvector)
          ↓
    Vector + Keyword Retrieval
          ↓
    Context Reranking
          ↓
    LLM Response Generation
          ↓
    Final Answer

------------------------------------------------------------------------

# Processing Pipeline

### 1. Audio Upload

Meeting audio is recorded from the frontend and uploaded to the backend
server.

### 2. Audio Conversion

The audio file is converted into a supported format using FFmpeg.

### 3. Speech Transcription

Faster-Whisper converts spoken content into text transcripts.

### 4. Speaker Processing

Resemblyzer generates voice embeddings to analyze speaker
characteristics.

### 5. Transcript Chunking

The transcript is divided into smaller segments for efficient retrieval.

### 6. Embedding Generation

Sentence Transformers convert text chunks into semantic vector
embeddings.

### 7. Vector Storage

Embeddings and transcript chunks are stored in a Supabase vector
database using pgvector.

### 8. Retrieval

User queries trigger hybrid retrieval using both vector similarity and
keyword search.

### 9. Response Generation

Relevant transcript context is sent to an LLM via OpenRouter to generate
an answer.

------------------------------------------------------------------------

# Example Query Flow

User question:

    What was discussed about the backend deployment?

Processing:

    Question
    ↓
    Vector Embedding
    ↓
    Retrieve relevant transcript chunks
    ↓
    Send context to LLM
    ↓
    Generate answer

------------------------------------------------------------------------

# Known Limitations

-   Speaker diarization accuracy depends on audio quality
-   Processing time increases with longer meeting recordings
-   External LLM responses depend on OpenRouter API availability
-   No caching or transcript persistence optimization implemented

------------------------------------------------------------------------

# Tech Highlights

-   End-to-end AI meeting analysis pipeline
-   Retrieval-Augmented Generation architecture
-   Integration of speech recognition, embeddings, and LLM reasoning
-   Real-time semantic search over meeting transcripts
=======
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





>>>>>>> fdd452e8d2055bd37f32177a675086ef35555aab
