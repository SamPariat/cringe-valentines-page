import { type NextRequest, NextResponse } from "next/server";

const QR_SERVER_API = "https://api.qrserver.com/v1/create-qr-code/";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 },
    );
  }

  const qrUrl = new URL(QR_SERVER_API);
  qrUrl.searchParams.set("size", "150x150");
  qrUrl.searchParams.set("data", url);
  qrUrl.searchParams.set("format", "png");

  const response = await fetch(qrUrl.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }

  const imageBuffer = await response.arrayBuffer();

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
