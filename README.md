# AIM AI — Web + Android starter

AIM AI is a ChatGPT-inspired assistant starter built with React + Vite and an Express backend. It is a separate product and is **not GPT-6**. The app uses whichever compatible AI model you configure on the server.

## Requirements
- Node.js 20+ (recommended)
- npm
- An API key from a compatible model provider
- Android Studio only if building the Android package

## Run locally
1. Extract the ZIP and open this folder in a terminal.
2. Install packages:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
4. Add your provider API key to `.env`:
   ```env
   AI_PROVIDER=openai
   AI_API_KEY=your_key_here
   AI_BASE_URL=https://api.openai.com/v1
   AI_MODEL=gpt-4o-mini
   PORT=8787
   ```
   Keep `.env` private. Never put API keys in frontend variables or commit them to Git.
5. Start the backend in terminal one:
   ```bash
   npm run server
   ```
6. Start the frontend in terminal two:
   ```bash
   npm run dev
   ```
7. Open the local URL printed by Vite (usually `http://localhost:5173`).

### Important proxy note
For local development, configure a Vite proxy so `/api` requests reach port 8787. Add this to `vite.config.js`:
```js
server: {
  port: 5173,
  proxy: { "/api": "http://localhost:8787" }
}
```
The included minimal Vite config can be updated with that block. In production, serve the frontend and API behind the same domain or configure a secure API URL and CORS policy.

## AI provider configuration
The backend uses an OpenAI-compatible `/chat/completions` endpoint. Set `AI_BASE_URL`, `AI_MODEL`, and `AI_API_KEY` to a compatible provider. Model availability, API costs, and provider terms vary. Do not claim the app uses GPT-6 unless the actual provider explicitly offers and you configure that model.

## Android build (Capacitor)
1. Build the web app:
   ```bash
   npm run build
   ```
2. Add the Android platform:
   ```bash
   npx cap add android
   ```
3. Sync files:
   ```bash
   npx cap sync android
   ```
4. Open Android Studio:
   ```bash
   npx cap open android
   ```
5. Use Android Studio to run on a device or build a signed APK/AAB.

The Android folder is generated locally by Capacitor; it is not included in this source archive. Android builds need Android Studio/SDK setup.

## What is included
- Responsive AIM AI chat UI
- Local browser conversation history
- New chats and delete chat controls
- Prompt suggestion cards
- Server-side AI API call so the key is not exposed to the browser
- Provider status and setup/error messaging
- Capacitor configuration for Android packaging

## Not yet included
