import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import LoginModal from '../components/login';

const LoginScreen: React.FC = () => {
    const handleSuccess = (user?: any) => {
        // Redirigir al home o dashboard después del login exitoso
        if (user) {
            try {
                localStorage.setItem('clinica_user', JSON.stringify(user));
            } catch {}
        }
        window.location.href = '/';
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Clínica
                    </Typography>
                    <LoginModal
                        open={true}
                        onClose={() => {}}
                        onSuccess={handleSuccess}
                    />
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginScreen;