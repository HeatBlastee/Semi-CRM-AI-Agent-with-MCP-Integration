# Semi-CRM-AI-Agent-with-MCP-Integration

#  FoodBot AI – Lead Management AI Agent with CRM Backend

FoodBot AI is a full-stack project that helps businesses manage CRM leads with the help of an AI agent. The frontend interacts with users, collects queries or lead information, and sends it to an AI Agent powered by Google's Gemini API, which extracts structured commands and triggers lead actions (create/update/delete) in the backend CRM system.

---

##  Project Structure

```
FoodBotAi/
├── ai-agent/              # Part 3: AI Agent (Gemini + Command Extractor)
│   ├── src/
│   │   ├── index.ts       # Express server for AI Agent
│   │   ├── parser.ts      # Gemini API integration and parsing
│   │   ├── mcpClient.ts   # Sends parsed commands to MCP
│   │   └── middleware/
│   │       └── verifyToken.ts
│   ├── .env
│   └── tsconfig.json
│
├── backend/               # Part 1: Lead Management API (MCP)
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── index.ts       # Express + Prisma REST API
│   │   ├── routes/        # Lead + Auth routes
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── .env
│   └── tsconfig.json
│
├── frontend/              # Part 2: React Chatbot + Login/Register UI
│   ├── src/
│   ├── public/
│   ├── .env
│   └── vite.config.js
|
|-- mcp/
    |-src/
        |-commands/
            |-handler.ts
        |-middleware/
            |-verifyToke.ts
        |-index.ts
    |-.env


```
## 🎥 Demo

 [Click here to watch the demo](https://drive.google.com/file/d/1DPofhuIvWGfnh5dC6ifEvlpOHZ1MmGuy/view?usp=sharing)
---

##  Tech Stack

- **Frontend**: React + Vite + TailwindCSS + Axios + React Router + JWT
- **Backend**: Node.js + Express + Prisma + NeonDB PostgreSQL + JWT + REST API
- **AI Agent**: Node.js + TypeScript + Express + Gemini API
- **(MCP)**: Node.js + Express + Prisma + NeonDB PostgreSQL + JWT
- **Database**: NeonDB PostgreSQL
- **Deployment**: Render.com

---

##  Environment Variables

Each folder has its own `.env` file.

### `backend/.env`

```
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secure_jwt_secret
FRONTEND_ORIGIN=
```

### `ai-agent/.env`

```
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_secure_jwt_secret
MCP_URL=
FRONTEND_ORIGIN=
```

### `frontend/.env`

```
VITE_BACKEND_URI=
VITE_AI_AGENT_URI=
```

### `mcp/.env`

```
LEAD_API_URL=
JWT_SECRET=

```

---

##  API Usage Examples

###  Login

```bash
curl -X POST https://footbot-ai-backend.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "123456"}'
```

Response:

```json
{
  "token": "your-jwt-token"
}
```

---

###  Ask AI Agent (with JWT token)

```bash
curl -X POST https://footbot-ai-ai-agent.onrender.com/ask \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{"query": "Hey I’m from CoffeeCo and we’re interested in a POS system and CRM. Call us at 9876543210 or email at hello@coffeeco.com"}'
```

Response:

```json
{
  "message": "Lead created successfully",
  "lead": {
    "id": "...",
    "name": "CoffeeCo",
    "source": "cold_call",
    ...
  }
}
```

---

###  Create Lead (MCP API)

```bash
curl -X POST https://footbot-ai-backend.onrender.com/leads \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CoffeeCo",
    "source": "cold_call",
    "contact": {
      "email": "hello@coffeeco.com",
      "phone": "9876543210"
    },
    "interestedProducts": ["POS System", "CRM"],
    "notes": "Interested after a cold call",
    "status": "New"
  }'
```

---

##  Running Locally

> Prerequisite: Node.js 18+, PostgreSQL or NeonDB, Google Gemini API Key

### 1. Clone the project

```bash
git clone https://github.com/HeatBlastee/Semi-CRM-AI-Agent-with-MCP-Integration.git
cd Semi-CRM-AI-Agent-with-MCP-Integration
```

### 2. Setup backend

```bash
cd backend
cp .env.example .env
npx prisma generate
npx prisma db push
npm install
npm run dev
```

### 3. Setup AI Agent

```bash
cd ../ai-agent
cp .env.example .env
npm install
npx tsc
npm start
```

### 4. Setup frontend

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

### 5. Setup mcp

```bash
cd ../mcp
cp .env.example .env
npm install
npm run dev
```

---

##  Deployment Links

-  **Frontend**: https://footbot-ai.onrender.com  
-  **Backend**: https://footbot-ai-backend.onrender.com  
-  **AI Agent**: https://footbot-ai-ai-agent.onrender.com  
-  **MCP**: https://footbot-ai-mcp.onrender.com
---

##  Key Challenges

- **CORS issues**: Fixed by ensuring exact origin match (no trailing slashes, match domain exactly in `.env` and `cors()`).
- **Parsing Gemini JSON**: Had to strip markdown formatting like ```json from Gemini's response.
- **Authentication**: All requests are secured via JWT, passed from frontend → AI Agent → MCP.
- **Strict TS**: Added typing in TS files and handled `unknown` error objects properly.

---

## 👨‍💻 Contact

Created by **Mann Patel**  
📧 [mann110406@gmail.com](mailto:mann110406@gmail.com)  
🔗 [GitHub](https://github.com/HeatBlastee)  
🔗 [LinkedIn](https://www.linkedin.com/in/mann-patel-321aa8289/)
