import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function POST(req: Request) {
  const { name, email, phone, source, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Save to Supabase
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone, source, message });

    if (error) {
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
  }

  // Notify Slack
  if (SLACK_WEBHOOK_URL) {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "New Contact Submission", emoji: true },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${name}` },
              { type: "mrkdwn", text: `*Email:*\n${email}` },
            ],
          },
          ...(phone
            ? [{ type: "section", fields: [{ type: "mrkdwn", text: `*Phone:*\n${phone}` }] }]
            : []),
          ...(source
            ? [{ type: "section", fields: [{ type: "mrkdwn", text: `*Found us via:*\n${source}` }] }]
            : []),
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Message:*\n>${message}` },
          },
          { type: "divider" },
          {
            type: "context",
            elements: [{ type: "mrkdwn", text: "From citralai.com contact form" }],
          },
        ],
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
