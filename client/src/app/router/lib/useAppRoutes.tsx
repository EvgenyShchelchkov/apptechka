import type { RouteObject } from 'react-router-dom';
import { fetchAllLikes } from '../../../entities/like/model/likeThunks.js';
import { fetchMedicines } from '../../../entities/medicine/model/medicineThunks.js';
import { refreshThunk } from '../../../entities/user/model/authThunks.js';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage.js';
import MainPage from '../../../pages/MainPage/MainPage.js';
import SignInPage from '../../../pages/SignInPage/SignInPage.js';
import SignUpPage from '../../../pages/SignUpPage/SignUpPage.js';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks.js';
import Layout from '../../layout/Layout.js';
import ProtectedRouter from '../feature/ProtectedRouter/ProtectedRouter.js';

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
        ]),
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          element: <ProtectedRouter isAllowed={!!isUser} redirectTo="/" />,
          children: [
            // {
            //   path: '/book',
            //   element: <BookPage />,
            // },
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