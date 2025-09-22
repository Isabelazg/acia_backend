import { createUserWithEmailSetupService } from '../../../services/v1/auth.service.js';
import { createUserWithEmailValidator } from '../../../middlewares/validators/usuario.validator.js';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../../../utils/response.util.js';

const createUserWithEmail = [
    ...createUserWithEmailValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, 'Validation Error', 422, errors.array());
        }
        try {
            const result = await createUserWithEmailSetupService(req.body);
            return successResponse(res, result, 201);
        } catch (error) {
            return errorResponse(res, error.message || 'Error al crear el usuario.', error.status || 500, error.details);
        }
    }
];

export default createUserWithEmail;
