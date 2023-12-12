"use client"
import React from 'react';
import { CustomizedButtons, Title } from '$/Components';
import { Box } from '@/lib/mui';
import { useAppContext } from '$/AppContext';
import { useRouter } from 'next/navigation';
import withAuth from '$/withAuth';

const Frontpage = () => {
    const { user } = useAppContext();

    //til at navigere på siden
    const router = useRouter();
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
                <CustomizedButtons onClick={() => router.push('./createuser')}>new user</CustomizedButtons>
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
//tjekker om brugeren er logget ind
export default withAuth(Frontpage);