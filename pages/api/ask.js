
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Messages missing in request' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const reply = completion.data.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
