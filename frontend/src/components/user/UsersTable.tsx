// import React from 'react'
import type { User } from '../../types/auth'

interface Props {
    usuarios: User[]
    onEdit: (u: User) => void
    onDelete: (id: number) => void
    loading?: boolean
}

export default function UsersTable({ usuarios, onEdit, onDelete, loading }: Props) {
    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left">Nombre</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Roles</th>
                        <th className="px-4 py-2 text-left">Activo</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={5} className="p-4 text-center">Cargando...</td></tr>
                    ) : usuarios.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center">No hay usuarios</td></tr>
                    ) : (
                        usuarios.map(u => (
                            <tr key={(u as any).id_usuario} className="border-t">
                                <td className="px-4 py-2">{u.nombre} {(u as any).apellidos ?? ''}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">{((u as any).tb_rol ?? (u as any).Rols ?? []).map((r: any) => r.nombre).join(', ')}</td>
                                <td className="px-4 py-2">{(u as any).activo ? 'Sí' : 'No'}</td>
                                <td className="px-4 py-2 text-center">
                                    <button onClick={() => onEdit(u)} className="mr-2 text-blue-600">Editar</button>
                                    <button onClick={() => onDelete((u as any).id_usuario)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
