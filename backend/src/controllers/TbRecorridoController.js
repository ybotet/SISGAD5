const { TbRecorrido } = require('../models');
const { Op } = require('sequelize');

const TbRecorridoController = {
  /**
   * @desc    Obtener todos los registros
   * @route   GET /api/tbRecorrido
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

      const data = await TbRecorrido.findAndCountAll({
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
      console.error('Error en TbRecorridoController.getAll:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Obtener un registro por ID
   * @route   GET /api/tbRecorrido/:id
   * @access  Public
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await TbRecorrido.findByPk(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'TbRecorrido no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error en TbRecorridoController.getById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  /**
   * @desc    Crear nuevo registro
   * @route   POST /api/tbRecorrido
   * @access  Public
   */
  async create(req, res) {
    try {
      const data = await TbRecorrido.create(req.body);

      res.status(201).json({
        success: true,
        data,
        message: 'TbRecorrido creado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbRecorridoController.create:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error creando TbRecorrido',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Actualizar registro
   * @route   PUT /api/tbRecorrido/:id
   * @access  Public
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const [affectedRows] = await TbRecorrido.update(req.body, {
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbRecorrido no encontrado'
        });
      }

      const updatedData = await TbRecorrido.findByPk(id);

      res.json({
        success: true,
        data: updatedData,
        message: 'TbRecorrido actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbRecorridoController.update:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error actualizando TbRecorrido'
      });
    }
  },

  /**
   * @desc    Eliminar registro
   * @route   DELETE /api/tbRecorrido/:id
   * @access  Public
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const affectedRows = await TbRecorrido.destroy({
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbRecorrido no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'TbRecorrido eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbRecorridoController.delete:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando TbRecorrido'
      });
    }
  }
};

module.exports = TbRecorridoController;
