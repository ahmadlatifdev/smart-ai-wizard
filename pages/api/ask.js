// ✅ DeepSeek-Level Fix for API route

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({
        error: 'Invalid request: messages must be an array.'
      }, { status: 400 });
    }

    const reply = {
      role: 'assistant',
      content: `You said: ${messages.map(m => m.content).join(' ')}`
    };

    return NextResponse.json({ messages: [reply] });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
