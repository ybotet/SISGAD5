const tienePermiso = (permisoRequerido) => {
    return (req, res, next) => {
        try {
            const usuario = req.usuario;

            // Verificar si el usuario tiene el permiso requerido
            const tienePermiso = usuario.Rols.some(rol =>
                rol.Permisos.some(permiso =>
                    permiso.nombre === permisoRequerido
                )
            );

            if (!tienePermiso) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción'
                });
            }

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar permisos'
            });
        }
    };
};

module.exports = { tienePermiso };