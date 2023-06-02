import oauth2Client from "./oAuthClient"

const scope = "https://www.googleapis.com/auth/calendar"

if(process.env.TOKEN) oauth2Client.setCredentials({
  access_token: process.env.TOKEN,
  scope
})

export const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope,
});
