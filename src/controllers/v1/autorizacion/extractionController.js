import geminiService from '../../../services/v1/geminiService.js';
import { successResponse, errorResponse } from '../../../utils/response.util.js';

/**
 * Extrae información de una autorización desde un archivo PDF
 */
export const extractAutorizacionFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      // Log para diagnóstico: por qué no llegó el archivo
      console.error('extractAutorizacionFromPDF: no se recibió req.file');
      try {
        console.error('Request headers content-type:', req.headers['content-type']);
        console.error('Request headers:', Object.keys(req.headers).reduce((acc, k) => {
          acc[k] = req.headers[k]; return acc;
        }, {}));
        console.error('Request body keys:', req.body ? Object.keys(req.body) : null);
      } catch (e) {
        console.error('Error al loggear request info:', e);
      }
      return errorResponse(res, 'No se proporcionó ningún archivo PDF', 400);
    }

    // Validar el archivo
    try {
      geminiService.validatePDFFile(req.file);
    } catch (validationError) {
      return errorResponse(res, validationError.message, 400);
    }

    // Procesar el PDF para extraer información de autorización
    try {
      const result = await geminiService.processAutorizacionPDF(req.file.buffer);

      if (!result.success) {
        // si el servicio IA devolvió error estructurado, intentar fallback local
        throw new Error(result.error || 'Error en procesamiento de IA');
      }

      return successResponse(res, {
        message: result.warning || 'Información de la autorización extraída exitosamente',
        data: result.data,
        extractedText: result.extractedText,
        warning: result.warning
      });
    } catch (procErr) {
      console.error('Error processing autorización PDF with Gemini, attempting local fallback:', procErr.message || procErr);
      try {
        // Intentar extraer texto localmente y usar el extractor local de obligaciones, numero_linea_PAA y numero_autorizacion
        const extractedText = await geminiService.extractTextFromPDF(req.file.buffer).catch(() => '');
        const obligaciones = geminiService.extractObligacionesFromTextFallback(extractedText || '');
        const numeroLinea = geminiService.localExtractNumeroLineaFromText(extractedText || '');
        const numeroAut = geminiService.localExtractNumeroAutorizacionFromText(extractedText || '');

        return successResponse(res, {
          message: 'Extracción parcial: no fue posible procesar con IA. Se devolvieron obligaciones extraídas localmente.',
          data: {
            numero_autorizacion: numeroAut || null,
            numero_linea_PAA: numeroLinea || null,
            fecha: null,
            vigencia: null,
            objeto: null,
            cantidad_autorizados: null,
            descripcion: null,
            programa_acreditacion: null,
            obligaciones_especificas: obligaciones || []
          },
          extractedText: extractedText ? extractedText.substring(0, 500) + '...' : null,
          warning: 'Fallback local aplicado: IA no disponible o sobrecargada.'
        });
      } catch (fallbackErr) {
        console.error('Fallback local también falló:', fallbackErr);
        return errorResponse(res, procErr.message || 'Error al procesar el PDF. Ver logs para más detalles.', 400);
      }
    }

  } catch (error) {
    console.error('Error extracting autorización from PDF:', error);

    // Manejar errores específicos
    if (error.message.includes('GEMINI_API_KEY')) {
      return errorResponse(res, 'Servicio de extracción de IA no disponible. Contacte al administrador.', 503);
    }

    return errorResponse(res, error.message, 500);
  }
};

/**
 * Extrae solo el texto de un PDF de autorización (sin procesamiento de IA)
 */
export const extractTextFromAutorizacionPDF = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No se proporcionó ningún archivo PDF', 400);
    }

    // Validar el archivo
    geminiService.validatePDFFile(req.file);

    // Extraer solo el texto
    const extractedText = await geminiService.extractTextFromPDF(req.file.buffer);

    return successResponse(res, {
      message: 'Texto extraído exitosamente del PDF de autorización',
      data: {
        text: extractedText,
        textLength: extractedText.length,
      },
    });

  } catch (error) {
    console.error('Error extracting text from autorización PDF:', error);
    return errorResponse(res, error.message, 500);
  }
};
