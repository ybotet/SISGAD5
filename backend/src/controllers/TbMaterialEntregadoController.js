const { TbMaterialEntregado } = require('../models');
const { Op } = require('sequelize');

const TbMaterialEntregadoController = {
  /**
   * @desc    Obtener todos los registros
   * @route   GET /api/tbMaterialEntregado
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

      const data = await TbMaterialEntregado.findAndCountAll({
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
      console.error('Error en TbMaterialEntregadoController.getAll:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Obtener un registro por ID
   * @route   GET /api/tbMaterialEntregado/:id
   * @access  Public
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await TbMaterialEntregado.findByPk(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'TbMaterialEntregado no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error en TbMaterialEntregadoController.getById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  /**
   * @desc    Crear nuevo registro
   * @route   POST /api/tbMaterialEntregado
   * @access  Public
   */
  async create(req, res) {
    try {
      const data = await TbMaterialEntregado.create(req.body);

      res.status(201).json({
        success: true,
        data,
        message: 'TbMaterialEntregado creado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbMaterialEntregadoController.create:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error creando TbMaterialEntregado',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * @desc    Actualizar registro
   * @route   PUT /api/tbMaterialEntregado/:id
   * @access  Public
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const [affectedRows] = await TbMaterialEntregado.update(req.body, {
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbMaterialEntregado no encontrado'
        });
      }

      const updatedData = await TbMaterialEntregado.findByPk(id);

      res.json({
        success: true,
        data: updatedData,
        message: 'TbMaterialEntregado actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbMaterialEntregadoController.update:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Error de validación',
          details: error.errors.map(err => err.message)
        });
      }

      res.status(400).json({
        success: false,
        error: 'Error actualizando TbMaterialEntregado'
      });
    }
  },

  /**
   * @desc    Eliminar registro
   * @route   DELETE /api/tbMaterialEntregado/:id
   * @access  Public
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const affectedRows = await TbMaterialEntregado.destroy({
        where: { id }
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'TbMaterialEntregado no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'TbMaterialEntregado eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en TbMaterialEntregadoController.delete:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando TbMaterialEntregado'
      });
    }
  }
};

module.exports = TbMaterialEntregadoController;
