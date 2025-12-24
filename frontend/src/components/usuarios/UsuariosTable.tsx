import type { Usuario } from '../../services/usuariosService';

interface UsuariosTableProps {
    items: Usuario[];
    onEdit: (item: Usuario) => void;
    onDelete: (id: number) => void;
    loading?: boolean;
}

export default function UsuariosTable({
    items,
    onEdit,
    onDelete,
    loading = false
}: UsuariosTableProps) {

    // Función para renderizar los roles del usuario
    const renderRoles = (usuario: Usuario) => {
        if (!usuario.tb_rol || usuario.tb_rol.length === 0) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Sin roles asignados
                </span>
            );
        }

        return (
            <div className="flex flex-wrap gap-1">
                {/* {usuario.tb_rol.map((rol, index) => ( */}
                {usuario.tb_rol.map((rol) => (
                    <span
                        key={rol.id_rol}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        title={rol.descripcion}
                    >
                        {rol.nombre}
                    </span>
                ))}
            </div>
        );
    };

    // Función para renderizar el estado
    const renderEstado = (activo: boolean) => {
        return activo ? (
            <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1 mr-2">
                    <i className="ri-checkbox-circle-line text-green-600 text-xs"></i>
                </div>
                <span className="text-sm font-medium text-green-700">Activo</span>
            </div>
        ) : (
            <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-1 mr-2">
                    <i className="ri-close-circle-line text-red-600 text-xs"></i>
                </div>
                <span className="text-sm font-medium text-red-700">Inactivo</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <i className="ri-loader-4-line animate-spin text-2xl text-blue-600 mb-2"></i>
                <p className="text-gray-600">Actualizando datos...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Roles
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha Creación
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    <i className="ri-inbox-line text-3xl mb-2 block"></i>
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            items.map((usuario) => (
                                <tr key={usuario.id_usuario} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="bg-blue-50 rounded-lg p-2 mr-3">
                                                <i className="ri-user-line text-blue-500"></i>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {usuario.nombre} {usuario.apellidos}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {usuario.id_usuario}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{usuario.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {renderRoles(usuario)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {renderEstado(usuario.activo)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(usuario.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(usuario.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => onEdit(usuario)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Editar"
                                            >
                                                <i className="ri-edit-line"></i>
                                            </button>
                                            <button
                                                onClick={() => onDelete(usuario.id_usuario)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Eliminar"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}