import Header from "./components/Header"; // Ensure Header.jsx exists
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home'; 
import Login from './pages/login'; 
import Signup from './pages/Signup'; 
import Chat from './pages/Chat'; 
import NotFound from './pages/NotFound'; 

export function App() {
  

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
}