<div align="center">

# MeetInsight — AI Meeting Assistant

**Turn any meeting into searchable knowledge with one click.**

A full-stack AI application that records meetings in real time via a Chrome Extension, transcribes audio with Whisper, generates semantic embeddings, stores them in a vector database, and answers natural-language questions about your meetings using Retrieval-Augmented Generation (RAG).

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_v3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-pgvector-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![OpenAI](https://img.shields.io/badge/LLM-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## Why This Project Stands Out

| Skill Area | What It Demonstrates |
|---|---|
| **AI / ML Engineering** | End-to-end RAG pipeline — speech-to-text, embeddings, vector search, LLM generation |
| **Backend Development** | Production-style FastAPI REST API with async endpoints and model preloading |
| **Browser Extension Dev** | Chrome Extension (Manifest v3) capturing tab + mic audio via Web Audio API |
| **Database & Search** | Hybrid retrieval strategy combining pgvector cosine similarity with full-text keyword search |
| **System Design** | Multi-stage pipeline: audio → transcription → chunking → embedding → storage → retrieval → generation |

---

## Key Features

- **Real-time meeting recording** — Chrome Extension captures both microphone and tab audio simultaneously using the Web Audio API
- **Speech-to-text transcription** — Faster-Whisper (CTranslate2-optimized Whisper) with timestamped output
- **Speaker voice embeddings** — Resemblyzer generates d-vector embeddings for speaker analysis
- **Intelligent text chunking** — Overlapping sliding-window chunking for optimal retrieval context
- **Hybrid search** — Combines vector similarity search (pgvector) with keyword search for higher recall
- **RAG-powered Q&A** — GPT-4o-mini generates answers grounded strictly in meeting transcript context
- **Dark mode UI** — Clean, responsive chat interface with typing indicators

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Chrome Extension (Frontend)                  │
│  Mic + Tab Audio Capture → WebM Recording → Upload to API       │
└──────────────────────────┬───────────────────────────────────────┘
                           │  POST /audio
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                     FastAPI Backend (Python)                      │
│                                                                  │
│  ┌─────────────┐  ┌──────────────────┐  ┌───────────────────┐   │
│  │   FFmpeg     │→ │  Faster-Whisper  │→ │   Resemblyzer     │   │
│  │ WEBM → WAV  │  │  Transcription   │  │ Speaker Embedding │   │
│  └─────────────┘  └──────────────────┘  └───────────────────┘   │
│          │                                                       │
│          ▼                                                       │
│  ┌─────────────────┐  ┌──────────────────────┐                  │
│  │ Text Chunking   │→ │ Sentence Transformers │                  │
│  │ (sliding window) │  │ (all-MiniLM-L6-v2)   │                  │
│  └─────────────────┘  └──────────┬───────────┘                  │
│                                  │                               │
│                                  ▼                               │
│                    ┌──────────────────────────┐                  │
│                    │   Supabase + pgvector    │                  │
│                    │   Vector Storage         │                  │
│                    └──────────────────────────┘                  │
└──────────────────────────────────────────────────────────────────┘

                    User asks a question (POST /ask)
                           │
                           ▼
              ┌────────────────────────┐
              │   Hybrid Retrieval     │
              │ Vector + Keyword Search│
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │   GPT-4o-mini (LLM)   │
              │  via OpenRouter API    │
              └───────────┬────────────┘
                          │
                          ▼
                   Grounded Answer
```

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Chrome Extension (Manifest v3), HTML, CSS, JavaScript, Web Audio API |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **AI / ML Models** | Faster-Whisper (ASR), Sentence Transformers (`all-MiniLM-L6-v2`), Resemblyzer (d-vectors) |
| **Vector Database** | Supabase + pgvector (cosine similarity + keyword search via RPC) |
| **LLM** | GPT-4o-mini via OpenRouter (OpenAI-compatible API) |
| **Audio Processing** | FFmpeg (WEBM → WAV conversion, 16kHz mono) |

---

## Project Structure

```
MeetInsight/
├── frontend/
│   ├── manifest.json        # Chrome Extension manifest (v3)
│   ├── popup.html           # Extension popup UI
│   ├── script.js            # Audio capture, API calls, chat logic
│   └── style.css            # Styling with dark mode support
├── 1.py                     # FastAPI backend — full AI pipeline
├── requirements.txt         # Python dependencies (18 packages)
├── .env                     # API keys & Supabase config (not committed)
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- FFmpeg installed and on PATH
- Supabase project with pgvector enabled
- OpenRouter API key

### Installation

```bash
# Clone the repository
git clone https://github.com/rajjaiswal3858/--MeetInsight.git
cd --MeetInsight

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Create a `.env` file in the project root:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Run

```bash
uvicorn 1:app --reload
```

API available at `http://127.0.0.1:8000` · Swagger docs at `http://127.0.0.1:8000/docs`

Load the `frontend/` folder as an unpacked Chrome Extension via `chrome://extensions`.

---

## Example Usage

```
You:  What was discussed about the backend deployment?

AI:   Based on the meeting transcript, the team decided to deploy the
      backend on AWS ECS with auto-scaling enabled. The deployment
      timeline was set for next Friday after QA sign-off.
```

---

## Technical Highlights

- **RAG Architecture** — Retrieval-Augmented Generation ensures answers are grounded in actual meeting content, reducing hallucination
- **Hybrid Search Strategy** — Combines dense vector retrieval (cosine similarity) with sparse keyword search for higher recall and precision
- **Efficient Inference** — Faster-Whisper uses CTranslate2 under the hood for 4× faster transcription than standard Whisper
- **Sliding-Window Chunking** — Overlapping chunks (500 chars, 50 char overlap) preserve context across segment boundaries
- **Model Preloading** — All ML models are loaded once at server startup, eliminating cold-start latency on requests
- **Audio Mixing** — Web Audio API merges microphone input and tab audio into a single stream for complete meeting capture

---

## License

This project is open source and available for personal and educational use.
