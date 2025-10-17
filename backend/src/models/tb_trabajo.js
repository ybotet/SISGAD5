const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbTrabajo = sequelize.define('TbTrabajo', {
  id_trabajo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  probador: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_queja: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  }, {
    tableName: 'tb_trabajo',
    timestamps: true,
    underscored: false
  });

  return TbTrabajo;
};
