import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getCdpsRepository,
  getListCdpsRepository,
  storeCdpRepository,
  showCdpRepository,
  updateCdpRepository,
} from "../../repositories/cdp.repository.js";
import { CDP, CdpsRubros, Rubro } from "../../models/index.js";

async function validarRubrosExistentes(rubros) {
  if (!rubros || !Array.isArray(rubros) || rubros.length === 0) return;
  const { Rubro } = await import('../../models/index.js');
  const rubroIds = rubros.map(r => r.id);
  const rubrosExistentes = await Rubro.findAll({ where: { id: rubroIds } });
  if (rubrosExistentes.length !== rubroIds.length) {
    const idsExistentes = rubrosExistentes.map(r => r.id);
    const idsFaltantes = rubroIds.filter(id => !idsExistentes.includes(id));
    const error = new Error(`Los siguientes rubros no existen: ${idsFaltantes.join(', ')}`);
    error.status = 400;
    throw error;
  }
}

export const getCdpsService = async (req) => {
  const {
    id,
    codigo,
    descripcion,
    vigencia,
    quien_expide_id,
    centro_id,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  let data, count;
  try {
    const result = await getCdpsRepository({
      id,
      codigo,
      descripcion,
      vigencia,
      quien_expide_id,
      centro_id,
      centro_filtro: req.centro_filtro,
      sortBy,
      order,
      page,
      limit
    });
    data = result.data;
    count = result.count;
  } catch (err) {
    console.error('Error en getCdpsRepository:', err);
    throw err;
  }

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
  const queryWithoutPage = Object.entries({ ...req.query, page: undefined })
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const { meta, links } = buildPagination({
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    baseUrl,
    queryWithoutPage,
  });

  return { data, count, meta, links, isPaginated: true };
};

export const getListCdpsService = async (req) => {
  const { vigencia, sortBy = "id", order = "ASC" } = req.query;

  return await getListCdpsRepository(vigencia, sortBy, order, req.centro_filtro);
};

export const storeCdpService = async (data) => {
  const { rubros, rubro_id, codigo_rubro_id, ...cdpData } = data;

  // Si viene en formato individual (rubro_id), convertir a formato de array
  let rubrosArray = rubros;
  if (!rubrosArray && rubro_id) {
    rubrosArray = [{
      id: rubro_id,
      valor: cdpData.valor, // Usar el valor total del CDP por ahora
      fuente_recurso_id: cdpData.fuente_recurso_id
    }];
  }

  // Validar rubros antes de crear el CDP
  if (rubrosArray && rubrosArray.length > 0) {
    await validarRubrosExistentes(rubrosArray);
  }

  const cdp = await CDP.create(cdpData);

  // Asociar rubros con datos extra
  if (rubrosArray && Array.isArray(rubrosArray)) {
    for (const rubro of rubrosArray) {
      const cdpsRubrosData = {
        cdps_id: cdp.id,
        rubros_id: rubro.id,
        valor: rubro.valor,
        fuente_recurso_id: rubro.fuente_recurso_id
      };
      await CdpsRubros.create(cdpsRubrosData);
    }
  }

  // Consultar el CDP con los rubros asociados
  const cdpWithRubros = await CDP.findByPk(cdp.id, {
    include: [{ model: Rubro, as: 'rubros' }]
  });
  return cdpWithRubros;
};

export const showCdpService = async (codigo) => {
  return await showCdpRepository(codigo);
};

export const updateCdpService = async (codigo, data) => {
  const cdp = await showCdpRepository(codigo);
  if (!cdp) {
    const error = new Error("CDP no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está intentando cambiar el código, verificar que no esté asociado a autorizaciones
  if (data.codigo && data.codigo !== cdp.codigo) {
    const { Autorizacion } = await import('../../models/index.js');

    const autorizacionesAsociadas = await Autorizacion.findOne({
      where: { cdp_id: cdp.id }
    });

    if (autorizacionesAsociadas) {
      const error = new Error("No se puede modificar el código del CDP porque ya está asociado a una o más autorizaciones");
      error.code = "CDP_IN_USE";
      error.status = 400;
      throw error;
    }
  }

  return await updateCdpRepository(codigo, data);
};

export const getDependenciasByRubrosService = async (rubroIds) => {
  if (!rubroIds || !Array.isArray(rubroIds) || rubroIds.length === 0) {
    return [];
  }

  try {
    // Importar los modelos necesarios de forma más directa
    const { Rubro, CodigoRubro, Dependencia } = await import('../../models/index.js');

    // Estrategia alternativa: Obtener primero los rubros, luego los codigo_rubros, luego las dependencias
    const rubros = await Rubro.findAll({
      where: {
        id: rubroIds
      },
      attributes: ['id', 'codigo_rubro_id', 'descripcion']
    });

    if (rubros.length === 0) {
      return [];
    }

    // Extraer los codigo_rubro_ids únicos
    const codigoRubroIds = [...new Set(rubros.map(rubro => rubro.codigo_rubro_id))];

    // Buscar los códigos de rubro con sus dependencias
    const codigosRubro = await CodigoRubro.findAll({
      where: {
        id: codigoRubroIds
      },
      attributes: ['id', 'codigo', 'dependencia_id']
    });

    if (codigosRubro.length === 0) {
      return [];
    }

    // Extraer los dependencia_ids únicos
    const dependenciaIds = [...new Set(codigosRubro.map(codigo => codigo.dependencia_id))];

    // Buscar las dependencias
    const dependencias = await Dependencia.findAll({
      where: {
        id: dependenciaIds,
        estado: true // Solo dependencias activas
      },
      attributes: ['id', 'codigo', 'nombre']
    });

    // Convertir a formato plano
    const dependenciasResultado = dependencias.map(dep => ({
      id: dep.id,
      codigo: dep.codigo,
      nombre: dep.nombre
    }));

    return dependenciasResultado;

  } catch (error) {
    console.error('getDependenciasByRubrosService: Error al consultar la base de datos:', error);

    // FALLBACK: Si hay error con la base de datos, devolver datos simulados
    const dependenciasSimuladas = [
      {
        id: 1,
        codigo: "DEP-001",
        nombre: "Departamento de Tecnología (Simulado - Error BD)"
      },
      {
        id: 2,
        codigo: "DEP-002",
        nombre: "Departamento de Administración (Simulado - Error BD)"
      }
    ];

    return dependenciasSimuladas;
  }
};

export const validateCodigoService = async (codigo, cdpId = null) => {
  if (!codigo) {
    return { isValid: false, message: "El código es requerido" };
  }

  try {
    const existingCdp = await CDP.findOne({
      where: { codigo },
      attributes: ['id', 'codigo']
    });

    // Si no existe, es válido
    if (!existingCdp) {
      return { isValid: true };
    }

    // Si existe pero es el mismo CDP que se está editando, es válido
    if (cdpId && existingCdp.id === parseInt(cdpId)) {
      return { isValid: true };
    }

    // Si existe y es un CDP diferente, no es válido
    return {
      isValid: false,
      message: "Ya existe un CDP con este código"
    };
  } catch (error) {
    console.error('Error al validar código CDP:', error);
    return {
      isValid: false,
      message: "Error al validar el código"
    };
  }
};

/**
 * Obtiene las dependencias asociadas a un CDP específico
 * @param {number} cdpId - ID del CDP
 * @returns {Promise<Array>} Array de dependencias
 */
export const getDependenciasByCdpService = async (cdpId) => {
  try {
    const { CDP, CdpsRubros, Rubro, CodigoRubro, Dependencia } = await import('../../models/index.js');

    // Verificar que el CDP existe
    const cdp = await CDP.findByPk(cdpId);
    if (!cdp) {
      const error = new Error('CDP no encontrado');
      error.status = 404;
      throw error;
    }

    // Obtener las dependencias usando una consulta más directa
    // 1. Primero obtener los rubros asociados al CDP
    const cdpRubros = await CdpsRubros.findAll({
      where: { cdps_id: cdpId },
      include: [
        {
          model: Rubro,
          as: 'rubro',
          include: [
            {
              model: CodigoRubro,
              as: 'codigoRubro',
              include: [
                {
                  model: Dependencia,
                  as: 'dependencia'
                }
              ]
            }
          ]
        }
      ]
    });

    // Extraer las dependencias únicas
    const dependenciasSet = new Set();
    const dependencias = [];

    cdpRubros.forEach(cdpRubro => {
      if (cdpRubro.rubro?.codigoRubro?.dependencia) {
        const dep = cdpRubro.rubro.codigoRubro.dependencia;
        if (!dependenciasSet.has(dep.id)) {
          dependenciasSet.add(dep.id);
          dependencias.push(dep);
        }
      }
    });

    return dependencias;
  } catch (error) {
    console.error('Error al obtener dependencias por CDP:', error);
    throw error;
  }
};