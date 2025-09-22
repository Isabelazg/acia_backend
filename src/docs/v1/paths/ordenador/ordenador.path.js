export const ordenadoresPaths = {
  '/ordenadores': {
    get: {
      tags: ['Ordenadores'],
      summary: 'Obtener todos los ordenadores',
      description: 'Devuelve una lista de todos los ordenadores disponibles en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'query',
          name: 'documento',
          schema: { type: 'string' },
          description: 'Filtrar por documento del ordenador'
        },
        {
          in: 'query',
          name: 'nombres',
          schema: { type: 'string' },
          description: 'Filtrar por nombres del ordenador'
        },
        {
          in: 'query',
          name: 'apellidos',
          schema: { type: 'string' },
          description: 'Filtrar por apellidos del ordenador'
        },
        {
          in: 'query',
          name: 'correo',
          schema: { type: 'string' },
          description: 'Filtrar por correo electrónico'
        },
        {
          in: 'query',
          name: 'estado',
          schema: { type: 'boolean' },
          description: 'Filtrar por estado (activo/inactivo)'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['documento', 'nombres', 'apellidos', 'estado'] },
          description: 'Campo por el cual ordenar'
        },
        {
          in: 'query',
          name: 'order',
          schema: { type: 'string', enum: ['asc', 'desc'] },
          description: 'Orden ascendente o descendente'
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', minimum: 1 },
          description: 'Número de página para paginación'
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', minimum: 1, maximum: 100 },
          description: 'Cantidad de registros por página'
        }
      ],
      responses: {
        200: {
          description: 'Lista de ordenadores obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Ordenador' }
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      limit: { type: 'integer' },
                      totalPages: { type: 'integer' }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Token de autenticación inválido o expirado'
        },
        403: {
          description: 'Sin permisos para acceder a este recurso'
        },
        500: {
          description: 'Error interno del servidor'
        }
      }
    },
    post: {
      tags: ['Ordenadores'],
      summary: 'Crear un nuevo ordenador',
      description: 'Crea un nuevo ordenador en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/OrdenadorInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Ordenador creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Ordenador' }
                }
              }
            }
          }
        },
        400: {
          description: 'Datos de entrada inválidos'
        },
        401: {
          description: 'Token de autenticación inválido o expirado'
        },
        403: {
          description: 'Sin permisos para crear ordenadores'
        },
        409: {
          description: 'El documento ya está registrado'
        },
        500: {
          description: 'Error interno del servidor'
        }
      }
    }
  },
  '/ordenadores/list': {
    get: {
      tags: ['Ordenadores'],
      summary: 'Obtener lista simplificada de ordenadores',
      description: 'Devuelve una lista simplificada de ordenadores para uso en selects y componentes.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'query',
          name: 'estado',
          schema: { type: 'boolean' },
          description: 'Filtrar por estado (activo/inactivo)'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['documento', 'nombres', 'apellidos'] },
          description: 'Campo por el cual ordenar'
        },
        {
          in: 'query',
          name: 'order',
          schema: { type: 'string', enum: ['asc', 'desc'] },
          description: 'Orden ascendente o descendente'
        }
      ],
      responses: {
        200: {
          description: 'Lista simplificada obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        documento: { type: 'string' },
                        nombres: { type: 'string' },
                        apellidos: { type: 'string' },
                        estado: { type: 'boolean' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/ordenadores/{id}': {
    get: {
      tags: ['Ordenadores'],
      summary: 'Obtener un ordenador por ID',
      description: 'Obtiene la información detallada de un ordenador específico.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          description: 'ID del ordenador'
        }
      ],
      responses: {
        200: {
          description: 'Ordenador encontrado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Ordenador' }
                }
              }
            }
          }
        },
        404: {
          description: 'Ordenador no encontrado'
        },
        401: {
          description: 'Token de autenticación inválido o expirado'
        },
        403: {
          description: 'Sin permisos para acceder a este recurso'
        }
      }
    },
    put: {
      tags: ['Ordenadores'],
      summary: 'Actualizar un ordenador',
      description: 'Actualiza la información de un ordenador existente.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          description: 'ID del ordenador'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/OrdenadorUpdateInput' }
          }
        }
      },
      responses: {
        200: {
          description: 'Ordenador actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Ordenador' }
                }
              }
            }
          }
        },
        400: {
          description: 'Datos de entrada inválidos'
        },
        404: {
          description: 'Ordenador no encontrado'
        },
        409: {
          description: 'Conflicto con datos existentes'
        }
      }
    }
  },
  '/ordenadores/{id}/estado': {
    patch: {
      tags: ['Ordenadores'],
      summary: 'Cambiar estado de un ordenador',
      description: 'Cambia el estado activo/inactivo de un ordenador.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <access_token>' },
          description: 'Token de acceso en formato Bearer'
        },
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          description: 'ID del ordenador'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                estado: {
                  type: 'boolean',
                  description: 'Nuevo estado del ordenador'
                }
              },
              required: ['estado']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Estado del ordenador actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Ordenador' }
                }
              }
            }
          }
        },
        404: {
          description: 'Ordenador no encontrado'
        },
        400: {
          description: 'Datos de entrada inválidos'
        }
      }
    }
  }
};
