import oauth2Client from './oAuthClient'
export async function oauthcallback(req, res) {
    const queryParams = JSON.parse(JSON.stringify(req.query));
    const { code, scope } = queryParams;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.end(`authorized for scope ${scope}`)
}
