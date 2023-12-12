import React from 'react';
import { Box } from '@/lib/mui';


const Title = ({ children, size, color, className }) => {

    const sx = {
        color,
        fontSize: size
    }
    return (
        <Box sx={sx} className={className}>
            <h1>{children}</h1>
        </Box>
    );
}

export default Title;