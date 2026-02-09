AI Investor Search

A simple frontend + AI API project that suggests top investors based on a startup’s sector, country, and stage.

How to Run the Project
1. Start the Backend
cd server
npm install
node server.js


The backend will run at:

http://localhost:5000

2. Run the Frontend

Open index.html using Live Server
OR

Open index.html directly in a browser

**AI API USED:**

Groq AI API

Model: LLaMA 3.1

OpenAI-compatible chat completions endpoint

Used to generate real AI-based investor suggestions

**API Key Setup**

Create a file named .env inside the server folder

**Add your API key:**

GROQ_API_KEY=your_api_key_here

 *The .env file is ignored using .gitignore and is not pushed to GitHub.*

**Notes:**

The backend must be running for the frontend to receive AI responses

Investor suggestions are AI-generated and intended for learning/demo purposes
