export const estado_FormacionSchemas = {
  estado_formacion: {
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
