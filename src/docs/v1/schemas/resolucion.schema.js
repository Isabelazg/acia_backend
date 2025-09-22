export const resolucionesSchemas = {
  Resolucion: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único de la resolución',
        example: 1
      },
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de la resolución',
        example: '2025-08-13'
      },
      acta_posesion: {
        type: 'string',
        maxLength: 50,
        description: 'Número del acta de posesión',
        example: 'ACTA-2025-001',
        nullable: true
      },
      fecha_posesion: {
        type: 'string',
        format: 'date',
        description: 'Fecha de posesión del cargo',
        example: '2025-08-15',
        nullable: true
      },
      fecha_ingreso: {
        type: 'string',
        format: 'date',
        description: 'Fecha de ingreso',
        example: '2025-08-20'
      },
      fecha_retiro: {
        type: 'string',
        format: 'date',
        description: 'Fecha de retiro (si aplica)',
        example: '2025-12-31',
        nullable: true
      },
      es_encargado: {
        type: 'boolean',
        description: 'Indica si es encargado del cargo',
        example: true
      },
      centro: {
        type: 'object',
        description: 'Centro asociado a la resolución',
        properties: {
          id: { type: 'integer', example: 1 },
          codigo: { type: 'string', example: 'CEN001' },
          nombre: { type: 'string', example: 'Centro de Formación' }
        }
      },
      ordenador: {
        type: 'object',
        description: 'Ordenador asociado a la resolución',
        properties: {
          id: { type: 'integer', example: 1 },
          documento: { type: 'string', example: '12345678' },
          nombres: { type: 'string', example: 'Juan Carlos' },
          apellidos: { type: 'string', example: 'García López' }
        }
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación del registro',
        example: '2024-01-15T10:30:00.000Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de última actualización del registro',
        example: '2024-01-15T10:30:00.000Z',
        nullable: true
      }
    },
    required: ['fecha', 'fecha_ingreso', 'es_encargado', 'centro_id', 'ordenadores_id']
  },

  ResolucionInput: {
    type: 'object',
    properties: {
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de la resolución',
        example: '2025-08-13'
      },
      acta_posesion: {
        type: 'string',
        maxLength: 50,
        description: 'Número del acta de posesión',
        example: 'ACTA-2025-001',
        nullable: true
      },
      fecha_posesion: {
        type: 'string',
        format: 'date',
        description: 'Fecha de posesión del cargo',
        example: '2025-08-15',
        nullable: true
      },
      fecha_ingreso: {
        type: 'string',
        format: 'date',
        description: 'Fecha de ingreso',
        example: '2025-08-20'
      },
      fecha_retiro: {
        type: 'string',
        format: 'date',
        description: 'Fecha de retiro (si aplica)',
        example: '2025-12-31',
        nullable: true
      },
      es_encargado: {
        type: 'boolean',
        description: 'Indica si es encargado del cargo',
        example: true
      },
      centro_id: {
        type: 'integer',
        minimum: 1,
        description: 'ID del centro asociado',
        example: 1
      },
      ordenadores_id: {
        type: 'integer',
        minimum: 1,
        description: 'ID del ordenador asociado',
        example: 1
      }
    },
    required: ['fecha', 'fecha_ingreso', 'es_encargado', 'centro_id', 'ordenadores_id'],
    example: {
      fecha: '2025-08-13',
      acta_posesion: 'ACTA-2025-001',
      fecha_posesion: '2025-08-15',
      fecha_ingreso: '2025-08-20',
      fecha_retiro: '2025-12-31',
      es_encargado: true,
      centro_id: 1,
      ordenadores_id: 1
    }
  },

  ResolucionUpdateInput: {
    type: 'object',
    properties: {
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de la resolución',
        example: '2025-08-13'
      },
      acta_posesion: {
        type: 'string',
        maxLength: 50,
        description: 'Número del acta de posesión',
        example: 'ACTA-2025-001',
        nullable: true
      },
      fecha_posesion: {
        type: 'string',
        format: 'date',
        description: 'Fecha de posesión del cargo',
        example: '2025-08-15',
        nullable: true
      },
      fecha_ingreso: {
        type: 'string',
        format: 'date',
        description: 'Fecha de ingreso',
        example: '2025-08-20'
      },
      fecha_retiro: {
        type: 'string',
        format: 'date',
        description: 'Fecha de retiro (si aplica)',
        example: '2025-12-31',
        nullable: true
      },
      es_encargado: {
        type: 'boolean',
        description: 'Indica si es encargado del cargo',
        example: true
      },
      centro_id: {
        type: 'integer',
        minimum: 1,
        description: 'ID del centro asociado',
        example: 1
      },
      ordenadores_id: {
        type: 'integer',
        minimum: 1,
        description: 'ID del ordenador asociado',
        example: 1
      }
    },
    example: {
      fecha: '2025-08-13',
      acta_posesion: 'ACTA-2025-002',
      fecha_posesion: '2025-08-15',
      fecha_ingreso: '2025-08-20',
      es_encargado: false
    }
  },

  ResolucionList: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único de la resolución',
        example: 1
      },
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de la resolución',
        example: '2025-08-13'
      },
      acta_posesion: {
        type: 'string',
        description: 'Número del acta de posesión',
        example: 'ACTA-2025-001'
      },
      fecha_posesion: {
        type: 'string',
        format: 'date',
        description: 'Fecha de posesión',
        example: '2025-08-15'
      },
      fecha_ingreso: {
        type: 'string',
        format: 'date',
        description: 'Fecha de ingreso',
        example: '2025-08-20'
      },
      fecha_retiro: {
        type: 'string',
        format: 'date',
        description: 'Fecha de retiro',
        example: '2025-12-31'
      },
      es_encargado: {
        type: 'boolean',
        description: 'Si es encargado',
        example: true
      },
      centro: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          codigo: { type: 'string' },
          nombre: { type: 'string' }
        }
      },
      ordenador: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          documento: { type: 'string' },
          nombres: { type: 'string' },
          apellidos: { type: 'string' }
        }
      }
    }
  }
};
