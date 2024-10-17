import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Logo = () => {
    return (
        <div style={{ display: "flex", margin: "auto", alignItems: "center", gap: "15px" }}>
            <Link to="/">
                
                <Typography
                    sx={{
                        display: { md: "block", small: "none", xs: "none" },
                        mr: "auto",
                        fontWeight: "800",
                        textShadow: "2px 2px 20px #000",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>PDF Reader</span>
                </Typography>
            </Link>
        </div>
    );
};

export default Logo;
