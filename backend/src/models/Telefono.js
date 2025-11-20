const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbTelefono = sequelize.define('TbTelefono', {
    id_telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 8]
      },
      unique: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 30]
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    lic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 20]
      },
    },
    esbaja: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    extensiones: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    facturado: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 60]
      },
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 2]
      },
    },
    id_mando: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_clasificacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'tb_telefono',
    timestamps: true,
    underscored: true
  });

  return TbTelefono;
};
