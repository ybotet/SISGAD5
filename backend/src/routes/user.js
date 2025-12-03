const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const { tienePermiso } = require('../middleware/permissions');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas con permisos específicos
// router.get('/', usuariosController.obtenerUsers);
// router.post('/', usuariosController.crearUser);
// router.put('/:id', usuariosController.actualizarUser);
// router.delete('/:id', usuariosController.eliminarUser);

router.get('/', tienePermiso('usuarios.leer'), usuariosController.obtenerUsers);
router.post('/', tienePermiso('usuarios.crear'), usuariosController.crearUser);
router.put('/:id', tienePermiso('usuarios.actualizar'), usuariosController.actualizarUser);
router.delete('/:id', tienePermiso('usuarios.eliminar'), usuariosController.eliminarUser);

module.exports = router;