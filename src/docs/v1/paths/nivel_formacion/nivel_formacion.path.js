export const nivel_formacionPaths = {
  '/nivel_formacion': {
    get: {
      tags: ['nivel_formacion'],
      summary: 'Obtener todos los niveles de formacion',
      description: 'Devuelve una lista de todos los niveles de formacion disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de nivel de formacion' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de nivel de formacion' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de nivel de formacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/nivel_formacion' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/nivel_formacion/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "nivel de formacion de Persona Jurídica", estado: true },
                  { id: 2, nombre: "nivel de formacion de Obra", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/nivel_formacion/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['nivel_formacion'],
      summary: 'Crear un nuevo nivel de formacion',
      description: 'Crea un nuevo nivel de formacion en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/nivel_formacion' }
          }
        }
      },
      responses: {
        201: {
          description: 'nivel de formacion creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/nivel_formacion' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "nuevo nivel de formacion",
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
  '/nivel_formacion/{id}': {
    get: {
      tags: ['nivel_formacion'],
      summary: 'Obtener un nivel de formacion por ID',
      description: 'Devuelve un nivel de formacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del nivel de formacion a consultar' }
      ],
      responses: {
        200: {
          description: 'nivel de formacion obtenido exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/nivel_formacion' } } },
              example: { data: { id: 1, nombre: "nivel de formacion", estado: true } }
            }
          }
        },
        404: {
          description: 'nivel de formacion no encontrado',
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
                        title: { type: 'string', example: 'nivel de formacion no encontrada' },
                        detail: { type: 'string', example: 'No existe un nivel de formacion con id 5' },
                        code: { type: 'string', example: 'NIVEL_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "nivel de formacion no encontrado",
                    detail: "No existe un nivel de formacion con id 5",
                    code: "NIVEL_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['nivel_formacion'],
      summary: 'Actualizar un nivel de formacion por ID',
      description: 'Actualiza un nivel de formacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del nivel de formacion a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/nivel_formacion' }
          }
        }
      },
      responses: {
        200: {
          description: 'nivel de formacion actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/nivel_formacion' } } },
              example: { data: { id: 1, nombre: "string", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'nivel de formacion de  no encontrado',
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
                        title: { type: 'string', example: 'nivel de formacion no encontrada' },
                        detail: { type: 'string', example: 'No existe un nivel de formacion con id 5' },
                        code: { type: 'string', example: 'NIVEL_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "nivel de formacion no encontrada",
                    detail: "No existe un nivel de formacion con id 5",
                    code: "NIVEL_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/nivel_formacion/{id}/estado': {
    patch: {
      tags: ['nivel_formacion'],
      summary: 'Cambiar el estado de un nivel de formacion (activar/desactivar)',
      description: 'Cambia el estado de un nivel de formacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del nivel de formacion a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado del nivel de formacion actualizado exitosamente',
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
          description: 'nivel de formacion no encontrado',
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
                        title: { type: 'string', example: 'nivel de formacion no encontrado' },
                        detail: { type: 'string', example: 'No existe un nivel de formacion con id 5' },
                        code: { type: 'string', example: 'NIVEL_FORMACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "nivel de formacion no encontrado",
                    detail: "No existe un nivel de formacion con id 5",
                    code: "NIVEL_FORMACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/nivel_formacion/list': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener lista de nivel de formacion',
      description: 'Devuelve una lista de nivel de formacion con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de nivel de formacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/nivel_formacion' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "nivel de formacion de Obra", estado: true },
                  { id: 2, nombre: "nivel de formacion de reunion", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};