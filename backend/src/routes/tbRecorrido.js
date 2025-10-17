const express = require('express');
const router = express.Router();
const TbRecorridoController = require('../controllers/TbRecorridoController');

/**
 * @route   GET /api/tbRecorrido
 * @desc    Obtener todos los tbRecorrido
 * @access  Public
 */
router.get('/', TbRecorridoController.getAll);

/**
 * @route   GET /api/tbRecorrido/:id
 * @desc    Obtener un TbRecorrido por ID
 * @access  Public
 */
router.get('/:id', TbRecorridoController.getById);

/**
 * @route   POST /api/tbRecorrido
 * @desc    Crear nuevo TbRecorrido
 * @access  Public
 */
router.post('/', TbRecorridoController.create);

/**
 * @route   PUT /api/tbRecorrido/:id
 * @desc    Actualizar TbRecorrido
 * @access  Public
 */
router.put('/:id', TbRecorridoController.update);

/**
 * @route   DELETE /api/tbRecorrido/:id
 * @desc    Eliminar TbRecorrido
 * @access  Public
 */
router.delete('/:id', TbRecorridoController.delete);

module.exports = router;
