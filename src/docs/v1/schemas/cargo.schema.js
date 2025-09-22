export const cargosSchemas = {
  Cargo: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      nombre: {
        type: 'string',
        example: 'docente'
      },
      estado: {
        type: 'boolean',
        example: true
      },
      centros: {
        type: 'array',
        items: { type: 'integer', example: 2 },
        description: 'IDs de los centros asociados'
      }
    }
  },
  CargoCreate: {
    type: 'object',
    required: ['nombre', 'centros'],
    properties: {
      nombre: {
        type: 'string',
        example: 'docente'
      },
      estado: {
        type: 'boolean',
        example: true
      },
      centros: {
        type: 'array',
        items: { type: 'integer', example: 2 },
        description: 'IDs de los centros a asociar'
      }
    }
  },
  CargoUpdate: {
    type: 'object',
    properties: {
      nombre: {
        type: 'string',
        example: 'docente actualizado'
      },
      estado: {
        type: 'boolean',
        example: false
      },
      centros: {
        type: 'array',
        items: { type: 'integer', example: 2 },
        description: 'IDs de los centros a asociar'
      }
    }
  },
  CargoList: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nombre: { type: 'string', example: 'docente' },
      estado: { type: 'boolean', example: true }
    }
  },
}
