const express = require('express');
const router = express.Router();
const TbMovimientoController = require('../controllers/TbMovimientoController');

/**
 * @route   GET /api/tbMovimiento
 * @desc    Obtener todos los tbMovimiento
 * @access  Public
 */
router.get('/', TbMovimientoController.getAll);

/**
 * @route   GET /api/tbMovimiento/:id
 * @desc    Obtener un TbMovimiento por ID
 * @access  Public
 */
router.get('/:id', TbMovimientoController.getById);

/**
 * @route   POST /api/tbMovimiento
 * @desc    Crear nuevo TbMovimiento
 * @access  Public
 */
router.post('/', TbMovimientoController.create);

/**
 * @route   PUT /api/tbMovimiento/:id
 * @desc    Actualizar TbMovimiento
 * @access  Public
 */
router.put('/:id', TbMovimientoController.update);

/**
 * @route   DELETE /api/tbMovimiento/:id
 * @desc    Eliminar TbMovimiento
 * @access  Public
 */
router.delete('/:id', TbMovimientoController.delete);

module.exports = router;
