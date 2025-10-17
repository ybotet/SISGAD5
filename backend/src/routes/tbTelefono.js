const express = require('express');
const router = express.Router();
const TbTelefonoController = require('../controllers/TbTelefonoController');

/**
 * @route   GET /api/tbTelefono
 * @desc    Obtener todos los tbTelefono
 * @access  Public
 */
router.get('/', TbTelefonoController.getAll);

/**
 * @route   GET /api/tbTelefono/:id
 * @desc    Obtener un TbTelefono por ID
 * @access  Public
 */
router.get('/:id', TbTelefonoController.getById);

/**
 * @route   POST /api/tbTelefono
 * @desc    Crear nuevo TbTelefono
 * @access  Public
 */
router.post('/', TbTelefonoController.create);

/**
 * @route   PUT /api/tbTelefono/:id
 * @desc    Actualizar TbTelefono
 * @access  Public
 */
router.put('/:id', TbTelefonoController.update);

/**
 * @route   DELETE /api/tbTelefono/:id
 * @desc    Eliminar TbTelefono
 * @access  Public
 */
router.delete('/:id', TbTelefonoController.delete);

module.exports = router;
