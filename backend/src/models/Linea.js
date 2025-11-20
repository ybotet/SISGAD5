const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbLinea = sequelize.define('TbLinea', {
    id_linea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clavelinea: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 12]
      },
      unique: true,
      allowNull: false
    },
    clave_n: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 12]
      },
      unique: true
    },
    codificacion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 7]
      },
    },
    hilos: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 2]
      },
    },
    desde: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    dirde: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    distdesde: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    zd: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 20]
      },
    },
    hasta: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    dirha: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      },
    },
    disthasta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    zh: {
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
    id_senalizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_tipolinea: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_propietario: {
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
    tableName: 'tb_linea',
    timestamps: true,
    underscored: true
  });

  return TbLinea;
};
