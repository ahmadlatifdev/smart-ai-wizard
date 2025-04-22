// pages/api/ask.js

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

  // Your AI processing logic here...

  return NextResponse.json({ reply: "This is a DeepSeek-powered reply." });
};

export const POST = withErrorHandling(handler);
