import { body } from "express-validator";
import { Op } from "sequelize";
import Usuario from "../../models/usuario.model.js";
import Rol from "../../models/rol.model.js";

// Expresiones regulares
const onlyNumbers = /^[0-9]+$/;
const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

export const registerUserValidator = [
    body("documento")
        .trim()
        .notEmpty().withMessage("El documento es requerido.")
        .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener entre 5 y 20 caracteres.")
        .matches(onlyNumbers).withMessage("El documento solo debe contener números.")
        .custom(async (documento) => {
            const exists = await Usuario.findOne({ where: { documento } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese documento.");
            }
            return true;
        }),
    body("nombres")
        .trim()
        .notEmpty().withMessage("El nombre es requerido.")
        .isLength({ max: 50 }).withMessage("El nombre debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El nombre solo debe contener letras."),
    body("apellidos")
        .trim()
        .notEmpty().withMessage("El apellido es requerido.")
        .isLength({ max: 50 }).withMessage("El apellido debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El apellido solo debe contener letras."),
    body("nombre_usuario")
        .trim()
        .notEmpty().withMessage("El nombre de usuario es requerido.")
        .isLength({ max: 50 }).withMessage("El nombre de usuario debe tener máximo 50 caracteres.")
        .custom(async (nombre_usuario) => {
            const exists = await Usuario.findOne({ where: { nombre_usuario } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese nombre de usuario.");
            }
            return true;
        }),
    body("correo")
        .trim()
        .notEmpty().withMessage("El correo es requerido.")
        .isEmail().withMessage("El correo no es válido.")
        .isLength({ max: 100 }).withMessage("El correo debe tener máximo 100 caracteres.")
        .custom(async (correo) => {
            const exists = await Usuario.findOne({ where: { correo } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese correo.");
            }
            return true;
        }),
    body("telefono")
        .optional()
        .trim()
        .isLength({ max: 15 }).withMessage("El teléfono debe tener máximo 15 caracteres.")
        .matches(onlyNumbers).withMessage("El teléfono solo debe contener números."),
    body("contrasena")
        .notEmpty().withMessage("La contraseña es requerida.")
        .isLength({ min: 8, max: 100 }).withMessage("La contraseña debe tener entre 8 y 100 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
        .withMessage("La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."),
    body("confirmar_contrasena")
        .notEmpty().withMessage("Debe confirmar la contraseña.")
        .isLength({ min: 8, max: 100 }).withMessage("La confirmación debe tener entre 8 y 100 caracteres.")
        .custom((value, { req }) => {
            if (value !== req.body.contrasena) {
                throw new Error("Las contraseñas no coinciden.");
            }
            return true;
        }),
    body("rol_nombre")
        .optional()
        .trim()
        .custom(async (rol_nombre) => {
            if (rol_nombre) {
                const rol = await Rol.findOne({ where: { nombre: rol_nombre, estado: true } });
                if (!rol) {
                    throw new Error("El rol especificado no existe o está inactivo.");
                }
            }
            return true;
        }),
];

export const updateUserValidator = [
    body("documento")
        .optional()
        .trim()
        .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener entre 5 y 20 caracteres.")
        .matches(onlyNumbers).withMessage("El documento solo debe contener números.")
        .custom(async (documento, { req }) => {
            if (documento) {
                const exists = await Usuario.findOne({ 
                    where: { 
                        documento,
                        id: { [Op.ne]: req.params.id }
                    } 
                });
                if (exists) {
                    throw new Error("Ya existe un usuario con ese documento.");
                }
            }
            return true;
        }),
    body("nombres")
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage("El nombre debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El nombre solo debe contener letras."),
    body("apellidos")
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage("El apellido debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El apellido solo debe contener letras."),
    body("nombre_usuario")
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage("El nombre de usuario debe tener máximo 50 caracteres.")
        .custom(async (nombre_usuario, { req }) => {
            if (nombre_usuario) {
                const exists = await Usuario.findOne({ 
                    where: { 
                        nombre_usuario,
                        id: { [Op.ne]: req.params.id }
                    } 
                });
                if (exists) {
                    throw new Error("Ya existe un usuario con ese nombre de usuario.");
                }
            }
            return true;
        }),
    body("correo")
        .optional()
        .trim()
        .isEmail().withMessage("El correo no es válido.")
        .isLength({ max: 100 }).withMessage("El correo debe tener máximo 100 caracteres.")
        .custom(async (correo, { req }) => {
            if (correo) {
                const exists = await Usuario.findOne({ 
                    where: { 
                        correo,
                        id: { [Op.ne]: req.params.id }
                    } 
                });
                if (exists) {
                    throw new Error("Ya existe un usuario con ese correo.");
                }
            }
            return true;
        }),
    body("telefono")
        .optional()
        .trim()
        .isLength({ max: 15 }).withMessage("El teléfono debe tener máximo 15 caracteres.")
        .matches(onlyNumbers).withMessage("El teléfono solo debe contener números."),
    body("rol_nombre")
        .optional()
        .trim()
        .custom(async (rol_nombre) => {
            if (rol_nombre) {
                const rol = await Rol.findOne({ where: { nombre: rol_nombre, estado: true } });
                if (!rol) {
                    throw new Error("El rol especificado no existe o está inactivo.");
                }
            }
            return true;
        }),
];

export const createUserWithEmailValidator = [
    body("documento")
        .trim()
        .notEmpty().withMessage("El documento es requerido.")
        .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener entre 5 y 20 caracteres.")
        .matches(onlyNumbers).withMessage("El documento solo debe contener números.")
        .custom(async (documento) => {
            const exists = await Usuario.findOne({ where: { documento } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese documento.");
            }
            return true;
        }),
    body("nombres")
        .trim()
        .notEmpty().withMessage("El nombre es requerido.")
        .isLength({ max: 50 }).withMessage("El nombre debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El nombre solo debe contener letras."),
    body("apellidos")
        .trim()
        .notEmpty().withMessage("El apellido es requerido.")
        .isLength({ max: 50 }).withMessage("El apellido debe tener máximo 50 caracteres.")
        .matches(onlyLetters).withMessage("El apellido solo debe contener letras."),
    body("nombre_usuario")
        .trim()
        .notEmpty().withMessage("El nombre de usuario es requerido.")
        .isLength({ max: 50 }).withMessage("El nombre de usuario debe tener máximo 50 caracteres.")
        .custom(async (nombre_usuario) => {
            const exists = await Usuario.findOne({ where: { nombre_usuario } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese nombre de usuario.");
            }
            return true;
        }),
    body("correo")
        .trim()
        .notEmpty().withMessage("El correo es requerido.")
        .isEmail().withMessage("El correo no es válido.")
        .isLength({ max: 100 }).withMessage("El correo debe tener máximo 100 caracteres.")
        .custom(async (correo) => {
            const exists = await Usuario.findOne({ where: { correo } });
            if (exists) {
                throw new Error("Ya existe un usuario con ese correo.");
            }
            return true;
        }),
    body("telefono")
        .optional()
        .trim()
        .isLength({ max: 15 }).withMessage("El teléfono debe tener máximo 15 caracteres.")
        .matches(onlyNumbers).withMessage("El teléfono solo debe contener números."),
    body("rol_nombre")
        .optional()
        .trim()
        .custom(async (rol_nombre) => {
            if (rol_nombre) {
                const rol = await Rol.findOne({ where: { nombre: rol_nombre, estado: true } });
                if (!rol) {
                    throw new Error("El rol especificado no existe o está inactivo.");
                }
            }
            return true;
        })
];