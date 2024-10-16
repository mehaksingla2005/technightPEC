import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "#3f51b5",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">© 2024 PDF Chatbot. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
