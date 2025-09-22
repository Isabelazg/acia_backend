import { findUsuarioById, findPermisosByUsuarioId, updateUsuario } from "../../repositories/usuario.repository.js";

export const getMyAccountService = async (usuarioId) => {
    if (!usuarioId) {
        return {
            success: false,
            message: "Usuario no encontrado",
            status: 404,
            errors: [
                {
                    code: "USER_NOT_FOUND",
                    detail: "No existe un usuario con la información proporcionada.",
                },
            ],
        };
    }

    const usuario = await findUsuarioById(usuarioId);

    if (!usuario) {
        return {
            success: false,
            message: "Usuario no encontrado",
            status: 404,
            errors: [
                {
                    code: "USER_NOT_FOUND",
                    detail: "No existe un usuario con la información proporcionada.",
                },
            ],
        };
    }

    const userData = {
        id: usuario.id,
        documento: usuario.documento,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        telefono: usuario.telefono,
        estado: usuario.estado,
        rol: usuario.rol ? {
            id: usuario.rol_id,
            nombre: usuario.rol.nombre
        } : null,
        created_at: usuario.created_at,
        updated_at: usuario.updated_at
    };

    return {
        success: true,
        data: userData
    };
}

export const getMyPermissionsService = async (usuarioId) => {
    if (!usuarioId) {
        return {
            success: false,
            message: "Usuario no encontrado",
            status: 404,
            errors: [
                {
                    code: "USER_NOT_FOUND",
                    detail: "No existe un usuario con la información proporcionada.",
                },
            ],
        };
    }

    // Trae todos los permisos (directos y por rol) usando el repositorio
    const permisos = await findPermisosByUsuarioId(usuarioId);

    if (!permisos || permisos.length === 0) {
        return {
            success: false,
            message: "No se encontraron permisos para el usuario",
            status: 404,
            errors: [
                {
                    code: "PERMISSIONS_NOT_FOUND",
                    detail: "El usuario no tiene permisos asignados directamente ni por rol.",
                },
            ],
        };
    }

    return {
        success: true,
        data: permisos
    };
};

export const updateMyAccountService = async (usuarioId, updateData) => {
    if (!usuarioId) {
        return {
            success: false,
            message: "Usuario no encontrado",
            status: 404,
            errors: [
                {
                    code: "USER_NOT_FOUND",
                    detail: "No existe un usuario con la información proporcionada.",
                },
            ],
        };
    }

    try {
        // Verificar que el usuario existe
        const existingUser = await findUsuarioById(usuarioId);
        if (!existingUser) {
            return {
                success: false,
                message: "Usuario no encontrado",
                status: 404,
                errors: [
                    {
                        code: "USER_NOT_FOUND",
                        detail: "No existe un usuario con la información proporcionada.",
                    },
                ],
            };
        }

        // Preparar los datos para actualizar
        const dataToUpdate = {};
        
        if (updateData.documento) dataToUpdate.documento = updateData.documento;
        if (updateData.nombres) dataToUpdate.nombres = updateData.nombres;
        if (updateData.apellidos) dataToUpdate.apellidos = updateData.apellidos;
        if (updateData.nombreUsuario) dataToUpdate.nombre_usuario = updateData.nombreUsuario;
        if (updateData.correo) dataToUpdate.correo = updateData.correo;
        if (updateData.telefono) dataToUpdate.telefono = updateData.telefono;

        // Actualizar el usuario
        const updatedUser = await updateUsuario(usuarioId, dataToUpdate);

        // Preparar los datos de respuesta
        const userData = {
            id: updatedUser.id,
            documento: updatedUser.documento,
            nombres: updatedUser.nombres,
            apellidos: updatedUser.apellidos,
            nombre_usuario: updatedUser.nombre_usuario,
            correo: updatedUser.correo,
            telefono: updatedUser.telefono,
            estado: updatedUser.estado,
            rol: updatedUser.rol ? {
                id: updatedUser.rol_id,
                nombre: updatedUser.rol.nombre
            } : null,
            created_at: updatedUser.created_at,
            updated_at: updatedUser.updated_at
        };

        return {
            success: true,
            data: userData,
            message: "Cuenta actualizada exitosamente"
        };

    } catch (error) {
        return {
            success: false,
            message: "Error interno del servidor al actualizar la cuenta",
            status: 500,
            errors: [
                {
                    code: "UPDATE_ACCOUNT_ERROR",
                    detail: error.message,
                },
            ],
        };
    }
};