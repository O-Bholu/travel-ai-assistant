# Deployment Guide

## Environment Variables

Backend:

- `PORT`: Render will provide this automatically, but keep a default of `5000` locally.
- `MONGODB_URI`: Your MongoDB Atlas connection string.
- `GEMINI_API_KEY`: The Google Gemini API key from Google AI Studio or your Google Cloud setup.
- `CLIENT_ORIGIN`: The deployed frontend URL used by CORS.
- `GEMINI_MODEL` (optional): Override the Gemini model name if needed.

Frontend:

- `VITE_API_BASE_URL`: The deployed backend URL, for example `https://your-api.onrender.com`.

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user with read/write access.
3. Add your IP address or allow access from Render.
4. Copy the connection string into `MONGODB_URI`.
5. Use a database name such as `travel-ai-assistant`.

## Backend on Render

1. Push the `server` code to GitHub.
2. In Render, create a new Web Service from the repository.
3. Set the root directory to `server`.
4. Use the build command `npm install`.
5. Use the start command `npm start`.
6. Add the environment variables listed above.
7. Redeploy after saving changes.

## Frontend on Vercel

1. Push the `client` code to GitHub.
2. In Vercel, import the repository as a new project.
3. Set the root directory to `client`.
4. Use the default build command `npm run build`.
5. Set `VITE_API_BASE_URL` to your Render backend URL.
6. Deploy and verify the chat UI can reach `/api/chat`.

## Common Deployment Errors

- `CORS error`: Set `CLIENT_ORIGIN` on the backend to the exact Vercel URL.
- `MongoDB connection failed`: Check the Atlas username, password, IP allowlist, and database name.
- `Gemini request fails`: Confirm `GEMINI_API_KEY` is valid and the model name is correct.
- `Frontend cannot reach API`: Make sure `VITE_API_BASE_URL` points to the Render URL, including `https://`.
- `Build succeeds locally but not on Render`: Verify the service root directory is set to `server` and the start command is `npm start`.

## Production Checklist

- Confirm the `.env.example` files were converted into real `.env` files locally.
- Test `POST /api/chat` in production after deployment.
- Verify a lead is created in MongoDB after a qualified conversation.
- Check that the dashboard loads after refreshing the page.
