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

interface NotifyBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export async function POST(request: Request) {
  try {
    const body: NotifyBody = await request.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    const results = await Promise.allSettled([
      // Send notification email
      (async () => {
        const resend = getResendClient();
        return resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: "advice@workwifepod.com",
          subject: `WW Launch Notify - ${firstName} ${lastName.charAt(0)}.`,
          html: `
            <h2>New Launch Notification Sign-Up</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || "—"}</td></tr>
            </table>
          `,
        });
      })(),

      // Append to Google Sheet (Notify tab)
      (async () => {
        if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return;
        const sheets = getGoogleSheetsClient();
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
          range: "Notify!A:E",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[timestamp, firstName, lastName, email, phone || ""]],
          },
        });
      })(),
    ]);

    const errors: string[] = [];
    if (results[0].status === "rejected") {
      console.error("Notify email failed:", results[0].reason);
      errors.push("Email failed");
    }
    if (results[1].status === "rejected") {
      console.error("Notify sheets failed:", results[1].reason);
      errors.push("Sheets failed");
    }

    if (errors.length === 2) {
      return NextResponse.json(
        { error: "Sign-up failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
