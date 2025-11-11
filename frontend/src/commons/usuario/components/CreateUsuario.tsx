import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Checkbox,
    FormControlLabel,
    Alert,
} from '@mui/material';
import type { Usuario } from '../types/types';
import { createUsuario, updateUsuario } from '../services/services';

interface UsuarioModalProps {
    open: boolean;
    initialData?: Usuario;
    onClose: () => void;
    onSuccess: () => void;
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ open, initialData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<{
        nombre: string;
        email: string;
        password: string;
        rol: 'paciente' | 'medico' | 'administrador' | '';
        id_usuario?: number;
        fecha_creacion: string;
        fecha_actualizacion: string;
    }>({
        nombre: '',
        email: '',
        password: '',
        rol: '',
        id_usuario: undefined,
        fecha_creacion: '',
        fecha_actualizacion: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id_usuario: initialData.id,
                nombre: initialData.nombre,
                email: initialData.email,
                password: '',
                rol: initialData.rol ?? '',
                fecha_creacion: initialData.fecha_creacion,
                fecha_actualizacion: initialData.fecha_actualizacion,
            });
        }else {
            setFormData({
                nombre: '',
                email: '',
                password: '',
                rol: '',
                id_usuario: undefined,
                fecha_creacion: '',
                fecha_actualizacion: '',
            });
        }
    }, [initialData, open]);
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (name === 'rol' ? (checked ? ('administrador' as Usuario['rol']) : '') : (checked as any))
                : (name === 'rol' ? (value as Usuario['rol']) : value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload: Partial<Omit<Usuario, 'id'>> = {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                rol: (formData.rol || 'paciente') as Usuario['rol'],
                fecha_creacion: formData.fecha_creacion,
                fecha_actualizacion: formData.fecha_actualizacion,
            };
            if (formData.id_usuario !== undefined) {
                (payload as any).id_usuarios = formData.id_usuario;
            }

            if (initialData && formData.id_usuario) {
                const updated = await updateUsuario(formData.id_usuario, payload as Omit<Usuario, 'id'>);
                const nombre = (updated as any).data?.nombre ?? (updated as any).nombre ?? '';
                setSuccess(`Usuario ${nombre} actualizado exitosamente.`);
            } else {
                const created = await createUsuario(payload as Omit<Usuario, 'id'>);
                const nombre = (created as any).data?.nombre ?? (created as any).nombre ?? '';
                setSuccess(`Usuario ${nombre} creado exitosamente.`);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.detail){
                setError(err.response.data.detail);
            } else {
                setError('Error al procesar la solicitud.');
            };
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity='success' sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField 
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField 
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rol"
                                checked={formData.rol === 'administrador'}
                                onChange={handleChange}
                            />
                        }
                        label="Activo"
                        sx={{ mb: 2 }}
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            {loading
                                ? initialData ? 'Actualizando...': 'Creando...'
                                : initialData ? 'Actualizar' : 'Crear'
                            }
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UsuarioModal;