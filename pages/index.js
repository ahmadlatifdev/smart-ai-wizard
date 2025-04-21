import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Welcome to Smart AI Wizard.' }]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      alert('Error from OpenAI');
      setStreaming(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let final = '';
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);
      final += chunk;
      setMessages([...newMessages, { role: 'assistant', content: final }]);
    }

    setStreaming(false);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🧠 Smart AI Setup Wizard</h1>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i}><strong>{m.role}:</strong> {m.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ padding: 10, width: '60%' }}
        />
        <button type="submit" style={{ padding: 10 }} disabled={streaming}>
          {streaming ? '...Thinking' : 'Send'}
        </button>
      </form>
    </main>
  );
}
