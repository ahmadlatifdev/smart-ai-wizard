import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: 'assistant',
        content: data.message || '⚠️ No response from AI.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('❌ Frontend fetch error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Error connecting to AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Smart AI Setup Wizard</h1>

      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </p>
        ))}
        {loading && <p><strong>AI:</strong> ⏳ Thinking...</p>}
      </div>

      <input
        type="text"
        value={input}
        placeholder="Ask something..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}
