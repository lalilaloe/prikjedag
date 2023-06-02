import { google } from "googleapis";
import oauth2Client from "./oAuthClient";

export const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function getEvents(req, res) {
    const today = new Date();
  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: today.toISOString(),
    timeMax: nextWeek.toISOString(),
  });
  return res.end(JSON.stringify(events, null, 2));
}
