import fs from 'fs';
import path from 'path';

/**
 * Validar que un archivo sea un PDF válido
 * @param {Buffer} buffer - Buffer del archivo
 * @returns {boolean} - True si es un PDF válido
 */
export const isValidPDF = (buffer) => {
  if (!buffer || buffer.length < 4) {
    return false;
  }

  // Los archivos PDF empiezan con %PDF
  const pdfHeader = buffer.slice(0, 4).toString();
  return pdfHeader === '%PDF';
};

/**
 * Obtener información del archivo
 * @param {Object} file - Objeto file de multer
 * @returns {Object} - Información del archivo
 */
export const getFileInfo = (file) => {
  return {
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    sizeInMB: (file.size / (1024 * 1024)).toFixed(2),
  };
};

/**
 * Validar tamaño de archivo
 * @param {number} size - Tamaño en bytes
 * @param {number} maxSizeMB - Tamaño máximo en MB
 * @returns {boolean} - True si es válido
 */
export const isValidFileSize = (size, maxSizeMB = 10) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
};

/**
 * Limpiar nombre de archivo
 * @param {string} filename - Nombre original del archivo
 * @returns {string} - Nombre limpio
 */
export const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
};

/**
 * Generar nombre único para archivo
 * @param {string} originalName - Nombre original
 * @returns {string} - Nombre único
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = path.extname(originalName);
  const basename = path.basename(originalName, extension);

  return `${sanitizeFilename(basename)}_${timestamp}_${random}${extension}`;
};

/**
 * Crear directorio si no existe
 * @param {string} dirPath - Ruta del directorio
 */
export const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Guardar archivo en disco
 * @param {Buffer} buffer - Buffer del archivo
 * @param {string} filepath - Ruta donde guardar
 * @returns {Promise<string>} - Ruta del archivo guardado
 */
export const saveFileToDisk = async (buffer, filepath) => {
  try {
    ensureDirectoryExists(path.dirname(filepath));
    await fs.promises.writeFile(filepath, buffer);
    return filepath;
  } catch (error) {
    throw new Error(`Error al guardar archivo: ${error.message}`);
  }
};

/**
 * Eliminar archivo del disco
 * @param {string} filepath - Ruta del archivo
 * @returns {Promise<boolean>} - True si se eliminó correctamente
 */
export const deleteFile = async (filepath) => {
  try {
    if (fs.existsSync(filepath)) {
      await fs.promises.unlink(filepath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error al eliminar archivo ${filepath}:`, error);
    return false;
  }
};