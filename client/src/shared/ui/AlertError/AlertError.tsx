import { Alert } from '@mui/material';
import React from 'react';
import { setClearError } from '../../../entities/user/model/authSlice';
import { useAppDispatch } from '../../lib/hooks';
import styles from './AlertError.module.css';

type AlertErrorProps = {
  error: string;
};

export default function AlertError({ error }: AlertErrorProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const сloseHandler = (): void => {
    dispatch(setClearError());
  };

  return (
    <>
      <Alert variant="filled" severity="error" className={styles.alert} onClose={сloseHandler}>
        <strong>Ошибка: </strong> {error}
      </Alert>
    </>
  );
}
