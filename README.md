# Notescope

AI-powered note-taking and document management application.

## Features

- Create, edit, and organize documents
- AI-powered summarization and content improvement
- User authentication with Firebase
- Search and filter documents
- Markdown editor

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, MongoDB, OpenAI API

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend-main
npm install
```

**Frontend:**
```bash
cd frontend-main/app
npm install
```

### 2. Setup Environment Variables

**Backend** - Create `backend-main/.env`:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

**Frontend** - Create `frontend-main/app/.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Run the Application

**Option 1: Use start script**
```bash
.\start-app.ps1
# or
.\start-app.bat
```

**Option 2: Manual start**

Backend:
```bash
cd backend-main
npm start
```

Frontend:
```bash
cd frontend-main/app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Notescope/
├── backend-main/     # Express.js backend
└── frontend-main/    # Next.js frontend
    └── app/
```

## License

MIT License

## Author

Sameer Ahmed - [@sameerahmed16](https://github.com/sameerahmed16)
