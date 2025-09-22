export const regionalesPaths = {
  '/regionales': {
    get: {
      tags: ['Regionales'],
      summary: 'Obtener todas las regionales',
      description: 'Devuelve una lista de todas las regionales disponibles en el sistema.',
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
          description: 'Filtrar por código de la regional'
        },
        {
          in: 'query',
          name: 'nombre',
          schema: { type: 'string' },
          description: 'Filtrar por nombre de la regional'
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
          description: 'Lista de regionales obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Regional' }
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
                      self: { type: 'string', example: 'http://localhost:3000/regionales/?pagination=false' }
                    }
                  }
                }
              },
              example: {
                data: [
                  {
                    id: 1,
                    codigo: "REG001",
                    nombre: "Regional Norte",
                    estado: true
                  },
                  {
                    id: 2,
                    codigo: "REG002",
                    nombre: "Regional Sur",
                    estado: true
                  }
                ],
                meta: {
                  total: 2
                },
                links: {
                  self: "http://localhost:3000/regionales/?pagination=false"
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Regionales'],
      summary: 'Crear una nueva regional',
      description: 'Crea una nueva regional en el sistema.',
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
            schema: { $ref: '#/components/schemas/RegionalInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Regional creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Regional' }
                }
              },
              example: {
                data: {
                  id: 3,
                  codigo: "REG003",
                  nombre: "Regional Este",
                  estado: true
                }
              }
            }
          }
        }
      }
    }
  },
  '/regionales/{id}': {
    get: {
      tags: ['Regionales'],
      summary: 'Obtener una regional por ID',
      description: 'Devuelve una regional específica según su ID.',
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
          description: 'ID de la regional a consultar'
        }
      ],
      responses: {
        200: {
          description: 'Regional obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Regional' }
                }
              },
              example: {
                data: {
                  id: 1,
                  codigo: "REG001",
                  nombre: "Regional Norte",
                  estado: true
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Regionales'],
      summary: 'Actualizar una regional por ID',
      description: 'Actualiza una regional específica según su ID.',
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
          description: 'ID de la regional a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegionalUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Regional actualizada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Regional' }
                }
              },
              example: {
                data: {
                  id: 1,
                  codigo: "REG001",
                  nombre: "Regional Norte Actualizada",
                  estado: false
                }
              }
            }
          }
        }
      }
    }
  },
  '/regionales/list': {
    get: {
      tags: ['Regionales'],
      summary: 'Obtener lista simplificada de regionales',
      description: 'Devuelve una lista simplificada de regionales activas.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de regionales obtenida exitosamente',
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
                        codigo: { type: 'string', example: 'REG001' },
                        nombre: { type: 'string', example: 'Regional Norte' }
                      }
                    }
                  }
                }
              },
              example: {
                data: [
                  { id: 1, codigo: "REG001", nombre: "Regional Norte" },
                  { id: 2, codigo: "REG002", nombre: "Regional Sur" }
                ]
              }
            }
          }
        }
      }
    }
  }
};