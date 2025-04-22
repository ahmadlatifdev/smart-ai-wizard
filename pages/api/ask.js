// DeepSeek-Powered API Handler for Smart AI Builder

import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages must be an array.' },
        { status: 400 }
      )
    }

    const systemPrompt = {
      role: 'system',
      content: `You are Smart AI Builder powered by DeepSeek, an advanced code and logic generation model.
- Provide complete answers
- Support real-time AI development, debugging, and enhancement
- Explain reasoning clearly if asked`
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        stream: false
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('API Error:', data)
      return NextResponse.json({ error: data.error?.message || 'API Error' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Internal Server Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
