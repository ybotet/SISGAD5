const express = require('express');
const router = express.Router();
const TbPruebaController = require('../controllers/TbPruebaController');

/**
 * @route   GET /api/tbPrueba
 * @desc    Obtener todos los tbPrueba
 * @access  Public
 */
router.get('/', TbPruebaController.getAll);

/**
 * @route   GET /api/tbPrueba/:id
 * @desc    Obtener un TbPrueba por ID
 * @access  Public
 */
router.get('/:id', TbPruebaController.getById);

/**
 * @route   POST /api/tbPrueba
 * @desc    Crear nuevo TbPrueba
 * @access  Public
 */
router.post('/', TbPruebaController.create);

/**
 * @route   PUT /api/tbPrueba/:id
 * @desc    Actualizar TbPrueba
 * @access  Public
 */
router.put('/:id', TbPruebaController.update);

/**
 * @route   DELETE /api/tbPrueba/:id
 * @desc    Eliminar TbPrueba
 * @access  Public
 */
router.delete('/:id', TbPruebaController.delete);

module.exports = router;
