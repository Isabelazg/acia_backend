export const nivel_formacionSchemas = {
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
      }
    }
  }
}
