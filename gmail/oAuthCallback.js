import oauth2Client from './oAuthClient'
export async function oauthcallback(req, res) {
    const queryParams = JSON.parse(JSON.stringify(req.query));
    const { code, scope } = queryParams;
    const { tokens } = await oauth2Client.getToken(code);
    if(process.env.NODE_ENV === 'local') console.debug('Retrieved Token', tokens)
    oauth2Client.setCredentials(tokens);
    res.end(`authorized for scope ${scope}`)
}
