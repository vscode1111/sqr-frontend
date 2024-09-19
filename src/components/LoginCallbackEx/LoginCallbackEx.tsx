import { LoginCallback } from '@okta/okta-react';
import { LoadingOkta } from '~components';

export function LoginCallbackEx() {
  return <LoginCallback loadingElement={<LoadingOkta />} />;
}
