import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MedicineSequential from '../../entities/medicine/ui/MedicineSequential';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './MainPage.module.css';

export default function MainPage(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user?.name);
  const [greeting, setGreeting] = useState('');

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

  return (
    <Box className={styles.container}>
      <Container maxWidth="lg">
        <Paper className={styles.paper} elevation={3}>
          <Typography variant="h3" component="h1" gutterBottom className={styles.title}>
            {greeting}
          </Typography>
          <Typography variant="h6" gutterBottom className={styles.subtitle}>
            Мы рады видеть вас здесь (ﾉ◕ヮ◕)ﾉ:･ﾟ✧
          </Typography>
          <NavLink to="/inventory" style={{ textDecoration: 'none' }}>
            <Button className={styles.button} size="large" color="secondary">
              Перейти к запасам!
            </Button>
          </NavLink>
        </Paper>

        <MedicineSequential />
      </Container>
    </Box>
  );
}
