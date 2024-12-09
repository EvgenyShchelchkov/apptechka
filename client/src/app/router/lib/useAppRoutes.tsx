import type { RouteObject } from 'react-router-dom';
import { fetchAllLikes } from '../../../entities/like/model/likeThunks.js';
import { fetchMedicines } from '../../../entities/medicine/model/medicine.thunks.js';
import { fetchMedkits } from '../../../entities/medkit/model/medkit.thunk.js';
import { refreshThunk } from '../../../entities/user/model/authThunks.js';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage.js';
import MainPage from '../../../pages/MainPage/MainPage.js';
import SignInPage from '../../../pages/SignInPage/SignInPage.js';
import SignUpPage from '../../../pages/SignUpPage/SignUpPage.js';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks.js';
import Layout from '../../layout/Layout.js';
import ProtectedRouter from '../feature/ProtectedRouter/ProtectedRouter.js';
import MedkitPage from '../../../pages/MedkitPage/MedkitPage.js';

export default function useAppRoutes(): RouteObject[] {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => !!state.auth.user);

  return [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: () =>
        Promise.all([
          dispatch(refreshThunk()),
          dispatch(fetchAllLikes()),
          dispatch(fetchMedicines()),
          dispatch(fetchMedkits()),
        ]),
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          element: <ProtectedRouter isAllowed={!!isUser} redirectTo="/" />,
          children: [
            {
              path: '/medkits',
              element: <MedkitPage />,
            },
            // {
            //   path: '/book/new',
            //   element: <NewBookPage />,
            // },
          ],
        },
        {
          element: <ProtectedRouter isAllowed={!isUser} redirectTo="/" />,
          children: [
            {
              path: '/auth/signin',
              element: <SignInPage />,
            },
            {
              path: '/auth/signup',
              element: <SignUpPage />,
            },
          ],
        },
      ],
    },
  ];
}
