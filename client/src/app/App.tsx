import { Alert } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../shared/lib/hooks.js';
import AppRouterProvider from './router/AppRouterProvider.js';

export default function App(): React.JSX.Element {
  const userError = useAppSelector((state) => state.auth.error);
  // const error = useAppSelector((state) => state.book.error);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="logo/logo-vite.png" />
      </Helmet>
      {userError && (
        <Alert
          variant="outlined"
          severity="error"
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            width: '100%',
            maxWidth: 575,
          }}
        >
          {userError}
        </Alert>
      )}
      <AppRouterProvider />
    </>
  );
}
