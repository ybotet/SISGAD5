const express = require('express');
const router = express.Router();
const TbPlantaController = require('../controllers/TbPlantaController');

/**
 * @route   GET /api/tbPlanta
 * @desc    Obtener todos los tbPlanta
 * @access  Public
 */
router.get('/', TbPlantaController.getAll);

/**
 * @route   GET /api/tbPlanta/:id
 * @desc    Obtener un TbPlanta por ID
 * @access  Public
 */
router.get('/:id', TbPlantaController.getById);

/**
 * @route   POST /api/tbPlanta
 * @desc    Crear nuevo TbPlanta
 * @access  Public
 */
router.post('/', TbPlantaController.create);

/**
 * @route   PUT /api/tbPlanta/:id
 * @desc    Actualizar TbPlanta
 * @access  Public
 */
router.put('/:id', TbPlantaController.update);

/**
 * @route   DELETE /api/tbPlanta/:id
 * @desc    Eliminar TbPlanta
 * @access  Public
 */
router.delete('/:id', TbPlantaController.delete);

module.exports = router;
