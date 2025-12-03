const { User, Rol } = require('../models/index');
const { Op } = require('sequelize');

const usuariosController = {
    // Obtener todos los usuarios (con paginación)
    obtenerUsers: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const offset = (page - 1) * limit;

            const whereCondition = {};
            if (search) {
                whereCondition[Op.or] = [
                    { nombre: { [Op.like]: `%${search}%` } },
                    { apellidos: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ];
            }

            const { count, rows: usuarios } = await User.findAndCountAll({
                where: whereCondition,
                attributes: { exclude: ['password_hash'] },
                include: [{
                    model: Rol,
                    as: 'tb_rol',
                    through: { attributes: [] },
                    attributes: ['id_rol', 'nombre', 'descripcion']
                }],
                limit: parseInt(limit),
                offset: offset,
                order: [['createdAt', 'DESC']]
            });

            res.json({
                success: true,
                data: usuarios,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                    pages: Math.ceil(count / limit)
                }
            });

        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios'
            });
        }
    },

    // Crear usuario
    crearUser: async (req, res) => {
        try {
            const { email, password, nombre, apellidos, roles } = req.body;

            // Verificar si el email ya existe
            const usuarioExistente = await User.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado'
                });
            }

            // Crear usuario
            const usuario = await User.create({
                email,
                password_hash: password,
                nombre,
                apellidos
            });

            // Asignar roles si se proporcionaron
            if (roles && roles.length > 0) {
                const rolesEncontrados = await Rol.findAll({
                    where: { id_rol: roles }
                });
                await usuario.setRols(rolesEncontrados);
            }

            // Obtener usuario con roles
            const usuarioConRoles = await User.findByPk(usuario.id_usuario, {
                attributes: { exclude: ['password_hash'] },
                include: [{
                    model: Rol,
                    as: 'tb_rol',
                    through: { attributes: [] }
                }]
            });

            res.status(201).json({
                success: true,
                message: 'User creado exitosamente',
                data: usuarioConRoles
            });

        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear usuario'
            });
        }
    },

    // Actualizar usuario
    actualizarUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { email, nombre, apellidos, activo, roles } = req.body;

            const usuario = await User.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Actualizar campos
            await usuario.update({
                email: email || usuario.email,
                nombre: nombre || usuario.nombre,
                apellidos: apellidos || usuario.apellidos,
                activo: activo !== undefined ? activo : usuario.activo
            });

            // Actualizar roles si se proporcionaron
            if (roles) {
                const rolesEncontrados = await Rol.findAll({
                    where: { id_rol: roles }
                });
                await usuario.setRols(rolesEncontrados);
            }

            // Obtener usuario actualizado
            const usuarioActualizado = await User.findByPk(id, {
                attributes: { exclude: ['password_hash'] },
                include: [{
                    model: Rol,
                    as: 'tb_rol',
                    through: { attributes: [] }
                }]
            });

            res.json({
                success: true,
                message: 'User actualizado exitosamente',
                data: usuarioActualizado
            });

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar usuario'
            });
        }
    },

    // Eliminar usuario
    eliminarUser: async (req, res) => {
        try {
            const { id } = req.params;

            const usuario = await User.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'User no encontrado'
                });
            }

            await usuario.destroy();

            res.json({
                success: true,
                message: 'User eliminado exitosamente'
            });

        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar usuario'
            });
        }
    }
};

module.exports = usuariosController;