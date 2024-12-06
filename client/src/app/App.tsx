import { Alert } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { setClearError } from '../entities/user/model/authSlice.js';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks.js';
import AppRouterProvider from './router/AppRouterProvider.js';

export default function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const userError = useAppSelector((state) => state.auth.error);
  const medicineError = useAppSelector((state) => state.medicine.error);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="logo/logo-vite.png" />
      </Helmet>
      {userError && medicineError && (
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
          onClose={() => dispatch(setClearError())}
        >
          {userError}
        </Alert>
      )}
      <AppRouterProvider />
    </>
  );
}
