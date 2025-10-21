import api from '../../../api/axios';
import type { Usuario } from '../types/types';
import type { ApiResponse } from '../../../types/types';

export const getUsuarios = async (): Promise<ApiResponse<Usuario[]>> => {
    try {
        const response = await api.get<ApiResponse<Usuario[]>>('/usuarios/');
        return response.data;
    } catch (error: any) {
        throw {
            data: [],
            error: error.response?.data?.message || 'Error al obtener usuarios',
            success: false,
        };
    }
};

export const getUsuarioById = async (id: number): Promise<ApiResponse<Usuario>> => {
    try {
        const response = await api.get<ApiResponse<Usuario>>(`/usuarios/${id}`);
        return response.data;
    } catch (error: any) {
        throw {
            data: {} as Usuario,
            detail: error.response?.data?.message || 'Error al obtener usuario',
            success: false,
        };
    }
};

export const createUsuario = async (usuario: Omit<Usuario, 'id'>): Promise<ApiResponse<Usuario>> => {
    try {
        const response = await api.post<ApiResponse<Usuario>>('/usuarios/', usuario);
        return response.data;
    } catch (error: any) {
        throw {
            data: {} as Usuario,
            detail: error.response?.data?.detail || 'Error al crear usuario',
            success: false,
        };
    }
};

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<ApiResponse<Usuario>> => {
    try {
        const response = await api.put<ApiResponse<Usuario>>(`/usuarios/${id}`, usuario);
        return response.data;
    } catch (error: any) {
        throw {
            data: {} as Usuario,
            detail: error.response?.data?.detail || 'Error al actualizar usuario',
            success: false,
        };
    }
};

export const deleteUsuario = async (id: number): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete<ApiResponse<null>>(`/usuarios/${id}`);
        return response.data;
    } catch (error: any) {
        throw {
            data: null,
            detail: error.response?.data?.detail || 'Error al eliminar usuario',
            success: false,
        };
    }
};

export const loginUsuario = async (username: string, password: string): Promise<ApiResponse<Usuario>> => {
    try {
        const response = await api.post<ApiResponse<Usuario>>('/login', { username, password });
        return response.data;
    } catch (error: any) {
        throw {
            data: {} as Usuario,
            detail: error.response?.data?.detail || 'Error al iniciar sesión',
            success: false,
        };
    }
};

export const cambiarPassword = async (id: number, password: {old_password: string; new_password: string}): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post<ApiResponse<null>>(`/usuarios/${id}/cambiar-password`, password);
        return response.data;
    } catch (error: any) {
        throw {
            data: null,
            detail: error.response?.data?.detail || 'Error al cambiar contraseña',
            success: false,
        };
    }
};