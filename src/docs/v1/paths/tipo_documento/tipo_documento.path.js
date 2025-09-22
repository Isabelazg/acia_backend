export const tipo_documentoPaths = {
  '/tipo_documento': {
    get: {
      tags: ['tipo Documento'],
      summary: 'Obtener todos los tipo documento',
      description: 'Devuelve una lista de todos los tipo documento disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de tipo documento' },
        { in: 'query', name: 'nombre', schema: { type: 'string' }, description: 'Filtrar por nombre de tipo documento' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de tipo documento obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/tipo_documento' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/tipo_documento/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "Documento Persona Jurídica", estado: true },
                  { id: 2, nombre: "Documento de Obra", estado: true }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/tipo_documento/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['tipo Documento'],
      summary: 'Crear un nuevo tipo documento',
      description: 'Crea un nuevo tipo documento en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/tipo_documento' }
          }
        }
      },
      responses: {
        201: {
          description: 'tipo documento creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/tipo_documento' }
                }
              },
              example: {
                data: {
                  id: 3,
                  nombre: "nuevo tipo documento",
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
  '/tipo_documento/{id}': {
    get: {
      tags: ['tipo Documento'],
      summary: 'Obtener un tipo documento por ID',
      description: 'Devuelve un tipo documento específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del tipo documento a consultar' }
      ],
      responses: {
        200: {
          description: 'tipo documento obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/tipo_documento' } } },
              example: { data: { id: 1, nombre: "tipo documento", estado: true } }
            }
          }
        },
        404: {
          description: 'tipo documento no encontrado',
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
                        title: { type: 'string', example: 'tipo documento no encontrada' },
                        detail: { type: 'string', example: 'No existe un tipo documento con id 5' },
                        code: { type: 'string', example: 'TIPO_DOCUMENTO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "tipo documento no encontrado",
                    detail: "No existe un tipo documento con id 5",
                    code: "TIPO_DOCUMENTO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['tipo Documento'],
      summary: 'Actualizar un tipo documento por ID',
      description: 'Actualiza un tipo documento específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del tipo documento a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/tipo_documento' }
          }
        }
      },
      responses: {
        200: {
          description: 'tipo documento actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/tipo_documento' } } },
              example: { data: { id: 1, nombre: "string", estado: true, centros: [1, 2] } }
            }
          }
        },
        404: {
          description: 'tipo documento  no encontrado',
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
                        title: { type: 'string', example: 'tipo documento no encontrado' },
                        detail: { type: 'string', example: 'No existe un tipo documento con id 5' },
                        code: { type: 'string', example: 'TIPO_DOCUMENTO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "tipo documento no encontrada",
                    detail: "No existe un tipo documento con id 5",
                    code: "TIPO_DOCUMENTO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/tipo_documento/{id}/estado': {
    patch: {
      tags: ['tipo Documento'],
      summary: 'Cambiar el estado de una  tipo documento (activar/desactivar)',
      description: 'Cambia el estado de un tipo documento específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del tipo documento a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado del tipo documento actualizado exitosamente',
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
          description: 'tipo documento no encontrado',
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
                        title: { type: 'string', example: 'tipo documento no encontrado' },
                        detail: { type: 'string', example: 'No existe un tipo documento con id 5' },
                        code: { type: 'string', example: 'TIPO_DOCUMENTO_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "tipo documento no encontrado",
                    detail: "No existe un tipo documento con id 5",
                    code: "TIPO_DOCUMENTO_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  '/tipo_documento/list': {
    get: {
      tags: ['Cargos'],
      summary: 'Obtener lista de tipo documento',
      description: 'Devuelve una lista de tipo documento con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado', schema: { type: 'boolean' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'nombre', 'estado'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de tipo documento obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/tipo_documento' } }
                }
              },
              example: {
                data: [
                  { id: 1, nombre: "documento de Obra", estado: true },
                  { id: 2, nombre: "documento de reunion", estado: true }
                ]
              }
            }
          }
        }
      }
    }
  }
};



