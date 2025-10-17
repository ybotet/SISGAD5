const express = require('express');
const router = express.Router();
const TbResultadopruebaController = require('../controllers/TbResultadopruebaController');

/**
 * @route   GET /api/tbResultadoprueba
 * @desc    Obtener todos los tbResultadoprueba
 * @access  Public
 */
router.get('/', TbResultadopruebaController.getAll);

/**
 * @route   GET /api/tbResultadoprueba/:id
 * @desc    Obtener un TbResultadoprueba por ID
 * @access  Public
 */
router.get('/:id', TbResultadopruebaController.getById);

/**
 * @route   POST /api/tbResultadoprueba
 * @desc    Crear nuevo TbResultadoprueba
 * @access  Public
 */
router.post('/', TbResultadopruebaController.create);

/**
 * @route   PUT /api/tbResultadoprueba/:id
 * @desc    Actualizar TbResultadoprueba
 * @access  Public
 */
router.put('/:id', TbResultadopruebaController.update);

/**
 * @route   DELETE /api/tbResultadoprueba/:id
 * @desc    Eliminar TbResultadoprueba
 * @access  Public
 */
router.delete('/:id', TbResultadopruebaController.delete);

module.exports = router;
