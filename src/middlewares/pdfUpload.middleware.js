import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

// Filtro de archivos - solo PDF
const fileFilter = (req, file, cb) => {
  // Accept the file regardless of the declared mimetype. We'll validate the buffer later
  // in the service layer (isValidPDF). Some browsers or clients may send a different
  // Content-Type even for real PDFs (e.g., application/octet-stream).
  if (file.mimetype !== 'application/pdf') {
    console.warn(`pdfUpload: recibido archivo con mimetype inesperado: ${file.mimetype}. Aceptando para validación posterior.`)
  }
  cb(null, true);
};

// Configuración de multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
  fileFilter: fileFilter,
});

// Middleware para subir un solo archivo PDF
export const uploadPDF = upload.single('pdf');

// Middleware de manejo de errores de multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 10MB',
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Campo de archivo inesperado',
      });
    }
  }

  if (error.message === 'Solo se permiten archivos PDF') {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
};