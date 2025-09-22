export const rubrosSchemas = {
  Rubro: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del rubro',
        example: 1
      },
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único del rubro',
        example: 'RUB001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre del rubro',
        example: 'Rubro A'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del rubro (true = activo, false = inactivo)',
        example: true,
        default: true
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
    required: ['codigo', 'nombre']
  },

  RubroInput: {
    type: 'object',
    properties: {
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único del rubro',
        example: 'RUB001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre del rubro',
        example: 'Rubro A'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del rubro (true = activo, false = inactivo)',
        example: true,
        default: true
      }
    },
    required: ['codigo', 'nombre']
  },

  RubroUpdate: {
    type: 'object',
    properties: {
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único del rubro',
        example: 'RUB001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre del rubro',
        example: 'Rubro A'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del rubro (true = activo, false = inactivo)',
        example: false
      }
    }
  },

  RubrosPaginados: {
    type: 'object',
    properties: {
      rubros: {
        type: 'array',
        items: { $ref: '#/components/schemas/Rubro' },
        description: 'Lista de rubros'
      },
      totalPages: { type: 'integer', example: 5 },
      currentPage: { type: 'integer', example: 1 },
      totalItems: { type: 'integer', example: 47 },
      itemsPerPage: { type: 'integer', example: 10 },
      hasNextPage: { type: 'boolean', example: true },
      hasPreviousPage: { type: 'boolean', example: false }
    }
  },

  RubroFiltros: {
    type: 'object',
    properties: {
      page: { type: 'integer', example: 1, minimum: 1, default: 1 },
      limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
      codigo: { type: 'string', example: 'RUB001' },
      nombre: { type: 'string', example: 'Rubro A' },
      estado: { type: 'boolean', example: true }
    }
  },

  RubroResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Rubro creado exitosamente' },
      data: { $ref: '#/components/schemas/Rubro' }
    }
  },

  RubrosListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Lista de rubros obtenida exitosamente' },
      data: { $ref: '#/components/schemas/RubrosPaginados' }
    }
  },

  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: 'Error en la operación' },
      error: { type: 'string', example: 'Descripción específica del error' },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string', example: 'field' },
            msg: { type: 'string', example: 'El campo es requerido' },
            path: { type: 'string', example: 'codigo' },
            location: { type: 'string', example: 'body' }
          }
        }
      }
    }
  }
}