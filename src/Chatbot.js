import React, { useState } from "react";
import "./chatbot.css"; // separate CSS file for chatbot styling

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    const userMessage = { sender: "user", text: question };
    setChatLog([...chatLog, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.answer };

      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = {
        sender: "bot",
        text: "Oops! Something went wrong. Try again later.",
      };
      setChatLog((prev) => [...prev, errorMsg]);
    }

    setQuestion("");
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Policy Chatbot 🤖</h2>
      <div className="chat-window">
        {chatLog.map((msg, idx) => {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const parts = msg.text.split(urlRegex);

          return (
            <div
              key={idx}
              className={`chat-msg ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
            >
              {parts.map((part, i) => {
                if (urlRegex.test(part)) {
                  const cleanUrl = part.replace(/[.,!?]$/, "");
                  return (
                    <a
                      key={i}
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bot-link"
                    >
                      View Bill
                    </a>
                  );
                } else {
                  return part;
                }
              })}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about a bill or representative..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
