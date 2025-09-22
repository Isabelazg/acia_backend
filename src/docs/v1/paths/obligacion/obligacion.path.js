export const obligacionesPaths = {
  '/obligaciones': {
    get: {
      tags: ['obligaciones'],
      summary: 'Obtener todas las obligaciones',
      description: 'Devuelve una lista de todas las obligaciones disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de obligaciones' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de obligaciones' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de obligaciones obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/obligaciones' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/obligaciones/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "obligacion Persona Jurídica", estado: true },
                  { id: 2, nombre: "obligacion de Obra", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/obligaciones/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['obligaciones'],
      summary: 'Crear una nueva obligacion',
      description: 'Crea una nueva obligacion en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/obligaciones' }
          }
        }
      },
      responses: {
        201: {
          description: 'Obligacion creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/obligaciones' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "nueva obligacion",
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
  '/obligaciones/{id}': {
    get: {
      tags: ['obligaciones'],
      summary: 'Obtener un obligacion por ID',
      description: 'Devuelve un obligacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del obligaciones a consultar' }
      ],
      responses: {
        200: {
          description: 'obligacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/obligaciones' } } },
              example: { data: { id: 1, nombre: "obligaciones", estado: true } }
            }
          }
        },
        404: {
          description: 'obligacion no encontrado',
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
                        title: { type: 'string', example: 'Obligacion no encontrada' },
                        detail: { type: 'string', example: 'No existe un tipo de minut con id 5' },
                        code: { type: 'string', example: 'OBLIGACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "obligacion no encontrada",
                    detail: "No existe un obligacion con id 5",
                    code: "OBLIGACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['obligaciones'],
      summary: 'Actualizar una obligacion por ID',
      description: 'Actualiza una obligacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del obligaciones a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/obligaciones' }
          }
        }
      },
      responses: {
        200: {
          description: 'obligacion actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/obligaciones' } } },
              example: { data: { id: 1, nombre: "string", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'Obligacion no encontrada',
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
                        title: { type: 'string', example: 'obligacion no encontrada' },
                        detail: { type: 'string', example: 'No existe un obligacion con id 5' },
                        code: { type: 'string', example: 'OBLIGACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "obligacion no encontrada",
                    detail: "No existe un obligacion con id 5",
                    code: "OBLIGACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/obligaciones/{id}/estado': {
    patch: {
      tags: ['obligaciones'],
      summary: 'Cambiar el estado de una  obligacion (activar/desactivar)',
      description: 'Cambia el estado de una obligacion específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del obligaciones a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado de la obligacion actualizado exitosamente',
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
          description: 'Obligacion no encontrada',
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
                        title: { type: 'string', example: 'Obligacion no encontrada' },
                        detail: { type: 'string', example: 'No existe un obligaciones con id 5' },
                        code: { type: 'string', example: 'TIPO_MINUTA_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "obligacion no encontrada",
                    detail: "No existe un obligaciones con id 5",
                    code: "OBLIGACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/obligaciones/list': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener lista de obligacioness',
      description: 'Devuelve una lista de obligaciones con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de obligaciones obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/obligaciones' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "obligacion de Obra", estado: true },
                  { id: 2, nombre: "obligacion de reunion", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};