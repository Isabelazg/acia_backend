export const tituloFormacionPaths = {
  '/titulo-formaciones': {
    get: {
      tags: ['Título Formación'],
      summary: 'Obtener todos los títulos de formación',
      description: 'Devuelve una lista de todos los títulos de formación disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de título de formación' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de título de formación' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de títulos de formación obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/TituloFormacion' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/titulo-formaciones/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Tecnólogo en Análisis y Desarrollo de Software", estado: true },
                  { id: 2, nombre: "Técnico en Sistemas", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/titulo-formaciones/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['Título Formación'],
      summary: 'Crear un nuevo título de formación',
      description: 'Crea un nuevo título de formación en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/TituloFormacion' }
          }
        }
      },
      responses: {
        201: {
          description: 'Título de formación creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/TituloFormacion' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "Ingeniería de Software",
                  estado: true,
                  centros: [1, 2]
                }
              }
            }
          }
        }
      }
    }
  },
  '/titulo-formaciones/{id}': {
    get: {
      tags: ['Título Formación'],
      summary: 'Obtener un título de formación por ID',
      description: 'Devuelve un título de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del título de formación a consultar' }
      ],
      responses: {
        200: {
          description: 'Título de formación obtenido exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/TituloFormacion' } } },
              example: { data: { id: 1, nombre: "Tecnólogo en Sistemas", estado: true } }
            }
          }
        },
        404: {
          description: 'Título de formación no encontrado',
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
                        title: { type: 'string', example: 'Título de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un título de formación con id 5' },
                        code: { type: 'string', example: 'TITULO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Título de formación no encontrado",
                    detail: "No existe un título de formación con id 5",
                    code: "TITULO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Título Formación'],
      summary: 'Actualizar un título de formación por ID',
      description: 'Actualiza un título de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del título de formación a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/TituloFormacion' }
          }
        }
      },
      responses: {
        200: {
          description: 'Título de formación actualizado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/TituloFormacion' } } },
              example: { data: { id: 1, nombre: "string", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'Título de formación no encontrado',
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
                        title: { type: 'string', example: 'Título de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un título de formación con id 5' },
                        code: { type: 'string', example: 'TITULO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Título de formación no encontrado",
                    detail: "No existe un título de formación con id 5",
                    code: "TITULO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/titulo-formaciones/{id}/estado': {
    patch: {
      tags: ['Título Formación'],
      summary: 'Cambiar el estado de un título de formación (activar/desactivar)',
      description: 'Cambia el estado de un título de formación específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del título de formación a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado del título de formación actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nombre: { type: 'string', example: 'string' },
                  estado: { type: 'boolean', example: false }
                }
              },
              example: { id: 1, nombre: "string", estado: false }
            }
          }
        },
        404: {
          description: 'Título de formación no encontrado',
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
                        title: { type: 'string', example: 'Título de formación no encontrado' },
                        detail: { type: 'string', example: 'No existe un título de formación con id 5' },
                        code: { type: 'string', example: 'TITULO_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Título de formación no encontrado",
                    detail: "No existe un título de formación con id 5",
                    code: "TITULO_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/titulo-formaciones/list': {
    get: {
      tags: ['Título Formación'],
      summary: 'Obtener lista de títulos de formación',
      description: 'Devuelve una lista de títulos de formación con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de títulos de formación obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/TituloFormacion' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Tecnólogo en Análisis y Desarrollo de Software", estado: true },
                  { id: 2, nombre: "Técnico en Sistemas", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};
