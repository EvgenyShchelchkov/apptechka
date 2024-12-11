import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
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
    const message = `Hello, ${user ?? 'Гость'}!`;
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
      <div className={styles.backgroundElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
        <div className={styles.circle4} />
        <div className={styles.circle5} />
      </div>

      <Container maxWidth="md">
        <Paper className={styles.welcomeCard} elevation={3}>
          <div className={styles.cardHeader}>
            <HealthAndSafetyIcon className={styles.headerIcon} />
            <HealthAndSafetyIcon className={styles.headerIcon} />
            <HealthAndSafetyIcon className={styles.headerIcon} />
          </div>

          <div className={styles.cardContent}>
            <Typography variant="h3" className={styles.greeting}>
              {greeting}
              <span className={styles.cursor}>|</span>
            </Typography>

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <HealthAndSafetyIcon className={styles.dividerIcon} />
              <span className={styles.dividerLine} />
            </div>

            <Typography variant="h6" className={styles.welcomeText}>
              Ваша персональная медицинская аптечка
            </Typography>

            <NavLink to="/medkit" style={{ textDecoration: 'none' }}>
              <Button className={styles.button} size="large">
                Перейти к запасам!
              </Button>
            </NavLink>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.pulseEffect} />
          </div>
        </Paper>

        <MedicineSequential />
      </Container>
    </Box>
  );
}
