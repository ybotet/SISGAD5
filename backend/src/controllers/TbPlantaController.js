const { TbPlanta } = require('../models');
const { Op } = require('sequelize');

const TbPlantaController = {
  /**
   * @desc    Obtener todos los registros
   * @route   GET /api/tbPlanta
   * @access  Public
   */
  async getAll(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        search = '',
        ...filters
      } = req.query;

      const offset = (page - 1) * limit;

      // Construir where clause para búsqueda
      const whereClause = {};
      if (search) {
        whereClause[Op.or] = [
          // Buscar en campos de texto (ajusta según tus campos)
          { nombre: { [Op.iLike]: `%${search}%` } },
          { descripcion: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ].filter(Boolean);
      }

      // Agregar otros filtros
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          whereClause[key] = filters[key];
        }
      });

      const data = await TbPlanta.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: offset,
        order: [[sortBy, sortOrder.toUpperCase()]]
      });

      res.json({
        success: true,
        data: data.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: data.count,
          pages: Math.ceil(data.count / limit)
        }
      });
    } catch (error) {
      console.error('Error en TbPlantaController.getAll:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Obtener un registro por ID
   * @route   GET /api/tbPlanta/:id
   * @access  Public
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await TbPlanta.findByPk(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'TbPlanta no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error en TbPlantaController.getById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  /**
   * @desc    Crear nuevo registro
   * @route   POST /api/tbPlanta
   * @access  Public
   */
  async create(req, res) {
    try {
      const data = await TbPlanta.create(req.body);

      res.status(201).json({
        success: true,
        data,
        message: 'TbPlanta creado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbPlantaController.create:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error creando TbPlanta',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Actualizar registro
   * @route   PUT /api/tbPlanta/:id
   * @access  Public
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const [affectedRows] = await TbPlanta.update(req.body, {
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbPlanta no encontrado'
        });
      }

      const updatedData = await TbPlanta.findByPk(id);

      res.json({
        success: true,
        data: updatedData,
        message: 'TbPlanta actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbPlantaController.update:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error actualizando TbPlanta'
      });
    }
  },

  /**
   * @desc    Eliminar registro
   * @route   DELETE /api/tbPlanta/:id
   * @access  Public
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const affectedRows = await TbPlanta.destroy({
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbPlanta no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'TbPlanta eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbPlantaController.delete:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando TbPlanta'
      });
    }
  }
};

module.exports = TbPlantaController;
