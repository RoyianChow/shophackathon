3Shop Mini AI

A lightweight Shopify Mini built with React and the @shopify/shop-minis-react SDK. This project demonstrates how to integrate various Shop-Minis hooks, refine user queries via a GPT-based endpoint, and enrich product or shop listings with AI-powered enhancements.

Features

Shop Hooks: Fetch and interact with products, shops, orders, and more using built-in hooks.

GPT Refine Endpoint: Normalize and refine user search input via a backend chat API.

Client-Side Filtering: Filter popular or recommended lists locally.

Deep Linking & Navigation: Navigate to products, shops, or checkout within the Shop app.

Optional Media Enhancement: Generate 3-second videos from product images using Fal AI.

Prerequisites

Node.js >=14

npm or yarn

A valid OpenAI API key (for GPT refine feature)

A valid Fal AI API key if using video generation (demo only)

Setup

Clone the repository

git clone <repo-url>
cd <repo-folder>

Backend (Refine API)

cd backend
npm install
# Create .env with:
# OPENAI_API_KEY=sk-...
npm run dev        # starts on http://localhost:4001

Frontend (Shop Mini)

cd ../frontend
npm install
shop-minis dev     # usually serves at http://localhost:5173

(Optional) Vercel Functions

If deploying/refine endpoint as a Vercel function:

npm run vercel-dev  # runs functions on http://localhost:4001

Running the App

Open the Shop Mini in the iOS or Android simulator:

npx shop-minis dev

In Safari (macOS), enable Develop → Simulator → YourApp to open Web Inspector.

Project Structure

├── backend/            # Express server for GPT refine
│   ├── server.js       # GPT function-calling endpoint
│   └── .env            # OPENAI_API_KEY
├── frontend/           # React-based Shop Mini
│   ├── src/
│   │   ├── App.tsx     # Main application UI
│   │   ├── index.tsx   # Renders <ShopMinisProvider><App/></>
│   └── package.json
└── README.md           # This file


Custom Features

GPT Refine: /api/refine endpoint applies a function-calling schema to normalize search text before filtering or product search.

Fal AI Video: Optional demo shows how to generate short videos from product images on startup or hover.

Contributing

Fork the repository.

Create a new feature branch (git checkout -b feature/...).

Submit a pull request with detailed description.

License
none
