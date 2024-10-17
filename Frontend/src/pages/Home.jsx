import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Directly navigate to /chat2
  const handleNavigate = () => {
    navigate("/chat2");
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      flex={1}
      position="relative"
      sx={{ backgroundColor: "#121212" }}  // Dark background color
    >
      {/* Main Content */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          mt: { xs: 10, md: 16 },
          textAlign: "center",
          color: "#e0e0e0", // Text color adjusted for dark theme
        }}
      >
        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ marginBottom: "30px" }}
        >
          <Typography variant="h5" fontStyle="italic" fontWeight={400} color="#bdbdbd">
            "Unleash the power of your documents."
          </Typography>
        </motion.div>

        {/* Try Our PDF Reader Section */}
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight={600} color="#e0e0e0">
              Try Our PDF Reader
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Typography variant="body1" mt={2} mb={4} color="#9e9e9e">
              Upload your PDF, ask questions, and receive insightful answers.
            </Typography>
          </motion.div>

          {/* Button for navigating to /chat2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                marginTop: "20px",
                textAlign: "center",
                boxShadow: "none",
                borderRadius: "12px",
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: "#333",  // Darker box background
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={600} mt={2} color="#e0e0e0">
                Upload Your PDF
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#8e24aa",
                  textTransform: "none",
                  width: "350px", // Adjust the width as needed
                  "&:hover": {
                    backgroundColor: "#6a1b9a",
                  },
                }}
                onClick={handleNavigate} // Navigate to /chat2 on click
              >
                Try PDF Reader
              </Button>
            </Paper>
          </motion.div>
        </Box>

        {/* Additional Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Typography variant="h6" fontStyle="italic" fontWeight={400} color="#bdbdbd" mt={6}>
            "Discover knowledge hidden in your PDFs."
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
