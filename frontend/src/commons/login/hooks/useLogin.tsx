import {useState} from 'react';
import type {ApiResponse} from '../../../types/types';
import type {Login} from '../types/types';
import {loginUser} from '../services/services';

export const useLogin = () => {
    const [login, setLogin] = useState<Login[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const Login = async (credentials: {username: string; password: string}) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Login> = await loginUser(credentials);
            if (response.success) {
                setLogin([response.data]);
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

    return {
        login,
        loading,
        error,
        refresh: Login
    };
}