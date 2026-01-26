import axios from 'axios';
import { ApiError, ForbiddenError, NotFoundError, UnauthorizedError } from '../errors/ApiError';

// La URL de tu backend - puedes usar variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configuración base de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para requests (opcional, pero útil)
api.interceptors.request.use(
    (config) => {
        // Puedes agregar tokens de autenticación aquí si los usas
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// // Interceptor para responses (opcional, pero útil)
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Manejar errores globales
//         if (error.response?.status === 401) {
//             // Redirigir a login si no está autorizado
//             localStorage.removeItem('token');
//             // Usar BASE_URL de Vite para respetar el `base` en producción
//             const base = import.meta.env.BASE_URL || '/';
//             // redirigir a /auth/login para mantener consistencia
//             window.location.href = base + 'auth/login';
//         }
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 403:
                    // Lanzar error específico para 403
                    throw new ForbiddenError(data?.message || 'Acceso denegado');
                case 401:
                    throw new UnauthorizedError('No autorizado');
                case 404:
                    throw new NotFoundError('Recurso no encontrado');
                default:
                    throw new ApiError(
                        data?.message || 'Error del servidor',
                        status
                    );
            }
        }
        throw error;
    }
);

export default api;