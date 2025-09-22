export const certificacionesPath = {
  '/certificaciones': {
    get: {
      tags: ['Certificaciones'],
      summary: 'Obtener todas las certificaciones',
      responses: {
        200: {
          description: 'Lista de certificaciones',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Certificacion'
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Certificaciones'],
      summary: 'Crear una nueva certificación',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Certificacion'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Certificación creada con éxito'
        }
      }
    }
  },
  '/certificaciones/{id}': {
    get: {
      tags: ['Certificaciones'],
      summary: 'Obtener una certificación por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'Certificación encontrada',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Certificacion'
              }
            }
          }
        },
        404: {
          description: 'Certificación no encontrada'
        }
      }
    },
    put: {
      tags: ['Certificaciones'],
      summary: 'Actualizar una certificación por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Certificacion'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Certificación actualizada con éxito'
        },
        404: {
          description: 'Certificación no encontrada'
        }
      }
    },
    delete: {
      tags: ['Certificaciones'],
      summary: 'Eliminar una certificación por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'Certificación eliminada con éxito'
        },
        404: {
          description: 'Certificación no encontrada'
        }
      }
    }
  }
}
