import "dotenv/config";

import polka from "polka";

import { url } from "./gmail/index";
import { getEvents } from "./gmail/events";
import { oauthcallback } from "./gmail/oAuthCallback";

const server = polka({
  onError: (err) => console.error(err)
});
server.get("/google/auth", (req, res) => {
  res.end(url);
});
server.get("/oauthcallback", oauthcallback);
server.get("/google/events", getEvents);

server.listen(3000)