const jwt = require('jsonwebtoken');
const { User, Rol, Permiso } = require('../models/index');

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validar campos
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
            }

            // Buscar usuario
            const usuario = await User.findOne({
                where: { email },
                include: [{
                    model: Rol,
                    as: 'tb_rol',
                    through: { attributes: [] },
                    include: [{
                        model: Permiso,
                        as: 'tb_permiso',
                        through: { attributes: [] }
                    }]
                }]
            });

            if (!usuario) {
                console.log('❌ Usuario no encontrado:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            if (!usuario.activo) {
                console.log('❌ Usuario inactivo:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Usuario inactivo'
                });
            }

            // Verificar contraseña
            const esPasswordValido = await usuario.verificarPassword(password);
            if (!esPasswordValido) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Generar token
            const token = jwt.sign(
                {
                    id: usuario.id_usuario,
                    email: usuario.email
                },
                process.env.JWT_SECRET || 'secreto',
                { expiresIn: '24h' }
            );

            // Omitir password_hash en la respuesta
            const { password_hash, ...usuarioSinPassword } = usuario.toJSON();

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    usuario: usuarioSinPassword,
                    token
                }
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                details: process.env.NODE_ENV === 'development' ? (error.message || String(error)) : undefined
            });
        }
    },

    perfil: async (req, res) => {
        try {
            const usuario = req.usuario;
            const { password_hash, ...usuarioSinPassword } = usuario.toJSON();

            res.json({
                success: true,
                data: usuarioSinPassword
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener perfil'
            });
        }
    }
};

module.exports = authController;