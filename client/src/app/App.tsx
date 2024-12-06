import { Alert } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../shared/lib/hooks.js';
import AppRouterProvider from './router/AppRouterProvider.js';

export default function App(): React.JSX.Element {
  const userError = useAppSelector((state) => state.auth.error);
  console.log(userError);
  // const error = useAppSelector((state) => state.book.error);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="logo/logo-vite.png" />
      </Helmet>
      <AppRouterProvider />
      {userError && (
        <Alert variant="outlined" severity="error">
          {userError}
        </Alert>
      )}
    </>
  );
}
