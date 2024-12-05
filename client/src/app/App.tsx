import { Alert } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../shared/lib/hooks.js';
import AppRouterProvider from './router/AppRouterProvider.js';

export default function App(): React.JSX.Element {
  // const error = useAppSelector((state) => state.book.error);

  return (
    <>
      <AppRouterProvider />
      {/* {error && (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )} */}
    </>
  );
}
