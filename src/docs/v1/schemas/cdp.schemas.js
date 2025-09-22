export const cdpSchemas = {
  CDP: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Identificador único del CDP',
        example: 1
      },
      numero: {
        type: 'string',
        maxLength: 30,
        description: 'Número del CDP',
        example: 'CDP-2025-001'
      },
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de expedición del CDP',
        example: '2025-01-10'
      },
      valor: {
        type: 'number',
        description: 'Valor del CDP',
        example: 1000000
      },
      estado: {
        type: 'boolean',
        description: 'Estado del CDP (true = activo, false = inactivo)',
        example: true,
        default: true
      },
      centro_id: {
        type: 'integer',
        description: 'ID del centro asociado',
        example: 2
      },
      quien_expide_id: {
        type: 'integer',
        description: 'ID del coordinador que expide el CDP',
        example: 5
      },
      fuente_recurso_id: {
        type: 'integer',
        description: 'ID de la fuente de recurso',
        example: 3
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de creación del registro',
        example: '2025-01-10T10:30:00.000Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de última actualización del registro',
        example: '2025-01-10T10:30:00.000Z',
        nullable: true
      }
    },
    required: ['numero', 'fecha', 'valor', 'centro_id', 'quien_expide_id', 'fuente_recurso_id']
  },

  CDPInput: {
    type: 'object',
    properties: {
      numero: {
        type: 'string',
        maxLength: 30,
        description: 'Número del CDP',
        example: 'CDP-2025-001'
      },
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de expedición del CDP',
        example: '2025-01-10'
      },
      valor: {
        type: 'number',
        description: 'Valor del CDP',
        example: 1000000
      },
      estado: {
        type: 'boolean',
        description: 'Estado del CDP (true = activo, false = inactivo)',
        example: true,
        default: true
      },
      centro_id: {
        type: 'integer',
        description: 'ID del centro asociado',
        example: 2
      },
      quien_expide_id: {
        type: 'integer',
        description: 'ID del coordinador que expide el CDP',
        example: 5
      },
      fuente_recurso_id: {
        type: 'integer',
        description: 'ID de la fuente de recurso',
        example: 3
      }
    },
    required: ['numero', 'fecha', 'valor', 'centro_id', 'quien_expide_id', 'fuente_recurso_id']
  },

  CDPUpdate: {
    type: 'object',
    properties: {
      numero: {
        type: 'string',
        maxLength: 30,
        description: 'Número del CDP',
        example: 'CDP-2025-001'
      },
      fecha: {
        type: 'string',
        format: 'date',
        description: 'Fecha de expedición del CDP',
        example: '2025-01-10'
      },
      valor: {
        type: 'number',
        description: 'Valor del CDP',
        example: 1500000
      },
      estado: {
        type: 'boolean',
        description: 'Estado del CDP (true = activo, false = inactivo)',
        example: false
      },
      centro_id: {
        type: 'integer',
        description: 'ID del centro asociado',
        example: 2
      },
      quien_expide_id: {
        type: 'integer',
        description: 'ID del coordinador que expide el CDP',
        example: 5
      },
      fuente_recurso_id: {
        type: 'integer',
        description: 'ID de la fuente de recurso',
        example: 3
      }
    }
  }
};