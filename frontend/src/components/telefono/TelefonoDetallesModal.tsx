import type { TelefonoItem, RecorridoItem, QuejaItem } from '../../services/telefonoService';

interface TelefonoDetallesModalProps {
    show: boolean;
    telefono: TelefonoItem | null;
    recorridos: RecorridoItem[];
    quejas: QuejaItem[];
    loading: boolean;
    onClose: () => void;
}

export default function TelefonoDetallesModal({
    show,
    telefono,
    recorridos,
    quejas,
    loading,
    onClose
}: TelefonoDetallesModalProps) {
    if (!show) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 text-center">
                    <i className="ri-loader-4-line animate-spin text-2xl text-blue-600 mb-2"></i>
                    <p className="text-gray-600">Cargando detalles...</p>
                </div>
            </div>
        );
    }

    if (!telefono) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Detalles del Teléfono: {telefono.telefono || 'N/A'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Información del Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Nombre</h4>
                                <p className="text-sm text-gray-900">{telefono.nombre || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Dirección</h4>
                                <p className="text-sm text-gray-900">{telefono.direccion || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">LIC</h4>
                                <p className="text-sm text-gray-900">{telefono.lic || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Zona</h4>
                                <p className="text-sm text-gray-900">{telefono.zona || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Clasificación</h4>
                                <p className="text-sm text-gray-900">
                                    {telefono.tb_clasificacion?.nombre || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Extensiones</h4>
                                <p className="text-sm text-gray-900">{telefono.extensiones}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Mando</h4>
                                <p className="text-sm text-gray-900">
                                    {telefono.tb_mando?.mando || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${telefono.esbaja
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}>
                                    {telefono.esbaja ? 'Baja' : 'Activo'}
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* Tabla de Recorridos */}
                    <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recorridos</h4>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No.
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Terminal
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cable
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Par
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            De
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            A
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recorridos.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-4 text-center text-sm text-gray-500">
                                                No hay recorridos registrados
                                            </td>
                                        </tr>
                                    ) : (
                                        recorridos.map((recorrido, index) => (
                                            <tr key={recorrido.id_recorrido}>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {recorrido.terminal || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {recorrido.tb_cable?.numero || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {recorrido.par || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {recorrido.de || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {recorrido.a || 'N/A'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tabla de Quejas */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quejas</h4>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No. Reporte
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Probador
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Clave OK
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fecha OK
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {quejas.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-4 text-center text-sm text-gray-500">
                                                No hay quejas registradas
                                            </td>
                                        </tr>
                                    ) : (
                                        quejas.map((queja) => (
                                            <tr key={queja.num_reporte}>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {queja.num_reporte}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(queja.fecha).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {queja.probador1 || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {queja.claveok || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {queja.fechaok ? new Date(queja.fechaok).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${queja.red
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {queja.red ? 'En Red' : 'Resuelta'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}