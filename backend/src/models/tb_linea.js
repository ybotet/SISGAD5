const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbLinea = sequelize.define('TbLinea', {
  clavelinea: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 12]
    },
  },
  ClaveN: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 12]
    },
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
  Facturado: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 60]
    },
  },
  Sector: {
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
  id_linea: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  }, {
    tableName: 'tb_linea',
    timestamps: true,
    underscored: false
  });

  return TbLinea;
};
