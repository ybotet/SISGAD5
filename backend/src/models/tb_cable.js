const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbCable = sequelize.define("TbCable", {
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 13]
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 30]
      },
    },
    id_propietario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_cable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    tableName: 'tb_cable',
    timestamps: true,
    underscored: false
  });

  return TbCable;
};
