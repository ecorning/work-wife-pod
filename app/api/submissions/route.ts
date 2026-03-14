import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

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
  phone: string;
  age: string;
  gender: string;
  industry: string;
  industryOther: string;
  question: string;
}

export async function POST(request: Request) {
  try {
    const body: SubmissionBody = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      industry,
      industryOther,
      question,
    } = body;

    // Basic validation
    if (!email || !question) {
      return NextResponse.json(
        { error: "Email and question are required" },
        { status: 400 }
      );
    }

    const displayIndustry =
      industry === "Other" ? industryOther || "Other" : industry;
    const displayName = firstName || "Anonymous";
    const timestamp = new Date().toISOString();

    // Run email and sheets in parallel
    const results = await Promise.allSettled([
      // A. Send email via Resend (wrapped in async so constructor errors are caught)
      (async () => {
        const resend = getResendClient();
        return resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: "advice@workwifepod.com",
          subject: `New Submission from ${displayName}`,
          html: `
            <h2>New Work Wife Pod Submission</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Age</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${age || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Gender</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${gender || "—"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Industry</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${displayIndustry || "—"}</td></tr>
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
          range: "Sheet1!A:I",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                timestamp,
                firstName,
                lastName,
                email,
                phone,
                age,
                gender,
                displayIndustry,
                question,
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
