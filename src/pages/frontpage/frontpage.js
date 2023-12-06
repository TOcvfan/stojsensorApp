import React/*, { useState }*/ from 'react';
import { useNavigate } from "react-router-dom";
import { CustomizedButtons, Title } from '../../components';
import { Box } from '@mui/material';

export default function Frontpage({ user }) {
    //til at navigere på siden
    const navigate = useNavigate();
    //css til forsiden
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }
    //console.log(user)
    //tjekker om brugeren er admin og viser en knap hvis man er admin
    const admin = () => {
        if (user.isAdmin) {
            return (
                <CustomizedButtons onClick={() => navigate('../create')}>new user</CustomizedButtons>
            )
        }
    }
    return (
        <Box sx={{
            centrer
        }}>
            <Title color='blue'>Welcome to your frontpage {user.firstname}</Title>
            <br />
            Units the user has rigths to see
            {admin()}
        </Box>

    );
}