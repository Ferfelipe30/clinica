import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useUsuarios } from '../hooks/useUsuarios';
import ListUsuario from '../components/ListUsuario';
import UsuarioModal from '../components/CreateUsuario';
import type { Usuario } from '../types/types';

const UsuarioScreens: React.FC = () => {
    const { usuarios, loading, error, refresh } = useUsuarios();
    const [modalOpen, setModalOpen] = useState(false);
    const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null> (null);

    const handleCreate = () => {
        setUsuarioToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (usuario: Usuario) => {
        setUsuarioToEdit(usuario);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSuccess = () => {
        refresh();
    };

    return (
        <Box>
            <ListUsuario usuarios={usuarios} loading={loading} error={error} onEdit={handleEdit} />
            <UsuarioModal open={modalOpen} initialData={usuarioToEdit || undefined} onClose={handleCloseModal} onSuccess={handleSuccess} />
            <Box>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Usuario
                </Button>
            </Box>
        </Box>
        
    );
};

export default UsuarioScreens;