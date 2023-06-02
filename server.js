import "dotenv/config";

import polka from "polka";

import { authUrl as googleAuthUrl } from "./gmail/index";
import { authUrl as outlookAuthUrl } from "./outlook/index";
import { getEvents } from "./gmail/events";
import { oauthcallback } from "./gmail/oAuthCallback";

const server = polka({
  onError: (err) => console.error(err)
});
server.get("/google/auth", (req, res) => {
  res.end(googleAuthUrl);
});
server.get("/outlook/auth", async (req, res) => {
  res.end(await outlookAuthUrl);
});
server.get("/oauthcallback", oauthcallback);
server.get("/google/events", getEvents);

server.listen(3000)