export const cdpPaths = {
  '/cdps': {
    get: {
      tags: ['CDP'],
      summary: 'Obtener todos los CDP',
      description: 'Devuelve una lista de todos los CDP disponibles en el sistema.',
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
          name: 'numero',
          schema: { type: 'string' },
          description: 'Filtrar por número de CDP'
        },
        {
          in: 'query',
          name: 'centro_id',
          schema: { type: 'integer' },
          description: 'Filtrar por ID del centro'
        },
        {
          in: 'query',
          name: 'estado',
          schema: { type: 'boolean' },
          description: 'Filtrar por estado (activo/inactivo)'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['numero', 'fecha', 'estado'] },
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
          description: 'Lista de CDP obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CDP' }
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
                      self: { type: 'string', example: 'http://localhost:3000/cdps/?pagination=false' }
                    }
                  }
                }
              },
              example: {
                data: [
                  {
                    id: 1,
                    numero: "CDP-2025-001",
                    fecha: "2025-01-10",
                    valor: 1000000,
                    estado: true
                  }
                ],
                meta: {
                  total: 1
                },
                links: {
                  self: "http://localhost:3000/cdps/?pagination=false"
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['CDP'],
      summary: 'Crear un nuevo CDP',
      description: 'Crea un nuevo CDP en el sistema.',
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
            schema: { $ref: '#/components/schemas/CDPInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'CDP creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CDP' }
                }
              },
              example: {
                data: {
                  id: 2,
                  numero: "CDP-2025-002",
                  fecha: "2025-02-15",
                  valor: 2000000,
                  estado: true
                }
              }
            }
          }
        }
      }
    }
  },
  '/cdps/{id}': {
    get: {
      tags: ['CDP'],
      summary: 'Obtener un CDP por ID',
      description: 'Devuelve un CDP específico según su ID.',
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
          description: 'ID del CDP a consultar'
        }
      ],
      responses: {
        200: {
          description: 'CDP obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CDP' }
                }
              },
              example: {
                data: {
                  id: 1,
                  numero: "CDP-2025-001",
                  fecha: "2025-01-10",
                  valor: 1000000,
                  estado: true
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['CDP'],
      summary: 'Actualizar un CDP por ID',
      description: 'Actualiza un CDP específico según su ID.',
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
          description: 'ID del CDP a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CDPUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'CDP actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CDP' }
                }
              },
              example: {
                data: {
                  id: 1,
                  numero: "CDP-2025-001",
                  fecha: "2025-01-10",
                  valor: 1500000,
                  estado: false
                }
              }
            }
          }
        }
      }
    }
  },
  '/cdps/list': {
    get: {
      tags: ['CDP'],
      summary: 'Obtener lista simplificada de CDP',
      description: 'Devuelve una lista simplificada de CDP activos.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de CDP obtenida exitosamente',
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
                        numero: { type: 'string', example: 'CDP-2025-001' },
                        valor: { type: 'number', example: 1000000 }
                      }
                    }
                  }
                }
              },
              example: {
                data: [
                  { id: 1, numero: "CDP-2025-001", valor: 1000000 },
                  { id: 2, numero: "CDP-2025-002", valor: 2000000 }
                ]
              }
            }
          }
        }
      }
    }
  }
}