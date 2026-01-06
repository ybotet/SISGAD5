// src/App.tsx
import { Routes, Route } from 'react-router-dom';

import SistemaLayout from './layouts/SistemaLayout';
import LoginPage from './pages/auth/LoginPage';

import DebugLogin from './pages/auth/DebugLogin';
import ProfilePage from './pages/auth/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ClasificacionPage from './pages/nomencladores/ClasificacionPage';
import MandosPage from './pages/nomencladores/MandosPage';
import GruposTrabajoPage from './pages/nomencladores/GruposTrabajoPage';
import PropietariosPage from './pages/nomencladores/PropietariosPage';
import TipoMovimientoPage from './pages/nomencladores/TipoMovimientoPage';
import TipolineaPage from './pages/nomencladores/TipolineaPage';
import ClasificadorClavePage from './pages/nomencladores/ClasificadorClavePage';
import ClasifpizarraPage from './pages/nomencladores/ClasifpizarraPage';
import TipoQuejaPage from './pages/nomencladores/TipoquejaPage';
import CablePage from './pages/nomencladores/CablePage';
import PlantaPage from './pages/nomencladores/PlantaPage';
import TipoPizarraPage from './pages/nomencladores/TipopizarraPage';
import ClavePage from './pages/nomencladores/ClavePage';
import ResultadoPruebaPage from './pages/nomencladores/ResultadoPruebaPage';
import SenalizacionPage from './pages/nomencladores/SenalizacionPage';
import SistemaPage from './pages/nomencladores/SistemaPage';
import TrabajadorPage from './pages/TrabajadorPage';
import TelefonoPage from './pages/TelefonoPage';
import LineaPage from './pages/LineaPage';
import QuejaPage from './pages/quejaPage';
import PizarraPage from './pages/PizarraPage';
import UsuariosPage from './pages/auth/admin/UsuariosPage';
import RolesPage from './pages/auth/admin/RolesPage';
import StatsPage from './pages/StatsPage';

export default function App() {



  return (
    <Routes>
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="/debug-login" element={<DebugLogin />} />
      <Route path="/sistema/*" element={<SistemaLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="main/telefonos" element={<TelefonoPage />} />
        <Route path="main/lineas" element={<LineaPage />} />
        <Route path="main/pizarras" element={<PizarraPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="main/quejas" element={<QuejaPage />} />
        <Route path="operarios" element={<TrabajadorPage />} />
        <Route path="admin/usuarios" element={<UsuariosPage />} />
        <Route path="admin/roles" element={<RolesPage />} />
        <Route path="nomencladores/clasificacion" element={<ClasificacionPage type='' />} />
        <Route path="nomencladores/mandos" element={<MandosPage />} />
        <Route path="nomencladores/grupostrabajo" element={<GruposTrabajoPage />} />
        <Route path="nomencladores/propietarios" element={<PropietariosPage />} />
        <Route path="nomencladores/tipomovimientos" element={<TipoMovimientoPage />} />
        <Route path="nomencladores/tipolinea" element={<TipolineaPage />} />
        <Route path="nomencladores/clasificadorclave" element={<ClasificadorClavePage />} />
        <Route path="nomencladores/clasifpizarra" element={<ClasifpizarraPage />} />
        <Route path="nomencladores/tipoqueja" element={<TipoQuejaPage />} />
        <Route path="nomencladores/cable" element={<CablePage />} />
        <Route path="nomencladores/planta" element={<PlantaPage />} />
        <Route path="nomencladores/tipopizarra" element={<TipoPizarraPage />} />
        <Route path="nomencladores/clave" element={<ClavePage />} />
        <Route path="nomencladores/resultadoprueba" element={<ResultadoPruebaPage />} />
        <Route path="nomencladores/senalizaciones" element={<SenalizacionPage />} />
        <Route path="nomencladores/sistema" element={<SistemaPage />} />
      </Route>

    </Routes>
  );
}