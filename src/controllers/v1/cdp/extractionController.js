import geminiService from '../../../services/v1/geminiService.js';
import { successResponse, errorResponse } from '../../../utils/response.util.js';

/**
 * Extrae información de un CDP desde un archivo PDF
 */
export const extractCDPFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No se proporcionó ningún archivo PDF', 400);
    }

    // Validar el archivo
    try {
      geminiService.validatePDFFile(req.file);
    } catch (validationError) {
      return errorResponse(res, validationError.message, 400);
    }

    // Procesar el PDF
    const result = await geminiService.processCDPPDF(req.file.buffer);

    if (!result.success) {
      return errorResponse(res, result.error, 400);
    }

    return successResponse(res, {
      message: result.warning || 'Información del CDP extraída exitosamente',
      data: result.data,
      extractedText: result.extractedText,
      warning: result.warning
    });

  } catch (error) {

    // Manejar errores específicos
    if (error.message.includes('GEMINI_API_KEY')) {
      return errorResponse(res, 'Servicio de extracción de IA no disponible. Contacte al administrador.', 503);
    }

    return errorResponse(res, error.message, 500);
  }
};

/**
 * Extrae solo el texto de un PDF (sin procesamiento de IA)
 */
export const extractTextFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No se proporcionó ningún archivo PDF', 400);
    }

    // Validar el archivo
    geminiService.validatePDFFile(req.file);

    // Extraer solo el texto
    const extractedText = await geminiService.extractTextFromPDF(req.file.buffer);

    return successResponse(res, {
      message: 'Texto extraído exitosamente del PDF',
      data: {
        text: extractedText,
        textLength: extractedText.length,
      },
    });

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Procesa información estructurada de CDP y la guarda en la base de datos
 */
export const processCDPAndSave = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No se proporcionó ningún archivo PDF', 400);
    }

    // Validar el archivo
    geminiService.validatePDFFile(req.file);

    // Procesar el PDF
    const result = await geminiService.processCDPPDF(req.file.buffer);

    if (!result.success) {
      return errorResponse(res, result.error, 400);
    }

    // TODO: Aquí puedes agregar la lógica para guardar en la base de datos
    // Ejemplo:
    // const cdpData = result.data;
    // const savedCDP = await CDPRepository.create(cdpData);

    return successResponse(res, {
      message: 'CDP procesado exitosamente',
      data: result.data,
      // savedCDP: savedCDP, // Descomentar cuando implementes el guardado
    });

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};