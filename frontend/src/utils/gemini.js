import axios from "axios";


const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getSalesResponse(conversation) {
  const prompt = `
You're an AI salesperson making a cold call. Based on the conversation so far, give the next response from the salesperson ONLY.

Respond naturally and ask the user about his name, his phone number, his email, his business name and interestedProducts and what he wants line by line in natural and conversation way. Avoid repeating or over-explaining. only one liner is fine


after getting this info please say thank you and stop your conversion and tell user to press submit

"Create a lead from <source> named <name> with email <email> and phone <phone>. They are interested in <interestedProducts>."

If the lead should be deleted or updated, respond accordingly with a command like:

"Delete the lead with id <leadId>" or
"Update the lead with id <leadId> set <field> to <value>."



Conversation:
${conversation}

Sales:
`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, couldn't respond.";
    return reply.trim();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Gemini API error";
  }
}

export async function getFinalLeadCommand(conversation) {
  const prompt = `
You are an AI that summarizes a sales conversation into a single command string.

Convert this conversation into exactly one command string in this format:

"Create a lead from <source> named <name> with email <email> and phone <phone>. They are interested in <interestedProducts>."

If the lead should be deleted or updated, produce commands like:

"Delete the lead with id <leadId>" or
"Update the lead with id <leadId> set <field> to <value>."

Conversation:
${conversation}

Command:
`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, couldn't generate command.";
    return reply.trim();
  } catch (err) {
    console.error("Gemini error:", err);
    return "❌ Gemini API error";
  }
}
