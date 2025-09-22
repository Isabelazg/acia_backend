import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.util.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {





    const formattedErrors = errors.array().map(err => ({
      code: 'VALIDATION_ERROR',
      field: err.path || err.param,
      detail: err.msg || String(err),
      value: err.value,
    }));

    return errorResponse(
      res,
      "Errores de validación",
      422,
      formattedErrors
    );
  }
  next();
};
