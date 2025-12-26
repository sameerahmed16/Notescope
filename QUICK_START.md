# Quick Start Guide - Running Notescope

## Prerequisites Check
Make sure you have Node.js installed:
```powershell
node --version
npm --version
```

## Step 1: Install Dependencies

### Backend
```powershell
cd backend-main
npm install
```

### Frontend
```powershell
cd ..\frontend-main\app
npm install
```

## Step 2: Set Up Environment Variables

### Backend (.env file in `backend-main/`)
1. Copy `.env.example` to `.env`:
   ```powershell
   cd backend-main
   Copy-Item .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   PORT=3001
   MONGO_URI=your_mongodb_connection_string_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Frontend (.env.local file in `frontend-main/app/`)
1. Copy `.env.example` to `.env.local`:
   ```powershell
   cd frontend-main\app
   Copy-Item .env.example .env.local
   ```

2. Edit `.env.local` and add your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## Step 3: Run the Application

### Option A: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```powershell
cd backend-main
npm start
```
Backend will run on: http://localhost:3001

**Terminal 2 - Frontend:**
```powershell
cd frontend-main\app
npm run dev
```
Frontend will run on: http://localhost:3000

### Option B: Run Both in Background (PowerShell)

**Backend:**
```powershell
cd backend-main
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
```

**Frontend:**
```powershell
cd frontend-main\app
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
```

## Step 4: Access the Application

1. Open your browser
2. Navigate to: **http://localhost:3000**
3. You should see the Notescope application!

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify `.env` file exists and has correct values
- Make sure MongoDB connection string is valid

### Frontend won't start
- Check if port 3000 is available
- Verify `.env.local` file exists and has Firebase credentials
- Make sure all dependencies are installed (`npm install`)

### Firebase errors
- Verify all Firebase environment variables are set correctly
- Check Firebase project settings in Firebase Console

### MongoDB connection errors
- Verify MongoDB Atlas connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user credentials are correct

## Getting Your Credentials

### Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app icon (</>) or select your web app
6. Copy the config values to your `.env.local` file

### MongoDB Connection String
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Add it to your backend `.env` file as `MONGO_URI`

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create a new secret key
4. Copy it to your backend `.env` file as `OPENAI_API_KEY`

---

**Note**: Make sure both servers are running simultaneously for the app to work properly!

