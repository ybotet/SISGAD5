const { Cable } = require('../models');
const { Op } = require('sequelize');

const CableController = {
  /**
   * @desc    Obtener todos los registros
   * @route   GET /api/tbCable
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

      const data = await Cable.findAndCountAll({
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
      console.error('Error en CableController.getAll:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Obtener un registro por ID
   * @route   GET /api/tbCable/:id
   * @access  Public
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await Cable.findByPk(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Cable no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error en CableController.getById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  /**
   * @desc    Crear nuevo registro
   * @route   POST /api/tbCable
   * @access  Public
   */
  async create(req, res) {
    try {
      const data = await Cable.create(req.body);

      res.status(201).json({
        success: true,
        data,
        message: 'Cable creado exitosamente'
      });
    } catch (error) {
      console.error('Error en CableController.create:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error creando Cable',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Actualizar registro
   * @route   PUT /api/tbCable/:id
   * @access  Public
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const [affectedRows] = await Cable.update(req.body, {
        where: { id_cable: id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Cable no encontrado'
        });
      }

      const updatedData = await Cable.findByPk(id);

      res.json({
        success: true,
        data: updatedData,
        message: 'Cable actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en CableController.update:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error actualizando Cable'
      });
    }
  },

  /**
   * @desc    Eliminar registro
   * @route   DELETE /api/tbCable/:id
   * @access  Public
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const affectedRows = await Cable.destroy({
        where: { id_cable: id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Cable no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Cable eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en CableController.delete:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando Cable'
      });
    }
  }
};

module.exports = CableController;
