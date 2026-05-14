import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const MAX_SIZE = 100 * 1024 * 1024; // 40MB

export async function POST(req: NextRequest) {
  try {
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return NextResponse.json(
        { error: "Max file size is 40MB." },
        { status: 413 },
      );
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const format = (formData.get("format") as string) || "webp";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Súbor presahuje povolený limit 40MB." },
        { status: 413 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let instance = sharp(buffer);

    // Dynamic processing based on selected format
    switch (format) {
      case "webp":
        instance = instance.webp({ quality: 90, effort: 4 });
        break;
      case "avif":
        instance = instance.avif({ quality: 90, effort: 4 });
        break;
      case "png":
        instance = instance.png({ palette: true, quality: 80 });
        break;
      case "jpg":
      case "jpeg":
        instance = instance.jpeg({ quality: 90, progressive: true });
        break;
      default:
        instance = instance.webp({ quality: 90 });
    }

    const output = await instance.toBuffer();

    return new NextResponse(new Uint8Array(output), {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Content-Disposition": `attachment; filename="optimized.${format}"`,
      },
    });
  } catch (error) {
    console.error("Sharp Error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}
