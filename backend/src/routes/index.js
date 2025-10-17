const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Importar y usar todas las rutas automáticamente
router.use('/cable', require('./cable'));
router.use('/clasificacion', require('./clasificacion'));
router.use('/clasificadorclave', require('./clasificadorclave'));
router.use('/clasifpizarra', require('./clasifpizarra'));
router.use('/grupow', require('./grupow'));
router.use('/mando', require('./mando'));
router.use('/propietario', require('./propietario'));
router.use('/tipolinea', require('./tipolinea'));
router.use('/resultadoprueba', require('./resultadoprueba'));
router.use('/senalizacion', require('./senalizacion'));
router.use('/sistema', require('./sistema'));
router.use('/tipomovimiento', require('./tipomovimiento'));
router.use('/tipoqueja', require('./tipoqueja'));
router.use('/trabajador', require('./trabajador'));


router.use('/tbClave', require('./tbClave'));
router.use('/tbLinea', require('./tbLinea'));
router.use('/tbMaterial', require('./tbMaterial'));
router.use('/tbMaterialempleado', require('./tbMaterialempleado'));
router.use('/tbMaterialEntregado', require('./tbMaterialEntregado'));
router.use('/tbMovimiento', require('./tbMovimiento'));
router.use('/tbOs', require('./tbOs'));
router.use('/tbPizarra', require('./tbPizarra'));
router.use('/tbPlanta', require('./tbPlanta'));
router.use('/tbPrueba', require('./tbPrueba'));
router.use('/tbQueja', require('./tbQueja'));
router.use('/tbRecorrido', require('./tbRecorrido'));
router.use('/tbTelefono', require('./tbTelefono'));
router.use('/tbTipopizarra', require('./tbTipopizarra'));
router.use('/tbTrabajo', require('./tbTrabajo'));
router.use('/tbTrabajoTrabajadores', require('./tbTrabajoTrabajadores'));

// Ruta de fallback para APIs no encontradas
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint de API no encontrado',
    path: req.originalUrl
  });
});

module.exports = router;
