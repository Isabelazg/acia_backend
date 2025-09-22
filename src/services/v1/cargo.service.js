import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getCargosRepository,
  getListCargosRepository,
  storeCargoRepository,
  showCargoRepository,
  updateCargoRepository,
  findCargoByNombreRepository,
  findCargoByNombreExcludingIdRepository,
  checkCargoHasUsersRepository,
  getCentrosByCargoRepository,
  checkCargoHasCentrosRepository
} from "../../repositories/cargo.repository.js";
import Cargo from "../../models/cargo.model.js";
import Centro from "../../models/centro.model.js";
import CargoCentro from "../../models/cargoCentro.model.js";

/**
 * Servicio para obtener cargos con filtros, orden y paginación usando el repositorio.
 */
export const getCargosService = async (req) => {
  const {
    id,
    nombre,
    estado,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  let estadoBoolean = estado;
  if (estado === 'true') estadoBoolean = true;
  if (estado === 'false') estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await getCargosRepository({
    id,
    nombre,
    estado: estadoBoolean,
    centro_filtro: req.centro_filtro, // <-- AGREGAR FILTRO DE CENTRO
    sortBy,
    order,
    page,
    limit
  });

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

  return {
    data,
    count,
    meta,
    links,
    isPaginated: true,
  };
};

/**
 * Servicio para obtener la lista de cargos.
 */
export const getListCargosService = async (req) => {
  const { estado, sortBy = "id", order = "ASC" } = req.query;

  return await getListCargosRepository(estado, sortBy, order, req.centro_filtro);
}

/**
 * Servicio para crear un nuevo cargo.
 */
export const storeCargoService = async (data) => {
  const { nombre, estado, centros } = data;

  // Validar unicidad del nombre
  const existingCargo = await Cargo.findOne({ where: { nombre } });
  if (existingCargo) {
    const error = new Error("El nombre ya está en uso.");
    error.code = "DUPLICATE_CARGO_NAME";
    throw error;
  }

  // Validar que los centros existan
  const centrosEncontrados = await Centro.findAll({
    where: { id: centros }
  });
  if (centrosEncontrados.length !== centros.length) {
    const error = new Error("Uno o más centros no existen.");
    error.code = "CENTRO_NOT_FOUND";
    throw error;
  }

  // Crear el cargo
  const cargo = await Cargo.create({ nombre, estado });

  // Asociar los centros en la tabla intermedia
  const relaciones = centros.map(centro_id => ({
    cargo_id: cargo.id,
    centro_id
  }));
  await CargoCentro.bulkCreate(relaciones);

  // Recargar cargo incluyendo objetos de centros para devolver estructura completa
  await cargo.reload({
    include: [
      {
        model: Centro,
        as: 'centros',
        through: { attributes: [] }
      }
    ]
  });

  return cargo;
};

/**
 * Servicio para mostrar un cargo por id.
 */
export const showCargoService = async (id) => {
  return await showCargoRepository(id);
};

/**
 * Servicio para actualizar un cargo.
 */
export const updateCargoService = async (id, data) => {
  const cargo = await showCargoRepository(id);
  if (!cargo) {
    const error = new Error("Cargo no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otro cargo con el mismo nombre
  if (data.nombre && data.nombre !== cargo.nombre) {
    const existingCargoByNombre = await findCargoByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updateCargoRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un cargo.
 */
export const changeCargoStatusService = async (id, nuevoEstado) => {
  const cargo = await showCargoRepository(id);
  if (!cargo) {
    const error = new Error("Cargo no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  let estadoBoolean;
  if (typeof nuevoEstado === 'boolean') {
    estadoBoolean = nuevoEstado;
  } else if (nuevoEstado === 'true') {
    estadoBoolean = true;
  } else if (nuevoEstado === 'false') {
    estadoBoolean = false;
  } else {
    estadoBoolean = !cargo.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checkCargoHasCentrosRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el cargo porque tiene centros asociados");
      error.code = "CARGO_HAS_CENTROS";
      throw error;
    }
  }

  const updatedCargo = await updateCargoRepository(id, { estado: estadoBoolean });
  return updatedCargo;
};

/**
 * Servicio para obtener los centros de un cargo por su ID.
 */
export const getCentrosByCargoService = async (cargoId, estado, sortBy = "id", order = "ASC") => {
  return await getCentrosByCargoRepository(cargoId, estado, sortBy, order);
};