import { useState } from 'react';

export default function Home() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setChat([...chat, { role: 'user', content: input }]);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setChat((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (err) {
      setChat((prev) => [...prev, { role: 'assistant', content: '⚠️ Error: ' + err.message }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h2>Smart AI Setup Wizard</h2>
      {chat.map((msg, i) => (
        <p key={i}><strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}</p>
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
