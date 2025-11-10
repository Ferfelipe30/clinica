import React from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Collapse, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import HomeScreen from "./HomeScreen";
import UsuarioScreens from "../commons/usuario/screens/usuarioScreens";
import logo from '../assets/logo.webp';

const AppLayout: React.FC = () => {
    const navigate = useNavigate();
    const [anchorElMobile, setAnchorElMobile] = React.useState<null | HTMLElement>(null);
    const [anchorElGestion, setAnchorElGestion] = React.useState<null | HTMLElement>(null);
    
    const openMobileMenu = Boolean(anchorElMobile);
    const openGestionMenu = Boolean(anchorElGestion);

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMobile(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setAnchorElMobile(null);
    };

    const handleGestionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElGestion(event.currentTarget);
    };

    const handleGestionMenuClose = () => {
        setAnchorElGestion(null);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* AppBar horizontal */}
            <AppBar position="static">
                <Toolbar>
                    {/* Logo */}
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo"
                        sx={{ height: 40, mr: 2, borderRadius: 1 }}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 3 }}>
                        Clínica Salud y Vida
                    </Typography>

                    {/* Menú Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 1 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            startIcon={<HomeIcon />}
                        >
                            Inicio
                        </Button>
                        
                        <Button
                            color="inherit"
                            onClick={handleGestionMenuOpen}
                            endIcon={openGestionMenu ? <ExpandLess /> : <ExpandMore />}
                        >
                            Gestión
                        </Button>
                        
                        <Menu
                            anchorEl={anchorElGestion}
                            open={openGestionMenu}
                            onClose={handleGestionMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <MenuItem component={Link} to="/usuarios" onClick={handleGestionMenuClose}>
                                <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                                Usuarios
                            </MenuItem>
                            <MenuItem component={Link} to="/pacientes" onClick={handleGestionMenuClose}>
                                <AssignmentIndIcon sx={{ mr: 1 }} fontSize="small" />
                                Pacientes
                            </MenuItem>
                            <MenuItem component={Link} to="/doctores" onClick={handleGestionMenuClose}>
                                <LocalHospitalIcon sx={{ mr: 1 }} fontSize="small" />
                                Doctores
                            </MenuItem>
                            <MenuItem component={Link} to="/citas" onClick={handleGestionMenuClose}>
                                <EventIcon sx={{ mr: 1 }} fontSize="small" />
                                Citas
                            </MenuItem>
                            <MenuItem component={Link} to="/historial" onClick={handleGestionMenuClose}>
                                <HistoryIcon sx={{ mr: 1 }} fontSize="small" />
                                Historial Clínico
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Botón de inicio de sesión */}
                    <Button
                        color="inherit"
                        onClick={handleLogin}
                        startIcon={<LoginIcon />}
                        sx={{ ml: 2 }}
                    >
                        Iniciar Sesión
                    </Button>

                    {/* Menú Mobile (hamburguesa) */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
                        <IconButton
                            color="inherit"
                            onClick={handleMobileMenuOpen}
                            edge="end"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElMobile}
                            open={openMobileMenu}
                            onClose={handleMobileMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
                                <HomeIcon sx={{ mr: 1 }} fontSize="small" />
                                Inicio
                            </MenuItem>
                            <MenuItem component={Link} to="/usuarios" onClick={handleMobileMenuClose}>
                                <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                                Usuarios
                            </MenuItem>
                            <MenuItem component={Link} to="/pacientes" onClick={handleMobileMenuClose}>
                                <AssignmentIndIcon sx={{ mr: 1 }} fontSize="small" />
                                Pacientes
                            </MenuItem>
                            <MenuItem component={Link} to="/doctores" onClick={handleMobileMenuClose}>
                                <LocalHospitalIcon sx={{ mr: 1 }} fontSize="small" />
                                Doctores
                            </MenuItem>
                            <MenuItem component={Link} to="/citas" onClick={handleMobileMenuClose}>
                                <EventIcon sx={{ mr: 1 }} fontSize="small" />
                                Citas
                            </MenuItem>
                            <MenuItem component={Link} to="/historial" onClick={handleMobileMenuClose}>
                                <HistoryIcon sx={{ mr: 1 }} fontSize="small" />
                                Historial Clínico
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Contenido principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    bgcolor: 'background.default',
                }}
            >
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/usuarios" element={<UsuarioScreens />} />
                    <Route path="/citas" element={<Box sx={{ p: 3 }}><Typography variant="h5">Citas (pendiente)</Typography></Box>} />
                    <Route path="/historial" element={<Box sx={{ p: 3 }}><Typography variant="h5">Historial Clínico (pendiente)</Typography></Box>} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AppLayout;