import React, { useState, useEffect } from 'react';
import { userService } from '../../../services/usuariosService';
import type { User, Rol } from '../../../types/auth';
import UsersFilters from '../../../components/usuarios/UsuariosFilters';
import UsersTable from '../../../components/usuarios/UsuariosTable';
import UserModal from '../../../components/usuarios/UsuariosModal';

const UsersPage: React.FC = () => {
  const [usuarios, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await userService.getUsers(page, limit, searchTerm);
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError('Error al cargar los usuarios');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const rolesData = await userService.getRoles();
      setRoles(rolesData);
    } catch (err) {
      console.error('Error loading roles:', err);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    loadUsers(1, pagination.limit);
  };

  const handleEdit = (usuario: User) => {
    setEditingUser(usuario);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      try {
        await userService.deleteUser(id);
        loadUsers(pagination.page, pagination.limit);
      } catch (err: any) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  const handleSave = async (formData: any) => {
    try {
      setError('');
      if (editingUser) {
        await userService.updateUser(editingUser.id_usuario, formData);
      } else {
        await userService.createUser(formData);
      }
      setShowModal(false);
      setEditingUser(null);
      loadUsers(pagination.page, pagination.limit);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el usuario');
    }
  };

  const handlePageChange = (page: number) => {
    loadUsers(page, pagination.limit);
  };

  if (loading && usuarios.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Users</h1>
          <p className="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>+</span>
          <span>Nuevo User</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">⚠️</span>
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onRefresh={() => loadUsers(pagination.page, pagination.limit)}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white text-sm">👥</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-lg font-semibold text-gray-900">{pagination.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white text-sm">👁️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Mostrando</p>
              <p className="text-lg font-semibold text-gray-900">{usuarios.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white text-sm">📄</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Página</p>
              <p className="text-lg font-semibold text-gray-900">{pagination.page} / {pagination.pages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <UsersTable
        usuarios={usuarios}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {usuarios.length} de {pagination.total} usuarios
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Página {pagination.page} de {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <UserModal
        show={showModal}
        editingUser={editingUser}
        roles={roles}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default UsersPage;