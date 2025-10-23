import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TaskIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeScreen from "./HomeScreen";
import UsuarioScreens from "../commons/usuario/screens/usuarioScreens";

const drawerWidth = 240;

const AppLayout: React.FC = () => {
    const [openUsuarios, setOpenUsuarios] = React.useState(false);

    const handleUsuariosClick = () => {
        setOpenUsuarios(!openUsuarios);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer 
                variant="permanent"
                sx={{ 
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ padding: 2 }}>
                        Menu
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/usuarios">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Usuarios" />
                        </ListItemButton>
                        <ListItemButton onClick={handleUsuariosClick}>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gestión" />
                            {openUsuarios ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuarios">
                                    <ListItemText primary="Usuarios" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/usuarios" element={<UsuarioScreens />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AppLayout;