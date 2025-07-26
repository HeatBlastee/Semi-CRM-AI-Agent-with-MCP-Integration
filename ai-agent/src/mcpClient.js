const axios = require("axios");
const MCP_URL = process.env.MCP_URL || "http://localhost:4000/execute";

async function sendToMCP(commandObj) {
  const res = await axios.post(MCP_URL, commandObj);
  return res.data;
}

module.exports = { sendToMCP };
