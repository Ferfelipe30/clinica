import React from 'react';
import { Box, Typography } from '@mui/material';

const HomeScreen: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Bienvenido a la Clínica
            </Typography>
            <Box 
                component="img" 
                src='https://www.actualidadiphone.com/wp-content/uploads/2017/05/aplicaciones-gratis.png' 
                alt='Aplicaciones Gratis' 
                sx={{ maxWidth: '100%', height: 'auto' }}
            />
        </Box>
    );
};

export default HomeScreen;