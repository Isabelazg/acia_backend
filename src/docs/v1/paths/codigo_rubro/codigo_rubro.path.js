export const codigoRubrosPaths = {
  '/codigo-rubros': {
    get: {
      tags: ['Código Rubros'],
      summary: 'Obtener todos los códigos de rubros',
      description: 'Devuelve una lista de todos los códigos de rubros disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'query',
          name: 'codigo',
          schema: { type: 'string' },
          description: 'Filtrar por código'
        },
        {
          in: 'query',
          name: 'dependencia_id',
          schema: { type: 'integer' },
          description: 'Filtrar por dependencia'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['id', 'codigo', 'nombre'] },
          description: 'Campo por el cual ordenar'
        },
        {
          in: 'query',
          name: 'order',
          schema: { type: 'string', enum: ['asc', 'desc'] },
          description: 'Orden ascendente o descendente'
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', minimum: 1 },
          description: 'Número de página para paginación'
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', minimum: 1 },
          description: 'Cantidad de resultados por página'
        }
      ],
      responses: {
        200: {
          description: 'Lista de códigos de rubros obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CodigoRubro' }
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer', example: 10 }
                    }
                  },
                  links: {
                    type: 'object',
                    properties: {
                      self: { type: 'string', example: 'http://localhost:3000/codigo-rubros/?pagination=false' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Código Rubros'],
      summary: 'Crear un nuevo código de rubro',
      description: 'Crea un nuevo código de rubro en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'header',
          name: 'Content-Type',
          required: true,
          schema: { type: 'string', example: 'application/json' },
          description: 'Tipo de contenido de la solicitud'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CodigoRubroInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Código de rubro creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CodigoRubro' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/codigo-rubros/{id}': {
    get: {
      tags: ['Código Rubros'],
      summary: 'Obtener un código de rubro por ID',
      description: 'Devuelve un código de rubro específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del código de rubro a consultar'
        }
      ],
      responses: {
        200: {
          description: 'Código de rubro obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CodigoRubro' }
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Código Rubros'],
      summary: 'Actualizar un código de rubro por ID',
      description: 'Actualiza un código de rubro específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del código de rubro a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CodigoRubroUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Código de rubro actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CodigoRubro' }
                }
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Código Rubros'],
      summary: 'Eliminar un código de rubro por ID',
      description: 'Elimina un código de rubro específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del código de rubro a eliminar'
        }
      ],
      responses: {
        200: {
          description: 'Código de rubro eliminado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CodigoRubro' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/codigo-rubros/list': {
    get: {
      tags: ['Código Rubros'],
      summary: 'Obtener lista simplificada de códigos de rubros',
      description: 'Devuelve una lista simplificada de códigos de rubros activos.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de códigos de rubros obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        codigo: { type: 'string', example: 'CR-001' },
                        nombre: { type: 'string', example: 'Código Rubro 1' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};