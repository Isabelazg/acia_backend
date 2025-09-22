export const hojasDeVidaPath = {
  '/hojas-de-vida': {
    get: {
      tags: ['Hojas de Vida'],
      summary: 'Obtener todas las hojas de vida con información asociada',
      responses: {
        200: {
          description: 'Lista de hojas de vida con información relacionada',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/HojaDeVida' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Hojas de Vida'],
      summary: 'Crear una nueva hoja de vida con toda la información relacionada',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/HojaDeVida' }
          }
        }
      },
      responses: {
        201: { description: 'Hoja de vida creada exitosamente' }
      }
    }
  },
  '/hojas-de-vida/{id}': {
    get: {
      tags: ['Hojas de Vida'],
      summary: 'Obtener una hoja de vida por ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: {
        200: {
          description: 'Hoja de vida obtenida exitosamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/HojaDeVida' }
            }
          }
        },
        404: { description: 'Hoja de vida no encontrada' }
      }
    }
  }
}
