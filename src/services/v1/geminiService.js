import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRequire } from 'module';
import fs from 'fs';
import { isValidPDF, getFileInfo, isValidFileSize } from '../../utils/fileUtils.js';
import { logPDFExtraction, logAI, logError, logInfo } from '../../utils/logger.js';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      this.genAI = null;
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }
  }

  /**
   * Extrae texto de un archivo PDF
   * @param {Buffer} pdfBuffer - Buffer del archivo PDF
   * @returns {Promise<string>} - Texto extraído del PDF
   */
  async extractTextFromPDF(pdfBuffer) {
    try {
      logPDFExtraction('Iniciando extracción de texto del PDF');
      const data = await pdf(pdfBuffer);

      const textInfo = {
        textLength: data.text.length,
        numPages: data.numpages || 'No disponible',
        preview: data.text.substring(0, 200) + '...'
      };

      logPDFExtraction('Texto extraído exitosamente', textInfo);

      return data.text;
    } catch (error) {
      logError('Error al extraer texto del PDF', error);
      throw new Error(`Error al extraer texto del PDF: ${error.message}`);
    }
  }

  /**
   * Extrae información estructurada de un CDP desde un PDF
   * @param {string} pdfText - Texto extraído del PDF
   * @returns {Promise<Object>} - Información del CDP estructurada
   */
  async extractCDPInfo(pdfText) {
    if (!this.model) {
      throw new Error('Servicio de Gemini AI no disponible. GEMINI_API_KEY no configurado.');
    }

    try {
      logAI('Iniciando procesamiento con Gemini AI', { textLength: pdfText.length });

      const prompt = `
        Analiza el siguiente texto extraído de un documento PDF de un CDP (Certificado de Disponibilidad Presupuestal) del SENA y extrae la siguiente información en formato JSON:

        {
          "codigo": "El documento aparece como Numero:",
          "descripcion": "En el documento aparece como Objeto y está al final del documento:",
          "fecha": "En el documento aparece como Fecha de registro:",
          "valor": "valor total en números, omite los decimales que normalmente son .00. Solo tomar el valor entero.",
          "vigencia": "año de vigencia (ejemplo: 2025)",
          "fuente_recurso": "fuente del recurso (ejemplo: Propios, SGP,  Nación, etc.)",
          "quien_expide": "quien expide el CDP (nombre del cargo o dependencia)",
          
          "rubros": [
            {
              "codigo": "código presupuestal del rubro (ejemplo: 2-3-1-07-01)",
              "nombre": "descripción del rubro presupuestal",
              "valor": "valor total en números, omite los decimales que normalmente son .00. Solo tomar el valor entero."
            }
          ]
        }

        BUSCA ESPECÍFICAMENTE:
        - Códigos que empiecen con números y guiones (como 2-3-1-07-01)
        - Valores monetarios (pueden tener puntos o comas como separadores)
        - Fechas en cualquier formato
        - Descripciones de objetos contractuales o de gasto
        - Posición catálogo de gasto si aparece

        REGLAS:
        - Si encuentras "POSICIÓN CATÁLOGO DE GASTO" seguido de un código, úsalo como código de rubro
        - Para valores, extrae solo números (sin $, puntos o comas)
        - Si hay múltiples rubros, inclúyelos todos en el array
        - Si no encuentras un campo, usa null

        Texto del PDF:
        ${pdfText}

        Responde SOLO con el JSON, sin explicaciones adicionales.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      logAI('Respuesta recibida de Gemini', { responseLength: text.length });

      // Intentar parsear el JSON
      try {
        // Buscar JSON en la respuesta
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          logAI('Datos parseados exitosamente', parsedData);
          return parsedData;
        } else {
          logAI('No se encontró JSON válido en la respuesta', { rawResponse: text });
          throw new Error('No se pudo extraer JSON válido de la respuesta');
        }
      } catch (parseError) {
        logError('Error al parsear JSON', parseError, { rawResponse: text });
        throw new Error(`Error al parsear JSON: ${parseError.message}`);
      }
    } catch (error) {
      logError('Error al procesar con Gemini', error);
      throw new Error(`Error al procesar con Gemini: ${error.message}`);
    }
  }

  /**
   * Extrae información de un CDP desde un PDF procesado como imagen
   * @param {Buffer} pdfBuffer - Buffer del archivo PDF
   * @returns {Promise<Object>} - Información del CDP estructurada
   */
  async extractCDPInfoFromImage(pdfBuffer) {
    if (!this.model) {
      throw new Error('Servicio de Gemini AI no disponible. GEMINI_API_KEY no configurado.');
    }

    try {
      logAI('Iniciando procesamiento de PDF como imagen con Gemini 2.0', { bufferSize: pdfBuffer.length });

      const prompt = `
        Analiza este documento PDF de un CDP (Certificado de Disponibilidad Presupuestal) del SENA y extrae la siguiente información en formato JSON:

        {
          "codigo": "El documento aparece como Numero:",
          "descripcion": "En el documento aparece como Objeto y está al final del documento:",
          "fecha": "En el documento aparece como Fecha de registro:",
          "valor": "valor total en números, omite los decimales que normalmente son .00. Solo tomar el valor entero.",
          "vigencia": "año de vigencia (ejemplo: 2025)",
          "fuente_recurso": "fuente del recurso (ejemplo: Propios, SGP,  Nación, etc.)",
          "quien_expide": "quien expide el CDP (nombre del cargo o dependencia)",
          "rubros": [
            {
              "codigo": "código presupuestal del rubro (ejemplo: 2-3-1-07-01)",
              "nombre": "descripción del rubro presupuestal",
              "valor": "valor total en números, omite los decimales que normalmente son .00. Solo tomar el valor entero."
            }
          ]
        }

        BUSCA ESPECÍFICAMENTE:
        - Códigos que empiecen con números y guiones (como 2-3-1-07-01)
        - Valores monetarios (pueden tener puntos o comas como separadores)
        - Fechas en cualquier formato
        - Descripciones de objetos contractuales o de gasto
        - Posición catálogo de gasto si aparece

        REGLAS:
        - Si encuentras "POSICIÓN CATÁLOGO DE GASTO" seguido de un código, úsalo como código de rubro
        - Para valores, extrae solo números (sin $, puntos o comas)
        - Si hay múltiples rubros, inclúyelos todos en el array
        - Si no encuentras un campo, usa null

        Responde SOLO con el JSON, sin explicaciones adicionales.
      `;

      // Convertir el buffer del PDF a base64 para enviarlo como imagen
      const base64PDF = pdfBuffer.toString('base64');
      const mimeType = 'application/pdf';

      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64PDF,
            mimeType: mimeType
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();

      logAI('Respuesta recibida de Gemini para imagen', { responseLength: text.length });

      // Intentar parsear el JSON
      try {
        // Buscar JSON en la respuesta
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          logAI('Datos parseados exitosamente desde imagen', parsedData);
          return parsedData;
        } else {
          logAI('No se encontró JSON válido en la respuesta de imagen', { rawResponse: text });
          throw new Error('No se pudo extraer JSON válido de la respuesta');
        }
      } catch (parseError) {
        logError('Error al parsear JSON de imagen', parseError, { rawResponse: text });
        throw new Error(`Error al parsear JSON: ${parseError.message}`);
      }
    } catch (error) {
      logError('Error al procesar imagen con Gemini', error);
      throw new Error(`Error al procesar imagen con Gemini: ${error.message}`);
    }
  }

  /**
   * Procesa un archivo PDF completo y extrae información del CDP
   * @param {Buffer} pdfBuffer - Buffer del archivo PDF
   * @returns {Promise<Object>} - Información del CDP estructurada
   */
  async processCDPPDF(pdfBuffer) {
    try {
      // Intentar extraer texto primero
      const pdfText = await this.extractTextFromPDF(pdfBuffer);

      // Si no hay API de Gemini disponible, retornar datos básicos
      if (!this.model) {
        return {
          success: true,
          data: {
            codigo: null,
            descripcion: null,
            fecha: null,
            valor: null,
            vigencia: null,
            fuente_recurso: null,
            quien_expide: null,
            rubros: []
          },
          extractedText: pdfText ? pdfText.substring(0, 500) + '...' : 'No se pudo extraer texto',
          warning: 'Extracción básica realizada. Servicio de IA no disponible.'
        };
      }

      // Si hay texto suficiente, procesar con texto
      if (pdfText && pdfText.trim().length >= 10) {
        logPDFExtraction('Procesando PDF con texto extraíble');
        const cdpInfo = await this.extractCDPInfo(pdfText);
        return {
          success: true,
          data: cdpInfo,
          extractedText: pdfText.substring(0, 500) + '...',
        };
      }

      // Si no hay texto suficiente, procesar como imagen con Gemini 2.0
      logPDFExtraction('PDF sin texto extraíble, procesando como imagen con Gemini 2.0');
      const cdpInfo = await this.extractCDPInfoFromImage(pdfBuffer);

      return {
        success: true,
        data: cdpInfo,
        extractedText: 'PDF procesado como imagen',
        warning: 'PDF procesado como imagen escaneada usando Gemini 2.0'
      };

    } catch (error) {
      logError('Error en processCDPPDF', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Fallback local: intenta extraer campos básicos de un CDP desde texto plano usando regex simples.
   * Devuelve un objeto con los campos principales y un array de rubros (cada rubro con codigo, nombre y valor si es posible).
   */
  localExtractCDPInfoFromText(pdfText) {
    try {
      if (!pdfText || !pdfText.trim()) return null

      const text = pdfText.replace(/\r/g, '\n')

      // Buscar código tipo 2-3-1-07-01 o variantes
      const codeMatch = text.match(/\b(\d+(?:-\d+){2,})\b/);
      const codigo = codeMatch ? codeMatch[0] : null;

      // Buscar fechas ISO o dd/mm/yyyy
      let fecha = null;
      const isoMatch = text.match(/\b(\d{4}-\d{2}-\d{2})\b/);
      if (isoMatch) fecha = isoMatch[1];
      else {
        const dmy = text.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})\b/);
        if (dmy) {
          const parts = dmy[1].split(/\D+/);
          const dd = parts[0].padStart(2, '0');
          const mm = parts[1].padStart(2, '0');
          const yyyy = parts[2];
          fecha = `${yyyy}-${mm}-${dd}`;
        }
      }

      // Vigencia: buscar un año de 4 dígitos cercano a la palabra Vigencia o al documento
      let vigencia = null;
      const vigMatch = text.match(/vigencia[:\s]*?(\d{4})/i) || text.match(/\b(20\d{2})\b/);
      if (vigMatch) vigencia = vigMatch[1];

      // Valor total: buscar la línea que contenga 'TOTAL' o 'VALOR' seguido de números
      let valor = null;
      const valorMatch = text.match(/(?:TOTAL|VALOR|VALOR TOTAL)[:\s]*\$?\s*([\d\.,]+)/i);
      if (valorMatch) valor = valorMatch[1].replace(/[^0-9]/g, '');
      else {
        // fallback: buscar el mayor número presente en el texto con más de 3 dígitos
        const nums = Array.from(text.matchAll(/([\d\.,]{4,})/g)).map(m => m[1].replace(/[^0-9]/g, ''));
        if (nums.length) valor = nums.sort((a, b) => b.length - a.length)[0];
      }

      // Rubros: buscar líneas que empiecen con código presupuestal y extraer posible valor
      const rubros = [];
      const rubroRegex = /^(?:\s*)?(\d+(?:-\d+){2,})(?:[\s\-:]+)?(.{0,120}?)(?:\s+|\t|$)(?:\$?\s*([\d\.,]+))?/gmi;
      let m;
      while ((m = rubroRegex.exec(text)) !== null) {
        const rcodigo = m[1];
        const rnombre = (m[2] || '').trim().replace(/\s+/g, ' ');
        const rval = m[3] ? m[3].replace(/[^0-9]/g, '') : null;
        if (rcodigo) rubros.push({ codigo: rcodigo, nombre: rnombre || null, valor: rval });
        // limitar a 20 rubros
        if (rubros.length >= 20) break;
      }

      return {
        codigo: codigo || null,
        descripcion: null,
        fecha: fecha || null,
        valor: valor || null,
        vigencia: vigencia || null,
        fuente_recurso: null,
        quien_expide: null,
        rubros: rubros
      };
    } catch (err) {
      logError('localExtractCDPInfoFromText failed', err);
      return null;
    }
  }

  /**
   * Extrae información estructurada de una autorización desde un PDF
   * @param {string} pdfText - Texto extraído del PDF
   * @returns {Promise<Object>} - Información de la autorización estructurada
   */
  async extractAutorizacionInfo(pdfText) {
    if (!this.model) {
      throw new Error('API de Gemini no disponible');
    }

    try {
      logAI('Iniciando extracción de información de autorización con Gemini');

      // Helper de reintentos para llamadas a Gemini
      const callWithRetries = async (fn, retries = 3, delayMs = 1000) => {
        let lastErr;
        for (let i = 0; i < retries; i++) {
          try {
            return await fn();
          } catch (err) {
            lastErr = err;
            // Si es un error transitorio de Gemini (503 / Service Unavailable), esperar y reintentar
            const msg = (err && err.message) ? err.message.toLowerCase() : '';
            if (msg.includes('service unavailable') || msg.includes('overloaded') || msg.includes('503')) {
              const backoff = delayMs * Math.pow(2, i);
              logAI('Gemini transient error, retrying', { attempt: i + 1, backoff });
              await new Promise(r => setTimeout(r, backoff));
              continue;
            }
            // Para otros errores, no reintentar
            throw err;
          }
        }
        throw lastErr;
      };

      const prompt = `
        Eres un asistente especializado en extraer información de documentos de autorización del SENA.
        Analiza el siguiente texto de un documento de autorización y extrae la siguiente información específica en formato JSON:

        {
          "numero_autorizacion": "Número de la autorización (Ej: 010)",
          "numero_linea_PAA": "Número de línea que aparece en el documento (ej: 5_9402_177).",
          "fecha": "Fecha de la autorización en formato YYYY-MM-DD",
          "vigencia": "Año de vigencia (Ej: 2025)",
          "objeto": "Objeto o descripción del contrato/autorización",
          "cantidad_autorizados": "Número de personas/contratistas autorizados (solo número)",
          "descripcion": "Descripción adicional si está disponible",
          "programa_acreditacion": "Programa de acreditación si se menciona",
          "fecha_estudios_previos": "Fecha de los estudios previos (formato YYYY-MM-DD, si aparece)",
          "fecha_inexistencia": "Fecha de inexistencia (formato YYYY-MM-DD, si aparece)",
          "obligaciones_especificas": ["Lista de obligaciones específicas extraídas del documento. Cada ítem debe ser una cadena de texto"]
        }

  INSTRUCCIONES ADICIONALES PARA OBLIGACIONES:
  - Busca una sección titulada exactamente "Obligaciones específicas" o variantes en mayúsculas/minúsculas (por ejemplo: "OBLIGACIONES ESPECÍFICAS", "Obligaciones específicas:").
  - Dentro de esa sección, cada ítem numerado, por letra (a), b), por números 1., 2., o por guiones debe considerarse una obligación separada.
  - Extrae las obligaciones en el mismo orden en que aparecen y devuélvelas como un array de strings en el campo "obligaciones_especificas".
  - Si la sección no existe, devuelve un array vacío para "obligaciones_especificas".
  - Normaliza espacios y elimina numeración al inicio (por ejemplo "a) Presentar..." → "Presentar...").

  INSTRUCCIONES ESPECIALES PARA FECHAS:
  - Si encuentras una página con el título "CERTIFICACIÓN DE INEXISTENCIA DE PERSONAL DE PLANTA PARA SERVICIOS DE APOYO A LA GESTIÓN", busca la frase 'Constancia de lo anterior se firma en el municipio de [ciudad], [día] de [mes] de [año].' y extrae esa fecha.
  - Si aparece explícitamente 'Fecha de estudios previos' o 'Fecha de inexistencia', extrae esas fechas.
  - Si solo aparece una fecha, úsala para ambos campos.
  - Si no encuentras algún campo, usa null como valor.
  - Para fechas, convierte siempre a formato YYYY-MM-DD.
  - Para cantidad_autorizados extrae solo el número.
  - Para vigencia extrae solo el año.
  - Para numero_autorizacion incluye el formato completo que aparezca en el documento.

        EJEMPLO DE RESPUESTA:
        {
          "numero_autorizacion": "001",
          "numero_linea_PAA": "5_9402_177",
          "fecha": "2025-01-15",
          "vigencia": "2025",
          "objeto": "PRESTAR SERVICIOS...",
          "cantidad_autorizados": "1",
          "descripcion": "PRESTAR SERVICIOS...",
          "programa_acreditacion": null,
          "fecha_estudios_previos": "2025-01-15",
          "fecha_inexistencia": "2025-01-15",
          "obligaciones_especificas": [
            "Presentar declaración mensual",
            "Pago de impuestos",
            "Envío de retenciones"
          ]
        }

        Texto del documento:
        ${pdfText}

        INSTRUCCIONES IMPORTANTES ADICIONALES:
  - Para "numero_autorizacion": busca en la página titulada exactamente 'AUTORIZACION DE CONTRATACION'. El número suele aparecer sobre la fecha y cerca de la firma del subdirector; devuélvelo tal cual aparece (solo el token) o null si no lo encuentras.
  - Para "numero_linea_PAA": si el documento contiene un "Formato Estudios Previos", el número de línea aparece delante de la etiqueta 'OBJETO:'; devuelve únicamente ese token (sin incluir la descripción que sigue a 'OBJETO:').

        Responde ÚNICAMENTE con el JSON, sin texto adicional. Incluye el campo "numero_linea_PAA" si está presente en el documento.
      `;

      // Llamada a Gemini con reintentos
      let text;
      try {
        const result = await callWithRetries(() => this.model.generateContent(prompt));
        const response = result.response;
        text = response.text();
        logAI('Respuesta recibida de Gemini para autorización', { textLength: text.length });
      } catch (err) {
        logError('Gemini error en extracción de autorización, aplicando fallback', err);
        // Si Gemini falla definitivamente, intentar sólo extraer obligaciones desde el texto localmente
        const obligacionesFallback = this.extractObligacionesFromTextFallback(pdfText);
        return {
          numero_autorizacion: null,
          fecha: null,
          vigencia: null,
          objeto: null,
          cantidad_autorizados: null,
          descripcion: null,
          programa_acreditacion: null,
          fecha_estudios_previos: null,
          fecha_inexistencia: null,
          obligaciones_especificas: obligacionesFallback || []
        };
      }

      // Limpiar y parsear la respuesta JSON
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const autorizacionInfo = JSON.parse(cleanJson);

      logAI('Información de autorización extraída exitosamente', autorizacionInfo);

      return autorizacionInfo;
    } catch (error) {
      logError('Error al extraer información de autorización', error);
      throw new Error(`Error al extraer información de autorización: ${error.message}`);
    }
  }

  // Fallback local extractor: intenta extraer la sección "Obligaciones específicas" del texto bruto
  extractObligacionesFromTextFallback(pdfText) {
    try {
      if (!pdfText || !pdfText.trim()) return []
      const lower = pdfText.toLowerCase()
      const titles = ['obligaciones especificas', 'obligaciones específicas', 'obligaciones', 'obligaciones:']
      let startIdx = -1
      let titleFound = ''
      for (const t of titles) {
        const idx = lower.indexOf(t)
        if (idx !== -1) { startIdx = idx; titleFound = t; break }
      }
      if (startIdx === -1) return []

      // tomar desde el título hasta 1500 caracteres o hasta el próximo título común (por ejemplo "ANEXO", "FIRMAS")
      const slice = pdfText.substring(startIdx, Math.min(pdfText.length, startIdx + 4000))

      // Remover la primera línea del título
      const afterTitle = slice.replace(new RegExp(titleFound, 'i'), '')

      // Separadores posibles de ítems: números "1.", "1)", letras "a)", "a.", guiones "-", viñetas, saltos de línea
      const rawItems = afterTitle.split(/\n(?=\s*\d+\.|\s*[a-zA-Z]\)|\s*-\s+|\s*•\s+|\s*\d+\)\s*)/)

      const items = []
      for (let it of rawItems) {
        // eliminar numeración al inicio
        it = it.replace(/^\s*([0-9]+[\.)]|[a-zA-Z][\.)]|[-•]\s*)\s*/i, '').trim()
        // cortar si encontramos un encabezado que probablemente no pertenece (FIRMAS, ANEXO, NOTA)
        const stopMatch = it.search(/\b(FIRMAS|FIRMA|ANEXO|NOTA|OBSERVACIONES|SELLO|FECHA)\b/i)
        if (stopMatch !== -1) it = it.substring(0, stopMatch).trim()
        if (it && it.length >= 3) items.push(it.replace(/\s+/g, ' '))
      }

      // Deduplicate and return
      const seen = new Set()
      const uniq = []
      for (const i of items) {
        const k = i.trim().toLowerCase()
        if (!seen.has(k)) { seen.add(k); uniq.push(i.trim()) }
      }
      return uniq
    } catch (err) {
      logError('Fallback extractor failed', err)
      return []
    }
  }

  /**
   * Extrae localmente el token "numero_linea_PAA" del texto del PDF.
   * Busca patrones como 5_9402_177 o 5-9402-177 o combinaciones de dígitos separadas por guiones/underscore
   * @param {string} pdfText
   * @returns {string|null}
   */
  localExtractNumeroLineaFromText(pdfText) {
    try {
      if (!pdfText || !pdfText.trim()) return null;
      // Normalizar espacios
      const text = pdfText.replace(/\s+/g, ' ');
      // Patrones típicos: dígitos + separador (_ o -) + dígitos + separador + dígitos (al menos 2 grupos)
      const regex = /(\d{1,6}[_\-]\d{1,8}[_\-]\d{1,8})/g;
      const m = text.match(regex);
      if (m && m.length) {
        // Devolver el primer match limpio
        return m[0].trim();
      }
      // Intento alterno: tokens con guiones y barras
      const regex2 = /(\d{1,6}[_\-]\d{3,8})/g;
      const m2 = text.match(regex2);
      if (m2 && m2.length) return m2[0].trim();
      return null;
    } catch (err) {
      logError('localExtractNumeroLineaFromText failed', err);
      return null;
    }
  }

  /**
   * Extrae información de autorización desde un PDF que no tiene texto extraíble (imagen)
   * @param {Buffer} pdfBuffer - Buffer del archivo PDF
   * @returns {Promise<Object>} - Información de la autorización estructurada
   */
  async extractAutorizacionInfoFromImage(pdfBuffer) {
    if (!this.model) {
      throw new Error('API de Gemini no disponible');
    }

    try {
      logAI('Procesando PDF de autorización como imagen con Gemini 2.0');

      // reintentos igual que para texto
      const callWithRetries = async (fn, retries = 3, delayMs = 1000) => {
        let lastErr;
        for (let i = 0; i < retries; i++) {
          try {
            return await fn();
          } catch (err) {
            lastErr = err;
            const msg = (err && err.message) ? err.message.toLowerCase() : '';
            if (msg.includes('service unavailable') || msg.includes('overloaded') || msg.includes('503')) {
              const backoff = delayMs * Math.pow(2, i);
              logAI('Gemini transient error (image), retrying', { attempt: i + 1, backoff });
              await new Promise(r => setTimeout(r, backoff));
              continue;
            }
            throw err;
          }
        }
        throw lastErr;
      };

      const prompt = `
        Eres un asistente especializado en extraer información de documentos de autorización del SENA.
        Analiza esta imagen de un documento de autorización y extrae la siguiente información específica en formato JSON:

        {
          "numero_autorizacion": "Número de la autorización (Ej: 2025-001, AUT-2025-001, etc.)",
          "numero_linea_PAA": "Número de línea que aparece en el documento (ej: 5_9402_177).",
          "fecha": "Fecha de la autorización en formato YYYY-MM-DD",
          "vigencia": "Año de vigencia (Ej: 2025)",
          "objeto": "Objeto o descripción del contrato/autorización",
          "cantidad_autorizados": "Número de personas/contratistas autorizados (solo número)",
          "descripcion": "Descripción adicional si está disponible",
          "programa_acreditacion": "Programa de acreditación si se menciona",
          "fecha_estudios_previos": "Fecha de los estudios previos (formato YYYY-MM-DD, si aparece)",
          "fecha_inexistencia": "Fecha de inexistencia (formato YYYY-MM-DD, si aparece)",
          "obligaciones_especificas": ["Lista de obligaciones específicas extraídas del documento. Cada ítem debe ser una cadena de texto"]
        }

        INSTRUCCIONES ADICIONALES PARA OBLIGACIONES:
        - Busca una sección titulada exactamente "Obligaciones específicas" o variantes en mayúsculas/minúsculas (por ejemplo: "OBLIGACIONES ESPECÍFICAS", "Obligaciones específicas:").
        - Dentro de esa sección, cada ítem numerado, por letra (a), b), por números 1., 2., o por guiones debe considerarse una obligación separada.
        - Extrae las obligaciones en el mismo orden en que aparecen y devuélvelas como un array de strings en el campo "obligaciones_especificas".
        - Si la sección no existe, devuelve un array vacío para "obligaciones_especificas".
        - Normaliza espacios y elimina numeración al inicio (por ejemplo "a) Presentar..." → "Presentar...").

        IMPORTANTE:
        - Si no encuentras algún campo, usa null como valor
        - Para fechas, convierte siempre a formato YYYY-MM-DD
        - Para cantidad_autorizados extrae solo el número
        - Para vigencia extrae solo el año
        - Para numero_autorizacion incluye el formato completo que aparezca en el documento

        Responde ÚNICAMENTE con el JSON, sin texto adicional.
      `;

      const imagePart = {
        inlineData: {
          data: pdfBuffer.toString('base64'),
          mimeType: 'application/pdf',
        },
      };


      let text;
      try {
        const result = await callWithRetries(() => this.model.generateContent([prompt, imagePart]));
        const response = result.response;
        text = response.text();
        logAI('Respuesta recibida de Gemini para imagen de autorización', { textLength: text.length });
      } catch (err) {
        logError('Gemini error en extracción de autorización desde imagen, aplicando fallback', err);
        // Si Gemini no pudo procesar la imagen, intentar extraer texto y aplicar fallback local
        const pdfText = await this.extractTextFromPDF(pdfBuffer).catch(() => '');
        const obligacionesFallback = this.extractObligacionesFromTextFallback(pdfText);
        return {
          numero_autorizacion: null,
          fecha: null,
          vigencia: null,
          objeto: null,
          cantidad_autorizados: null,
          descripcion: null,
          programa_acreditacion: null,
          fecha_estudios_previos: null,
          fecha_inexistencia: null,
          obligaciones_especificas: obligacionesFallback || []
        };
      }

      // Limpiar y parsear la respuesta JSON
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const autorizacionInfo = JSON.parse(cleanJson);

      logAI('Información de autorización extraída desde imagen exitosamente', autorizacionInfo);

      return autorizacionInfo;
    } catch (error) {
      logError('Error al extraer información de autorización desde imagen', error);
      throw new Error(`Error al extraer información de autorización desde imagen: ${error.message}`);
    }
  }

  /**
   * Procesa un archivo PDF completo y extrae información de la autorización
   * @param {Buffer} pdfBuffer - Buffer del archivo PDF
   * @returns {Promise<Object>} - Información de la autorización estructurada
   */
  async processAutorizacionPDF(pdfBuffer) {
    try {
      // Intentar extraer texto primero
      const pdfText = await this.extractTextFromPDF(pdfBuffer);

      // Si no hay API de Gemini disponible, retornar datos básicos
      if (!this.model) {
        return {
          success: true,
          data: {
            numero_autorizacion: null,
            fecha: null,
            vigencia: null,
            objeto: null,
            cantidad_autorizados: null,
            descripcion: null,
            programa_acreditacion: null
          },
          extractedText: pdfText ? pdfText.substring(0, 500) + '...' : 'No se pudo extraer texto',
          warning: 'Extracción básica realizada. Servicio de IA no disponible.'
        };
      }

      // Si hay texto suficiente, procesar con texto
      if (pdfText && pdfText.trim().length >= 10) {
        logPDFExtraction('Procesando PDF de autorización con texto extraíble');
        const autorizacionInfo = await this.extractAutorizacionInfo(pdfText);
        // fallback: si la IA no devolvió obligaciones específicas, intentar extraer localmente
        if (!autorizacionInfo.obligaciones_especificas || autorizacionInfo.obligaciones_especificas.length === 0) {
          const fallback = this.extractObligacionesFromTextFallback(pdfText)
          if (fallback && fallback.length > 0) {
            autorizacionInfo.obligaciones_especificas = fallback
          }
        }
        // Asegurar numero_linea_PAA: si la IA no lo devolvió, intentar extraer localmente
        if ((!autorizacionInfo.numero_linea_PAA || autorizacionInfo.numero_linea_PAA === null) && pdfText) {
          const numLinea = this.localExtractNumeroLineaFromText(pdfText);
          if (numLinea) autorizacionInfo.numero_linea_PAA = numLinea;
        }
        return {
          success: true,
          data: autorizacionInfo,
          extractedText: pdfText.substring(0, 500) + '...',
        };
      }

      // Si no hay texto suficiente, procesar como imagen con Gemini 2.0
      logPDFExtraction('PDF de autorización sin texto extraíble, procesando como imagen con Gemini 2.0');
      const autorizacionInfo = await this.extractAutorizacionInfoFromImage(pdfBuffer);
      // fallback: si la IA no devolvió obligaciones específicas, intentar extraer localmente
      if (!autorizacionInfo.obligaciones_especificas || autorizacionInfo.obligaciones_especificas.length === 0) {
        const fallback = this.extractObligacionesFromTextFallback(await this.extractTextFromPDF(pdfBuffer))
        if (fallback && fallback.length > 0) {
          autorizacionInfo.obligaciones_especificas = fallback
        }
      }

      return {
        success: true,
        data: autorizacionInfo,
        extractedText: 'PDF procesado como imagen',
        warning: 'PDF procesado como imagen escaneada usando Gemini 2.0'
      };

    } catch (error) {
      logError('Error en processAutorizacionPDF', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Valida que el archivo sea un PDF válido
   * @param {Object} file - Objeto de archivo de multer
   * @returns {boolean} - True si es válido
   */
  validatePDFFile(file) {
    if (!file) {
      throw new Error('No se proporcionó ningún archivo');
    }

    const fileInfo = getFileInfo(file);
    logPDFExtraction('Validando archivo PDF', fileInfo);
    // Loguear mimetype y primeros bytes para diagnóstico
    try {
      const headerPreview = file.buffer && file.buffer.slice(0, 8).toString('utf8');
      logPDFExtraction('Diagnóstico de archivo', { mimetype: file.mimetype, headerPreview });
    } catch (e) {
      logPDFExtraction('No fue posible obtener preview del buffer', { err: e.message });
    }

    if (!isValidFileSize(file.size, 10)) {
      throw new Error('El archivo es demasiado grande. Máximo 10MB');
    }

    // Si el mimetype no es application/pdf pero el buffer sí comienza con %PDF, aceptarlo.
    const headerIsPdf = isValidPDF(file.buffer);
    if (file.mimetype !== 'application/pdf' && !headerIsPdf) {
      throw new Error('El archivo debe ser un PDF');
    }

    if (!headerIsPdf) {
      throw new Error('El archivo no es un PDF válido');
    }

    logPDFExtraction('Archivo PDF validado exitosamente', fileInfo);
    return true;
  }
}

export default new GeminiService();