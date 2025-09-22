export const dependenciasPaths = {
  '/dependencias': {
    get: {
      tags: ['Dependencias'],
      summary: 'Obtener todas las dependencias',
      description: 'Devuelve una lista de todas las dependencias disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de dependencia' },
        { in: 'query', name: 'codigo', schema: { type: 'string' }, description: 'Filtrar por código' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'codigo', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de dependencias',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/Dependencia' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/dependencias/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, codigo: "A01", nombre: "Dependencia A", estado: true },
                  { id: 2, codigo: "B02", nombre: "Dependencia B", estado: false }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/dependencias/?pagination=false" }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Dependencias'],
      summary: 'Crear una nueva dependencia',
      description: 'Crea una nueva dependencia en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/DependenciaCreate' }
          }
        }
      },
      responses: {
        201: {
          description: 'Dependencia creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Dependencia' }
                }
              },
              example: {
                data: {
                  id: 3,
                  codigo: "C03",
                  nombre: "Dependencia C",
                  estado: true
                }
              }
            }
          }
        }
      }
    }
  },
  '/dependencias/{codigo}': {
    get: {
      tags: ['Dependencias'],
      summary: 'Obtener una dependencia por código',
      description: 'Devuelve una dependencia específica según su código.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'codigo', required: true, schema: { type: 'string' }, description: 'Código de la dependencia a consultar' }
      ],
      responses: {
        200: {
          description: 'Dependencia obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/Dependencia' } } },
              example: { data: { id: 1, codigo: "A01", nombre: "Dependencia A", estado: true } }
            }
          }
        },
        404: {
          description: 'Dependencia no encontrada',
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
                        title: { type: 'string', example: 'Dependencia no encontrada' },
                        detail: { type: 'string', example: 'No existe una dependencia con código X' },
                        code: { type: 'string', example: 'DEPENDENCIA_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Dependencia no encontrada",
                    detail: "No existe una dependencia con código X",
                    code: "DEPENDENCIA_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Dependencias'],
      summary: 'Actualizar una dependencia por código',
      description: 'Actualiza una dependencia específica según su código.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'codigo', required: true, schema: { type: 'string' }, description: 'Código de la dependencia a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/DependenciaUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Dependencia actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/Dependencia' } } },
              example: { data: { id: 1, codigo: "A01", nombre: "Dependencia A", estado: false } }
            }
          }
        },
        404: {
          description: 'Dependencia no encontrada',
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
                        title: { type: 'string', example: 'Dependencia no encontrada' },
                        detail: { type: 'string', example: 'No existe una dependencia con código X' },
                        code: { type: 'string', example: 'DEPENDENCIA_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Dependencia no encontrada",
                    detail: "No existe una dependencia con código X",
                    code: "DEPENDENCIA_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/dependencias/{codigo}/estado': {
    patch: {
      tags: ['Dependencias'],
      summary: 'Cambiar el estado de una dependencia',
      description: 'Cambia el estado de una dependencia específica según su código.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'codigo', required: true, schema: { type: 'string' }, description: 'Código de la dependencia a modificar estado' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                estado: { type: 'boolean', example: false }
              }
            },
            example: { estado: false }
          }
        }
      },
      responses: {
        200: {
          description: 'Estado de la dependencia actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  codigo: { type: 'string', example: 'A01' },
                  nombre: { type: 'string', example: 'Dependencia A' },
                  estado: { type: 'boolean', example: false }
                }
              },
              example: { id: 1, codigo: "A01", nombre: "Dependencia A", estado: false }
            }
          }
        },
        404: {
          description: 'Dependencia no encontrada',
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
                        title: { type: 'string', example: 'Dependencia no encontrada' },
                        detail: { type: 'string', example: 'No existe una dependencia con código X' },
                        code: { type: 'string', example: 'DEPENDENCIA_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Dependencia no encontrada",
                    detail: "No existe una dependencia con código X",
                    code: "DEPENDENCIA_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/dependencias/list': {
    get: {
      tags: ['Dependencias'],
      summary: 'Obtener lista de dependencias',
      description: 'Devuelve una lista de dependencias con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'codigo', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de dependencias obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/DependenciaList' } }
                }
              },
              example: {
                data: [
                  { id: 1, codigo: "A01", nombre: "Dependencia A", estado: true },
                  { id: 2, codigo: "B02", nombre: "Dependencia B", estado: false }
                ]
              }
            }
          }
        }
      }
    }
  }
};