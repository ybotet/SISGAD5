const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbTrabajoTrabajadores = sequelize.define('TbTrabajoTrabajadores', {
  id_trabajo_trabajadores: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trabajo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  trabajador: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  }, {
    tableName: 'tb_trabajo_trabajadores',
    timestamps: true,
    underscored: false
  });

  return TbTrabajoTrabajadores;
};
