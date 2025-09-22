export const supervisorPaths = {
  '/supervisores': {
    get: {
      tags: ['Supervisores'],
      summary: 'Obtener todos los supervisores',
      description: 'Devuelve una lista de todos los supervisores disponibles en el sistema.',
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
          name: 'documento',
          schema: { type: 'string' },
          description: 'Filtrar por documento del supervisor'
        },
        {
          in: 'query',
          name: 'nombres',
          schema: { type: 'string' },
          description: 'Filtrar por nombres del supervisor'
        },
        {
          in: 'query',
          name: 'apellidos',
          schema: { type: 'string' },
          description: 'Filtrar por apellidos del supervisor'
        },
        {
          in: 'query',
          name: 'sexo',
          schema: { type: 'integer', enum: [0, 1] },
          description: 'Filtrar por sexo (0: masculino, 1: femenino)'
        },
        {
          in: 'query',
          name: 'correo',
          schema: { type: 'string' },
          description: 'Filtrar por correo del supervisor'
        },
        {
          in: 'query',
          name: 'cargo',
          schema: { type: 'string' },
          description: 'Filtrar por cargo del supervisor'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['id', 'documento', 'nombres', 'apellidos', 'sexo', 'correo', 'cargo'] },
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
          description: 'Lista de supervisores obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Supervisor' }
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
                      self: { type: 'string', example: 'http://localhost:3000/supervisores/?pagination=false' }
                    }
                  }
                }
              },
              example: {
                data: [
                  {
                    id: 1,
                    documento: "123456",
                    nombres: "Juan",
                    apellidos: "Perez",
                    sexo: 0,
                    correo: "juan.perez@example.com",
                    cargo: "Gerente"
                  },
                  {
                    id: 2,
                    documento: "789012",
                    nombres: "Maria",
                    apellidos: "Gomez",
                    sexo: 1,
                    correo: "maria.gomez@example.com",
                    cargo: "Coordinadora"
                  }
                ],
                meta: {
                  total: 2
                },
                links: {
                  self: "http://localhost:3000/supervisores/?pagination=false"
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Supervisores'],
      summary: 'Crear un nuevo supervisor',
      description: 'Crea un nuevo supervisor en el sistema.',
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
            schema: { $ref: '#/components/schemas/SupervisorInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Supervisor creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Supervisor' }
                }
              },
              example: {
                data: {
                  id: 3,
                  documento: "456789",
                  nombres: "Carlos",
                  apellidos: "Ramirez",
                  sexo: 0,
                  correo: "carlos.ramirez@example.com",
                  cargo: "Supervisor"
                }
              }
            }
          }
        }
      }
    }
  },
  '/supervisores/{id}': {
    get: {
      tags: ['Supervisores'],
      summary: 'Obtener un supervisor por ID',
      description: 'Devuelve un supervisor específico según su ID.',
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
          description: 'ID del supervisor a consultar'
        }
      ],
      responses: {
        200: {
          description: 'Supervisor obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Supervisor' }
                }
              },
              example: {
                data: {
                  id: 1,
                  documento: "123456",
                  nombres: "Juan",
                  apellidos: "Perez",
                  sexo: 0,
                  correo: "juan.perez@example.com",
                  cargo: "Gerente"
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Supervisores'],
      summary: 'Actualizar un supervisor por ID',
      description: 'Actualiza un supervisor específico según su ID.',
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
          description: 'ID del supervisor a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SupervisorUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Supervisor actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Supervisor' }
                }
              },
              example: {
                data: {
                  id: 1,
                  documento: "123456",
                  nombres: "Juan",
                  apellidos: "Perez",
                  sexo: 0,
                  correo: "juan.perez@example.com",
                  cargo: "Gerente"
                }
              }
            }
          }
        }
      }
    }
  },
  '/supervisores/list': {
    get: {
      tags: ['Supervisores'],
      summary: 'Obtener lista simplificada de supervisores',
      description: 'Devuelve una lista simplificada de supervisores activos.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de supervisores obtenida exitosamente',
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
                        documento: { type: 'string', example: '123456' },
                        nombres: { type: 'string', example: 'Juan' },
                        apellidos: { type: 'string', example: 'Perez' }
                      }
                    }
                  }
                }
              },
              example: {
                data: [
                  { id: 1, documento: "123456", nombres: "Juan", apellidos: "Perez" },
                  { id: 2, documento: "789012", nombres: "Maria", apellidos: "Gomez" }
                ]
              }
            }
          }
        }
      }
    }
  }
};