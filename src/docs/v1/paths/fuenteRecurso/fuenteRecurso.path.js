export const fuenteRecursosPaths = {
  '/fuente-recursos': {
    get: {
      tags: ['Fuentes de Recursos'],
      summary: 'Obtener todas las fuentes de recursos',
      description: 'Devuelve una lista de todas las fuentes de recursos disponibles en el sistema, con filtros, orden y paginación.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de fuentes de recursos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/FuenteRecurso' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/fuente-recursos/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Recursos Propios", descripcion: "Fondos propios" },
                  { id: 2, nombre: "Recursos Externos", descripcion: "Fondos externos" }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/fuente-recursos/?pagination=false" }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Fuentes de Recursos'],
      summary: 'Crear una nueva fuente de recurso',
      description: 'Crea una nueva fuente de recurso en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FuenteRecursoCreate' }
          }
        }
      },
      responses: {
        201: {
          description: 'Fuente de recurso creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/FuenteRecurso' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "Recursos Mixtos",
                  descripcion: "Fondos mixtos"
                }
              }
            }
          }
        }
      }
    }
  },
  '/fuente-recursos/{id}': {
    get: {
      tags: ['Fuentes de Recursos'],
      summary: 'Obtener una fuente de recurso por ID',
      description: 'Devuelve una fuente de recurso específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la fuente de recurso a consultar' }
      ],
      responses: {
        200: {
          description: 'Fuente de recurso obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/FuenteRecurso' } } },
              example: { data: { id: 1, nombre: "Recursos Propios", descripcion: "Fondos propios" } }
            }
          }
        },
        404: {
          description: 'Fuente de recurso no encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: '404' },
                        title: { type: 'string', example: 'Fuente de recurso no encontrada' },
                        detail: { type: 'string', example: 'No existe una fuente de recurso con ID X' },
                        code: { type: 'string', example: 'FUENTE_RECURSO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Fuente de recurso no encontrada",
                    detail: "No existe una fuente de recurso con ID X",
                    code: "FUENTE_RECURSO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Fuentes de Recursos'],
      summary: 'Actualizar una fuente de recurso por ID',
      description: 'Actualiza una fuente de recurso específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la fuente de recurso a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FuenteRecursoUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Fuente de recurso actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/FuenteRecurso' } } },
              example: { data: { id: 1, nombre: "Recursos Propios", descripcion: "Fondos actualizados" } }
            }
          }
        },
        404: {
          description: 'Fuente de recurso no encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: '404' },
                        title: { type: 'string', example: 'Fuente de recurso no encontrada' },
                        detail: { type: 'string', example: 'No existe una fuente de recurso con ID X' },
                        code: { type: 'string', example: 'FUENTE_RECURSO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Fuente de recurso no encontrada",
                    detail: "No existe una fuente de recurso con ID X",
                    code: "FUENTE_RECURSO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Fuentes de Recursos'],
      summary: 'Eliminar una fuente de recurso por ID',
      description: 'Elimina una fuente de recurso específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la fuente de recurso a eliminar' }
      ],
      responses: {
        200: {
          description: 'Fuente de recurso eliminada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deleted: { type: 'boolean', example: true }
                }
              },
              example: { deleted: true }
            }
          }
        },
        404: {
          description: 'Fuente de recurso no encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: '404' },
                        title: { type: 'string', example: 'Fuente de recurso no encontrada' },
                        detail: { type: 'string', example: 'No existe una fuente de recurso con ID X' },
                        code: { type: 'string', example: 'FUENTE_RECURSO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Fuente de recurso no encontrada",
                    detail: "No existe una fuente de recurso con ID X",
                    code: "FUENTE_RECURSO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/fuente-recursos/list': {
    get: {
      tags: ['Fuentes de Recursos'],
      summary: 'Obtener lista de fuentes de recursos',
      description: 'Devuelve una lista de fuentes de recursos con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de fuentes de recursos obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/FuenteRecursoList' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Recursos Propios" },
                  { id: 2, nombre: "Recursos Externos" }
                ]
              }
            }
          }
        }
      }
    }
  }
};