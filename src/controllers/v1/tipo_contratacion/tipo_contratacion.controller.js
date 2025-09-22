import { successResponse, errorResponse } from '../../../utils/response.util.js';
import {
  getTipoContratacionService,
  getListTipoContratacionService,
  storeTipoContratacionService,
  updateTipoContratacionService,
  deleteTipoContratacionService,
} from '../../../services/v1/tipo_contratacion.service.js';

export const getTipoContratacion = async (req, res) => {
  try {
    const { data, meta, links } = await getTipoContratacionService(req);

    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, 'Error al obtener los tipos de contratación', 500, [{ code: 'GET_TIPO_CONTRATACION_ERROR', detail: error.message }]);
  }
};

export const getListTipoContratacion = async (req, res) => {
  try {
    const { estado, sortBy = 'id', order = 'ASC' } = req.query;

    const { data, count } = await getListTipoContratacionService(estado, sortBy, order);

    return successResponse(res, data, 200, { count });
  } catch (error) {
    return errorResponse(res, 'Error al obtener la lista de tipos de contratación', 500, [{ code: 'GET_LIST_TIPO_CONTRATACION_ERROR', detail: error.message }]);
  }
};

export const storeTipoContratacion = async (req, res) => {
  try {
    const tipoContratacion = await storeTipoContratacionService(req.body);

    return successResponse(res, tipoContratacion, 201, { message: 'Tipo de contratación creado exitosamente' });
  } catch (error) {
    return errorResponse(res, 'Error al crear el tipo de contratación', 500, [{ code: 'CREATE_TIPO_CONTRATACION_ERROR', detail: error.message }]);
  }
};

export const updateTipoContratacion = async (req, res) => {
  try {
    const tipoContratacion = await updateTipoContratacionService(req.params.id, req.body);

    return successResponse(res, tipoContratacion, 200, { message: 'Tipo de contratación actualizado exitosamente' });
  } catch (error) {
    if (error.code === 'DEPENDENT_AUTORIZACIONES_EXIST') {
      return errorResponse(res, 'No se puede editar el tipo de contratación porque está asociado a autorizaciones', 409, [{ code: 'DEPENDENT_AUTORIZACIONES_EXIST', detail: error.message }]);
    }
    return errorResponse(res, 'Error al actualizar el tipo de contratación', 500, [{ code: 'UPDATE_TIPO_CONTRATACION_ERROR', detail: error.message }]);
  }
};

export const deleteTipoContratacion = async (req, res) => {
  try {
    const tipoContratacion = await deleteTipoContratacionService(req.params.id);

    return successResponse(res, tipoContratacion, 200, { message: 'Tipo de contratación eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'DEPENDENT_AUTORIZACIONES_EXIST') {
      return errorResponse(res, 'No se puede eliminar el tipo de contratación porque está asociado a autorizaciones', 409, [{ code: 'DEPENDENT_AUTORIZACIONES_EXIST', detail: error.message }]);
    }
    return errorResponse(res, 'Error al eliminar el tipo de contratación', 500, [{ code: 'DELETE_TIPO_CONTRATACION_ERROR', detail: error.message }]);
  }
};