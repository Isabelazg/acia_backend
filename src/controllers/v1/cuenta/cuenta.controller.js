import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getMyAccountService, getMyPermissionsService, updateMyAccountService } from "../../../services/v1/cuenta.service.js";

/**
 * Controlador para obtener la información de mi cuenta con token de acceso.
 */
export const getMyAccount = async (req, res) => {
    try {
        const usuarioToken = req.usuario;

        const result = await getMyAccountService(usuarioToken?.id);

        if (!result.success) {
            return errorResponse(res, result.message, result.status, result.errors);
        }

        return successResponse(
            res,
            formatJsonApiData(result.data, [
                "id",
                "documento",
                "nombres",
                "apellidos",
                "nombre_usuario",
                "correo",
                "telefono",
                "estado",
                "rol",
                "created_at",
                "updated_at"
            ]),
            200
        );
    } catch (error) {
        return errorResponse(res, "Error al obtener la información de la cuenta", 500, [
            {
                code: "GET_ACCOUNT_ERROR",
                detail: error.message,
            },
        ]);
    }
};

/**
 * Controlador para obtener los permisos del usuario autenticado.
 */
export const getMyyPermissions = async (req, res) => {
    try {
        const usuarioToken = req.usuario;

        const result = await getMyPermissionsService(usuarioToken?.id);

        if (!result.success) {
            return errorResponse(res, result.message, result.status, result.errors);
        }

        // Permite que el servicio retorne el array de permisos directamente
        return successResponse(
            res,
            formatJsonApiData(result.data, ["id", "nombre", "descripcion"]),
            200
        );
    } catch (error) {
        return errorResponse(res, "Error al obtener los permisos de la cuenta", 500, [
            {
                code: "GET_PERMISSIONS_ERROR",
                detail: error.message,
            },
        ]);
    }
};

/**
 * Controlador para actualizar la información de mi cuenta.
 */
export const updateMyAccount = async (req, res) => {
    try {
        const usuarioToken = req.usuario;
        const updateData = req.body;

        const result = await updateMyAccountService(usuarioToken?.id, updateData);

        if (!result.success) {
            return errorResponse(res, result.message, result.status, result.errors);
        }

        return successResponse(
            res,
            formatJsonApiData(result.data, [
                "id",
                "documento",
                "nombres",
                "apellidos",
                "nombre_usuario",
                "correo",
                "telefono",
                "estado",
                "rol",
                "created_at",
                "updated_at"
            ]),
            200,
            result.message
        );
    } catch (error) {
        return errorResponse(res, "Error al actualizar la información de la cuenta", 500, [
            {
                code: "UPDATE_ACCOUNT_ERROR",
                detail: error.message,
            },
        ]);
    }
};