// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import SistemaLayout from './layouts/SistemaLayout';
import DashboardPage from './pages/DashboardPage';
import ClasificacionPage from './pages/nomencladores/ClasificacionPage';
import MandosPage from './pages/nomencladores/MandosPage';
import GruposTrabajoPage from './pages/nomencladores/GruposTrabajoPage';
import PropietariosPage from './pages/nomencladores/PropietariosPage';
import TipoMovimientoPage from './pages/nomencladores/TipoMovimientoPage';
import TipolineaPage from './pages/nomencladores/TipolineaPage';
import ClasificadorClavePage from './pages/nomencladores/ClasificadorClavePage';
import ClasifpizarraPage from './pages/nomencladores/ClasifpizarraPage';
// import TelefonosPage from './pages/TelefonosPage';

export default function App() {
  return (
    <Routes>
      <Route path="/sistema/*" element={<SistemaLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="nomencladores/clasificacion" element={<ClasificacionPage type='' />} />
        <Route path="nomencladores/mandos" element={<MandosPage />} />
        <Route path="nomencladores/grupostrabajo" element={<GruposTrabajoPage />} />
        <Route path="nomencladores/propietarios" element={<PropietariosPage />} />
        <Route path="nomencladores/tipomovimientos" element={<TipoMovimientoPage />} />
        <Route path="nomencladores/tipolinea" element={<TipolineaPage />} />
        <Route path="nomencladores/clasificadorclave" element={<ClasificadorClavePage />} />
        <Route path="nomencladores/clasifpizarra" element={<ClasifpizarraPage />} />
      </Route>
    </Routes>
  );
}