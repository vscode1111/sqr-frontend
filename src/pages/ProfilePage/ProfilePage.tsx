import { useProfilePageStyles } from './useProfilePageStyles';
import { CustomUserClaims, UserClaims } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useMemo, useState } from 'react';

export function ProfilePage() {
  const { classes } = useProfilePageStyles();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<UserClaims<CustomUserClaims> | null>(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const content = useMemo(() => {
    if (!userInfo) {
      return (
        <div>
          <p>Fetching user profile...</p>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <p>
          Below is the information from your ID token which was obtained during the &nbsp;
          <a href='https://developer.okta.com/docs/guides/implement-auth-code-pkce'>
            PKCE Flow
          </a>{' '}
          and is now stored in local storage.
        </p>
        <table>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }, [userInfo, classes.root]);

  return content;
}
