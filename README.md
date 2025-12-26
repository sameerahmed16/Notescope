# Notescope

A modern, AI-powered note-taking and document management application built with Next.js and Express.js. Notescope allows users to create, edit, organize, and enhance their documents with AI-powered features like summarization and content improvement.

## 🚀 Features

- **Document Management**: Create, edit, view, and organize your documents
- **AI-Powered Features**: 
  - Generate concise summaries of your documents
  - Improve and enhance document content using AI
- **User Authentication**: Secure authentication using Firebase
- **Search & Filter**: Easily find documents with search and filtering capabilities
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Markdown Support**: Rich markdown editing capabilities

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React** - UI library
- **Tailwind CSS** - Styling
- **Firebase** - Authentication and storage
- **React Markdown Editor** - Markdown editing

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - Database (via Mongoose)
- **OpenAI API** - AI-powered features
- **Firebase Admin SDK** - Backend Firebase integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Firebase project
- OpenAI API key

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sameerahmed16/Notescope.git
cd Notescope
```

### 2. Backend Setup

```bash
cd backend-main
npm install
```

Create a `.env` file in the `backend-main` directory:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string_here
OPENAI_API_KEY=your_openai_api_key_here
```

You can copy the `.env.example` file and fill in your values:

```bash
cp .env.example .env
```

### 3. Frontend Setup

```bash
cd ../frontend-main/app
npm install
```

Create a `.env.local` file in the `frontend-main/app` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

You can copy the `.env.example` file and fill in your values:

```bash
cp .env.example .env.local
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd backend-main
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:3001`

### Start the Frontend Development Server

```bash
cd frontend-main/app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
Notescope/
├── backend-main/          # Express.js backend
│   ├── db/               # Database connection
│   ├── src/
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # MongoDB models
│   │   └── routes/       # API routes
│   ├── server.js         # Entry point
│   └── package.json
│
└── frontend-main/        # Next.js frontend
    └── app/
        ├── src/
        │   └── app/
        │       ├── components/  # React components
        │       ├── documents/   # Documents page
        │       ├── editor/      # Editor page
        │       ├── login/       # Login page
        │       ├── signup/      # Signup page
        │       └── view/        # Document view page
        └── package.json
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3001)
- `MONGO_URI` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key for AI features

### Frontend (.env.local)
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID (optional)

## 🔒 Security Notes

**Important**: Never commit your `.env` files or expose API keys and credentials. The repository includes:
- `.gitignore` files to prevent committing sensitive data
- `.env.example` files as templates for required environment variables

If you've exposed secrets in previous commits:
1. Rotate all exposed API keys and credentials immediately
2. Remove the secrets from git history (consider using `git filter-branch` or BFG Repo-Cleaner)
3. Update your `.env` files with new credentials

## 📝 API Endpoints

### AI Routes (`/api/ai`)
- `POST /api/ai/process-text` - Process text with AI
- `POST /api/ai/generate-summary` - Generate document summary
- `POST /api/ai/improve-content` - Improve document content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sameer Ahmed**
- GitHub: [@sameerahmed16](https://github.com/sameerahmed16)

## 🙏 Acknowledgments

- Firebase for authentication and storage
- OpenAI for AI-powered features
- Next.js and Express.js communities

---

**Note**: Make sure to set up all environment variables before running the application. Refer to the `.env.example` files for the required configuration.

