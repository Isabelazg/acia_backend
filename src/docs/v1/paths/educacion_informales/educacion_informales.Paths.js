export const educacionInformalPaths = {
  '/educacion-informal': {
    get: {
      tags: ['Educación Informal'],
      summary: 'Obtener todas las formaciones informales',
      responses: {
        200: {
          description: 'Lista de formaciones informales',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/EducacionInformal' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Educación Informal'],
      summary: 'Crear una nueva formación informal',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EducacionInformal' }
          }
        }
      },
      responses: {
        201: { description: 'Formación informal creada exitosamente' }
      }
    }
  },
  '/educacion-informal/{id}': {
    get: {
      tags: ['Educación Informal'],
      summary: 'Obtener una formación informal por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'Formación informal encontrada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/EducacionInformal' }
            }
          }
        },
        404: { description: 'Formación informal no encontrada' }
      }
    },
    put: {
      tags: ['Educación Informal'],
      summary: 'Actualizar una formación informal por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EducacionInformal' }
          }
        }
      },
      responses: {
        200: { description: 'Formación informal actualizada exitosamente' },
        404: { description: 'Formación informal no encontrada' }
      }
    },
    delete: {
      tags: ['Educación Informal'],
      summary: 'Eliminar una formación informal por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: { description: 'Formación informal eliminada exitosamente' },
        404: { description: 'Formación informal no encontrada' }
      }
    }
  }
}
