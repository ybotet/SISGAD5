import React from 'react'

interface Props {
    searchTerm: string
    onSearchChange: (term: string) => void
    onRefresh: () => void
}

export default function UsersFilters({ searchTerm, onSearchChange, onRefresh }: Props) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <input
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Buscar por nombre, email..."
                    className="border rounded px-3 py-2 w-72"
                />
                <button onClick={() => onSearchChange('')} className="px-3 py-2 border rounded">Limpiar</button>
                <button onClick={onRefresh} className="px-3 py-2 bg-gray-100 border rounded">Refrescar</button>
            </div>
        </div>
    )
}
