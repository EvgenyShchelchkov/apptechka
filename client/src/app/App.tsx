import { Slide } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../shared/lib/hooks';
import AlertError from '../shared/ui/AlertError/AlertError';
import AppRouterProvider from './router/AppRouterProvider';

export default function App(): React.JSX.Element {
  const userError = useAppSelector((state) => state.auth.error);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="logo/logo-vite.png" />
      </Helmet>
      <Slide direction="down" in={!!userError} mountOnEnter unmountOnExit>
        <div>{userError && <AlertError error={userError} />}</div>
      </Slide>
      <AppRouterProvider />
    </>
  );
}
