export const regionalesSchemas = {
  Regional: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único de la regional',
        example: 1
      },
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único de la regional',
        example: 'REG001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre de la regional',
        example: 'Regional Norte'
      },
      estado: {
        type: 'boolean',
        description: 'Estado de la regional (true = activo, false = inactivo)',
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

  RegionalInput: {
    type: 'object',
    properties: {
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único de la regional',
        example: 'REG001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre de la regional',
        example: 'Regional Norte'
      },
      estado: {
        type: 'boolean',
        description: 'Estado de la regional (true = activo, false = inactivo)',
        example: true,
        default: true
      }
    },
    required: ['codigo', 'nombre']
  },

  RegionalUpdate: {
    type: 'object',
    properties: {
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único de la regional',
        example: 'REG001'
      },
      nombre: {
        type: 'string',
        maxLength: 100,
        description: 'Nombre de la regional',
        example: 'Regional Norte'
      },
      estado: {
        type: 'boolean',
        description: 'Estado de la regional (true = activo, false = inactivo)',
        example: false
      }
    }
  },

  RegionalesPaginados: {
    type: 'object',
    properties: {
      regionales: {
        type: 'array',
        items: { $ref: '#/components/schemas/Regional' },
        description: 'Lista de regionales'
      },
      totalPages: { type: 'integer', example: 5 },
      currentPage: { type: 'integer', example: 1 },
      totalItems: { type: 'integer', example: 47 },
      itemsPerPage: { type: 'integer', example: 10 },
      hasNextPage: { type: 'boolean', example: true },
      hasPreviousPage: { type: 'boolean', example: false }
    }
  },

  RegionalFiltros: {
    type: 'object',
    properties: {
      page: { type: 'integer', example: 1, minimum: 1, default: 1 },
      limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
      codigo: { type: 'string', example: 'REG001' },
      nombre: { type: 'string', example: 'Regional Norte' },
      estado: { type: 'boolean', example: true }
    }
  },

  RegionalResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Regional creada exitosamente' },
      data: { $ref: '#/components/schemas/Regional' }
    }
  },

  RegionalesListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Lista de regionales obtenida exitosamente' },
      data: { $ref: '#/components/schemas/RegionalesPaginados' }
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
};