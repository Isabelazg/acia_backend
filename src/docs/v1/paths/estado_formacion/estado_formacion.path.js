export const estadoFormacionPaths = { // Renombrado a estadoFormacionPaths
  '/estado-formacion': { // Ruta base en singular
    get: {
      tags: ['Estado Formacion'], // Etiqueta en singular
      summary: 'Obtener todos los estados de formación',
      description: 'Devuelve una lista de todos los estados de formación disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de estado de formación' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de estado de formación' },
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
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/estado-formacion/?pagination=false' } } } // Ruta en singular
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "En Curso", estado: true },
                  { id: 2, nombre: "Finalizado", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/estado-formacion/?pagination=false" } // Ruta en singular
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['Estado Formacion'], // Etiqueta en singular
      summary: 'Crear un nuevo estado de formación',
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
          description: 'Estado de formación creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/EstadoFormacion' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "Pendiente",
                  estado: true,
                }
              }
            }
          }
        }
      }
    }
  },
  '/estado-formacion/{id}': { // Ruta en singular
    get: {
      tags: ['Estado Formacion'], // Etiqueta en singular
      summary: 'Obtener un estado de formación por ID',
      description: 'Devuelve un estado de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del estado de formación a consultar' }
      ],
      responses: {
        200: {
          description: 'Estado de formación obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EstadoFormacion' } } },
              example: { data: { id: 1, nombre: "En Curso", estado: true } }
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
      tags: ['Estado Formacion'], // Etiqueta en singular
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
          description: 'Estado de formación actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EstadoFormacion' } } },
              example: { data: { id: 1, nombre: "En Revisión", estado: true } }
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
  '/estado-formacion/{id}/estado': { // Ruta en singular
    patch: {
      tags: ['Estado Formacion'], // Etiqueta en singular
      summary: 'Cambiar el estado de un estado de formación (activar/desactivar)',
      description: 'Cambia el estado de un estado de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del estado de formación a modificar estado' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                estado: { type: 'boolean', description: 'El nuevo estado (true para activo, false para inactivo)' }
              },
              required: ['estado']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Estado del estado de formación actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nombre: { type: 'string', example: 'En Curso' },
                  estado: { type: 'boolean', example: false }
                }
              },
              example: { id: 1, nombre: "En Curso", estado: false }
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
  '/estado-formacion/list': { // Ruta en singular
    get: {
      tags: ['Estado Formacion'], // Etiqueta en singular
      summary: 'Obtener lista de estados de formación',
      description: 'Devuelve una lista de estados de formación con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
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
                  { id: 1, nombre: "En Curso", estado: true },
                  { id: 2, nombre: "Completado", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};
