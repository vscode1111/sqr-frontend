const REACT_APP_CLIENT_ID = process.env.oktaClientId;
const REACT_APP_OKTA_DOMAIN = process.env.oktaDomain;
// const REACT_APP_PORT = process.env.REACT_APP_PORT;
const REACT_APP_PORT = 5173;

export const oktaConfig = {
  clientId: `${REACT_APP_CLIENT_ID}`,
  issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `http://localhost:${REACT_APP_PORT}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};

console.log(111, oktaConfig);
