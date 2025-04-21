import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: 'assistant',
        content: data.message || '⚠️ No response from AI',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Server error. Try again later.' },
      ]);
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Smart AI Setup Wizard</h1>

      <div style={{ marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: '80%', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: '10px', fontSize: '16px', marginLeft: '5px' }}
      >
        Send
      </button>
    </div>
  );
}
