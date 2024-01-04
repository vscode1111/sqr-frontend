import { OktaAuthOptions } from '@okta/okta-auth-js';

const oktaClientId = process.env.oktaClientId;
const oktaIssuer = process.env.oktaIssuer;
const oktaRedirectUri = process.env.oktaRedirectUri;

export const oktaConfig: OktaAuthOptions = {
  clientId: `${oktaClientId}`,
  // issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  issuer: `${oktaIssuer}`,
  redirectUri: `${oktaRedirectUri}`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

console.log(111, oktaConfig);
