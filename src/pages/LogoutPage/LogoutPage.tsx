import { useOktaAuth } from '@okta/okta-react';
import { useInitEffect } from '~hooks';

export function LogoutPage() {
  const { oktaAuth } = useOktaAuth();

  useInitEffect(() => {
    oktaAuth.signOut();
  });

  return <h3>Okta logout...</h3>;
}
