import React, { useState } from "react";
import { getSalesResponse, getFinalLeadCommand } from "../utils/gemini";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "Sales", text: "Hi! Are you the owner of the business?" },
  ]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ New state for thank-you form

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "You", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const conversationText = updatedMessages
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");

    const aiReply = await getSalesResponse(conversationText);
    setMessages((prev) => [...prev, { sender: "Sales", text: aiReply }]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const conversationText = messages
        .map((m) => `${m.sender}: ${m.text}`)
        .join("\n");

      const finalCommand = await getFinalLeadCommand(conversationText);

      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalCommand }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      await response.json();

      setSubmitted(true); // ✅ Show thank-you screen
    } catch (err) {
      alert("Submission failed: " + err.message);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-900 p-8 rounded shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Thank You!</h2>
          <p className="text-lg">We've received your information.</p>
          <p className="text-sm mt-2 text-gray-400">
            Our sales team will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">AI Sales ChatBot</h1>

      <div className="w-full max-w-xl bg-gray-900 rounded p-4 mb-4 overflow-y-auto h-[60vh]">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong className="text-gray-300">{m.sender}:</strong>{" "}
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          Send
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
