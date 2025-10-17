const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbClave = sequelize.define('TbClave', {
  id_clave: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 8]
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 25]
    },
  },
  valorP: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0,
  },
  id_clasificadorclave: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  esPendiente: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  }, {
    tableName: 'tb_clave',
    timestamps: true,
    underscored: false
  });

  return TbClave;
};
