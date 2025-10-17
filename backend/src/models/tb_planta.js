const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbPlanta = sequelize.define('TbPlanta', {
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  planta: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 12]
    },
  },
  id_planta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  }, {
    tableName: 'tb_planta',
    timestamps: true,
    underscored: false
  });

  return TbPlanta;
};
