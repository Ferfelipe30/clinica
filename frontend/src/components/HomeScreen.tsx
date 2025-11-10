import React from 'react';
import { AppBar, Box, Button, Typography, Container, Card, CardContent, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import logo from '../assets/logo.webp';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Bienvenido a la Clínica Salud y Vida
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                        Tu salud es nuestra prioridad. Atención médica de calidad al alcance de todos.
                    </Typography>
                    <Box
                        component="img"
                        src='https://www.actualidadiphone.com/wp-content/uploads/2017/05/aplicaciones-gratis.png' 
                        alt='Clínica Salud y Vida'
                        sx={{ maxWidth: '100%', maxHeight: '300px', height: 'auto', borderRadius: 2, mb: 3, boxShadow: 3 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleLogin}
                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                    >
                        Comenzar Ahora
                    </Button>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                        Nuestros Servicios
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        <Card sx={{ flex: '1 1 200px', maxWidth: '250px', textAlign: 'center', p: 1.5, boxShadow: 3, '&:hover': { transform: 'translateY(-5px)', transition: 'transform 0.3s' } }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <CalendarMonthIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Citas Médicas
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Agenda tus consultas de manera rápida y sencilla
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: '1 1 200px', maxWidth: '250px', textAlign: 'center', p: 1.5, boxShadow: 3, '&:hover': { transform: 'translateY(-5px)', transition: 'transform 0.3s' } }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <PeopleIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Gestión de Pacientes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Administra la información de pacientes de forma segura
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: '1 1 200px', maxWidth: '250px', textAlign: 'center', p: 1.5, boxShadow: 3, '&:hover': { transform: 'translateY(-5px)', transition: 'transform 0.3s' } }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <MedicalServicesIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Historial Médico
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Accede al historial completo de tus pacientes
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: '1 1 200px', maxWidth: '250px', textAlign: 'center', p: 1.5, boxShadow: 3, '&:hover': { transform: 'translateY(-5px)', transition: 'transform 0.3s' } }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <LocalHospitalIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Atención 24/7
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Soporte y asistencia disponible en todo momento
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Call to Action */}
                <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        ¿Listo para comenzar?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Únete a nuestra plataforma y mejora la gestión de tu clínica
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleLogin}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 3, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: '1 1 150px' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                                Clínica Salud y Vida
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Comprometidos con tu bienestar desde 2025
                            </Typography>
                        </Box>
                        <Box sx={{ flex: '1 1 150px' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                                Contacto
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Email: info@saludyvida.com
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Tel: +57 123 456 7890
                            </Typography>
                        </Box>
                        <Box sx={{ flex: '1 1 150px' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                                Horario
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Lun - Vie: 8:00 AM - 6:00 PM
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Sáb: 9:00 AM - 2:00 PM
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            © 2025 Clínica Salud y Vida. Todos los derechos reservados.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HomeScreen;