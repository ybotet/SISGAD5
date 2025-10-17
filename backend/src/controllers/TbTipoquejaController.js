const { TbTipoqueja } = require('../models');
const { Op } = require('sequelize');

const TbTipoquejaController = {
  /**
   * @desc    Obtener todos los registros
   * @route   GET /api/tbTipoqueja
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

      const data = await TbTipoqueja.findAndCountAll({
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
      console.error('Error en TbTipoquejaController.getAll:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Obtener un registro por ID
   * @route   GET /api/tbTipoqueja/:id
   * @access  Public
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await TbTipoqueja.findByPk(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'TbTipoqueja no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error en TbTipoquejaController.getById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  /**
   * @desc    Crear nuevo registro
   * @route   POST /api/tbTipoqueja
   * @access  Public
   */
  async create(req, res) {
    try {
      const data = await TbTipoqueja.create(req.body);

      res.status(201).json({
        success: true,
        data,
        message: 'TbTipoqueja creado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbTipoquejaController.create:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error creando TbTipoqueja',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Actualizar registro
   * @route   PUT /api/tbTipoqueja/:id
   * @access  Public
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const [affectedRows] = await TbTipoqueja.update(req.body, {
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbTipoqueja no encontrado'
        });
      }

      const updatedData = await TbTipoqueja.findByPk(id);

      res.json({
        success: true,
        data: updatedData,
        message: 'TbTipoqueja actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbTipoquejaController.update:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error actualizando TbTipoqueja'
      });
    }
  },

  /**
   * @desc    Eliminar registro
   * @route   DELETE /api/tbTipoqueja/:id
   * @access  Public
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const affectedRows = await TbTipoqueja.destroy({
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbTipoqueja no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'TbTipoqueja eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbTipoquejaController.delete:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando TbTipoqueja'
      });
    }
  }
};

module.exports = TbTipoquejaController;
