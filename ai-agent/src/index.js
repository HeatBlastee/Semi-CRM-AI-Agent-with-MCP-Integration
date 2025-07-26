const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { parseQueryToCommand } = require("./parser");
const { sendToMCP } = require("./mcpClient");
const verifyToken = require("./middleware/verifyToken"); // ✅ Import middleware

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.post("/ask",  async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const commandObj = await parseQueryToCommand(query);
    console.log("Parsed commandObj:", commandObj);

    const result = await sendToMCP(commandObj);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error("AI Agent Error:", err.message);
    res
      .status(500)
      .json({ error: "Failed to process query", detail: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ AI Agent running on http://localhost:${PORT}`)
);
