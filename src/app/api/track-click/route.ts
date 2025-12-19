import { NextRequest, NextResponse } from "next/server";
import { incrementLinkClicks } from "@/app/actions/links";

export async function POST(req: NextRequest) {
  try {
    const { linkId } = await req.json();

    if (!linkId || typeof linkId !== "number") {
      return NextResponse.json({ error: "Invalid link ID" }, { status: 400 });
    }

    await incrementLinkClicks(linkId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to track click:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
