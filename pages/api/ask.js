export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const result = await openaiRes.json();

    console.log('🔁 OpenAI raw response:', result);

    if (result?.choices?.[0]?.message?.content) {
      return res.status(200).json({ message: result.choices[0].message.content });
    } else {
      return res.status(500).json({
        error: 'OpenAI returned an invalid response',
        detail: result,
      });
    }
  } catch (err) {
    console.error('❌ Server Error:', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
