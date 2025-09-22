export const experienciasLaboralPath = {
  '/experiencias-laboral': {
    get: {
      tags: ['Experiencias Laboral'],
      summary: 'Obtener todas las experiencias laborales',
      responses: {
        200: {
          description: 'Lista de experiencias laborales obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/ExperienciaLaboral' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Experiencias Laboral'],
      summary: 'Crear una nueva experiencia laboral',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ExperienciaLaboral' }
          }
        }
      },
      responses: {
        201: { description: 'Experiencia laboral creada exitosamente' }
      }
    }
  },
  '/experiencias-laboral/{id}': {
    get: {
      tags: ['Experiencias Laboral'],
      summary: 'Obtener una experiencia laboral por ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: {
        200: {
          description: 'Experiencia laboral obtenida exitosamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ExperienciaLaboral' }
            }
          }
        },
        404: { description: 'Experiencia laboral no encontrada' }
      }
    },
    put: {
      tags: ['Experiencias Laboral'],
      summary: 'Actualizar una experiencia laboral',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ExperienciaLaboral' }
          }
        }
      },
      responses: {
        200: { description: 'Experiencia laboral actualizada exitosamente' },
        404: { description: 'Experiencia laboral no encontrada' }
      }
    },
    delete: {
      tags: ['Experiencias Laboral'],
      summary: 'Eliminar una experiencia laboral',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: {
        200: { description: 'Experiencia laboral eliminada exitosamente' },
        404: { description: 'Experiencia laboral no encontrada' }
      }
    }
  }
}
