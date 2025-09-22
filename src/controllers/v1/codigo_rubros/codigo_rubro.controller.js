import { errorResponse, successResponse } from '../../../utils/response.util.js';
import {
  getCodigoRubrosService,
  getListCodigoRubrosService,
  showCodigoRubroService,
  storeCodigoRubroService,
  updateCodigoRubroService,
  deleteCodigoRubroService,
} from '../../../services/v1/codigo_rubro.service.js';

export const getCodigoRubros = async (req, res) => {
  try {

    const { data, meta, links } = await getCodigoRubrosService(req);

    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, 'Error al obtener los códigos de rubros', 500, [{ code: 'GET_CODIGO_RUBROS_ERROR', detail: error.message }]);
  }
};

export const getListCodigoRubros = async (req, res) => {
  try {

    const { data, count } = await getListCodigoRubrosService(req);

    return successResponse(res, data, 200, { count });
  } catch (error) {
    return errorResponse(res, 'Error al obtener la lista de códigos de rubros', 500, [
      {
        code: 'GET_LIST_CODIGO_RUBROS_ERROR',
        detail: error.message,
      },
    ]);
  }
};

export const showCodigoRubro = async (req, res) => {
  try {
    const codigoRubro = await showCodigoRubroService(req.params.id);
    if (!codigoRubro) {
      return errorResponse(res, 'Código de rubro no encontrado', 404, [{ code: 'CODIGO_RUBRO_NOT_FOUND', detail: `No existe un código de rubro con ID ${req.params.id}` }]);
    }
    return successResponse(res, codigoRubro, 200);
  } catch (error) {
    return errorResponse(res, 'Error al obtener el código de rubro', 500, [{ code: 'SHOW_CODIGO_RUBRO_ERROR', detail: error.message }]);
  }
};

export const storeCodigoRubro = async (req, res) => {
  try {
    const codigoRubro = await storeCodigoRubroService(req.body);
    return successResponse(res, codigoRubro, 201, { message: 'Código de rubro creado exitosamente' });
  } catch (error) {
    return errorResponse(res, 'Error al crear el código de rubro', 500, [{ code: 'CREATE_CODIGO_RUBRO_ERROR', detail: error.message }]);
  }
};

export const updateCodigoRubro = async (req, res) => {
  try {
    const codigoRubro = await updateCodigoRubroService(req.params.id, req.body);
    return successResponse(res, codigoRubro, 200, { message: 'Código de rubro actualizado exitosamente' });
  } catch (error) {
    return errorResponse(res, 'Error al actualizar el código de rubro', 500, [{ code: 'UPDATE_CODIGO_RUBRO_ERROR', detail: error.message }]);
  }
};

export const deleteCodigoRubro = async (req, res) => {
  try {
    const codigoRubro = await deleteCodigoRubroService(req.params.id);
    if (!codigoRubro) {
      return errorResponse(res, 'Código de rubro no encontrado', 404, [{ code: 'CODIGO_RUBRO_NOT_FOUND', detail: `No existe un código de rubro con ID ${req.params.id}` }]);
    }
    return successResponse(res, codigoRubro, 200, { message: 'Código de rubro eliminado exitosamente' });
  } catch (error) {
    return errorResponse(res, 'Error al eliminar el código de rubro', 500, [{ code: 'DELETE_CODIGO_RUBRO_ERROR', detail: error.message }]);
  }
};