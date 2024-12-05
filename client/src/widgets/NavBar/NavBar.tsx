import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signoutThunk } from '../../entities/user/model/authThunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import styles from './NavBar.module.css';

export default function NavBar(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user?.name);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = (): void => setMobileMoreAnchorEl(null);
  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void =>
    setMobileMoreAnchorEl(event.currentTarget);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void dispatch(signoutThunk());
  };

  return (
    <Box className={styles.container}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <Box className={styles.toolbar}>
            <Box className={styles.logoSection}>
              <NavLink to="/" className={styles.navLink}>
                <img src="logo/logo-preview.png" alt="logo" />
                <Typography variant="h6" noWrap>
                  Citadel Hub
                </Typography>
              </NavLink>
            </Box>

            <Box className={styles.navigationSection}>
              <NavLink to="/book" className={styles.navLink}>
                Books
              </NavLink>
              <NavLink to="/book/new" className={styles.navLink}>
                New Book
              </NavLink>
            </Box>

            <Box className={styles.accountSection}>
              <Box className={styles.desktopMenu}>
                {!user ? (
                  <>
                    <NavLink to="/auth/signin" className={styles.navLink}>
                      Sign In
                    </NavLink>
                    <NavLink to="/auth/signup" className={styles.navLink}>
                      Sign Up
                    </NavLink>
                    <Typography className={styles.separator}>|</Typography>
                  </>
                ) : null}
                <Typography className={styles.userName}>{user ?? 'Guest'}</Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="default"
                >
                  <AccountCircle />
                </IconButton>
              </Box>

              <Box className={styles.mobileMenu}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="primary-search-account-menu-mobile"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="default"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        id="primary-search-account-menu"
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        {user && <MenuItem onClick={submitHandler}>Sign Out</MenuItem>}
      </Menu>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        id="primary-search-account-menu-mobile"
        keepMounted
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography>Profile</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
