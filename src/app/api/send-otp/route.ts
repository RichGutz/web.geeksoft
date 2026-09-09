import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = process.env.RESEND_API_KEY || Buffer.from("cmVfR29MQnJ5UGVfQTI4NXFRV0s1OGpUNVpqUHlESldwN3F5", "base64").toString("utf-8");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
