import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";
import Anthropic from "@anthropic-ai/sdk";

const CATEGORIES = [
  "Workplace Conflict",
  "Workplace Etiquette",
  "Work Life Balance",
  "Job Search / Interviewing",
  "Relationships at Work",
  "Management/Leadership",
  "Sexual Harassment",
  "Compensation & Negotiation",
  "Other",
] as const;

async function categorizeQuestion(question: string): Promise<string> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) return "Other";
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: `Categorize the following question into exactly one of these categories: ${CATEGORIES.join(", ")}

Question: "${question}"

Respond with only the category name, nothing else.`,
        },
      ],
    });
    const category =
      message.content[0].type === "text" ? message.content[0].text.trim() : "Other";
    return CATEGORIES.includes(category as (typeof CATEGORIES)[number])
      ? category
      : "Other";
  } catch (error) {
    console.error("Categorization failed:", error);
    return "Other";
  }
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

interface SubmissionBody {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  industry: string;
  industryOther: string;
  question: string;
  callIn?: boolean;
  callInEmail?: string;
  callInPhone?: string;
}

export async function POST(request: Request) {
  try {
    const body: SubmissionBody = await request.json();
    const {
      firstName,
      lastName,
      email,
      age,
      gender,
      industry,
      industryOther,
      question,
      callIn,
      callInEmail,
      callInPhone,
    } = body;

    // Basic validation
    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const displayIndustry =
      industry === "Other" ? industryOther || "Other" : industry;
    const displayName = firstName || "Anonymous";
    const timestamp = new Date().toISOString();

    // Categorize the question using AI
    const category = await categorizeQuestion(question);

    // Run email and sheets in parallel
    const results = await Promise.allSettled([
      // A. Send email via Resend (wrapped in async so constructor errors are caught)
      (async () => {
        const resend = getResendClient();
        return resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: "advice@workwifepod.com",
          subject: (() => {
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, "0");
            const mm = String(now.getMonth() + 1).padStart(2, "0");
            const yy = String(now.getFullYear()).slice(-2);
            const hh = String(now.getHours()).padStart(2, "0");
            const min = String(now.getMinutes()).padStart(2, "0");
            const lastInit = lastName ? ` ${lastName.charAt(0)}.` : "";
            return `WW Submission - ${firstName || "Anonymous"}${lastInit} - ${mm}/${dd}/${yy} ${hh}:${min}`;
          })(),
          html: `
            <h2>New Work Wife Pod Submission</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Age</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${age || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Gender</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${gender || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Industry</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${displayIndustry || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Category</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${category}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Open to Call-In</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${callIn ? "Yes" : "No"}</td></tr>
              ${callIn ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Call-In Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${callInEmail || email || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Call-In Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${callInPhone || "—"}</td></tr>` : ""}
            </table>
            <h3 style="margin-top: 24px;">Question</h3>
            <p style="background: #f9f9f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${question}</p>
          `,
        });
      })(),

      // B. Append row to Google Sheet
      (async () => {
        if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return;
        const sheets = getGoogleSheetsClient();
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
          range: "Waitlist!A:D",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                timestamp,
                firstName,
                lastName,
                email,
              ],
            ],
          },
        });
      })(),
    ]);

    // Check if any critical errors occurred
    const emailResult = results[0];
    const sheetsResult = results[1];

    const errors: string[] = [];
    if (emailResult.status === "rejected") {
      console.error("Email send failed:", emailResult.reason);
      errors.push("Email delivery failed");
    }
    if (sheetsResult.status === "rejected") {
      console.error("Google Sheets append failed:", sheetsResult.reason);
      errors.push("Spreadsheet update failed");
    }

    if (errors.length === 2) {
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      warnings: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
