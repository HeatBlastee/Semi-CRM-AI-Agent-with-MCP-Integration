import axios from "axios";

const MCP_URL: string = process.env.MCP_URL || "http://localhost:4000/execute";

interface CommandObject {
  command: string;
  data: Record<string, any>;
}

export async function sendToMCP(
  commandObj: CommandObject,
  token: string
): Promise<any> {
  const res = await axios.post(MCP_URL, commandObj, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
}
