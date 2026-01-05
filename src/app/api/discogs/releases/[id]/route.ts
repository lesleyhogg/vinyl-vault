import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const url = `https://api.discogs.com/releases/${id}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "VinylVault/1.0",
      Authorization: `Discogs key=${process.env.DISCOGS_CONSUMER_KEY}, secret=${process.env.DISCOGS_CONSUMER_SECRET}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
