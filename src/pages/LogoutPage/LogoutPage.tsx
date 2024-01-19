import { Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { PageLayout } from '~components';

export function LogoutPage() {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <PageLayout>
      <Button onClick={logout}>Logout</Button>
    </PageLayout>
  );
}
