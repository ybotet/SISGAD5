const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbQueja = sequelize.define('TbQueja', {
    num_reporte: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prioridadPDSTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    fecha_prueba: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    probador1: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 10]
      },
    },
    fecha_pdte: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    clave_pdte: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 12]
      },
    },
    claveOK: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 12]
      },
    },
    fechaOK: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    red: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_queja: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_telefono: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_linea: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_tipoqueja: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_clave: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_pizarra: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reportado_por: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, {
    tableName: 'tb_queja',
    timestamps: true,
    underscored: false
  });

  return TbQueja;
};
