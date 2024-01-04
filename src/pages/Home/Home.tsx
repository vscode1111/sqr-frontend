import { useHomeStyles } from './useHomeStyles';
import { Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTE } from '~constants';

export const Home = observer(() => {
  const { classes } = useHomeStyles();

  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  const login = () => oktaAuth.signInWithRedirect({ originalUri: `/${ROUTE.CONTROL}` });

  useEffect(() => {
    navigate(authState?.isAuthenticated ? `/${ROUTE.CONTROL}` : '/');
  }, [authState?.isAuthenticated, navigate]);

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div className={classes.root}>
        <div className={classes.mainContaniner}>
          <div className={classes.stopContainer}>
            <Button className={classes.stopButton} onClick={login}>
              Okta Login
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    // return 'You authenticated';
    return <Outlet />;
  }
});
