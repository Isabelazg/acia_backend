import { loginPaths } from './paths/auth/login.path.js';
import { registerPaths } from './paths/auth/register.path.js';
import { forgotPasswordPaths } from './paths/auth/forgotPassword.path.js';
import { resetPasswordPaths } from './paths/auth/resetPassword.path.js';
import { refreshTokenPaths } from './paths/auth/refreshToken.path.js';
import { cuentaPaths } from './paths/cuenta/cuenta.path.js';
import { rolesPaths } from './paths/rol/rol.path.js';
import { permisosPaths } from './paths/permiso/permiso.path.js';
import { usuariosPaths } from './paths/usuario/usuario.path.js';
import { centrosPaths } from './paths/centro/centro.path.js';
import { areasPaths } from './paths/area/area.path.js';
import { coordinadoresPaths } from './paths/coordinador/coordinador.path.js';
import { cargosPaths } from './paths/cargo/cargo.path.js';
import { dependenciasPaths } from './paths/dependencia/dependencia.path.js';
import { fuenteRecursosPaths } from './paths/fuenteRecurso/fuenteRecurso.path.js';
import { regionalesPaths } from './paths/regional/regional.path.js';
import { supervisorPaths } from './paths/supervisor/supervisor.path.js';
import { codigoRubrosPaths } from './paths/codigo_rubro/codigo_rubro.path.js';
import { coordinadoresGrupoMixtoPaths } from './paths/coordinadorGrupoMixto/coordinadorGrupoMixto.path.js';
import { rubrosPaths } from './paths/rubro/rubro.path.js';
import { cdpPaths } from './paths/cdp/cdp.path.js';
import { ordenadoresPaths } from './paths/ordenador/ordenador.path.js';
import { resolucionesPaths } from './paths/resolucion/resolucion.path.js';
import { obligacionesPaths } from './paths/obligacion/obligacion.path.js';
import { educacionFormalPaths } from './paths/educacion_formal/educacion_formal.Path.js';
import { estadoFormacionesPaths } from './paths/estado_formaciones/estado_formaciones.Path.js';
import { necesidad_contratacionPaths } from './paths/necesidad_contratacion/necesidad_contratacion.path.js';
import { tipo_documentoPaths } from './paths/tipo_documento/tipo_documento.path.js';
import { nivel_formacionPaths } from './paths/nivel_formacion/nivel_formacion.path.js';
import { informacionPersonalPaths } from './paths/informacion_personales/informacion_personales.Paths.js';
import { educacionInformalPaths } from './paths/educacion_informales/educacion_informales.Paths.js';
import { certificacionesPath } from './paths/certificaciones/certificaciones.Path.js';
import { experienciasLaboralPath } from './paths/experiencias_laboral/experiencias_laboral.Paths.js';
import { informacionesPreviasContratosPath } from './paths/informaciones_previas_contratos/informaciones_previas_contratos.Paths.js';
import { hojasDeVidaPath } from './paths/hoja_de_vida/hoja_de_vida.Paths.js';
import { tituloFormacionPaths } from './paths/titulo_formacion/titulo_formacion.path.js';
import { registrosPresupuestalesPaths } from './paths/registros_presupuestales/registros_presupuestales.path.js';

