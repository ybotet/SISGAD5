const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbTipopizarra = sequelize.define('TbTipopizarra', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 20]
    },
  },
  id_tipopizarra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_clasifpizarra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  }, {
    tableName: 'tb_tipopizarra',
    timestamps: true,
    underscored: false
  });

  return TbTipopizarra;
};
