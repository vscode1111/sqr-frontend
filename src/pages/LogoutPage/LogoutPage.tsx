import { Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { useCallback } from 'react';
import { PageLayout } from '~components';

export function LogoutPage() {
  const { oktaAuth } = useOktaAuth();

  const logout = useCallback(
    () => async () => {
      await oktaAuth.signOut();
    },
    [oktaAuth],
  );

  return (
    <PageLayout>
      <Button onClick={logout}>Logout</Button>
    </PageLayout>
  );
}
