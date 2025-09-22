export const necesidad_contratacionPaths = {
  '/necesidad_contratacion': {
    get: {
      tags: ['necesidad_contratacion'],
      summary: 'Obtener todas las necesidades de contratación',
      description: 'Devuelve una lista de todas las necesidades de contratacion disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de necesidad_contratacion' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de necesidad_contratacion' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de necesidad_contratacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/necesidad_contratacion' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/necesidad_contratacion/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "necesidad_contratacion Jurídica", estado: true },
                  { id: 2, nombre: "necesidad de contratacion de Obra", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/necesidad_contratacion/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['necesidad_contratacion'],
      summary: 'Crear una nueva necesidad de contratación',
      description: 'Crea una nueva necesidad de contratacion en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/necesidad_contratacion' }
          }
        }
      },
      responses: {
        201: {
          description: 'necesidad de contratacion creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/necesidad_contratacion' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "nueva necesidad de contratacion",
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
  '/necesidad_contratacion/{id}': {
    get: {
      tags: ['necesidad_contratacion'],
      summary: 'Obtener una necesidad de contratacion por ID',
      description: 'Devuelve una necesidad de contratacion específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del necesidad_contratacion a consultar' }
      ],
      responses: {
        200: {
          description: 'necesidad_contratacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/necesidad_contratacion' } } },
              example: { data: { id: 1, nombre: "necesidad_contratacion", estado: true } }
            }
          }
        },
        404: {
          description: 'necesidad de contratacion no encontrada',
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
                        title: { type: 'string', example: 'necesidad de contratacion no encontrada' },
                        detail: { type: 'string', example: 'No existe una necesidad de contratacion con id 5' },
                        code: { type: 'string', example: 'NECESIDAD_CONTRATACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "necsesidad de contratacion no encontrada",
                    detail: "No existe un necesidad_contratacion con id 5",
                    code: "NECESIDAD_CONTRATACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['necesidad_contratacion'],
      summary: 'Actualizar una necesidad de contratacion por ID',
      description: 'Actualiza una necesidad de contratacion específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del necesidad_contratacion a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/necesidad_contratacion' }
          }
        }
      },
      responses: {
        200: {
          description: 'necesidad de contratacion actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/necesidad_contratacion' } } },
              example: { data: { id: 1, nombre: "string", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'necesidad de contratacion no encontrada',
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
                        title: { type: 'string', example: 'necesidad de contratacion no encontrada' },
                        detail: { type: 'string', example: 'No existe una necesidad de contratacion con id 5' },
                        code: { type: 'string', example: 'NECESIDAD_CONTRATACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "necesidad de contratacion no encontrada",
                    detail: "No existe una necesidad de contratacion con id 5",
                    code: "NECESIDAD_CONTRATACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/necesidad_contratacion/{id}/estado': {
    patch: {
      tags: ['necesidad_contratacion'],
      summary: 'Cambiar el estado de una necesidad de contratacion (activar/desactivar)',
      description: 'Cambia el estado de una necesidad de contratacion específica según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del necesidad_contratacion a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado de la necesidad de contratacion actualizado exitosamente',
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
          description: 'necesidad de contratacion no encontrado',
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
                        title: { type: 'string', example: 'necesidad de contratacion no encontrado' },
                        detail: { type: 'string', example: 'No existe un necesidad_contratacion con id 5' },
                        code: { type: 'string', example: 'NECESIDAD_CONTRATACION_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "necesidad de contratacion no encontrada",
                    detail: "No existe un necesidad_contratacion con id 5",
                    code: "NECESIDAD_CONTRATACION_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/necesidad_contratacion/list': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener lista de necesidad_contratacions',
      description: 'Devuelve una lista de necesidad de contratacion con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de necesidad de contratacion obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/necesidad_contratacion' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "necesidad de contratacion", estado: true },
                  { id: 2, nombre: "necesidad de contratacion de reunion", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};