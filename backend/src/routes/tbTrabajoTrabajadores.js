const express = require('express');
const router = express.Router();
const TbTrabajoTrabajadoresController = require('../controllers/TbTrabajoTrabajadoresController');

/**
 * @route   GET /api/tbTrabajoTrabajadores
 * @desc    Obtener todos los tbTrabajoTrabajadores
 * @access  Public
 */
router.get('/', TbTrabajoTrabajadoresController.getAll);

/**
 * @route   GET /api/tbTrabajoTrabajadores/:id
 * @desc    Obtener un TbTrabajoTrabajadores por ID
 * @access  Public
 */
router.get('/:id', TbTrabajoTrabajadoresController.getById);

/**
 * @route   POST /api/tbTrabajoTrabajadores
 * @desc    Crear nuevo TbTrabajoTrabajadores
 * @access  Public
 */
router.post('/', TbTrabajoTrabajadoresController.create);

/**
 * @route   PUT /api/tbTrabajoTrabajadores/:id
 * @desc    Actualizar TbTrabajoTrabajadores
 * @access  Public
 */
router.put('/:id', TbTrabajoTrabajadoresController.update);

/**
 * @route   DELETE /api/tbTrabajoTrabajadores/:id
 * @desc    Eliminar TbTrabajoTrabajadores
 * @access  Public
 */
router.delete('/:id', TbTrabajoTrabajadoresController.delete);

module.exports = router;
