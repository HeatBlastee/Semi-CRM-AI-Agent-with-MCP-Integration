import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface ContactInfo {
  email?: string;
  phone?: string;
}

interface LeadData {
  name: string;
  source: string;
  contact?: ContactInfo;
  interestedProducts: string[];
  notes: string;
  id?: string; // used for update/delete
}

type CommandType = "createLead" | "updateLead" | "deleteLead";

interface ParsedCommand {
  command: CommandType;
  data: LeadData;
}

export async function parseQueryToCommand(query: string): Promise<ParsedCommand> {
  const prompt = `
You're an AI CRM agent. Extract structured data from the conversation below and return a JSON payload with one of these commands: "createLead", "updateLead", or "deleteLead".

Always use "cold_call" as the source.

Extract:
- command: one of "createLead", "updateLead", "deleteLead"
- name: The business or person's name (if available)
- source: Always "cold_call"
- interestedProducts: An array of products (e.g., ["POS System", "CRM"])
- notes: Summary of what the lead said
- phone and email: If provided, nest them under "contact"
- For deletion or update, use "id" field (NOT leadId)

Format strictly like this:
{
  "command": "createLead",
  "data": {
    "name": "Business Name",
    "source": "cold_call",
    "contact": {
      "email": "example@domain.com",
      "phone": "9876543210"
    },
    "interestedProducts": ["POS System", "CRM"],
    "notes": "Any important notes here"
  }
}

Conversation:
${query}

JSON:
`;

  const response = await axios.post(
    GEMINI_URL,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
    }
  );

  let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  console.log("Gemini raw output:", text);

  if (text.startsWith("```")) {
    text = text
      .replace(/```[a-z]*\n?/gi, "")
      .replace(/```$/, "")
      .trim();
  }

  try {
    const parsed: ParsedCommand = JSON.parse(text);

    // Normalize leadId to id if present
    if (
      (parsed.command === "deleteLead" || parsed.command === "updateLead") &&
      (parsed.data as any).leadId
    ) {
      parsed.data.id = (parsed.data as any).leadId;
      delete (parsed.data as any).leadId;
    }

    return parsed;
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Gemini response was not valid JSON");
  }
}
