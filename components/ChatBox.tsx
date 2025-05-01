'use client';

import { useState } from 'react';

const ChatBox = () => {
  const [inputText, setInputText] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: inputText }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Smart AI Wizard 🤖</h1>
      <input
        type="text"
        placeholder="Ask something..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-2"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {reply && (
        <div className="mt-4 p-3 border rounded bg-gray-100 whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
