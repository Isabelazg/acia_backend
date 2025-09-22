export const ordenadoresSchemas = {
  Ordenador: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del ordenador',
        example: 1
      },
      documento: {
        type: 'string',
        maxLength: 50,
        description: 'Número de documento del ordenador',
        example: '12345678'
      },
      nombres: {
        type: 'string',
        maxLength: 100,
        description: 'Nombres del ordenador',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 100,
        description: 'Apellidos del ordenador',
        example: 'García López'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Número de teléfono del ordenador',
        example: '+57 300 123 4567',
        nullable: true
      },
      correo: {
        type: 'string',
        format: 'email',
        maxLength: 200,
        description: 'Correo electrónico del ordenador',
        example: 'juan.garcia@example.com'
      },
      sexo: {
        type: 'string',
        enum: ['M', 'F'],
        description: 'Sexo del ordenador (M = Masculino, F = Femenino)',
        example: 'M'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del ordenador (true = activo, false = inactivo)',
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
    required: ['documento', 'nombres', 'apellidos', 'correo', 'sexo']
  },

  OrdenadorInput: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        maxLength: 50,
        description: 'Número de documento del ordenador',
        example: '12345678'
      },
      nombres: {
        type: 'string',
        maxLength: 100,
        description: 'Nombres del ordenador',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 100,
        description: 'Apellidos del ordenador',
        example: 'García López'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Número de teléfono del ordenador',
        example: '+57 300 123 4567',
        nullable: true
      },
      correo: {
        type: 'string',
        format: 'email',
        maxLength: 200,
        description: 'Correo electrónico del ordenador',
        example: 'juan.garcia@example.com'
      },
      sexo: {
        type: 'string',
        enum: ['M', 'F'],
        description: 'Sexo del ordenador (M = Masculino, F = Femenino)',
        example: 'M'
      }
    },
    required: ['documento', 'nombres', 'apellidos', 'correo', 'sexo'],
    example: {
      documento: '12345678',
      nombres: 'Juan Carlos',
      apellidos: 'García López',
      telefono: '+57 300 123 4567',
      correo: 'juan.garcia@example.com',
      sexo: 'M'
    }
  },

  OrdenadorUpdateInput: {
    type: 'object',
    properties: {
      documento: {
        type: 'string',
        maxLength: 50,
        description: 'Número de documento del ordenador',
        example: '12345678'
      },
      nombres: {
        type: 'string',
        maxLength: 100,
        description: 'Nombres del ordenador',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        maxLength: 100,
        description: 'Apellidos del ordenador',
        example: 'García López'
      },
      telefono: {
        type: 'string',
        maxLength: 20,
        description: 'Número de teléfono del ordenador',
        example: '+57 300 123 4567',
        nullable: true
      },
      correo: {
        type: 'string',
        format: 'email',
        maxLength: 200,
        description: 'Correo electrónico del ordenador',
        example: 'juan.garcia@example.com'
      },
      sexo: {
        type: 'string',
        enum: ['M', 'F'],
        description: 'Sexo del ordenador (M = Masculino, F = Femenino)',
        example: 'M'
      }
    },
    example: {
      nombres: 'Juan Carlos',
      apellidos: 'García López',
      telefono: '+57 300 123 4567',
      correo: 'juan.garcia@example.com'
    }
  },

  OrdenadorList: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del ordenador',
        example: 1
      },
      documento: {
        type: 'string',
        description: 'Número de documento del ordenador',
        example: '12345678'
      },
      nombres: {
        type: 'string',
        description: 'Nombres del ordenador',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        description: 'Apellidos del ordenador',
        example: 'García López'
      },
      estado: {
        type: 'boolean',
        description: 'Estado del ordenador',
        example: true
      }
    }
  }
};
