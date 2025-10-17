const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbPrueba = sequelize.define('TbPrueba', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  resultado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  probador: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pdte_cable: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  queja: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_prueba: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  }, {
    tableName: 'tb_prueba',
    timestamps: true,
    underscored: false
  });

  return TbPrueba;
};
