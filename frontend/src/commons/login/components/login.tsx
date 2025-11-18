import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
} from '@mui/material';
import type { Login } from '../types/types';
import {loginUser} from '../services/services';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    open: boolean;
    initialData?: Login;
    onClose: () => void;
    onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, initialData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                email: initialData.email,
                password: initialData.password,
            });
        } else {
            setFormData({
                email: '',
                password: '',
            });
        }
    }, [initialData, open]);
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });
            if (response.success) {
                const token = (response as any).token ?? (response as any).data?.token;
                if (token) {
                    localStorage.setItem('authToken', token);
                }
                onSuccess();
                if (onClose) onClose();
            } else {
                setError(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Iniciar Sesión</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        label="Contraseña"
                        name="password"
                        fullWidth
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate('/usuarios/crear')} disabled={loading}>crear cuenta</Button>
                <Button onClick={() => {onClose(); navigate('/');}} disabled={loading}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                    {loading
                        ? 'Iniciando...'
                        : 'Iniciar Sesión'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;