export const coordinadoresGrupoMixtoPaths = {
  '/coordinadores-grupo-mixto': {
    get: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Obtener todos los coordinadores grupo mixto',
      description: 'Devuelve una lista de todos los coordinadores grupo mixto disponibles en el sistema.',
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
          description: 'Filtrar por documento'
        },
        {
          in: 'query',
          name: 'nombres',
          schema: { type: 'string' },
          description: 'Filtrar por nombres'
        },
        {
          in: 'query',
          name: 'apellidos',
          schema: { type: 'string' },
          description: 'Filtrar por apellidos'
        },
        {
          in: 'query',
          name: 'correo',
          schema: { type: 'string' },
          description: 'Filtrar por correo'
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
          schema: { type: 'string', enum: ['documento', 'nombres', 'apellidos', 'correo', 'estado'] },
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
          description: 'Lista de coordinadores grupo mixto obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
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
                      self: { type: 'string', example: 'http://localhost:3000/coordinadores-grupo-mixto/?pagination=false' }
                    }
                  }
                }
              },
              example: {
                data: [
                  {
                    id: 1,
                    documento: "123456789",
                    nombres: "Juan Carlos",
                    apellidos: "Pérez Gómez",
                    correo: "juan.perez@sena.edu.co",
                    telefono: "3001234567",
                    estado: true
                  }
                ],
                meta: {
                  total: 1
                },
                links: {
                  self: "http://localhost:3000/coordinadores-grupo-mixto/?pagination=false"
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Crear un nuevo coordinador grupo mixto',
      description: 'Crea un nuevo coordinador grupo mixto en el sistema.',
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
            schema: { $ref: '#/components/schemas/CoordinadorGrupoMixtoInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Coordinador grupo mixto creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
                }
              },
              example: {
                data: {
                  id: 2,
                  documento: "987654321",
                  nombres: "Ana María",
                  apellidos: "García López",
                  correo: "ana.garcia@sena.edu.co",
                  telefono: "3109876543",
                  estado: true
                }
              }
            }
          }
        }
      }
    }
  },
  '/coordinadores-grupo-mixto/{documento}': {
    get: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Obtener un coordinador grupo mixto por documento',
      description: 'Devuelve un coordinador grupo mixto específico según su documento.',
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
          name: 'documento',
          required: true,
          schema: { type: 'string' },
          description: 'Documento del coordinador grupo mixto a consultar'
        }
      ],
      responses: {
        200: {
          description: 'Coordinador grupo mixto obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
                }
              },
              example: {
                data: {
                  id: 1,
                  documento: "123456789",
                  nombres: "Juan Carlos",
                  apellidos: "Pérez Gómez",
                  correo: "juan.perez@sena.edu.co",
                  telefono: "3001234567",
                  estado: true
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Actualizar un coordinador grupo mixto por documento',
      description: 'Actualiza un coordinador grupo mixto específico según su documento.',
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
          name: 'documento',
          required: true,
          schema: { type: 'string' },
          description: 'Documento del coordinador grupo mixto a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CoordinadorGrupoMixtoUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Coordinador grupo mixto actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
                }
              },
              example: {
                data: {
                  id: 1,
                  documento: "123456789",
                  nombres: "Juan Carlos",
                  apellidos: "Pérez Gómez",
                  correo: "juan.perez@sena.edu.co",
                  telefono: "3001234567",
                  estado: false
                }
              }
            }
          }
        }
      }
    }
  },
  '/coordinadores-grupo-mixto/list': {
    get: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Obtener lista simplificada de coordinadores grupo mixto',
      description: 'Devuelve una lista simplificada de coordinadores grupo mixto activos.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista simplificada de coordinadores grupo mixto obtenida exitosamente',
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
                        documento: { type: 'string', example: '123456789' },
                        nombres: { type: 'string', example: 'Juan Carlos' }
                      }
                    }
                  }
                }
              },
              example: {
                data: [
                  { id: 1, documento: "123456789", nombres: "Juan Carlos" },
                  { id: 2, documento: "987654321", nombres: "Ana María" }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/coordinadores-grupo-mixto/{documento}/estado': {
    patch: {
      tags: ['Coordinadores Grupo Mixto'],
      summary: 'Cambiar el estado de un coordinador grupo mixto',
      description: 'Cambia el estado (activo/inactivo) de un coordinador grupo mixto por documento.',
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
          name: 'documento',
          required: true,
          schema: { type: 'string' },
          description: 'Documento del coordinador grupo mixto'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                estado: {
                  type: 'boolean',
                  description: 'Nuevo estado',
                  example: false
                }
              },
              required: ['estado']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Estado cambiado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/CoordinadorGrupoMixto' }
                }
              },
              example: {
                data: {
                  id: 1,
                  documento: "123456789",
                  nombres: "Juan Carlos",
                  apellidos: "Pérez Gómez",
                  correo: "juan.perez@sena.edu.co",
                  telefono: "3001234567",
                  estado: false
                }
              }
            }
          }
        }
      }
    }
  }
};