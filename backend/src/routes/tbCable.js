const express = require('express');
const router = express.Router();
const TbCableController = require('../controllers/TbCableController');

/**
 * @route   GET /api/tbCable
 * @desc    Obtener todos los tbCable
 * @access  Public
 */
router.get('/', TbCableController.getAll);

/**
 * @route   GET /api/tbCable/:id
 * @desc    Obtener un TbCable por ID
 * @access  Public
 */
router.get('/:id', TbCableController.getById);

/**
 * @route   POST /api/tbCable
 * @desc    Crear nuevo TbCable
 * @access  Public
 */
router.post('/', TbCableController.create);

/**
 * @route   PUT /api/tbCable/:id
 * @desc    Actualizar TbCable
 * @access  Public
 */
router.put('/:id', TbCableController.update);

/**
 * @route   DELETE /api/tbCable/:id
 * @desc    Eliminar TbCable
 * @access  Public
 */
router.delete('/:id', TbCableController.delete);

module.exports = router;
