export const rubrosPaths = {
  '/rubros': {
    get: {
      tags: ['Rubros'],
      summary: 'Obtener todos los rubros',
      description: 'Devuelve una lista de todos los rubros disponibles en el sistema.',
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
          description: 'Filtrar por código del rubro'
        },
        {
          in: 'query',
          name: 'nombre',
          schema: { type: 'string' },
          description: 'Filtrar por nombre del rubro'
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
          schema: { type: 'string', enum: ['codigo', 'nombre', 'estado'] },
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
          description: 'Lista de rubros obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Rubro' }
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
                      self: { type: 'string', example: 'http://localhost:3000/rubros/?pagination=false' }
                    }
                  }
                }
              },
              example: {
                data: [
                  {
                    id: 1,
                    codigo: "RUB001",
                    nombre: "Rubro A",
                    estado: true
                  },
                  {
                    id: 2,
                    codigo: "RUB002",
                    nombre: "Rubro B",
                    estado: true
                  }
                ],
                meta: {
                  total: 2
                },
                links: {
                  self: "http://localhost:3000/rubros/?pagination=false"
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Rubros'],
      summary: 'Crear un nuevo rubro',
      description: 'Crea un nuevo rubro en el sistema.',
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
            schema: { $ref: '#/components/schemas/RubroInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Rubro creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Rubro' }
                }
              },
              example: {
                data: {
                  id: 3,
                  codigo: "RUB003",
                  nombre: "Rubro C",
                  estado: true
                }
              }
            }
          }
        }
      }
    }
  },
  '/rubros/{id}': {
    get: {
      tags: ['Rubros'],
      summary: 'Obtener un rubro por ID',
      description: 'Devuelve un rubro específico según su ID.',
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
          description: 'ID del rubro a consultar'
        }
      ],
      responses: {
        200: {
          description: 'Rubro obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Rubro' }
                }
              },
              example: {
                data: {
                  id: 1,
                  codigo: "RUB001",
                  nombre: "Rubro A",
                  estado: true
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Rubros'],
      summary: 'Actualizar un rubro por ID',
      description: 'Actualiza un rubro específico según su ID.',
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
          description: 'ID del rubro a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RubroUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Rubro actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Rubro' }
                }
              },
              example: {
                data: {
                  id: 1,
                  codigo: "RUB001",
                  nombre: "Rubro A Actualizado",
                  estado: false
                }
              }
            }
          }
        }
      }
    }
  },
  '/rubros/list': {
    get: {
      tags: ['Rubros'],
      summary: 'Obtener lista simplificada de rubros',
      description: 'Devuelve una lista simplificada de rubros activos.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de rubros obtenida exitosamente',
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
                        codigo: { type: 'string', example: 'RUB001' },
                        nombre: { type: 'string', example: 'Rubro A' }
                      }
                    }
                  }
                }
              },
              example: {
                data: [
                  { id: 1, codigo: "RUB001", nombre: "Rubro A" },
                  { id: 2, codigo: "RUB002", nombre: "Rubro B" }
                ]
              }
            }
          }
        }
      }
    }
  }
};