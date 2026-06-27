export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (context.request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await context.request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await context.env.DB.prepare(
      `INSERT INTO inquiries (id, name, email, offer_price, venture, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, body.name, body.email, body.offerPrice, body.venture || null, body.message || null, now).run();

    return Response.json({ id, submittedAt: now }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch {
    return Response.json({ error: 'Failed to submit offer' }, { status: 500 });
  }
}
