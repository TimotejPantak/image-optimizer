import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const format = (formData.get('format') as string) || 'webp';

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let instance = sharp(buffer);

    // Dynamic processing based on selected format
    switch (format) {
      case 'webp':
        instance = instance.webp({ quality: 80, effort: 4 });
        break;
      case 'avif':
        instance = instance.avif({ quality: 65, effort: 4 });
        break;
      case 'png':
        instance = instance.png({ palette: true, quality: 80 });
        break;
      case 'jpg':
      case 'jpeg':
        instance = instance.jpeg({ quality: 80, progressive: true });
        break;
      default:
        instance = instance.webp({ quality: 80 });
    }

    const output = await instance.toBuffer();

    return new NextResponse(new Uint8Array(output), {
      headers: {
        'Content-Type': `image/${format === 'jpg' ? 'jpeg' : format}`,
        'Content-Disposition': `attachment; filename="optimized.${format}"`,
      },
    });
  } catch (error) {
    console.error("Sharp Error:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}