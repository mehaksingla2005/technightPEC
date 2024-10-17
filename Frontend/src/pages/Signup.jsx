import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log input values before sending them
      console.log('Submitting:', { username, email, password });

      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        email,
        password,
      });

      console.log('Response:', response.data);
      
      // Store the token in localStorage if present
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
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
        <form onSubmit={handleSubmit} style={{ margin: "auto", padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border: "none" }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Sign Up
            </Typography>
            <TextField 
              type="text" 
              label="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              fullWidth 
              required 
              margin="normal"
            />
            <TextField 
              type="email" 
              label="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth 
              required 
              margin="normal"
            />
            <TextField 
              type="password" 
              label="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              fullWidth 
              required 
              margin="normal"
            />
            <Box mt={2}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </button>
            </Box>
          </Box>
        </form>
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="body1">
          Already have an account? 
          <button
            onClick={() => navigate('/login')}
            style={{ marginLeft: "4px", color: "#1976d2", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
          >
            Login
          </button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
