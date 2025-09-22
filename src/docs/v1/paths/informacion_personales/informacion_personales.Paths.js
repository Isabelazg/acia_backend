export const informacionPersonalPaths = {
  '/informacion-personal': {
    get: {
      tags: ['Información Personal'],
      summary: 'Obtener todas las informaciones personales',
      responses: {
        200: {
          description: 'Lista de informaciones personales',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/InformacionPersonal' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Información Personal'],
      summary: 'Crear una nueva información personal',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/InformacionPersonal' }
          }
        }
      },
      responses: {
        201: { description: 'Información personal creada exitosamente' }
      }
    }
  },
  '/informacion-personal/{id}': {
    get: {
      tags: ['Información Personal'],
      summary: 'Obtener una información personal por ID',
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
          description: 'Información personal encontrada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/InformacionPersonal' }
            }
          }
        },
        404: { description: 'Información personal no encontrada' }
      }
    },
    put: {
      tags: ['Información Personal'],
      summary: 'Actualizar una información personal por ID',
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
            schema: { $ref: '#/components/schemas/InformacionPersonal' }
          }
        }
      },
      responses: {
        200: { description: 'Información personal actualizada exitosamente' },
        404: { description: 'Información personal no encontrada' }
      }
    },
    delete: {
      tags: ['Información Personal'],
      summary: 'Eliminar una información personal por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: { description: 'Información personal eliminada exitosamente' },
        404: { description: 'Información personal no encontrada' }
      }
    }
  }
}
