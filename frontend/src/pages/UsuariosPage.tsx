import { useEffect, useState } from 'react';

interface Usuario {
    id: number;
    nombre: string;
}

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        // Esta llamada irá a tu backend gracias al proxy
        fetch('/api/usuarios')
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.error('Error al cargar usuarios:', err));
    }, []);

    return (
        <div>
            <h2>Usuarios</h2>
            <ul>
                {usuarios.map(u => (
                    <li key={u.id}>{u.nombre}</li>
                ))}
            </ul>
        </div>
    );
}