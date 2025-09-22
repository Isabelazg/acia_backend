export const informacionesPreviasContratosPath = {
  '/informaciones-previas-contratos': {
    get: {
      tags: ['Informaciones Previas Contratos'],
      summary: 'Obtener todas las informaciones previas de contratos',
      responses: {
        200: {
          description: 'Lista de informaciones previas obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/InformacionPreviaContrato' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Informaciones Previas Contratos'],
      summary: 'Crear una nueva información previa de contrato',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/InformacionPreviaContrato' }
          }
        }
      },
      responses: {
        201: { description: 'Información previa de contrato creada exitosamente' }
      }
    }
  },
  '/informaciones-previas-contratos/{id}': {
    get: {
      tags: ['Informaciones Previas Contratos'],
      summary: 'Obtener una información previa de contrato por ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: {
        200: {
          description: 'Información previa de contrato obtenida exitosamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/InformacionPreviaContrato' }
            }
          }
        },
        404: { description: 'Información previa de contrato no encontrada' }
      }
    },
    put: {
      tags: ['Informaciones Previas Contratos'],
      summary: 'Actualizar una información previa de contrato',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/InformacionPreviaContrato' }
          }
        }
      },
      responses: {
        200: { description: 'Información previa de contrato actualizada exitosamente' },
        404: { description: 'Información previa de contrato no encontrada' }
      }
    },
    delete: {
      tags: ['Informaciones Previas Contratos'],
      summary: 'Eliminar una información previa de contrato',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: {
        200: { description: 'Información previa de contrato eliminada exitosamente' },
        404: { description: 'Información previa de contrato no encontrada' }
      }
    }
  }
}
