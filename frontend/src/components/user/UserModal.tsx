import React, { useState, useEffect } from 'react';
import type { User, Rol } from '../../types/auth';
import { UserForm } from './UserForm';

interface Props {
  show: boolean
  editingUser: any | null
  roles: Rol[]
  onClose: () => void
  onSave: (data: any) => void
}

export default function UserModal({ show, editingUser, roles, onClose, onSave }: Props) {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [activo, setActivo] = useState(true)
  const [selectedRoles, setSelectedRoles] = useState<number[]>([])
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (editingUser) {
      setEmail(editingUser.email || '')
      setNombre(editingUser.nombre || '')
      setApellidos(editingUser.apellidos || editingUser.apellido || '')
      setActivo(editingUser.activo !== false)
      setSelectedRoles((editingUser.tb_rol ?? editingUser.Rols ?? []).map((r: any) => r.id_rol ?? r.id))
    } else {
      setEmail(''); setNombre(''); setApellidos(''); setActivo(true); setSelectedRoles([]); setPassword('')
    }
  }, [editingUser, show])

  if (!show) return null

  const submit = () => {
    const payload: any = { email, nombre, apellido: apellidos, activo, roles: selectedRoles }
    if (!editingUser && password) payload.password = password
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
        <div className="space-y-2">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border px-2 py-1" />
          {!editingUser && <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border px-2 py-1" />}
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="w-full border px-2 py-1" />
          <input value={apellidos} onChange={e => setApellidos(e.target.value)} placeholder="Apellidos" className="w-full border px-2 py-1" />
          <div>
            <label className="block mb-1">Roles</label>
            <select multiple value={selectedRoles.map(String)} onChange={e => {
              const opts = Array.from(e.target.selectedOptions).map(o => Number(o.value))
              setSelectedRoles(opts)
            }} className="w-full border px-2 py-1 h-28">
              {roles.map(r => <option key={r.id} value={(r as any).id_rol ?? r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} /> <span>Activo</span>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancelar</button>
          <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  )
}



interface UserModalProps {
  show: boolean;
  editingUser: User | null;
  roles: Rol[];
  onClose: () => void;
  onSave: (data: any) => void;
  loading?: boolean;
}

// export const UserModal: React.FC<UserModalProps> = ({
//   show,
//   editingUser,
//   roles,
//   onClose,
//   onSave,
//   loading = false
// }) => {
//   if (!show) return null;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">
//               {editingUser ? 'Editar User' : 'Nuevo User'}
//             </h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <UserForm
//             usuario={editingUser}
//             roles={roles}
//             onSubmit={onSave}
//             onCancel={onClose}
//             loading={loading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };