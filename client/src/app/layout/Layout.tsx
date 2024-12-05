import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../widgets/Loader';
import NavBar from '../../widgets/NavBar';

export default function Layout(): React.JSX.Element {
  const [isLoading] = useState<boolean>(false);

  return (
    <Loader showSpinner={isLoading}>
      <NavBar />
      <Outlet />
    </Loader>
  );
}
