const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Clasificacion = require('./Clasificacion')(sequelize);
const Clasificadorclave = require('./Clasificadorclave')(sequelize);
const Clasifpizarra = require('./Clasifpizarra')(sequelize);
const Grupow = require('./Grupow')(sequelize);
const Mando = require('./Mando')(sequelize);
const Propietario = require('./Propietario')(sequelize);
const Senalizacion = require('./Senalizacion')(sequelize);
const Sistema = require('./Sistema')(sequelize);
const Tipolinea = require('./Tipolinea')(sequelize);


const TbCable = require('./tb_cable')(sequelize);
const TbClave = require('./tb_clave')(sequelize);
const TbLinea = require('./tb_linea')(sequelize);
const TbMaterial = require('./tb_material')(sequelize);
const TbMaterialEntregado = require('./tb_material_entregado')(sequelize);
const TbMaterialempleado = require('./tb_materialempleado')(sequelize);
const TbMovimiento = require('./tb_movimiento')(sequelize);
const TbOs = require('./tb_os')(sequelize);
const TbPizarra = require('./tb_pizarra')(sequelize);
const TbPlanta = require('./tb_planta')(sequelize);
const TbPrueba = require('./tb_prueba')(sequelize);
const TbQueja = require('./tb_queja')(sequelize);
const TbRecorrido = require('./tb_recorrido')(sequelize);
const TbResultadoprueba = require('./tb_resultadoprueba')(sequelize);
const TbTelefono = require('./tb_telefono')(sequelize);
const Tipomovimiento = require('./Tipomovimiento')(sequelize);
const TbTipopizarra = require('./tb_tipopizarra')(sequelize);
const TbTipoqueja = require('./tb_tipoqueja')(sequelize);
const TbTrabajador = require('./tb_trabajador')(sequelize);
const TbTrabajo = require('./tb_trabajo')(sequelize);
const TbTrabajoTrabajadores = require('./tb_trabajo_trabajadores')(sequelize);

// Configurar relaciones aquí
Propietario.hasMany(Sistema, { foreignKey: 'id_propietario', as: 'tb_sistema' });
Sistema.belongsTo(Propietario, { foreignKey: 'id_propietario', as: 'tb_propietario' });
// Ejemplo: Sistema.hasMany(Queja);

// Sincronizar modelos
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ Modelos sincronizados con la base de datos");
  } catch (error) {
    console.error("❌ Error sincronizando modelos: ", error);
  }
};

module.exports = {
  sequelize,
  DataTypes,
  syncModels,
  TbCable,
  Clasificacion,
  Clasificadorclave,
  Clasifpizarra,
  TbClave,
  Grupow,
  TbLinea,
  Mando,
  Sistema,
  TbMaterial,
  TbMaterialEntregado,
  TbMaterialempleado,
  TbMovimiento,
  TbOs,
  TbPizarra,
  TbPlanta,
  Propietario,
  TbPrueba,
  TbQueja,
  TbRecorrido,
  TbResultadoprueba,
  Senalizacion,
  TbTelefono,
  Tipolinea,
  Tipomovimiento,
  TbTipopizarra,
  TbTipoqueja,
  TbTrabajador,
  TbTrabajo,
  TbTrabajoTrabajadores,
};