import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage({
  code = '404',
  title = 'Упс! Страница не найдена.',
  description = 'Страница, которую вы ищете, не существует или была перемещена.',
}: {
  code?: string;
  title?: string;
  description?: string;
}): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <Container maxWidth="sm">
        <Box className={styles.paper}>
          <ErrorOutlineIcon className={styles.icon} />

          <Typography variant="h2" component="h1" className={styles.title}>
            {code}
          </Typography>

          <Typography variant="h5" className={styles.subtitle}>
            {title}
          </Typography>

          <Typography className={styles.description}>{description}</Typography>

          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            className={styles.button}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
