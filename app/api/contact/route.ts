import { getPageData } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contactData = await getPageData("contact");
    const { email, social } = contactData.acf;
    return NextResponse.json({ email, social });
  } catch (error: any) {
    console.error("contact data api error:", error);
    return NextResponse.json(
      { error: error.message || "unknown" },
      { status: 500 }
    );
  }
}
