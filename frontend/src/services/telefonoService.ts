import api from './api';

export interface Mando {
    id_mando: number;
    mando: string;
}
export interface Cable {
    id_cable: number;
    numero: string;
}

export interface Clasificacion {
    id_clasificacion: number;
    nombre: string;
}

export interface TelefonoItem {
    id_telefono: number;
    telefono: string | null;
    nombre: string | null;
    direccion: string | null;
    lic: string | null;
    zona: string | null;
    esbaja: boolean;
    extensiones: number;
    facturado: string | null;
    sector: string | null;
    id_mando: number | null;
    id_clasificacion: number | null;
    createdAt: string;
    updatedAt: string;
    // Campos relacionados
    tb_mando?: Mando;
    tb_clasificacion?: Clasificacion;
}

export interface RecorridoItem {
    id_recorrido: number;
    numero: number;
    par: string | null;
    terminal: string | null;
    de: string | null;
    a: string | null;
    dirter: string | null;
    soporte: string | null;
    canal: string | null;
    id_telefono: number | null;
    id_linea: number | null;
    id_propietario: number | null;
    id_planta: number | null;
    id_sistema: number | null;
    createdAt: string;
    updatedAt: string;
    tb_cable?: Cable;
}

export interface QuejaItem {
    num_reporte: number;
    fecha: string;
    prioridad: string | null;
    fecha_prueba: string | null;
    probador1: string | null;
    fecha_pdte: string | null;
    clave_pdte: string | null;
    claveok: string | null;
    fechaok: string | null;
    red: boolean;
    id_queja: number;
    id_telefono: number | null;
    id_linea: number | null;
    id_tipoqueja: number | null;
    id_clave: number | null;
    id_pizarra: number | null;
    reportado_por: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTelefonoRequest {
    telefono?: string;
    nombre?: string;
    direccion?: string;
    lic?: string;
    zona?: string;
    extensiones?: number;
    facturado?: string;
    sector?: string;
    id_mando?: number | null;
    id_clasificacion?: number | null;
    esbaja?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export const telefonoService = {
    // Obtener teléfonos con paginación
    async getTelefonos(
        page: number = 1,
        limit: number = 10,
        search: string = '',
        estado: string = ''
    ): Promise<PaginatedResponse<TelefonoItem>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        if (search) {
            params.append('search', search);
            console.log('🔍 Buscando quejas con término:', search);
        }

        if (estado) {
            if (estado === 'activo') {
                params.append('esbaja', 'false');
            } else if (estado === 'baja') {
                params.append('esbaja', 'true');
            }
        }
        const url = `/telefono?${params.toString()}`;
        console.log('📡 URL de petición:', url);

        const response = await api.get<PaginatedResponse<TelefonoItem>>(
            `/telefono?${params.toString()}`
        );
        return response.data;
    },

    // Obtener detalles de un teléfono específico
    async getTelefonoDetalles(id: number): Promise<{
        telefono: TelefonoItem;
        recorridos: RecorridoItem[];
        quejas: QuejaItem[];
    }> {
        const response = await api.get<ApiResponse<{
            telefono: TelefonoItem;
            recorridos: RecorridoItem[];
            quejas: QuejaItem[];
        }>>(`/telefono/${id}`);
        console.log(response.data.data)
        return response.data.data;
    },

    // Obtener mandos para el combo
    async getMandos(): Promise<Mando[]> {
        const response = await api.get<ApiResponse<Mando[]>>('/mando?limit=100');
        return response.data.data;
    },

    // Obtener clasificaciones para el combo
    async getClasificaciones(): Promise<Clasificacion[]> {
        const response = await api.get<ApiResponse<Clasificacion[]>>('/clasificacion?limit=100');
        return response.data.data;
    },

    // Crear nuevo teléfono
    async createTelefono(data: CreateTelefonoRequest): Promise<TelefonoItem> {
        const response = await api.post<ApiResponse<TelefonoItem>>('/telefono', data);
        return response.data.data;
    },

    // Actualizar teléfono
    async updateTelefono(id: number, data: Partial<CreateTelefonoRequest>): Promise<TelefonoItem> {
        const response = await api.put<ApiResponse<TelefonoItem>>(`/telefono/${id}`, data);
        return response.data.data;
    },

    // Eliminar teléfono
    async deleteTelefono(id: number): Promise<void> {
        console.log('Eliminando teléfono con ID:', id);
        try {
            const response = await api.delete(`/telefono/${id}`);
            console.log('Respuesta de eliminación:', response);
        } catch (error) {
            console.error('Error en servicio delete:', error);
            throw error;
        }
    },
};