import { NextRequest, NextResponse } from 'next/server';

const MAX_SIZE = 100 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Only HTTP/HTTPS URLs are supported' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: { 'User-Agent': 'ImageOptimizer/1.0' },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch image: ${response.status}` }, { status: 400 });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL does not point to an image' }, { status: 400 });
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return NextResponse.json({ error: 'Image too large (max 20MB)' }, { status: 400 });
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: 'Image too large (max 20MB)' }, { status: 400 });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Fetch image error:', error);
    return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 500 });
  }
}
