// File: pages/api/ask.js

import { NextResponse } from 'next/server';
import { withErrorHandling } from '@/utils/withErrorHandling';

const handler = async (req) => {
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: 'Invalid request: messages must be an array.' },
      { status: 400 }
    );
  }

  // You can now handle OpenAI logic here (placeholder below)
  return NextResponse.json({ reply: "DeepSeek-powered response goes here." });
};

export const POST = withErrorHandling(handler);
