import { useHomePageStyles } from './useHomePageStyles';
import { Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTE } from '~constants';
import { useIsLocalhost } from '~hooks';

export const HomePage = observer(() => {
  const { classes } = useHomePageStyles();

  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const isLocalhost = useIsLocalhost();

  const login = useCallback(() => {
    oktaAuth.signInWithRedirect({ originalUri: `/${ROUTE.CLAIM}` });
  }, [oktaAuth]);

  useEffect(() => {
    if (isLocalhost) {
      navigate(`/${ROUTE.CLAIM}`);
    } else {
      navigate(authState?.isAuthenticated ? `/${ROUTE.CLAIM}` : '/');
    }
  }, [isLocalhost, authState?.isAuthenticated, navigate]);

  if (isLocalhost) {
    return <Outlet />;
  }

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.stopContainer}>
            <Button className={classes.stopButton} variant='contained' onClick={login}>
              Okta Login
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Outlet />;
  }
});
