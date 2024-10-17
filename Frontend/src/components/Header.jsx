import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/authcontext';
import NavigationLink from './shared/NavigationLink';
import { useLocation } from 'react-router-dom'; // Import useLocation

const Header = () => {
  const auth = useAuth();
  const location = useLocation(); // Get current route

  // Conditionally hide header on the chat page
  if (location.pathname === '/chat') {
    return null; // Don't render Header on chat page
  }

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flexGrow: 1 }}> {/* Logo shifted to the left */}
          <Logo />
        </div>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" TextColor="black" />
              <NavigationLink bg="#51538f" to="/" text="Logout" TextColor="white" onClick={auth.logout} />
            </>
          ) : (
            <>
              <NavigationLink bg="#00fffc" to="/login" text="Login" TextColor="black" />
              <NavigationLink bg="#51538f" to="/signup" text="Signup" TextColor="white" />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
