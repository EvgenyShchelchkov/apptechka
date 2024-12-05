import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { signupThunk } from '../../entities/user/model/authThunks';
import { useAppDispatch } from '../../shared/lib/hooks';
import styles from './SignUpPage.module.css';

export default function SignUpPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword: React.FormEventHandler<HTMLFormElement> = () =>
    setShowPassword((show) => !show);
  const handleMouseDownPassword: React.FormEventHandler<HTMLFormElement> = (event) =>
    event.preventDefault();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void dispatch(signupThunk(new FormData(event.currentTarget)));
  };

  return (
    <Box className={styles.background}>
      <Container maxWidth="sm" className={styles.container}>
        <Box component="form" onSubmit={submitHandler} className={styles.form}>
          <FormControl variant="standard" className={styles.input}>
            <InputLabel>Введите имя</InputLabel>
            <Input
              name="name"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" className={styles.input}>
            <InputLabel>Введите email</InputLabel>
            <Input
              type="email"
              name="email"
              startAdornment={
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" className={styles.input}>
            <InputLabel>Введите пароль</InputLabel>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button type="submit" variant="contained" size="large" className={styles.button}>
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
