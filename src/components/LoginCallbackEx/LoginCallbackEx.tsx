import { LoginCallback } from '@okta/okta-react';
import { Loading, PageLayout } from '~components';

export function LoginCallbackEx() {
  return (
    <PageLayout>
      <LoginCallback loadingElement={<Loading />} />
    </PageLayout>
  );
}
