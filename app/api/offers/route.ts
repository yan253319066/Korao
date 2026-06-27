import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { env } = getRequestContext();
    const body = await request.json() as {
      name: string;
      email: string;
      offerPrice: string;
      venture?: string;
      message?: string;
    };

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO inquiries (id, name, email, offer_price, venture, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, body.name, body.email, body.offerPrice, body.venture || null, body.message || null, now).run();

    return NextResponse.json({ id, submittedAt: now });
  } catch {
    return NextResponse.json({ error: 'Failed to submit offer' }, { status: 500 });
  }
}
