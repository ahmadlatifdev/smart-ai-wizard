import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newChat })
      });

      const data = await response.json();
      setChat([...newChat, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setChat([...newChat, { role: 'assistant', content: '⚠️ Error from OpenAI.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Smart AI Setup Wizard</h1>
      <div style={{ marginBottom: 10 }}>
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Ask something..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ padding: 10, width: '80%' }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: 10, marginLeft: 5 }}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}
