const express = require('express');
const router = express.Router();
const TbTrabajadorController = require('../controllers/TbTrabajadorController');

/**
 * @route   GET /api/tbTrabajador
 * @desc    Obtener todos los tbTrabajador
 * @access  Public
 */
router.get('/', TbTrabajadorController.getAll);

/**
 * @route   GET /api/tbTrabajador/:id
 * @desc    Obtener un TbTrabajador por ID
 * @access  Public
 */
router.get('/:id', TbTrabajadorController.getById);

/**
 * @route   POST /api/tbTrabajador
 * @desc    Crear nuevo TbTrabajador
 * @access  Public
 */
router.post('/', TbTrabajadorController.create);

/**
 * @route   PUT /api/tbTrabajador/:id
 * @desc    Actualizar TbTrabajador
 * @access  Public
 */
router.put('/:id', TbTrabajadorController.update);

/**
 * @route   DELETE /api/tbTrabajador/:id
 * @desc    Eliminar TbTrabajador
 * @access  Public
 */
router.delete('/:id', TbTrabajadorController.delete);

module.exports = router;
