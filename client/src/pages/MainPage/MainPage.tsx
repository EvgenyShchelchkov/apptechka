import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ModalCookie from '../../widgets/ModalCookie';
import styles from './MainPage.module.css';

export default function MainPage({
  welcomeText = 'Добро пожаловать в Citadel Hub!',
}: {
  welcomeText?: string;
}): React.JSX.Element {
  const [greeting, setGreeting] = useState('');
  const [openModal, setOpenModal] = useState(() => !localStorage.getItem('cookieAccepted'));

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting((prev) => {
        if (prev.length < welcomeText.length) {
          return prev + welcomeText[prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [welcomeText]);

  const handleCloseModal = (): void => {
    setOpenModal(false);
    localStorage.setItem('cookieAccepted', 'true');
  };

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

      <ModalCookie open={openModal} close={handleCloseModal} />
    </>
  );
}
