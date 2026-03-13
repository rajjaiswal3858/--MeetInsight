# AI Meeting Assistant

This project is an AI backend that processes meeting audio and allows question answering from the transcript.

## Features
- Audio upload API
- Speech transcription using Faster-Whisper
- Speaker embedding with Resemblyzer
- Text chunking and vector embeddings
- Storage in Supabase vector database
- Retrieval-Augmented Generation (RAG) for answering questions

## Tech Stack
- FastAPI
- Faster-Whisper
- Sentence Transformers
- Supabase
- OpenRouter / OpenAI
- Python
- HTML
- CSS
- JavaScript
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
