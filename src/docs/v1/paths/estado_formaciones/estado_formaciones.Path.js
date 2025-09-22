export const estadoFormacionesPaths = {
  '/estado-formaciones': {
    get: {
      tags: ['Estado Formaciones'],
      summary: 'Obtener todos los estados de formación',
      description: 'Devuelve una lista de todos los estados de formación registrados en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID del estado de formación' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre del estado de formación' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de estados de formación obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/EstadoFormacion' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/estado-formaciones/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Activo", estado: true },
                  { id: 2, nombre: "Inactivo", estado: false }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/estado-formaciones/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['Estado Formaciones'],
      summary: 'Registrar un nuevo estado de formación',
      description: 'Crea un nuevo estado de formación en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EstadoFormacion' }
          }
        }
      },
      responses: {
        201: {
          description: 'Estado de formación creado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EstadoFormacion' } } },
              example: { data: { id: 3, nombre: "Suspendido", estado: true } }
            }
          }
        }
      }
    }
  },

  '/estado-formaciones/{id}': {
    get: {
      tags: ['Estado Formaciones'],
      summary: 'Obtener un estado de formación por ID',
      description: 'Devuelve un estado de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del estado de formación a consultar' }
      ],
      responses: {
        200: {
          description: 'Estado de formación obtenido exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EstadoFormacion' } } },
              example: { data: { id: 1, nombre: "Activo", estado: true } }
            }
          }
        },
        404: {
          description: 'Estado de formación no encontrado',
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
                        title: { type: 'string', example: 'Estado de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un estado de formación con id 5' },
                        code: { type: 'string', example: 'ESTADO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Estado de formación no encontrado",
                    detail: "No existe un estado de formación con id 5",
                    code: "ESTADO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },

    put: {
      tags: ['Estado Formaciones'],
      summary: 'Actualizar un estado de formación por ID',
      description: 'Actualiza un estado de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del estado de formación a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EstadoFormacion' }
          }
        }
      },
      responses: {
        200: {
          description: 'Estado de formación actualizado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EstadoFormacion' } } },
              example: { data: { id: 1, nombre: "Activo", estado: false } }
            }
          }
        },
        404: {
          description: 'Estado de formación no encontrado',
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
                        title: { type: 'string', example: 'Estado de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un estado de formación con id 5' },
                        code: { type: 'string', example: 'ESTADO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Estado de formación no encontrado",
                    detail: "No existe un estado de formación con id 5",
                    code: "ESTADO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },

  '/estado-formaciones/{id}/estado': {
    patch: {
      tags: ['Estado Formaciones'],
      summary: 'Cambiar el estado de un estado de formación (activar/desactivar)',
      description: 'Cambia el estado lógico de un estado de formación según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del estado de formación a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado de formación actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nombre: { type: 'string', example: 'Activo' },
                  estado: { type: 'boolean', example: false }
                }
              },
              example: { id: 1, nombre: "Activo", estado: false }
            }
          }
        },
        404: {
          description: 'Estado de formación no encontrado',
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
                        title: { type: 'string', example: 'Estado de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un estado de formación con id 5' },
                        code: { type: 'string', example: 'ESTADO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Estado de formación no encontrado",
                    detail: "No existe un estado de formación con id 5",
                    code: "ESTADO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },

  '/estado-formaciones/list': {
    get: {
      tags: ['Estado Formaciones'],
      summary: 'Obtener lista de estados de formación',
      description: 'Devuelve una lista de estados de formación con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado lógico (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de estados de formación obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/EstadoFormacion' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Activo", estado: true },
                  { id: 2, nombre: "Inactivo", estado: false }
                ]
              }
            }
          }
        }
      }
    }
  }
};
