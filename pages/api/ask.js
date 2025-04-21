export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // you can change to gpt-4 if your key supports it
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await openaiRes.json();

    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return res.status(500).json({ error: 'OpenAI error: ' + data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ message: reply || 'No response generated.' });

  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Server error occurred.' });
  }
}
