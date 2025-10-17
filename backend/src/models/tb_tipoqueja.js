const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbTipoqueja = sequelize.define('TbTipoqueja', {
  tipoqueja: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_tipoqueja: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  }, {
    tableName: 'tb_tipoqueja',
    timestamps: true,
    underscored: false
  });

  return TbTipoqueja;
};
