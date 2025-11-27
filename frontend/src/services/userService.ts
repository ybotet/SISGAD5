import api from './api'

export const userService = {
    getUsers: async (page = 1, limit = 10, search = '') => {
        const resp = await api.get('/usuarios', { params: { page, limit, search } })
        return {
            data: resp.data.data,
            pagination: resp.data.pagination
        }
    },

    getRoles: async () => {
        const resp = await api.get('/roles')
        return resp.data.data
    },

    createUser: async (payload: any) => {
        const resp = await api.post('/usuarios', payload)
        return resp.data
    },

    updateUser: async (id: number, payload: any) => {
        const resp = await api.put(`/usuarios/${id}`, payload)
        return resp.data
    },

    deleteUser: async (id: number) => {
        const resp = await api.delete(`/usuarios/${id}`)
        return resp.data
    }
}

export default userService
