import { useOktaAuth } from '@okta/okta-react';

export function Logout() {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await oktaAuth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
}
