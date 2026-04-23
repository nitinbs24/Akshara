# Akshara 📖

Akshara is an AI-powered reading fluency and literacy improvement platform. It enables users to practice reading passages, receive real-time feedback on pronunciation and fluency, and get personalized coaching through AI-driven acoustic and linguistic analysis.

## 🚀 Key Features

* **Reading & Practice Interface:** Interactive reading sessions with audio recording for real-time analysis.
* **AI-Driven Speech Analysis:** 
  * **Acoustic Analysis:** ML-based classification and speech feature extraction.
  * **Linguistic Analysis:** Transcription, text alignment, and difference checking.
  * **Pre-processing:** Voice Activity Detection (VAD) and audio conversion.
* **Personalized AI Coaching:** Integration with LLMs (Anthropic) to provide tailored feedback and guidance on reading.
* **Progress Tracking:** Comprehensive history, progress visualization, and result breakdowns.
* **Premium UI/UX:** A sophisticated "Digital Curator" design philosophy utilizing high-quality typography (Newsreader + Manrope) and glass-morphism.

## 🛠️ Technology Stack

**Frontend**
* React 19 (Vite)
* React Router for navigation
* Tailwind CSS & PostCSS for styling

**Backend**
* Python (Flask)
* MongoDB (Database)
* **ML & Audio Processing:** PyTorch, Transformers, scikit-learn, ONNX Runtime, librosa, pydub
* **AI Integration:** Anthropic API

---

## 💻 Local Development Setup

### Prerequisites
* Node.js (v18+)
* Python (3.9+)
* MongoDB (running locally or via Atlas)
* FFmpeg (required for `pydub` audio processing)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables (create a `.env` file):
   * Add your MongoDB URI, JWT Secret, Anthropic API Key, etc.
5. Run the application:
   ```bash
   python run.py
   ```
   *(Server typically runs on `http://localhost:5000`)*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *(App typically runs on `http://localhost:5173`)*

## 📂 Project Structure

```text
E:\Akshara
├── backend/                  # Python Flask server & ML Pipelines
│   ├── app/
│   │   ├── api/              # Route handlers (Auth, Evaluate, Passages)
│   │   ├── database/         # MongoDB models & schemas
│   │   ├── ml_pipeline/      # Core AI logic (Acoustic, Linguistic, Pre-processing, Synthesis)
│   │   └── utils/            # Helper functions
│   ├── run.py                # Backend entry point
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI elements (ProtectedRoute)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── pages/            # Main application views (Login, Practice, Progress, etc.)
│   │   └── services/         # API integration logic
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind setup
│   └── vite.config.js        # Vite bundler config
└── DESIGN.md                 # Design system & philosophy document
```

## 📝 License
[MIT License](LICENSE)