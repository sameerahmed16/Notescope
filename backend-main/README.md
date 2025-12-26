# Backend

Express.js backend server for Notescope.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Routes

- `POST /api/ai/process-text` - Process text with AI
- `POST /api/ai/generate-summary` - Generate document summary
- `POST /api/ai/improve-content` - Improve document content
