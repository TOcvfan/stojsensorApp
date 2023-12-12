import React from 'react';
import { Box } from '@/lib/mui';
import { Title } from '$/Components';

export default function About() {

    return (
        <Box>
            <Title>About us</Title>
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexFlow: 'column wrap',
                    gridTemplateColumns: { md: '1fr' },
                    gap: 2,
                }}
            >

            </Box>
        </Box>
    )
}