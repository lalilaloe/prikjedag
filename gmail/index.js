import oauth2Client from "./oAuthClient"

const scope = "https://www.googleapis.com/auth/calendar"

if(process.env?.GOOGLE_TOKEN) oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_TOKEN,
  scope
})

export const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope,
});
