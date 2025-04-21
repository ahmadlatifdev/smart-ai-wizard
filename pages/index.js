import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
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
      const aiMessage = {
        role: 'assistant',
        content: data.message || '⚠️ No response from AI',
      };
      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: '❌ Error contacting AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Smart AI Setup Wizard</h1>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: '80%', marginRight: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
