import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { parseQueryToCommand } from "./parser";
import { sendToMCP } from "./mcpClient";
import verifyToken from "./middleware/verifyToken";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.post("/ask", verifyToken, async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const commandObj = await parseQueryToCommand(query);
    console.log("Parsed commandObj:", commandObj);

    const token = req.headers.authorization || ""; // forward token
    const result = await sendToMCP(commandObj, token);

    res.json(result);
  } catch (err) {
    console.error("AI Agent Error:", (err as Error).message);
    res.status(500).json({
      error: "Failed to process query",
      detail: (err as Error).message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`AI Agent running on http://localhost:${PORT}`)
);
