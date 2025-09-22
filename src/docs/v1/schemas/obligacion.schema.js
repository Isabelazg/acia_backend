export const obligacionesSchemas = {
  Cargo: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      numero_orden: {
        type: 'string',
        example: 'docente'
      },
      nombre: {
        type: 'string',
        example: 'docente'
      }
    }
  }
}
