import Header from "./components/Header"; // Ensure Header.jsx exists
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Footer from "./pages/Footer"; 
import Chat from './pages/Chat'; 
 
import NotFound from './pages/NotFound'; 
import { Box } from '@mui/material';

export function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure it takes full height of the viewport
      }}
    >
      <Header />
      <Box sx={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
         
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}
