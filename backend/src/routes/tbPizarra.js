const express = require('express');
const router = express.Router();
const TbPizarraController = require('../controllers/TbPizarraController');

/**
 * @route   GET /api/tbPizarra
 * @desc    Obtener todos los tbPizarra
 * @access  Public
 */
router.get('/', TbPizarraController.getAll);

/**
 * @route   GET /api/tbPizarra/:id
 * @desc    Obtener un TbPizarra por ID
 * @access  Public
 */
router.get('/:id', TbPizarraController.getById);

/**
 * @route   POST /api/tbPizarra
 * @desc    Crear nuevo TbPizarra
 * @access  Public
 */
router.post('/', TbPizarraController.create);

/**
 * @route   PUT /api/tbPizarra/:id
 * @desc    Actualizar TbPizarra
 * @access  Public
 */
router.put('/:id', TbPizarraController.update);

/**
 * @route   DELETE /api/tbPizarra/:id
 * @desc    Eliminar TbPizarra
 * @access  Public
 */
router.delete('/:id', TbPizarraController.delete);

module.exports = router;
