import api from '../../../api/axios';
import type { ApiResponse } from '../../../types/types';
import type { Login } from '../types/types';

export const loginUser = async (credentials: { email: string; password: string }): Promise<ApiResponse<Login>> => {
    try {
        const response = await api.post<ApiResponse<Login>>('/login/', credentials);
        return response.data;
    } catch (error: any) {
        throw {
            data: {} as Login,
            detail: error.response?.data?.message || 'Error al iniciar sesión',
            success: false,
        };
    }
};