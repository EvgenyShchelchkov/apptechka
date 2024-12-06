import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './MainPage.module.css';

export default function MainPage(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user?.name);
  const [greeting, setGreeting] = useState('');
  // const [openModal, setOpenModal] = useState(() => !localStorage.getItem('cookieAccepted'));

  useEffect(() => {
    const message = `Halo, ${user ?? 'Гость'} 🖖`;
    const timer = setInterval(() => {
      setGreeting((prev) => {
        if (prev.length < message.length) {
          return prev + message[prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [user]);

  // const handleCloseModal = (): void => {
  //   setOpenModal(false);
  //   localStorage.setItem('cookieAccepted', 'true');
  // };

  return (
    <>
      <Box className={styles.container}>
        <Container maxWidth="sm">
          <Paper className={styles.paper} elevation={3}>
            <Typography variant="h3" component="h1" gutterBottom className={styles.title}>
              {greeting}
            </Typography>

            <Typography variant="h6" gutterBottom className={styles.subtitle}>
              Мы рады видеть вас здесь (ﾉ◕ヮ◕)ﾉ:･ﾟ✧
            </Typography>

            <NavLink to="/book" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" className={styles.button}>
                Начать
              </Button>
            </NavLink>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
