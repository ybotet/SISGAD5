import { useState, useEffect } from 'react';
import type {
    Usuario,
    CreateUsuarioRequest,
    UpdateUsuarioRequest,
    PaginatedResponse
} from '../services/usuariosService';
import { usuariosService } from '../services/usuariosService';

// Components
import {
    UsuariosHeader,
    UsuariosError,
    UsuariosStats,
    UsuariosFilters,
    UsuariosTable,
    UsuariosPagination,
    UsuariosModal,
    UsuariosConfirmModal
} from '../components/usuarios';

export default function UsuariosPage() {
    // Estados principales
    const [items, setItems] = useState<Usuario[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1,
    });
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Usuario | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [saving, setSaving] = useState(false);

    // Estados para la confirmación de eliminación
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        loadUsuarios();
    }, []);

    // Cargar usuarios cuando cambia el término de búsqueda
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadUsuarios(1, pagination.limit, searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const loadUsuarios = async (page: number = 1, limit: number = 10, search: string = '') => {
        try {
            setLoading(true);
            setError('');

            console.log('📡 Cargando usuarios con parámetros:', { page, limit, search });

            const response: PaginatedResponse<Usuario> = await usuariosService.getUsuarios(
                page,
                limit,
                search
            );

            console.log('✅ Usuarios cargados:', {
                cantidad: response.data.length,
                pagination: response.pagination
            });

            setItems(response.data);
            setPagination(response.pagination);
        } catch (err) {
            const errorMsg = 'Error al cargar los usuarios. Por favor, intente nuevamente.';
            setError(errorMsg);
            console.error('❌ Error loading usuarios:', err);
        } finally {
            setLoading(false);
        }
    };

    // Funciones de paginación
    const goToPage = (page: number) => {
        if (page >= 1 && page <= pagination.pages) {
            console.log('📄 Cambiando a página:', page);
            loadUsuarios(page, pagination.limit, searchTerm);
        }
    };

    const nextPage = () => {
        if (pagination.page < pagination.pages) {
            goToPage(pagination.page + 1);
        }
    };

    const prevPage = () => {
        if (pagination.page > 1) {
            goToPage(pagination.page - 1);
        }
    };

    const handleLimitChange = (newLimit: number) => {
        console.log('📊 Cambiando límite por página a:', newLimit);
        loadUsuarios(1, newLimit, searchTerm);
    };

    // Funciones para eliminar con confirmación modal
    const handleDelete = (id: number) => {
        console.log('🗑️ Solicitando eliminación para ID:', id);
        setItemToDelete(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        console.log('✅ Confirmando eliminación para ID:', itemToDelete);

        try {
            setDeleting(true);
            setError('');

            await usuariosService.deleteUsuario(itemToDelete);
            console.log('🗑️ Eliminación exitosa');

            // Recargar los datos
            await loadUsuarios(pagination.page, pagination.limit, searchTerm);

        } catch (err: any) {
            console.error('❌ Error en eliminación:', err);
            const errorMessage = err?.response?.data?.error || err?.message || 'Error al eliminar el usuario';
            setError(errorMessage);
        } finally {
            setDeleting(false);
            setShowConfirmModal(false);
            setItemToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        console.log('❌ Eliminación cancelada por el usuario');
        setShowConfirmModal(false);
        setItemToDelete(null);
    };

    // Funciones para editar y guardar
    const handleEdit = (item: Usuario) => {
        console.log('✏️ Editando usuario:', item.email);
        setEditingItem(item);
        setShowModal(true);
    };

    const handleSave = async (formData: FormData) => {
        try {
            setSaving(true);
            setError('');

            console.log('💾 Guardando datos del formulario...');

            const roles = formData.getAll('roles').map(role => parseInt(role as string));

            if (editingItem) {
                // Para actualización
                const updateData: UpdateUsuarioRequest = {
                    email: formData.get('email') as string,
                    nombre: formData.get('nombre') as string,
                    apellidos: formData.get('apellidos') as string,
                    activo: formData.get('activo') === 'true',
                    roles: roles.length > 0 ? roles : undefined
                };

                // Solo agregar contraseña si se proporcionó una nueva
                const nuevaPassword = formData.get('password') as string;
                if (nuevaPassword && nuevaPassword.trim() !== '') {
                    updateData.password = nuevaPassword;
                }

                console.log('📤 Datos para actualizar:', updateData);
                await usuariosService.updateUsuario(editingItem.id_usuario, updateData);
            } else {
                // Para creación
                const createData: CreateUsuarioRequest = {
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    nombre: formData.get('nombre') as string,
                    apellidos: formData.get('apellidos') as string,
                    activo: formData.get('activo') === 'true',
                    roles: roles.length > 0 ? roles : undefined
                };

                console.log('📤 Datos para crear:', createData);
                await usuariosService.createUsuario(createData);
            }

            console.log('✅ Operación exitosa, recargando lista...');
            await loadUsuarios(pagination.page, pagination.limit, searchTerm);

            setShowModal(false);
            setEditingItem(null);
        } catch (err: any) {
            console.error('❌ Error saving usuario:', err);
            const errorMessage = err?.response?.data?.error || err?.message ||
                (editingItem ? 'Error al actualizar el usuario' : 'Error al crear el usuario');
            setError(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const handleCloseModal = () => {
        console.log('🔒 Cerrando modal de usuario');
        setShowModal(false);
        setEditingItem(null);
    };

    // Manejar refresco desde filtros
    const handleRefresh = () => {
        console.log('🔄 Refrescando lista de usuarios');
        loadUsuarios(pagination.page, pagination.limit, searchTerm);
    };

    // Loading state inicial
    if (loading && items.length === 0) {
        return (
            <div className="p-6 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-blue-600 mb-4"></i>
                    <p className="text-gray-600 text-lg">Cargando usuarios...</p>
                    <p className="text-gray-400 text-sm mt-2">Por favor espere</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <UsuariosHeader
                title="Gestión de Usuarios"
                description="Administra los usuarios, roles y permisos del sistema"
                onAdd={() => {
                    console.log('➕ Abriendo modal para nuevo usuario');
                    setShowModal(true);
                }}
            />

            {/* Error */}
            <UsuariosError
                error={error}
                onClose={() => {
                    console.log('❌ Cerrando mensaje de error');
                    setError('');
                }}
            />

            {/* Stats */}
            <UsuariosStats
                total={pagination.total}
                showing={items.length}
                page={pagination.page}
                pages={pagination.pages}
                limit={pagination.limit}
            />

            {/* Filters */}
            <UsuariosFilters
                searchTerm={searchTerm}
                onSearchChange={(term) => {
                    console.log('🔍 Buscando:', term);
                    setSearchTerm(term);
                }}
                onRefresh={handleRefresh}
            />

            {/* Table */}
            <UsuariosTable
                items={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading && items.length > 0}
            />

            {/* Pagination */}
            {pagination.pages > 1 && (
                <UsuariosPagination
                    pagination={pagination}
                    onPageChange={goToPage}
                    onLimitChange={handleLimitChange}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            )}

            {/* Modal de Crear/Editar */}
            <UsuariosModal
                show={showModal}
                editingItem={editingItem}
                saving={saving}
                onClose={handleCloseModal}
                onSave={handleSave}
            />

            {/* Modal de Confirmación de Eliminación */}
            <UsuariosConfirmModal
                show={showConfirmModal}
                title="Confirmar Eliminación"
                message="¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                loading={deleting}
            />

            {/* Estado vacío */}
            {!loading && items.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
                    <i className="ri-user-line text-4xl text-gray-400 mb-3"></i>
                    <h3 className="text-lg font-medium text-gray-700">No se encontraron usuarios</h3>
                    <p className="text-gray-500 mt-1 mb-4">
                        {searchTerm
                            ? 'Intenta con otros términos de búsqueda'
                            : 'No hay usuarios registrados en el sistema'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 mx-auto"
                        >
                            <i className="ri-add-line"></i>
                            <span>Crear primer usuario</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}