import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { Usuario } from '../types/types';

interface ListUsuarioProps {
    usuarios: Usuario[];
    loading: boolean;
    error: string | null;
    onEdit: (usuario: Usuario) => void;
}

const ListUsuario: React.FC<ListUsuarioProps> = ({ usuarios, loading, error, onEdit}) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant='h4' component="h2" gutterBottom>
                Lista de Usuarios
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>    
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id_usuarios}>
                                <TableCell>{usuario.id_usuarios}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{usuario.rol}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => onEdit(usuario)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListUsuario;