import Usuario from './usuario.model.js';
import Rol from './rol.model.js';
import Permiso from './permiso.model.js';
import UsuarioPermiso from './usuario_permiso.model.js';
import RolPermiso from './rol_permiso.model.js';
import Ciudad from './ciudad.model.js';
import Provincia from './provincia.model.js';
import Regional from './regional.model.js';
import Centro from './centro.model.js';
import Cargo from './cargo.model.js';
import CargoCentro from './cargoCentro.model.js';
import CoordinadorGrupoMixto from './coordinadoresGrupoMixto.model.js';
import Coordinadores from './coordinador.model.js';
import Area from './area.model.js';
import Supervisor from './supervisor.model.js';
import CodigoRubro from './codigo_rubro.model.js';
import CDP from './cdp.model.js';
import Rubro from './rubro.model.js';
import FuenteRecurso from './fuenteRecurso.model.js';
import CdpsRubros from './cdps_rubros.model.js';
import CentroUsuario from './centro_usuario.model.js';
import TipoContratacion from "./tipo_contratacion.model.js";
import necesidad_contratacion from "./necesidad_contratacion.model.js";
import nivel_formacion from "./nivel_formacion.model.js";
import estado_formaciones from "./estado_formaciones.model.js";
import informacion_personal from "./hoja_de_vida.model.js";
import educacion_formal from "./educacion_formal.model.js";
import educacion_informal from "./educacion_informales.model.js";
import certificacion from "./certificacion.model.js";
import experiencia_laboral from "./experiencia_laboral.model.js";
import informacion_previa_contrato from "./informacion_previa_contrato.model.js";
import hojas_de_vida from "./hoja_de_vida.model.js";
import Ordenador from './ordenador.model.js';
import Resolucion from './resolucion.model.js';
import AreaCentro from './areaCentro.model.js';
import Dependencia from './dependencia.model.js';
import Autorizacion from './autorizacion.model.js';
import Contrato from './contrato.model.js';
import Obligacion from './obligaciones.model.js';
import regimenes_ivas from './regimenes_ivas.model.js';
import formaciones_complementarias from './formaciones_complementarias.model.js';
import clasificacion_persona_natural from './clasificacion_persona_natural.model.js';
import tipo_documento from './tipo_documento.model.js';
import titulo_formacion from './titulo_formacion.model.js';
import RegistrosPresupuestales from './registros_presupuestales.model.js';



// informacion_personal → educacion_formal
informacion_personal.hasMany(educacion_formal, {
  as: "educacionFormal",
  foreignKey: "informacion_personal_id",
});
educacion_formal.belongsTo(informacion_personal, {
  as: "informacionPersonal",
  foreignKey: "informacion_personal_id",
});

// informacion_personal → educacion_informal
informacion_personal.hasMany(educacion_informal, {
  as: "educacionInformal",
  foreignKey: "informacion_personal_id",
});
educacion_informal.belongsTo(informacion_personal, {
  as: "informacionPersonal",
  foreignKey: "informacion_personal_id",
});

// informacion_personal → certificacion
informacion_personal.hasMany(certificacion, {
  as: "certificaciones",
  foreignKey: "informacion_personal_id",
});
certificacion.belongsTo(informacion_personal, {
  as: "informacionPersonal",
  foreignKey: "informacion_personal_id",
});

// informacion_personal → experiencia_laboral
informacion_personal.hasMany(experiencia_laboral, {
  as: "experienciaLaboral",
  foreignKey: "informacion_personal_id",
});
experiencia_laboral.belongsTo(informacion_personal, {
  as: "informacionPersonal",
  foreignKey: "informacion_personal_id",
});

// informacion_personal → informacion_previa_contrato
informacion_personal.hasOne(informacion_previa_contrato, {
  foreignKey: "informacion_personales_id",
  as: "informacionPreviaContrato",
});

informacion_previa_contrato.belongsTo(informacion_personal, {
  foreignKey: "informacion_personales_id",
  as: "informacionPersonal",
});

// Asociaciones faltantes para includes usados en los servicios/controllers
// relacion tipo_documento <-> informacion_personal
informacion_personal.belongsTo(tipo_documento, {
  foreignKey: 'tipo_documentos_id',
  as: 'tipo_documento',
});
tipo_documento.hasMany(informacion_personal, {
  foreignKey: 'tipo_documentos_id',
  as: 'informacion_personales',
});

// ciudades de expedición y domicilio
informacion_personal.belongsTo(Ciudad, {
  foreignKey: 'ciudad_expedicion_id',
  as: 'ciudad_expedicion',
});
informacion_personal.belongsTo(Ciudad, {
  foreignKey: 'ciudad_domicilio_id',
  as: 'ciudad_domicilio',
});

// cargo_actual, area y centro (relaciones para los includes en el servicio)
informacion_personal.belongsTo(Cargo, {
  foreignKey: 'cargo_actual_id',
  as: 'cargo_actual',
});
informacion_personal.belongsTo(Area, {
  foreignKey: 'area_id',
  as: 'area',
});
informacion_personal.belongsTo(Centro, {
  foreignKey: 'centro_id',
  as: 'centro',
});

// Asociaciones: Contrato -> informacion_personal y autorizacion
Contrato.belongsTo(informacion_personal, {
  foreignKey: 'informacion_personal_id',
  as: 'informacion_personal'
});
informacion_personal.hasMany(Contrato, {
  foreignKey: 'informacion_personal_id',
  as: 'contratos'
});

// Relación N:M: Autorizacion <-> Obligacion a través de la tabla autorizacion_obligacion
Autorizacion.belongsToMany(Obligacion, {
  through: 'autorizacion_obligacion',
  foreignKey: 'autorizacion_id',
  otherKey: 'obligacion_id',
  as: 'obligaciones',
  timestamps: false // la tabla intermedia no tiene createdAt/updatedAt
});
Obligacion.belongsToMany(Autorizacion, {
  through: 'autorizacion_obligacion',
  foreignKey: 'obligacion_id',
  otherKey: 'autorizacion_id',
  as: 'autorizaciones',
  timestamps: false // la tabla intermedia no tiene createdAt/updatedAt
});


export {
  Usuario,
  Rol,
  Permiso,
  UsuarioPermiso,
  RolPermiso,
  Ciudad,
  Provincia,
  Regional,
  Centro,
  Cargo,
  CargoCentro,
  CoordinadorGrupoMixto,
  Coordinadores,
  Area,
  Supervisor,
  CodigoRubro,
  CDP,
  Rubro,
  FuenteRecurso,
  CdpsRubros,
  CentroUsuario,
  Ordenador,
  Resolucion,
  AreaCentro,
  Dependencia,
  Autorizacion,
  Obligacion,
  Contrato,
  TipoContratacion,
  necesidad_contratacion,
  nivel_formacion,
  estado_formaciones,
  informacion_personal,
  educacion_formal,
  educacion_informal,
  certificacion,
  experiencia_laboral,
  informacion_previa_contrato,
  regimenes_ivas,
  formaciones_complementarias,
  clasificacion_persona_natural,
  tipo_documento,
  titulo_formacion,
  RegistrosPresupuestales
};

// Asociaciones
Usuario.belongsTo(Rol, {
  foreignKey: 'rol_id',
  as: 'rol',
});

Rol.hasMany(Usuario, {
  foreignKey: 'rol_id',
  as: 'usuarios',
});

// Relación: Un coordinador pertenece a un centro
Coordinadores.belongsTo(Centro, { foreignKey: 'centros_id', as: 'centro' });

Usuario.belongsToMany(Permiso, {
  through: UsuarioPermiso,
  foreignKey: 'usuario_id',
  otherKey: 'permiso_id',
  as: 'permisos',
});

// Relaciones N:M
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: 'permiso_id',
  otherKey: 'rol_id',
  as: 'roles',
});

Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: 'rol_id',
  otherKey: 'permiso_id',
  as: 'permisos',
});

Permiso.belongsToMany(Usuario, {
  through: UsuarioPermiso,
  foreignKey: 'permiso_id',
  otherKey: 'usuario_id',
  as: 'usuarios',
});

Ciudad.belongsTo(Provincia, { foreignKey: "provincia_id", as: "provincia" });

// Relaciones entre Regional y Centro
Regional.hasMany(Centro, {
  foreignKey: 'regional_id',
  as: 'centros',
});

Centro.belongsTo(Regional, {
  foreignKey: 'regional_id',
  as: 'regional',
});

// Relaciones entre Ciudad y Centro
Ciudad.hasMany(Centro, {
  foreignKey: 'ciudad_id',
  as: 'centros',
});

Centro.belongsTo(Ciudad, {
  foreignKey: 'ciudad_id',
  as: 'ciudad',
});

// Relaciones entre Supervisor y Centro
Supervisor.hasMany(Centro, {
  foreignKey: 'supervisores_id',
  as: 'centros'
});

Centro.belongsTo(Supervisor, {
  foreignKey: 'supervisores_id',
  as: 'supervisor'
});

// Definir las asociaciones muchos a muchos
Cargo.belongsToMany(Centro, {
  through: CargoCentro,
  foreignKey: 'cargo_id',
  otherKey: 'centro_id',
  as: 'centros'
});
Centro.belongsToMany(Cargo, {
  through: CargoCentro,
  foreignKey: 'centro_id',
  otherKey: 'cargo_id',
  as: 'cargos'
});

// Asociación directa Contrato -> Centro
Contrato.belongsTo(Centro, {
  foreignKey: 'centro_id',
  as: 'centro',
  onDelete: 'SET NULL'
});
Centro.hasMany(Contrato, {
  foreignKey: 'centro_id',
  as: 'contratos'
});

// Asociaciones directas con la tabla intermedia
Cargo.hasMany(CargoCentro, {
  foreignKey: 'cargo_id',
  as: 'cargoCentros'
});

Centro.hasMany(CargoCentro, {
  foreignKey: 'centro_id',
  as: 'centroCargos'
});

CargoCentro.belongsTo(Cargo, {
  foreignKey: 'cargo_id',
  as: 'cargo'
});

CargoCentro.belongsTo(Centro, {
  foreignKey: 'centro_id',
  as: 'centro'
});

// Asociaciones de CDP
CDP.belongsTo(CoordinadorGrupoMixto, { foreignKey: 'quien_expide_id', as: 'quien_expide' });
CDP.belongsTo(FuenteRecurso, { foreignKey: 'fuente_recurso_id', as: 'fuente_recurso' });
CDP.belongsTo(Centro, { foreignKey: 'centro_id', as: 'centro' });

// Relación entre CDP y Autorizacion
CDP.hasMany(Autorizacion, { foreignKey: 'cdp_id', as: 'autorizaciones' });
Autorizacion.belongsTo(CDP, { foreignKey: 'cdp_id', as: 'cdp' });

// Relaciones de Autorizacion con otros modelos basadas en la estructura real de la BD
Autorizacion.belongsTo(Ordenador, { foreignKey: 'ordenador_id', as: 'ordenador' });
Ordenador.hasMany(Autorizacion, { foreignKey: 'ordenador_id', as: 'autorizaciones' });

Autorizacion.belongsTo(Centro, { foreignKey: 'centro_id', as: 'centro' });
Centro.hasMany(Autorizacion, { foreignKey: 'centro_id', as: 'autorizaciones' });

Autorizacion.belongsTo(necesidad_contratacion, { foreignKey: 'necesidad_contratacion_id', as: 'necesidadContratacion' });
necesidad_contratacion.hasMany(Autorizacion, { foreignKey: 'necesidad_contratacion_id', as: 'autorizaciones' });

// Relación de Autorizacion con TipoContratacion
Autorizacion.belongsTo(TipoContratacion, { foreignKey: 'tipo_contratacion_id', as: 'tipoContratacion' });
TipoContratacion.hasMany(Autorizacion, { foreignKey: 'tipo_contratacion_id', as: 'autorizaciones' });

// Relación N:M entre CDP y Rubro a través de CdpsRubros
CDP.belongsToMany(Rubro, {
  through: CdpsRubros,
  foreignKey: 'cdps_id',
  otherKey: 'rubros_id',
  as: 'rubros'
});
Rubro.belongsToMany(CDP, {
  through: CdpsRubros,
  foreignKey: 'rubros_id',
  otherKey: 'cdps_id',
  as: 'cdps'
});

// Relación de la tabla intermedia con FuenteRecurso
CdpsRubros.belongsTo(FuenteRecurso, { foreignKey: 'fuente_recurso_id', as: 'fuente_recurso' });
FuenteRecurso.hasMany(CdpsRubros, { foreignKey: 'fuente_recurso_id', as: 'cdps_rubros' });

// Si necesitas las relaciones directas para los includes:
CDP.hasMany(CdpsRubros, { foreignKey: 'cdps_id', as: 'cdps_rubros' });
CdpsRubros.belongsTo(CDP, { foreignKey: 'cdps_id', as: 'cdp' });
Rubro.hasMany(CdpsRubros, { foreignKey: 'rubros_id', as: 'cdps_rubros' });
CdpsRubros.belongsTo(Rubro, { foreignKey: 'rubros_id', as: 'rubro' });


// Relación N:M entre Usuario y Centro usando la tabla intermedia CentroUsuario
Usuario.belongsToMany(Centro, {
  through: CentroUsuario,
  foreignKey: 'usuario_id',
  otherKey: 'centro_id',
  as: 'centros'
});
Centro.belongsToMany(Usuario, {
  through: CentroUsuario,
  foreignKey: 'centro_id',
  otherKey: 'usuario_id',
  as: 'usuarios'
});

