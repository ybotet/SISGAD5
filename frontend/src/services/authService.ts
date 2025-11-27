import api from './api'

interface LoginCredentials {
    email: string
    password: string
}

export const authService = {
    login: (credentials: LoginCredentials) => {
        return api.post('/auth/login', credentials)
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // redirect to login page
        window.location.href = '/login'
    },

    getToken: () => {
        return localStorage.getItem('token')
    },

    setAuthData: (token: string, user: any) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    },

    getUser: () => {
        const raw = localStorage.getItem('user')
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch (e) {
            return null
        }
    },

    getPerfil: async () => {
        const resp = await api.get('/auth/perfil')
        console.log(resp.data.data)
        // backend responde { success: true, data: usuario }
        return resp.data.data
    }
}

export default authService
