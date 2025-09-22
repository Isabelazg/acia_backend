import { successResponse, errorResponse } from '../../../utils/response.util.js';
import {
  getRubrosService,
  getListRubrosService,
  showRubroService,
  storeRubroService,
  updateRubroService,
  deleteRubroService,
} from '../../../services/v1/rubro.service.js';

export const getRubros = async (req, res) => {
  try {

    const { data, meta, links } = await getRubrosService(req);

    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, 'Error al obtener los rubros', 500, [{ code: 'GET_RUBROS_ERROR', detail: error.message }]);
  }
};

export const getListRubros = async (req, res) => {
  try {

    const { data, count } = await getListRubrosService(req);

    return successResponse(
      res,
      data.map((rubro) => ({
        id: rubro.id,
        codigo_rubro_id: rubro.codigo_rubro_id,
        descripcion: rubro.descripcion,
      })),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, 'Error al obtener la lista de rubros', 500, [
      {
        code: 'GET_LIST_RUBROS_ERROR',
        detail: error.message,
      },
    ]);
  }
};

export const showRubro = async (req, res) => {
  try {
    const rubro = await showRubroService(req.params.id);
    if (!rubro) {
      return errorResponse(res, 'Rubro no encontrado', 404, [{ code: 'RUBRO_NOT_FOUND', detail: `No existe un rubro con ID ${req.params.id}` }]);
    }
    return successResponse(res, rubro, 200);
  } catch (error) {
    return errorResponse(res, 'Error al obtener el rubro', 500, [{ code: 'SHOW_RUBRO_ERROR', detail: error.message }]);
  }
};

export const storeRubro = async (req, res) => {
  try {
    const rubro = await storeRubroService(req.body);
    return successResponse(res, rubro, 201, { message: 'Rubro creado exitosamente.' });
  } catch (error) {
    return errorResponse(res, 'Error al crear el rubro', 500, [{ code: 'CREATE_RUBRO_ERROR', detail: error.message }]);
  }
};

export const updateRubro = async (req, res) => {
  try {
    const rubro = await updateRubroService(req.params.id, req.body);
    return successResponse(res, rubro, 200, { message: 'Rubro actualizado exitosamente.' });
  } catch (error) {
    return errorResponse(res, 'Error al actualizar el rubro', 500, [{ code: 'UPDATE_RUBRO_ERROR', detail: error.message }]);
  }
};

export const deleteRubro = async (req, res) => {
  try {
    await deleteRubroService(req.params.id);
    return successResponse(res, null, 200, { message: 'Rubro eliminado exitosamente.' });
  } catch (error) {
    let status = 500;
    if (error.code === 'RUBRO_ASOCIADO_CDP') status = 400;
    if (error.code === 'NOT_FOUND') status = 404;
    return errorResponse(res, error.message, status, [{ code: error.code, detail: error.message }]);
  }
};