// Las relaciones con Dependencia ya están definidas en codigo_rubro.model.js

// Aquí defines las asociaciones
Centro.belongsTo(Supervisor, { foreignKey: 'supervisores_id' });
Supervisor.hasMany(Centro, { foreignKey: 'supervisores_id' });

// Relaciones de Resolucion
Resolucion.belongsTo(Centro, { foreignKey: 'centro_id', as: 'centro' });
Centro.hasMany(Resolucion, { foreignKey: 'centro_id', as: 'resoluciones' });

// Rubro pertenece a CodigoRubro - Movido al final para evitar conflictos
Rubro.belongsTo(CodigoRubro, { foreignKey: 'codigo_rubro_id', as: 'codigoRubro' });
// CodigoRubro tiene muchos Rubros
CodigoRubro.hasMany(Rubro, { foreignKey: 'codigo_rubro_id', as: 'rubros' });

// Relación CodigoRubro con Dependencia
CodigoRubro.belongsTo(Dependencia, { foreignKey: 'dependencia_id', as: 'dependencia' });
Dependencia.hasMany(CodigoRubro, { foreignKey: 'dependencia_id', as: 'codigosRubro' });

Resolucion.belongsTo(Ordenador, { foreignKey: 'ordenadores_id', as: 'ordenador' });
Ordenador.hasMany(Resolucion, { foreignKey: 'ordenadores_id', as: 'resoluciones' });

// Relaciones de Ordenador con Cargo
Ordenador.belongsTo(Cargo, { foreignKey: 'cargo_id', as: 'cargo' });
Cargo.hasMany(Ordenador, { foreignKey: 'cargo_id', as: 'ordenadores' });

// Relaciones de Ordenador con Ciudad (lugar de expedición y domicilio)
Ordenador.belongsTo(Ciudad, { foreignKey: 'lugar_expedicion_id', as: 'lugar_expedicion' });
Ordenador.belongsTo(Ciudad, { foreignKey: 'lugar_domicilio_id', as: 'lugar_domicilio' });
Ciudad.hasMany(Ordenador, { foreignKey: 'lugar_expedicion_id', as: 'ordenadores_expedicion' });
Ciudad.hasMany(Ordenador, { foreignKey: 'lugar_domicilio_id', as: 'ordenadores_domicilio' });

// Relación N:M entre Area y Centro usando la tabla intermedia area_centro
Area.belongsToMany(Centro, {
  through: AreaCentro,
  foreignKey: 'area_id',
  otherKey: 'centro_id',
  as: 'centros'
});

Centro.belongsToMany(Area, {
  through: AreaCentro,
  foreignKey: 'centro_id',
  otherKey: 'area_id',
  as: 'areas'
});

// Asociaciones de Contrato
Contrato.belongsTo(Supervisor, {
  foreignKey: 'supervisor_id',
  as: 'supervisor',
  onDelete: 'SET NULL'
});
Supervisor.hasMany(Contrato, {
  foreignKey: 'supervisor_id',
  as: 'contratos'
});

Contrato.belongsTo(Coordinadores, {
  foreignKey: 'coordinador_id',
  as: 'coordinador',
  onDelete: 'RESTRICT'
});
Coordinadores.hasMany(Contrato, {
  foreignKey: 'coordinador_id',
  as: 'contratos'
});

// Nota: la relación entre Autorizacion y Obligacion se maneja mediante la tabla 'autorizacion_obligacion'.
// Se eliminó la asociación directa Contrato -> Obligacion por requerimiento de dominio.

// Exportar todos los modelos
const db = {
  Usuario,
  Rol,
  Permiso,
  UsuarioPermiso,
  RolPermiso,
  Ciudad,
  Provincia,
  Regional,
  Centro,
  Cargo,
  CargoCentro,
  CoordinadorGrupoMixto,
  Area,
  Supervisor,
  CodigoRubro,
  CDP,
  Rubro,
  CdpsRubros,
  CentroUsuario,
  Ordenador,
  Resolucion,
  Coordinadores,
  AreaCentro,
  TipoContratacion,
  necesidad_contratacion,
  nivel_formacion,
  estado_formaciones,
  informacion_personal,
  educacion_formal,
  educacion_informal,
  certificacion,
  experiencia_laboral,
  informacion_previa_contrato,
  hojas_de_vida,
  regimenes_ivas,
  formaciones_complementarias,
  clasificacion_persona_natural,
  tipo_documento,
  titulo_formacion,
  RegistrosPresupuestales
};



export default db;
