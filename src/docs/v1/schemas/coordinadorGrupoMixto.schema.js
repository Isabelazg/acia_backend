export const coordinadoresGrupoMixtoSchemas = {
  CoordinadorGrupoMixto: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del coordinador grupo mixto',
        example: 1
      },
      documento: {
        type: 'string',
        maxLength: 20,
        description: 'Documento único del coordinador grupo mixto',
        example: '123456789'
      },
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del coordinador grupo mixto',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del coordinador grupo mixto',
        example: 'Pérez Gómez'
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico',
        example: 'juan.perez@sena.edu.co'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Teléfono de contacto',
        example: '3001234567'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del coordinador (true = activo, false = inactivo)',
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
    required: ['documento', 'nombres', 'apellidos', 'correo']
  },

  CoordinadorGrupoMixtoInput: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        maxLength: 20,
        description: 'Documento único del coordinador grupo mixto',
        example: '123456789'
      },
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del coordinador grupo mixto',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del coordinador grupo mixto',
        example: 'Pérez Gómez'
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico',
        example: 'juan.perez@sena.edu.co'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Teléfono de contacto',
        example: '3001234567'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del coordinador (true = activo, false = inactivo)',
        example: true,
        default: true
      }
    },
    required: ['documento', 'nombres', 'apellidos', 'correo']
  },

  CoordinadorGrupoMixtoUpdate: {
    type: 'object',
    properties: {
      nombres: {
        type: 'string',
        maxLength: 50,
        description: 'Nombres del coordinador grupo mixto',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 50,
        description: 'Apellidos del coordinador grupo mixto',
        example: 'Pérez Gómez'
      },
      correo: {
        type: 'string',
        maxLength: 100,
        description: 'Correo electrónico',
        example: 'juan.perez@sena.edu.co'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Teléfono de contacto',
        example: '3001234567'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del coordinador (true = activo, false = inactivo)',
        example: false
      }
    }
  },

  CoordinadoresGrupoMixtoPaginados: {
    type: 'object',
    properties: {
      coordinadoresGrupoMixto: {
        type: 'array',
        items: { $ref: '#/components/schemas/CoordinadorGrupoMixto' },
        description: 'Lista de coordinadores grupo mixto'
      },
      totalPages: { type: 'integer', example: 5 },
      currentPage: { type: 'integer', example: 1 },
      totalItems: { type: 'integer', example: 47 },
      itemsPerPage: { type: 'integer', example: 10 },
      hasNextPage: { type: 'boolean', example: true },
      hasPreviousPage: { type: 'boolean', example: false }
    }
  },

  CoordinadorGrupoMixtoFiltros: {
    type: 'object',
    properties: {
      page: { type: 'integer', example: 1, minimum: 1, default: 1 },
      limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
      documento: { type: 'string', example: '123456789' },
      nombres: { type: 'string', example: 'Juan Carlos' },
      apellidos: { type: 'string', example: 'Pérez Gómez' },
      correo: { type: 'string', example: 'juan.perez@sena.edu.co' },
      estado: { type: 'boolean', example: true }
    }
  },

  CoordinadorGrupoMixtoResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Coordinador grupo mixto creado exitosamente' },
      data: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
    }
  },

  CoordinadoresGrupoMixtoListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Lista de coordinadores grupo mixto obtenida exitosamente' },
      data: { $ref: '#/components/schemas/CoordinadoresGrupoMixtoPaginados' }
    }
  }
};