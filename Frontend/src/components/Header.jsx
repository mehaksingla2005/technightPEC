import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/authcontext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (  // Note the change from isLoggedin to isLoggedIn
            <>
              <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" TextColor="black" />
              <NavigationLink bg="#51538f" to="/" text="Logout" TextColor="white" onclick={auth.logout} />
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
