import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const body = await request.json();

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
