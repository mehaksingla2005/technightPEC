import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomizedInput from '../components/shared/CustomizedInput';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flexDirection="column" flex={1} position={"relative"}>
      <Box padding={4} mt={8} display={"flex"} justifyContent="center" position={"absolute"} left={"0"}>
        <img src="robo.webp" alt="robot" style={{ width: "450px", height: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignContent={"center"}
        padding={2}
        mt={16}
        ml={"auto"}
      >
        <form
          onSubmit={handleSubmit}
          style={{ margin: "auto", padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border: "none" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomizedInput type="email" label="Email" name="email" />
            <CustomizedInput type="password" name="password" label="Password" />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
