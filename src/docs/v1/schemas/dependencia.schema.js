export const dependenciasSchemas = {
  Dependencia: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      codigo: {
        type: 'string',
        example: 'A01'
      },
      nombre: {
        type: 'string',
        example: 'Dependencia A'
      },
      estado: {
        type: 'boolean',
        example: true
      }
    }
  },
  DependenciaCreate: {
    type: 'object',
    required: ['codigo', 'nombre'],
    properties: {
      codigo: {
        type: 'string',
        example: 'A01'
      },
      nombre: {
        type: 'string',
        example: 'Dependencia A'
      },
      estado: {
        type: 'boolean',
        example: true
      }
    }
  },
  DependenciaUpdate: {
    type: 'object',
    properties: {
      nombre: {
        type: 'string',
        example: 'Dependencia Actualizada'
      },
      estado: {
        type: 'boolean',
        example: false
      }
    }
  },
  DependenciaList: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      codigo: { type: 'string', example: 'A01' },
      nombre: { type: 'string', example: 'Dependencia A' },
      estado: { type: 'boolean', example: true }
    }
  }
}