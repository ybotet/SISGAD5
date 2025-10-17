const express = require('express');
const router = express.Router();
const TbTipopizarraController = require('../controllers/TbTipopizarraController');

/**
 * @route   GET /api/tbTipopizarra
 * @desc    Obtener todos los tbTipopizarra
 * @access  Public
 */
router.get('/', TbTipopizarraController.getAll);

/**
 * @route   GET /api/tbTipopizarra/:id
 * @desc    Obtener un TbTipopizarra por ID
 * @access  Public
 */
router.get('/:id', TbTipopizarraController.getById);

/**
 * @route   POST /api/tbTipopizarra
 * @desc    Crear nuevo TbTipopizarra
 * @access  Public
 */
router.post('/', TbTipopizarraController.create);

/**
 * @route   PUT /api/tbTipopizarra/:id
 * @desc    Actualizar TbTipopizarra
 * @access  Public
 */
router.put('/:id', TbTipopizarraController.update);

/**
 * @route   DELETE /api/tbTipopizarra/:id
 * @desc    Eliminar TbTipopizarra
 * @access  Public
 */
router.delete('/:id', TbTipopizarraController.delete);

module.exports = router;
