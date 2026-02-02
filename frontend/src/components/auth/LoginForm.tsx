import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await login(email, password)
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Error en inicio de sesión')
        }
    }

    return (
        <form onSubmit={onSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl mb-4">Iniciar sesión</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="mb-3">
                <label className="block mb-1">Correo</label>
                <input className="w-full border px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="block mb-1">Contraseña</label>
                <input type="password" className="w-full border px-2 py-1" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Entrar</button>
        </form>
    )
}
