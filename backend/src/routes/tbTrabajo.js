const express = require('express');
const router = express.Router();
const TbTrabajoController = require('../controllers/TbTrabajoController');

/**
 * @route   GET /api/tbTrabajo
 * @desc    Obtener todos los tbTrabajo
 * @access  Public
 */
router.get('/', TbTrabajoController.getAll);

/**
 * @route   GET /api/tbTrabajo/:id
 * @desc    Obtener un TbTrabajo por ID
 * @access  Public
 */
router.get('/:id', TbTrabajoController.getById);

/**
 * @route   POST /api/tbTrabajo
 * @desc    Crear nuevo TbTrabajo
 * @access  Public
 */
router.post('/', TbTrabajoController.create);

/**
 * @route   PUT /api/tbTrabajo/:id
 * @desc    Actualizar TbTrabajo
 * @access  Public
 */
router.put('/:id', TbTrabajoController.update);

/**
 * @route   DELETE /api/tbTrabajo/:id
 * @desc    Eliminar TbTrabajo
 * @access  Public
 */
router.delete('/:id', TbTrabajoController.delete);

module.exports = router;
