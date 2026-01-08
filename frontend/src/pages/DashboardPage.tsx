// import { useState } from 'react';
// import Sidebar from '../components/Sidebar';


export default function DashboardPage() {
    const stats = [
        { title: 'Teléfonos', value: '1247', color: 'bg-blue-700' },
        { title: 'Líneas', value: '2156', color: 'bg-indigo-700' },
        { title: 'Pizarras', value: '89', color: 'bg-sky-700' },
        { title: 'Quejas', value: '23', color: 'bg-red-600' },
        { title: 'Operarios', value: '45', color: 'bg-emerald-600' },
        { title: 'Nomencladores', value: '14', color: 'bg-violet-600' },
    ];

    const recent = [
        { type: 'phone', title: 'Nuevo teléfono registrado', desc: 'Línea 7-831-2456 - hace 5 minutos' },
        { type: 'complaint', title: 'Queja reportada', desc: 'Problema de señal en Vedado - hace 15 minutos' },
        { type: 'assign', title: 'Operario asignado', desc: 'Juan Pérez asignado a reparación - hace 30 minutos' },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-semibold">Bienvenido al Sistema SISGAD5</h1>
                    <p className="text-sm text-gray-500">Gestión eficiente de los reportes y servicios de telecomunicaciones</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {stats.map((s) => (
                        <div key={s.title} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                            <div className={`p-3 rounded-md text-white ${s.color}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">{s.title}</div>
                                <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">Acciones Rápidas</h2>
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-blue-800 text-white px-5 py-2 rounded-md shadow">+ Nueva Queja</button>
                        <button className="bg-emerald-600 text-white px-5 py-2 rounded-md shadow">Registrar Teléfono</button>
                        <button className="bg-violet-600 text-white px-5 py-2 rounded-md shadow">Asignar Operario</button>
                        <button className="bg-orange-500 text-white px-5 py-2 rounded-md shadow">Ver Estadísticas</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium mb-4">Actividad Reciente</h3>
                        <ul className="space-y-3">
                            {recent.map((r, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                    <div className="flex-none text-blue-600">
                                        {r.type === 'phone' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.2 3.6a1 1 0 01-.217.95L8.5 10.75a11.05 11.05 0 005.75 5.75l1.83-1.74a1 1 0 01.95-.217l3.6 1.2A1 1 0 0121 18.72V22a2 2 0 01-2 2h-1C8.268 24 0 15.732 0 5V4a1 1 0 011-1h2z" />
                                            </svg>
                                        )}
                                        {r.type === 'complaint' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        {r.type === 'assign' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.533 6.121 1.464M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">{r.title}</div>
                                        <div className="text-sm text-gray-500">{r.desc}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium mb-4">Resumen</h3>
                        <p className="text-sm text-gray-600">gráficos rápidos, estadísticas o enlaces a reportes detallados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

