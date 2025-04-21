import React, { useState } from 'react';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { role: 'user', content: input };
    setChat((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.message) {
        setChat((prev) => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setChat((prev) => [...prev, { role: 'assistant', content: 'Error: No response' }]);
      }
    } catch (err) {
      setChat((prev) => [...prev, { role: 'assistant', content: '⚠️ Error fetching reply' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Smart AI Setup Wizard</h1>
      {chat.map((msg, i) => (
        <div key={i}><strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}</div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={handleSend} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}
