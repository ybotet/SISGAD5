const express = require('express');
const router = express.Router();
const TbTipoquejaController = require('../controllers/TbTipoquejaController');

/**
 * @route   GET /api/tbTipoqueja
 * @desc    Obtener todos los tbTipoqueja
 * @access  Public
 */
router.get('/', TbTipoquejaController.getAll);

/**
 * @route   GET /api/tbTipoqueja/:id
 * @desc    Obtener un TbTipoqueja por ID
 * @access  Public
 */
router.get('/:id', TbTipoquejaController.getById);

/**
 * @route   POST /api/tbTipoqueja
 * @desc    Crear nuevo TbTipoqueja
 * @access  Public
 */
router.post('/', TbTipoquejaController.create);

/**
 * @route   PUT /api/tbTipoqueja/:id
 * @desc    Actualizar TbTipoqueja
 * @access  Public
 */
router.put('/:id', TbTipoquejaController.update);

/**
 * @route   DELETE /api/tbTipoqueja/:id
 * @desc    Eliminar TbTipoqueja
 * @access  Public
 */
router.delete('/:id', TbTipoquejaController.delete);

module.exports = router;
