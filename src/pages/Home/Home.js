import React from 'react';
//import { useNavigate } from "react-router-dom";
import { Title } from '../../components';
import { Box } from '@mui/material';

export default function Home() {
    //const navigate = useNavigate();
    //css
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        mt: 2
    }

    return (

        <Box sx={{
            centrer
        }}>
            <Title>Home</Title>
        </Box>

    );
}