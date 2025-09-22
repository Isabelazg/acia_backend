import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UsuarioRoutes from "./usuarios.routes.js";
import AreasRoutes from "./areas.routes.js";
import RolesRoutes from "./roles.routes.js";
import permisosRoutes from './permisos.routes.js';
import ProvinciasRoutes from "./provincias.routes.js";
import CiudadesRoutes from "./ciudades.routes.js";
import miCuentaRoutes from "./miCuenta.routes.js";
import centrosRoutes from './centros.routes.js';
import regionalesRoutes from './regionales.routes.js';
import cargosRoutes from './cargos.routes.js';
import dependenciasRoutes from './dependencias.routes.js';
import fuenteRecursosRoutes from './fuenteRecursos.routes.js';
import coordinadoresGrupoMixtoRoutes from './coordinadoresGrupoMixto.routes.js';
import coordinadoresRoutes from './coordinadores.routes.js';
import codigorubrosRoutes from './codigo_rubros.routes.js';
import rubrosRoutes from './rubros.routes.js';
import tipo_contratacionesRoutes from './tipo_contrataciones.routes.js';

import SupervisoresRoutes from "./supervisores.routes.js";
import cdpRoutes from './cdp.routes.js';
import centroUsuarioRoutes from './centroUsuario.routes.js';
import supervisoresRoutes from './supervisores.routes.js';
import ObligacionesRoutes from './obligaciones.routes.js';
import contratosRoutes from './contratos.routes.js';

import necesidadContratacionRoutes from './necesidad_contratacion.routes.js';
import tipoDocumento from "./tipo_documento.routes.js";
import nivelFormacion from "./nivel_formacion.routes.js";
import estado_formacionesRoutes from "./estado_formaciones.routes.js";
import educacion_formalRoutes from "./educacion_formal.routes.js";
import hojas_de_vidaRoutes from "./hoja_de_vida.route.js";
import ordenadoresRoutes from "./ordenadores.routes.js";
import resolucionesRoutes from "./resoluciones.routes.js";
import autorizacionesRoutes from "./autorizaciones.routes.js";
import regimenes_ivasRoutes from "./regimenes_ivas.routes.js";
import FormacionesComplementariasRoutes from "./formaciones_complementarias.routes.js";
import clasificacion_persona_naturalRoutes from "./clasificacion_persona_natural.routes.js";
import EducacionInformalRoutes from "./educacion_informales.routes.js";
import ExperienciaLaboralroutes from "./experiencias_laboral.routes.js";
import tipo_formacionRoutes from "./tipo_formacion.route.js";
import RegistrosPresupuestalesRoutes from "./registros_presupuestales.routes.js";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/usuario", UsuarioRoutes);
router.use("/centros", centrosRoutes);
router.use("/areas", AreasRoutes);
router.use("/regionales", regionalesRoutes);
router.use("/roles", RolesRoutes);
router.use('/permisos', permisosRoutes);
router.use("/provincias", ProvinciasRoutes);
router.use("/ciudades", CiudadesRoutes);
router.use("/mi-cuenta", miCuentaRoutes);
router.use('/cargos', cargosRoutes);
router.use("/dependencias", dependenciasRoutes);
router.use("/codigo-rubros", codigorubrosRoutes);
router.use("/rubros", rubrosRoutes);
router.use("/tipo-contrataciones", tipo_contratacionesRoutes);
router.use("/fuente-recursos", fuenteRecursosRoutes);
router.use("/coordinadores-grupo-mixto", coordinadoresGrupoMixtoRoutes);
router.use("/coordinadores", coordinadoresRoutes);
router.use("/codigo_rubros", codigorubrosRoutes);
router.use("/rubros", rubrosRoutes);
router.use("/cdps", cdpRoutes);
router.use("/supervisores", SupervisoresRoutes);
router.use('/centro-usuario', centroUsuarioRoutes);
router.use('/supervisores', supervisoresRoutes);
router.use("/obligaciones", ObligacionesRoutes);

router.use("/contratos", contratosRoutes);

router.use("/necesidad-contrataciones", necesidadContratacionRoutes);
router.use("/tipo-documentos", tipoDocumento);
router.use("/nivel-formaciones", nivelFormacion);
router.use("/estado-formaciones", estado_formacionesRoutes);
router.use("/educacion-formal", educacion_formalRoutes);
router.use("/hojas-de-vida", hojas_de_vidaRoutes);
router.use("/hojas-vida", hojas_de_vidaRoutes);
router.use("/ordenadores", ordenadoresRoutes);
router.use("/resoluciones", resolucionesRoutes);
router.use("/autorizaciones", autorizacionesRoutes);
router.use("/regimenes-ivas", regimenes_ivasRoutes);
router.use("/formaciones-complementarias", FormacionesComplementariasRoutes);
router.use("/clasificacion-persona-natural", clasificacion_persona_naturalRoutes);
router.use("/educacion-informales", EducacionInformalRoutes);
router.use("/experiencias-laborales", ExperienciaLaboralroutes);
router.use("/titulo-formacion", tipo_formacionRoutes)
router.use("/registros-presupuestales", RegistrosPresupuestalesRoutes )

export default router;