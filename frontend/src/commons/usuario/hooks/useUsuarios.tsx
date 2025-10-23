import { useState, useEffect } from 'react';
import type { Usuario } from '../types/types';
import type { ApiResponse } from '../../../types/types';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, loginUsuario, cambiarPassword } from '../services/services';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsuarios = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Usuario[]> = await getUsuarios();
            if (response.success) {
                setUsuarios(response.data);
            } else {
                setError(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al obtener usuarios');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsuariosById = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Usuario> = await getUsuarioById(id);
            if (response.success) {
                setUsuario(response.data);
            } else {
                setError(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al obtener usuario');
        } finally {
            setLoading(false);
        }
    };

    const addUsuario = async (newUsuario: Omit<Usuario, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Usuario> = await createUsuario(newUsuario);
            if (response.success) {
                setUsuarios([...usuarios, response.data]);
                return response.data;
            } else {
                setError(response.detail);
                throw new Error(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al agregar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const modifyUsuario = async (id: number, usuarioActualizado: Partial<Usuario>) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Usuario> = await updateUsuario(id, usuarioActualizado);
            if (response.success) {
                setUsuarios(usuarios.map(u => (u as any).id === id ? response.data : u));
                return response.data;
            } else {
                setError(response.detail);
                throw new Error(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al modificar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeUsuario = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<null> = await deleteUsuario(id);
            if (response.success) {
                setUsuarios(usuarios.filter(u => u.id !== id));
            } else {
                setError(response.detail);
                throw new Error(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al eliminar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: { username: string; password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUsuario(credentials.username, credentials.password);
            if (response.success) {
                return response.data;
            } else {
                setError(response.detail);
                throw new Error(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al iniciar sesión');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (id: number, passwords: { old_password: string; new_password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<null> = await cambiarPassword(id, passwords);
            if (response.success) {
                return true;
            } else {
                setError(response.detail);
                throw new Error(response.detail);
            }
        } catch (err: any) {
            setError(err.detail || 'Error al cambiar contraseña');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return {
        usuarios,
        usuario,
        loading,
        error,
        refresh: fetchUsuarios,
        fetchUsuariosById,
        addUsuario,
        modifyUsuario,
        removeUsuario,
        login,
        changePassword,
    };
};