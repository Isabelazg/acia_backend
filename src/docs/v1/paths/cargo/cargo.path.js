export const cargosPaths = {
  '/cargos': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener todos los cargos',
      description: 'Devuelve una lista de todos los cargos disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de cargo' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de cargo' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de cargos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/Cargo' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/cargos/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "docente", estado: true },
                  { id: 2, nombre: "estudiante", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/cargos/?pagination=false" }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Cargos'],
      summary: 'Crear un nuevo cargo',
      description: 'Crea un nuevo cargo en el sistema y lo asocia a uno o más centros.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CargoCreate' }
          }
        }
      },
      responses: {
        201: {
          description: 'Cargo creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Cargo' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "nuevo cargo",
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
  '/cargos/{id}': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener un cargo por ID',
      description: 'Devuelve un cargo específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del cargo a consultar' }
      ],
      responses: {
        200: {
          description: 'Cargo obtenido exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/Cargo' } } },
              example: { data: { id: 1, nombre: "docente", estado: true } }
            }
          }
        },
        404: {
          description: 'Cargo no encontrado',
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
                        title: { type: 'string', example: 'Cargo no encontrado' },
                        detail: { type: 'string', example: 'No existe un cargo con id 5' },
                        code: { type: 'string', example: 'CARGO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Cargo no encontrado",
                    detail: "No existe un cargo con id 5",
                    code: "CARGO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Cargos'],
      summary: 'Actualizar un cargo por ID',
      description: 'Actualiza un cargo específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del cargo a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CargoUpdate' }
          }
        }
      },
      responses: {
        200: {
          description: 'Cargo actualizado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/Cargo' } } },
              example: { data: { id: 1, nombre: "docente", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'Cargo no encontrado',
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
                        title: { type: 'string', example: 'Cargo no encontrado' },
                        detail: { type: 'string', example: 'No existe un cargo con id 5' },
                        code: { type: 'string', example: 'CARGO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Cargo no encontrado",
                    detail: "No existe un cargo con id 5",
                    code: "CARGO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/cargos/{id}/estado': {
    patch: {
      tags: ['Cargos'],
      summary: 'Cambiar el estado de un cargo (activar/desactivar)',
      description: 'Cambia el estado de un cargo específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del cargo a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado del cargo actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nombre: { type: 'string', example: 'docente' },
                  estado: { type: 'boolean', example: false }
                }
              },
              example: { id: 1, nombre: "docente", estado: false }
            }
          }
        },
        404: {
          description: 'Cargo no encontrado',
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
                        title: { type: 'string', example: 'Cargo no encontrado' },
                        detail: { type: 'string', example: 'No existe un cargo con id 5' },
                        code: { type: 'string', example: 'CARGO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Cargo no encontrado",
                    detail: "No existe un cargo con id 5",
                    code: "CARGO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/cargos/list': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener lista de cargos',
      description: 'Devuelve una lista de cargos con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de cargos obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/CargoList' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "docente", estado: true },
                  { id: 2, nombre: "estudiante", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/cargos/{id}/centros': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener los centros asociados a un cargo',
      description: 'Devuelve la lista de centros asociados a un cargo específico.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del cargo' }
      ],
      responses: {
        200: {
          description: 'Lista de centros asociados al cargo',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/Centro' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Centro de Diseño", estado: true },
                  { id: 2, nombre: "Centro de Electricidad", estado: true }
                ]
              }
            }
          }
        },
        404: {
          description: 'Cargo no encontrado',
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
                        title: { type: 'string', example: 'Cargo no encontrado' },
                        detail: { type: 'string', example: 'No existe un cargo con id 5' },
                        code: { type: 'string', example: 'CARGO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Cargo no encontrado",
                    detail: "No existe un cargo con id 5",
                    code: "CARGO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
};