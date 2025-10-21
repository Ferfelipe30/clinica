export interface Usuario {
    id: number;
    id_usuarios: number;
    nombre: string;
    password: string;
    email: string;
    rol: 'paciente' | 'medico' | 'administrador';
    fecha_creacion: string;
    fecha_actualizacion: string;
}