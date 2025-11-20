
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
  const navigate = useNavigate(); // 👈 hook de navegación
  const [isCollapsed, setIsCollapsed] = useState(false);


  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'ri-dashboard-line' },
    {
      id: 'main-modules',
      name: 'Módulos Principales',
      icon: 'ri-folder-line',
      children: [
        { id: 'telefonos', name: 'Teléfonos', icon: 'ri-phone-line' },
        { id: 'lineas', name: 'Líneas', icon: 'ri-git-branch-line' },
        { id: 'pizarras', name: 'Pizarras', icon: 'ri-dashboard-line' },
        { id: 'quejas', name: 'Quejas (Incidencias)', icon: 'ri-error-warning-line' },
      ]
    },
    {
      id: 'nomencladores',
      name: 'Nomencladores',
      icon: 'ri-settings-3-line',
      children: [
        { id: 'cable', name: 'Cable', icon: 'ri-cable-line' },
        { id: 'clasificacion', name: 'Clasificación', icon: 'ri-price-tag-3-line' },
        { id: 'clasificadorclave', name: 'Clasificador de Clave', icon: 'ri-key-line' },
        { id: 'clasifpizarra', name: 'Clasificador de Pizarra', icon: 'ri-layout-grid-line' },
        { id: 'clave', name: 'Clave', icon: 'ri-key-line' },
        { id: 'grupostrabajo', name: 'Grupos de Trabajo', icon: '' },
        { id: 'mandos', name: 'Mandos', icon: 'ri-remote-control-line' },
        { id: 'movimientos', name: 'Movimientos', icon: 'ri-arrow-left-right-line' },
        { id: 'pendiente-cable', name: 'Pendiente Cable Troncal', icon: 'ri-time-line' },
        { id: 'plantas', name: 'Plantas', icon: 'ri-building-line' },
        { id: 'propietarios', name: 'Propietarios', icon: 'ri-user-line' },
        { id: 'resultado-prueba', name: 'Resultado de la Prueba', icon: 'ri-test-tube-line' },
        { id: 'senalizaciones', name: 'Señalizaciones', icon: 'ri-signal-tower-line' },
        { id: 'sistema', name: 'Sistema', icon: 'ri-computer-line' },
        { id: 'tipolinea', name: 'Tipo de Línea', icon: 'ri-git-branch-line' },
        { id: 'tipomovimientos', name: 'Tipo de Movimiento', icon: 'ri-arrow-left-right-line' },
        { id: 'tipo-pizarra', name: 'Tipo de Pizarra', icon: 'ri-layout-grid-line' },
        { id: 'tipo-queja', name: 'Tipo de Queja', icon: 'ri-feedback-line' },
      ]
    },
    { id: 'operarios', name: 'Operarios', icon: 'ri-team-line' },
    { id: 'estadisticas', name: 'Estadísticas', icon: 'ri-bar-chart-line' },
    { id: 'admin', name: 'Panel Administrativo', icon: 'ri-admin-line' },
  ];

  // Cambiar el estado inicial para que no estén expandidos por defecto
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleNavigation = (path: string) => {
    navigate(path); // 👈 navega a la ruta
  };


  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className={`text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen`} style={{ backgroundColor: '#083480' }}>
      {/* Header */}
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img
                src="https://static.readdy.ai/image/a88dc50be7306a32e887204fd69a49ff/132736adac667f0bf54d60a1dcbd6825.png"
                alt="SISGAD5 Logo"
                className="w-10 h-10 object-contain bg-white rounded-full p-1"
              />
              <h2 className="text-lg font-semibold">SISGAD5</h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-blue-800 transition-colors"
          >
            <i className={`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line`}></i>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                if (item.children) {
                  toggleExpanded(item.id);
                } else {
                  handleNavigation(`/sistema/${item.id}`);
                }
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-800 transition-colors`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </div>
              {!isCollapsed && item.children && (
                <i className={`ri-arrow-${expandedItems.includes(item.id) ? 'down' : 'right'}-s-line text-sm`}></i>
              )}
            </button>

            {/* Submenu */}
            {!isCollapsed && item.children && expandedItems.includes(item.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => handleNavigation(`/sistema/nomencladores/${child.id}`)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-800 transition-colors text-sm`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={`${child.icon} text-sm`}></i>
                    </div>
                    <span>{child.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
