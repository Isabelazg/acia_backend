import { successResponse, errorResponse } from '../../../utils/response.util.js';
import {
  getSupervisoresService,
  getListSupervisoresService,
  storeSupervisorService,
  updateSupervisorService,
  showSupervisorService,
  changeSupervisorStatusService,
} from '../../../services/v1/supervisores.service.js';

/**
 * Controlador para obtener supervisores con filtros, orden y paginación usando servicios.
 */
export const getSupervisores = async (req, res) => {
  try {
    const { data, meta, links } = await getSupervisoresService(req);

    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, 'Error al obtener los supervisores', 500, [
      {
        code: 'GET_SUPERVISORES_ERROR',
        detail: error.message
      },
    ]);
  }
};

export const getListSupervisores = async (req, res) => {
  try {
    const { data, count } = await getListSupervisoresService(req);

    return successResponse(
      res,
      data.map((supervisor) => ({
        id: supervisor.id,
        documento: supervisor.documento,
        nombres: supervisor.nombres,
        apellidos: supervisor.apellidos,
        sexo: supervisor.sexo,
        correo: supervisor.correo,
        cargo: supervisor.cargo,
        estado: supervisor.estado, // <-- agrega este campo
      })),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, 'Error al obtener la lista de supervisores', 500, [
      {
        code: 'GET_LIST_SUPERVISORES_ERROR',
        detail: error.message
      },
    ]);
  }
};

export const storeSupervisor = async (req, res) => {
  try {
    const supervisor = await storeSupervisorService(req.body);
    return successResponse(
      res,
      {
        id: supervisor.id,
        documento: supervisor.documento,
        nombres: supervisor.nombres,
        apellidos: supervisor.apellidos,
        sexo: supervisor.sexo,
        correo: supervisor.correo,
        cargo: supervisor.cargo,
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at,
      },
      201
    );
  } catch (error) {
    return errorResponse(res, 'Error al crear el supervisor', 500, [
      { code: 'CREATE_SUPERVISOR_ERROR', detail: error.message },
    ]);
  }
};

export const updateSupervisor = async (req, res) => {
  try {
    const supervisor = await updateSupervisorService(req.params.id, req.body);
    return successResponse(
      res,
      {
        id: supervisor.id,
        documento: supervisor.documento,
        nombres: supervisor.nombres,
        apellidos: supervisor.apellidos,
        sexo: supervisor.sexo,
        correo: supervisor.correo,
        cargo: supervisor.cargo,
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at,
      },
      200
    );
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return errorResponse(res, 'Supervisor no encontrado', 404, [
        { code: 'SUPERVISOR_NOT_FOUND', detail: `No existe un supervisor con ID ${req.params.id}` },
      ]);
    }
    return errorResponse(res, 'Error al actualizar el supervisor', 500, [
      { code: 'UPDATE_SUPERVISOR_ERROR', detail: error.message },
    ]);
  }
};

export const showSupervisor = async (req, res) => {
  try {
    const supervisor = await showSupervisorService(req.params.id);
    if (!supervisor) {
      return errorResponse(res, 'Supervisor no encontrado', 404, [
        { code: 'SUPERVISOR_NOT_FOUND', detail: `No existe un supervisor con ID ${req.params.id}` },
      ]);
    }
    return successResponse(
      res,
      {
        id: supervisor.id,
        documento: supervisor.documento,
        nombres: supervisor.nombres,
        apellidos: supervisor.apellidos,
        sexo: supervisor.sexo,
        correo: supervisor.correo,
        cargo: supervisor.cargo,
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, 'Error al obtener el supervisor', 500, [
      { code: 'SHOW_SUPERVISOR_ERROR', detail: error.message },
    ]);
  }
};

export const changeSupervisorStatus = async (req, res) => {
  try {
    const supervisor = await changeSupervisorStatusService(req.params.id, req.body.estado);
    if (!supervisor) {
      return errorResponse(res, 'Supervisor no encontrado', 404, [
        { code: 'SUPERVISOR_NOT_FOUND', detail: `No existe un supervisor con ID ${req.params.id}` },
      ]);
    }
    return res.status(200).json({
      message: "Cambio de estado realizado correctamente",
      data: {
        id: supervisor.id,
        documento: supervisor.documento,
        nombres: supervisor.nombres,
        apellidos: supervisor.apellidos,
        sexo: supervisor.sexo,
        correo: supervisor.correo,
        cargo: supervisor.cargo,
        estado: supervisor.estado, // <-- asegúrate de incluirlo aquí
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at,
      }
    });
  } catch (error) {
    return errorResponse(res, 'Error al cambiar el estado del supervisor', 500, [
      { code: 'CHANGE_SUPERVISOR_STATUS_ERROR', detail: error.message },
    ]);
  }
};
