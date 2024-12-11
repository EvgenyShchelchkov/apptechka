import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { signoutThunk } from '../../entities/user/model/authThunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import styles from './NavBar.module.css';

export default function NavBar(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user?.name);
  const dispatch = useAppDispatch();

  const handleSignOut = (): void => {
    void dispatch(signoutThunk());
  };

  const navigationLinks = (
    <>
      <NavLink to="/medkit" className={styles.navLink}>
        <MedicalServicesIcon className={styles.navIcon} />
        <span>Medicine Kits</span>
      </NavLink>
      <NavLink to="/medicine" className={styles.navLink}>
        <LocalPharmacyIcon className={styles.navIcon} />
        <span>Medicines</span>
      </NavLink>
      <NavLink to="/favorite" className={styles.navLinkFavorite}>
        <AutoAwesomeIcon className={styles.navIcon} />
        <span>Favorites</span>
      </NavLink>
      <NavLink to="/drugstore" className={styles.navLink}>
        <LocalHospitalIcon className={styles.navIcon} />
        <span>Drugstores</span>
      </NavLink>
    </>
  );

  return (
    <Box className={styles.container}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.logoSection}>
            <NavLink to="/" className={styles.logoLink}>
              <img src="logo/logo-vite.png" alt="logo" className={styles.logo} />
              <Typography variant="h6" className={styles.logoText}>
                AppTechka
              </Typography>
            </NavLink>
          </Box>

          <Box className={styles.navigationSection}>{navigationLinks}</Box>

          <Box className={styles.authSection}>
            {!user ? (
              <>
                <NavLink to="/auth/signin" className={styles.authLink}>
                  Sign In
                </NavLink>
                <NavLink to="/auth/signup" className={styles.authLink}>
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <Typography className={styles.userName}>{user}</Typography>
                <Button onClick={handleSignOut} className={styles.signOutButton}>
                  Sign Out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
