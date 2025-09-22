import { body } from "express-validator";
import { validateUniqueField } from "../../repositories/usuario.repository.js";

// Expresiones regulares
const onlyNumbers = /^[0-9]+$/;
const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const alphanumericUnderscore = /^[A-Za-z0-9_]+$/;

export const updateAccountValidator = [
    body("documento")
        .trim()
        .notEmpty().withMessage("El documento es requerido.")
        .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener entre 5 y 20 caracteres.")
        .matches(onlyNumbers).withMessage("El documento solo debe contener números.")
        .custom(async (documento, { req }) => {
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                throw new Error("Usuario no autenticado.");
            }
            
            const isAvailable = await validateUniqueField("documento", documento, usuarioId);
            if (!isAvailable) {
                throw new Error("Ya existe otro usuario con ese documento.");
            }
            return true;
        }),
    
    body("nombres")
        .trim()
        .notEmpty().withMessage("El nombre es requerido.")
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres.")
        .matches(onlyLetters).withMessage("El nombre solo debe contener letras."),
    
    body("apellidos")
        .trim()
        .notEmpty().withMessage("El apellido es requerido.")
        .isLength({ min: 3, max: 50 }).withMessage("El apellido debe tener entre 3 y 50 caracteres.")
        .matches(onlyLetters).withMessage("El apellido solo debe contener letras."),
    
    body("nombreUsuario")
        .trim()
        .notEmpty().withMessage("El nombre de usuario es requerido.")
        .isLength({ min: 4, max: 50 }).withMessage("El nombre de usuario debe tener entre 4 y 50 caracteres.")
        .matches(alphanumericUnderscore).withMessage("El nombre de usuario solo debe contener letras, números y guiones bajos.")
        .custom(async (nombreUsuario, { req }) => {
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                throw new Error("Usuario no autenticado.");
            }
            
            const isAvailable = await validateUniqueField("nombre_usuario", nombreUsuario, usuarioId);
            if (!isAvailable) {
                throw new Error("Ya existe otro usuario con ese nombre de usuario.");
            }
            return true;
        }),
    
    body("correo")
        .trim()
        .notEmpty().withMessage("El correo es requerido.")
        .isEmail().withMessage("El correo no es válido.")
        .isLength({ max: 100 }).withMessage("El correo debe tener máximo 100 caracteres.")
        .custom(async (correo, { req }) => {
            const usuarioId = req.usuario?.id;
            if (!usuarioId) {
                throw new Error("Usuario no autenticado.");
            }
            
            const isAvailable = await validateUniqueField("correo", correo, usuarioId);
            if (!isAvailable) {
                throw new Error("Ya existe otro usuario con ese correo.");
            }
            return true;
        }),
    
    body("telefono")
        .trim()
        .notEmpty().withMessage("El teléfono es requerido.")
        .isLength({ min: 10, max: 15 }).withMessage("El teléfono debe tener entre 10 y 15 dígitos.")
        .matches(onlyNumbers).withMessage("El teléfono solo debe contener números."),
        // Nota: Se removió la validación de unicidad para permitir teléfonos duplicados
];
