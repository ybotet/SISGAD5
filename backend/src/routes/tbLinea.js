const express = require('express');
const router = express.Router();
const TbLineaController = require('../controllers/TbLineaController');

/**
 * @route   GET /api/tbLinea
 * @desc    Obtener todos los tbLinea
 * @access  Public
 */
router.get('/', TbLineaController.getAll);

/**
 * @route   GET /api/tbLinea/:id
 * @desc    Obtener un TbLinea por ID
 * @access  Public
 */
router.get('/:id', TbLineaController.getById);

/**
 * @route   POST /api/tbLinea
 * @desc    Crear nuevo TbLinea
 * @access  Public
 */
router.post('/', TbLineaController.create);

/**
 * @route   PUT /api/tbLinea/:id
 * @desc    Actualizar TbLinea
 * @access  Public
 */
router.put('/:id', TbLineaController.update);

/**
 * @route   DELETE /api/tbLinea/:id
 * @desc    Eliminar TbLinea
 * @access  Public
 */
router.delete('/:id', TbLineaController.delete);

module.exports = router;
