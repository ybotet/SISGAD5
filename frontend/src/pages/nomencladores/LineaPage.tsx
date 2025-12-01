import { useState, useEffect } from 'react';
import type { LineaItem, CreateLineaRequest, PaginatedResponse } from '../../services/lineaService';
import { lineaService } from '../../services/lineaService';

export default function LineaPage() {
    const [items, setItems] = useState<LineaItem[]>([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<LineaItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [saving, setSaving] = useState(false);

    useEffect(() => { loadLineas(); }, []);
    useEffect(() => { const timeoutId = setTimeout(() => loadLineas(1, pagination.limit, searchTerm), 500); return () => clearTimeout(timeoutId); }, [searchTerm]);

    const loadLineas = async (page: number = 1, limit: number = 10, search: string = '') => {
        try { setLoading(true); setError(''); const response: PaginatedResponse<LineaItem> = await lineaService.getLinea(page, limit, search); setItems(response.data); setPagination(response.pagination); } catch (err) { setError('Error'); console.error('Error:', err); } finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => { try { setError(''); await lineaService.deleteLinea(id); await loadLineas(pagination.page, pagination.limit, searchTerm); } catch (err: any) { setError(err?.message || 'Error'); } };
    const handleEdit = (item: LineaItem) => { setEditingItem(item); setShowModal(true); };
    const handleSave = async (formData: FormData) => { try { setSaving(true); setError(''); const data: CreateLineaRequest = { linea: formData.get('linea') as string }; if (editingItem) await lineaService.updateLinea(editingItem.id_linea, data); else await lineaService.createLinea(data); loadLineas(pagination.page, pagination.limit, searchTerm); setShowModal(false); setEditingItem(null); } catch (err) { setError('Error'); } finally { setSaving(false); } };

    if (loading && items.length === 0) return <div className="p-6 flex justify-center items-center h-64"><i className="ri-loader-4-line animate-spin text-2xl text-blue-600"></i></div>;

    return (
        <div className="p-6">
            <div className="mb-6"><h1 className="text-3xl font-bold">Línea</h1></div>
            {error && <div className="bg-red-100 px-4 py-3 rounded mb-6"><button onClick={() => setError('')}>✕</button> {error}</div>}
            <div className="flex gap-3 mb-6"><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="flex-1 px-4 py-2 border rounded-lg" /><button onClick={() => setShowModal(true)} className="px-4 py-2 bg-green-600 text-white rounded"><i className="ri-add-line"></i></button></div>
            <table className="w-full bg-white rounded-lg shadow"><thead><tr><th className="px-6 py-3 text-left">Línea</th><th className="px-6 py-3">Acciones</th></tr></thead><tbody>{items.map((item) => <tr key={item.id_linea} className="border-t"><td className="px-6 py-4">{item.linea}</td><td className="px-6 py-4"><button onClick={() => handleEdit(item)} className="text-blue-600 mr-2"><i className="ri-edit-line"></i></button><button onClick={() => handleDelete(item.id_linea)} className="text-red-600"><i className="ri-delete-bin-line"></i></button></td></tr>)}</tbody></table>
            {showModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded p-6 w-96"><form onSubmit={(e) => { e.preventDefault(); handleSave(new FormData(e.currentTarget)); }}><input name="linea" defaultValue={editingItem?.linea || ''} required className="w-full px-4 py-2 border rounded mb-4" /><div className="flex gap-2"><button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded">{saving ? 'Guardando...' : 'Guardar'}</button><button type="button" onClick={() => { setShowModal(false); setEditingItem(null); }} className="flex-1 bg-gray-300 rounded">Cancelar</button></div></form></div></div>}
        </div>
    );
}
