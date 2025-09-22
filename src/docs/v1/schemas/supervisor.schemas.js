export const supervisorSchemas = {
  Supervisor: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del supervisor',
        example: 1
      },
      documento: {
        type: 'string',
        maxLength: 25,
        description: 'Documento único del supervisor',
        example: '123456'
      },
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del supervisor',
        example: 'Juan'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del supervisor',
        example: 'Perez'
      },
      sexo: {
        type: 'integer',
        description: 'Sexo del supervisor (0: Masculino, 1: Femenino)',
        example: 0
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico del supervisor',
        example: 'juan.perez@example.com'
      },
      cargo: {
        type: 'string',
        maxLength: 500,
        description: 'Cargo del supervisor',
        example: 'Gerente'
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
    required: ['documento', 'nombres', 'apellidos', 'sexo', 'correo', 'cargo']
  },

  SupervisorInput: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        maxLength: 25,
        description: 'Documento único del supervisor',
        example: '123456'
      },
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del supervisor',
        example: 'Juan'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del supervisor',
        example: 'Perez'
      },
      sexo: {
        type: 'integer',
        description: 'Sexo del supervisor (0: Masculino, 1: Femenino)',
        example: 0
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico del supervisor',
        example: 'juan.perez@example.com'
      },
      cargo: {
        type: 'string',
        maxLength: 500,
        description: 'Cargo del supervisor',
        example: 'Gerente'
      }
    },
    required: ['documento', 'nombres', 'apellidos', 'sexo', 'correo', 'cargo']
  },

  SupervisorUpdate: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        maxLength: 25,
        description: 'Documento único del supervisor',
        example: '123456'
      },
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del supervisor',
        example: 'Juan'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del supervisor',
        example: 'Perez'
      },
      sexo: {
        type: 'integer',
        description: 'Sexo del supervisor (0: Masculino, 1: Femenino)',
        example: 0
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico del supervisor',
        example: 'juan.perez@example.com'
      },
      cargo: {
        type: 'string',
        maxLength: 500,
        description: 'Cargo del supervisor',
        example: 'Gerente'
      }
    }
  },

  SupervisoresPaginados: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Supervisor' },
        description: 'Lista de supervisores'
      },
      meta: {
        type: 'object',
        properties: {
          total: { type: 'integer', example: 10 }
        }
      },
      links: {
        type: 'object',
        properties: {
          self: { type: 'string', example: 'http://localhost:3000/supervisores/?pagination=false' }
        }
      }
    }
  },

  SupervisorFiltros: {
    type: 'object',
    properties: {
      page: { type: 'integer', example: 1, minimum: 1, default: 1 },
      limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
      documento: { type: 'string', example: '123456' },
      nombres: { type: 'string', example: 'Juan' },
      apellidos: { type: 'string', example: 'Perez' },
      sexo: { type: 'integer', example: 0 },
      correo: { type: 'string', example: 'juan.perez@example.com' },
      cargo: { type: 'string', example: 'Gerente' }
    }
  },

  SupervisorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Supervisor creado exitosamente' },
      data: { $ref: '#/components/schemas/Supervisor' }
    }
  },

  SupervisoresListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Lista de supervisores obtenida exitosamente' },
      data: { $ref: '#/components/schemas/SupervisoresPaginados' }
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
            path: { type: 'string', example: 'documento' },
            location: { type: 'string', example: 'body' }
          }
        }
      }
    }
  }
};