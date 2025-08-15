// File: /api/boards/[id].js
// Requires: `@vercel/blob` (built-in on Vercel). Set BLOB_READ_WRITE_TOKEN in Project Settings.
import { put, get } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export default async function handler(req, ctx) {
  const id = ctx.params.id;
  if (!id) return new NextResponse('Missing id', { status: 400 });

  const key = `boards/${id}.json`;

  if (req.method === 'GET') {
    try {
      const file = await get(key);
      if (!file) return NextResponse.json({}, { status: 404 });
      const data = await fetch(file.url).then(r => r.json());
      return NextResponse.json(data);
    } catch (e) {
      return new NextResponse('Error fetching', { status: 500 });
    }
  }

  if (req.method === 'PUT') {
    try {
      const json = await req.json();
      const blob = await put(key, JSON.stringify(json), {
        access: 'public',
        contentType: 'application/json'
      });
      return NextResponse.json({ ok: true, url: blob.url });
    } catch (e) {
      return new NextResponse('Error saving', { status: 500 });
    }
  }

  return new NextResponse('Method not allowed', { status: 405 });
}
