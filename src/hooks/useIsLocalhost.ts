import { useMemo } from 'react';
import { LOCALHOST_OKTA_AUTH_CHECK } from '~constants';
import { checkIfLocalhost } from '~utils';

export function useIsLocalhost(): boolean {
  return useMemo(() => !LOCALHOST_OKTA_AUTH_CHECK && checkIfLocalhost(), []);
}
