export const codigoRubrosSchemas = {
  CodigoRubro: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del código de rubro',
        example: 1
      },
      codigo: {
        type: 'string',
        maxLength: 20,
        description: 'Código único del rubro',
        example: 'CR001'
      },
      dependencia_id: {
        type: 'integer',
        description: 'Identificador de la dependencia asociada',
        example: 2
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación del registro',
        example: '2025-07-17T11:00:00.000Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de última actualización del registro',
        example: '2025-07-17T11:00:00.000Z',
        nullable: true
      }
    },
    required: ['codigo', 'dependencia_id']
  },

  CodigoRubrosPaginados: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/CodigoRubro' },
        description: 'Lista de códigos de rubros'
      },
      meta: {
        type: 'object',
        properties: {
          total: { type: 'integer', example: 2 },
          currentPage: { type: 'integer', example: 1 },
          itemsPerPage: { type: 'integer', example: 10 },
          totalPages: { type: 'integer', example: 1 }
        }
      },
      links: {
        type: 'object',
        properties: {
          self: { type: 'string', example: 'http://localhost:3000/api/v1/codigo_rubros?page=1&limit=10' },
          next: { type: 'string', nullable: true, example: null },
          previous: { type: 'string', nullable: true, example: null }
        }
      }
    }
  },

  CodigoRubrosListResponse: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/CodigoRubro' },
        description: 'Lista de códigos de rubros sin paginación'
      },
      count: {
        type: 'integer',
        description: 'Cantidad total de códigos de rubros',
        example: 2
      }
    }
  },

  CodigoRubroResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Código de rubro creado exitosamente' },
      data: { $ref: '#/components/schemas/CodigoRubro' }
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