import "dotenv/config";

import polka from "polka";

import { authUrl as googleAuthUrl } from "./gmail/index";
import { authUrl as outlookAuthUrl } from "./outlook/index";
import { getEvents } from "./gmail/events";
// import { oauthcallback as gmailAuthCallback } from "./gmail/oAuthCallback";
import { oauthcallback as outlookAuthCallback} from "./outlook/oAuthCallback";
import { readFile } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = polka({
  onError: (err) => console.error("Error:", err)
});

server.use((req, res, next) => {
  res.render = (templateUrl, params) => {
    readFile(
      resolve(__dirname, templateUrl),
      "utf8",
      (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error reading template", err);
        } else {
          let output = data.replace(/%([^%]+)%/g, (match, p1) => {
            return params[p1] || match;
          });

          res.setHeader("Content-Type", "text/html");
          res.end(output);
        }
      }
    );
  };
  next();
});

server.get("/google/auth", (req, res) => {
  res.end(googleAuthUrl);
});
server.get("/outlook/auth", async (req, res) => {
  //res.end(await outlookAuthUrl);
const { OUTLOOK_CLIENT_ID, OUTLOOK_REDIRECT_URL } =
  process.env;

  res.render("outlook/index.html", {
    OUTLOOK_CLIENT_ID,
    OUTLOOK_REDIRECT_URL,
  });
});
server.get("/oauthcallback", async (req, res) => {
  if (req.query?.error) console.error(req.query);
  console.log("/oauthcallback", req.query, req.params);
  res.end(await outlookAuthCallback(req, res));
  //res.end(await gmailAuthCallback(req, res));
});
server.get("/google/events", getEvents);

server.listen(3000, () => {
  console.log("gmail:", "http://localhost:3000/google/auth");
  console.log("outlook:", "http://localhost:3000/outlook/auth");
})