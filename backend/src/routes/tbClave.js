const express = require('express');
const router = express.Router();
const TbClaveController = require('../controllers/TbClaveController');

/**
 * @route   GET /api/tbClave
 * @desc    Obtener todos los tbClave
 * @access  Public
 */
router.get('/', TbClaveController.getAll);

/**
 * @route   GET /api/tbClave/:id
 * @desc    Obtener un TbClave por ID
 * @access  Public
 */
router.get('/:id', TbClaveController.getById);

/**
 * @route   POST /api/tbClave
 * @desc    Crear nuevo TbClave
 * @access  Public
 */
router.post('/', TbClaveController.create);

/**
 * @route   PUT /api/tbClave/:id
 * @desc    Actualizar TbClave
 * @access  Public
 */
router.put('/:id', TbClaveController.update);

/**
 * @route   DELETE /api/tbClave/:id
 * @desc    Eliminar TbClave
 * @access  Public
 */
router.delete('/:id', TbClaveController.delete);

module.exports = router;
