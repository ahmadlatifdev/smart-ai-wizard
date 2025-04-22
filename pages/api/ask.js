export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const reply = data.choices?.[0]?.message?.content || 'No reply received.';
      res.status(200).json({ reply });
    } else {
      res.status(500).json({ error: data.error?.message || 'Unknown error' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