// Importar esquemas
import { rolesSchemas } from './schemas/rol.schema.js';
import { permisosSchemas } from './schemas/permiso.schema.js';
import { centrosSchemas } from './schemas/centro.schema.js';
import { areasSchemas } from './schemas/area.schema.js';
import { coordinadoresSchemas } from './schemas/coordinador.schema.js';
import { cargosSchemas } from './schemas/cargo.schema.js';
import { dependenciasSchemas } from './schemas/dependencia.schema.js';
import { fuenteRecursosSchemas } from './schemas/fuenteRecurso.schema.js';
import { regionalesSchemas } from './schemas/regional.schema.js';
import { supervisorSchemas } from './schemas/supervisor.schemas.js';
import { codigoRubrosSchemas } from './schemas/codigo_rubros.schemas.js';
import { coordinadoresGrupoMixtoSchemas } from './schemas/coordinadorGrupoMixto.schema.js';
import { rubrosSchemas } from './schemas/rubro.schema.js';
import { cdpSchemas } from './schemas/cdp.schemas.js';
import { ordenadoresSchemas } from './schemas/ordenador.schema.js';
import { resolucionesSchemas } from './schemas/resolucion.schema.js';
import { obligacionesSchemas } from './schemas/obligacion.schema.js';
import { educacionFormalSchemas } from './schemas/educacion_formal.Schema.js';
import { estado_FormacionSchemas } from './schemas/estado_formacion.schema.js';
import { necesidad_contratacionSchemas } from './schemas/necesidad_contratacion.schema.js';
import { tipo_documentoSchemas } from './schemas/tipo_documento.schema.js';
import { nivel_formacionSchemas } from './schemas/nivel_formacion.schema.js';
import { informacionPersonalSchemas } from './schemas/informacion_personales.Schema.js';
import { educacionInformalSchemas } from './schemas/educacion_informales.Schema.js';
import { certificacionesSchema } from './schemas/certificaciones.Schema.js';
import { experienciasLaboralSchemas } from './schemas/experiencias_laboral.Schema.js';
import { informacionesPreviasContratosSchemas } from './schemas/informaciones_previas_contratos.Schema.js';
import { hojasDeVidaSchemas } from './schemas/hoja_de_vida.Schema.js';
import { titulo_formacionSchemas } from './schemas/titulo_formacion.Schema.js';
import { registrosPresupuestalesSchemas } from './schemas/registros_presupuestales.schema.js';

export default {
    openapi: '3.0.0',
    info: {
        title: process.env.APP_NAME || 'API Acia - V1',
        version: '1.0.0',
        description: 'Documentación de la versión 1',
    },
    servers: [
        {
            url: process.env.APP_URL || 'http://localhost:3000/api/v1',
            description: 'Servidor local'
        }
    ],
    paths: {
        ...loginPaths,
        ...registerPaths,
        ...forgotPasswordPaths,
        ...resetPasswordPaths,
        ...refreshTokenPaths,
        ...cuentaPaths,
        ...rolesPaths,
        ...permisosPaths,
        ...usuariosPaths,
        ...centrosPaths,
        ...areasPaths,
        ...coordinadoresPaths,
        ...cargosPaths,
        ...dependenciasPaths,
        ...fuenteRecursosPaths,
        ...regionalesPaths,
        ...supervisorPaths,
        ...coordinadoresGrupoMixtoPaths,
        ...codigoRubrosPaths,
        ...rubrosPaths,
        ...cdpPaths,
        ...ordenadoresPaths,
        ...resolucionesPaths,
        ...obligacionesPaths,
        ...educacionFormalPaths,
        ...estadoFormacionesPaths,
        ...necesidad_contratacionPaths,
        ...tipo_documentoPaths,
        ...nivel_formacionPaths,
        ...informacionPersonalPaths,
        ...educacionInformalPaths,
        ...certificacionesPath,
        ...experienciasLaboralPath,
        ...informacionesPreviasContratosPath,
        ...hojasDeVidaPath,
        ...tituloFormacionPaths,
        ...registrosPresupuestalesPaths
    },
    components: {
        schemas: {
            ...rolesSchemas,
            ...permisosSchemas,
            ...centrosSchemas,
            ...areasSchemas,
            ...coordinadoresSchemas,
            ...cargosSchemas,
            ...dependenciasSchemas,
            ...fuenteRecursosSchemas,
            ...regionalesSchemas,
            ...supervisorSchemas,
            ...coordinadoresGrupoMixtoSchemas,
            ...codigoRubrosSchemas,
            ...rubrosSchemas,
            ...cdpSchemas,
            ...ordenadoresSchemas,
            ...resolucionesSchemas,
            ...obligacionesSchemas,
            ...educacionFormalSchemas,
            ...estado_FormacionSchemas,
            ...necesidad_contratacionSchemas,
            ...tipo_documentoSchemas,
            ...nivel_formacionSchemas,
            ...informacionPersonalSchemas,
            ...educacionInformalSchemas,
            ...certificacionesSchema,
            ...experienciasLaboralSchemas,
            ...informacionesPreviasContratosSchemas,
            ...hojasDeVidaSchemas,
            ...titulo_formacionSchemas,
            ...registrosPresupuestalesSchemas
        }
    }
};
