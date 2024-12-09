import React from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../widgets/Loader';
import NavBar from '../../widgets/NavBar';

export default function Layout(): React.JSX.Element {
  return (
    <Loader>
      <NavBar />
      <Outlet />
    </Loader>
  );
}
