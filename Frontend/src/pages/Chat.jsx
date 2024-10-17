import React, { useState } from 'react';
import { Box, TextField, Typography, Paper, Drawer, Button, AppBar, Toolbar, IconButton } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [inputValue, setInputValue] = useState(''); // Store input value
  const [drawerOpen, setDrawerOpen] = useState(false); // Control drawer open/close

  const handleSendMessage = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]); // Add user message
      setInputValue(''); // Clear input field
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer open/close
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '94vh', bgcolor: '#121212' }}>
      
      {/* Chat Header */}
      <AppBar 
        position="static" 
        sx={{ bgcolor: '#1f1f1f', padding: '10px 20px', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo and "SmartDoc" Text */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="logo.jpeg" alt="Open AI" width="30" height="30" />
            <Typography variant="h6" sx={{ color: '#ffffff', ml: 2 }}>
              SmartDoc
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Chat History Toggle Button */}
        <Button
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            bgcolor: '#2c2c2c',
            color: 'white',
            zIndex: 1000,
            '&:hover': {
              bgcolor: '#3a3a3a',
            },
          }}
        >
          <img src="hamburger.png" alt="Hamburger Icon" style={{ width: "40px", height: "40px", borderRadius: "10px" }} />
        </Button>

        {/* Chat History Area */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box
            sx={{
              width: 250,
              bgcolor: '#2c2c2c', // Dark gray background for history
              height: '100%',
              p: 2,
              position: 'relative',
            }}
          >
            {/* Close Icon inside Drawer */}
            <IconButton 
              onClick={toggleDrawer} 
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white'
              }}
            >
              <img src="close.png" alt="Close Icon" style={{ width: "30px", height: "30px" ,borderRadius:"20px"}} />
            </IconButton>

            <Typography variant="h6" color="white">Chat History</Typography>
            {messages.map((msg, index) => (
              <Paper
                key={index}
                sx={{
                  bgcolor: '#3a3a3a',
                  color: 'white',
                  padding: '10px 15px',
                  margin: '10px 0',
                  borderRadius: '8px',
                }}
              >
                {msg.text}
              </Paper>
            ))}
          </Box>
        </Drawer>

        {/* Chat Area */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#181818', // Dark background for chat area
            p: 2,
            overflowY: 'auto',
            borderRadius: '8px',
            margin: '10px',
          }}
        >
          {messages.map((msg, index) => (
            <Box key={index} sx={{ mb: 2, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <Paper
                sx={{
                  display: 'inline-block',
                  bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                  color: msg.sender === 'user' ? 'white' : 'black',
                  padding: '10px 15px',
                  borderRadius: '16px',
                }}
              >
                {msg.text}
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Chat Input Area */}
      <Box sx={{ display: 'flex', p: 2, bgcolor: '#1f1f1f' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSendMessage} // Listen for Enter key press
          sx={{ bgcolor: '#181810', borderRadius: 2 }}
          InputProps={{
            style: { color: 'white' }, // Text color
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat;
