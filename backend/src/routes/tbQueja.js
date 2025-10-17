const express = require('express');
const router = express.Router();
const TbQuejaController = require('../controllers/TbQuejaController');

/**
 * @route   GET /api/tbQueja
 * @desc    Obtener todos los tbQueja
 * @access  Public
 */
router.get('/', TbQuejaController.getAll);

/**
 * @route   GET /api/tbQueja/:id
 * @desc    Obtener un TbQueja por ID
 * @access  Public
 */
router.get('/:id', TbQuejaController.getById);

/**
 * @route   POST /api/tbQueja
 * @desc    Crear nuevo TbQueja
 * @access  Public
 */
router.post('/', TbQuejaController.create);

/**
 * @route   PUT /api/tbQueja/:id
 * @desc    Actualizar TbQueja
 * @access  Public
 */
router.put('/:id', TbQuejaController.update);

/**
 * @route   DELETE /api/tbQueja/:id
 * @desc    Eliminar TbQueja
 * @access  Public
 */
router.delete('/:id', TbQuejaController.delete);

module.exports = router;
