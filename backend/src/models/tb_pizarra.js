const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbPizarra = sequelize.define('TbPizarra', {
  id_pizarra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_tipopizarra: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  }, {
    tableName: 'tb_pizarra',
    timestamps: true,
    underscored: false
  });

  return TbPizarra;
};
