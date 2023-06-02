import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

const {OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_REDIRECT_URL} = process.env

const msalConfig = {
  auth: {
        clientId: OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
    
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

const scopes = ["calendar.read"];

export const authUrl = msalClient.getAuthCodeUrl({
redirectUri: OUTLOOK_REDIRECT_URL,
  scopes,
});

// // Assuming you have obtained the access token through an OAuth authentication flow
// const accessToken = "YOUR_ACCESS_TOKEN";

// // Initialize the Graph API client with the access token
// const client = Client.init({
//   authProvider: (done) => {
//     done(null, accessToken);
//   },
// });

// // Use the client to make API requests
// client
//   .api("/me/events")
//   .get()
//   .then((res) => {
//     console.log(res.value);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
