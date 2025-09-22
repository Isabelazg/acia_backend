export const resolucionesPaths = {
  '/resoluciones': {
    get: {
      tags: ['Resoluciones'],
      summary: 'Obtener todas las resoluciones',
      description: 'Devuelve una lista de todas las resoluciones disponibles en el sistema.',
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
          name: 'fecha',
          schema: { type: 'string', format: 'date' },
          description: 'Filtrar por fecha de la resolución'
        },
        {
          in: 'query',
          name: 'acta_posesion',
          schema: { type: 'string' },
          description: 'Filtrar por número de acta de posesión'
        },
        {
          in: 'query',
          name: 'fecha_posesion',
          schema: { type: 'string', format: 'date' },
          description: 'Filtrar por fecha de posesión'
        },
        {
          in: 'query',
          name: 'fecha_ingreso',
          schema: { type: 'string', format: 'date' },
          description: 'Filtrar por fecha de ingreso'
        },
        {
          in: 'query',
          name: 'fecha_retiro',
          schema: { type: 'string', format: 'date' },
          description: 'Filtrar por fecha de retiro'
        },
        {
          in: 'query',
          name: 'es_encargado',
          schema: { type: 'boolean' },
          description: 'Filtrar por si es encargado'
        },
        {
          in: 'query',
          name: 'centro_id',
          schema: { type: 'integer' },
          description: 'Filtrar por ID del centro'
        },
        {
          in: 'query',
          name: 'ordenadores_id',
          schema: { type: 'integer' },
          description: 'Filtrar por ID del ordenador'
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', enum: ['fecha', 'fecha_ingreso', 'fecha_retiro', 'es_encargado'] },
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
          description: 'Lista de resoluciones obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Resolucion' }
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
      tags: ['Resoluciones'],
      summary: 'Crear una nueva resolución',
      description: 'Crea una nueva resolución en el sistema.',
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
            schema: { $ref: '#/components/schemas/ResolucionInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Resolución creada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Resolucion' }
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
          description: 'Sin permisos para crear resoluciones'
        },
        500: {
          description: 'Error interno del servidor'
        }
      }
    }
  },
  '/resoluciones/list': {
    get: {
      tags: ['Resoluciones'],
      summary: 'Obtener lista simplificada de resoluciones',
      description: 'Devuelve una lista simplificada de resoluciones para uso en selects y componentes.',
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
          name: 'sortBy',
          schema: { type: 'string', enum: ['fecha', 'fecha_ingreso'] },
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
                    items: { $ref: '#/components/schemas/ResolucionList' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/resoluciones/{id}': {
    get: {
      tags: ['Resoluciones'],
      summary: 'Obtener una resolución por ID',
      description: 'Obtiene la información detallada de una resolución específica.',
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
          description: 'ID de la resolución'
        }
      ],
      responses: {
        200: {
          description: 'Resolución encontrada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Resolucion' }
                }
              }
            }
          }
        },
        404: {
          description: 'Resolución no encontrada'
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
      tags: ['Resoluciones'],
      summary: 'Actualizar una resolución',
      description: 'Actualiza la información de una resolución existente.',
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
          description: 'ID de la resolución'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ResolucionUpdateInput' }
          }
        }
      },
      responses: {
        200: {
          description: 'Resolución actualizada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Resolucion' }
                }
              }
            }
          }
        },
        400: {
          description: 'Datos de entrada inválidos'
        },
        404: {
          description: 'Resolución no encontrada'
        },
        500: {
          description: 'Error interno del servidor'
        }
      }
    },
    delete: {
      tags: ['Resoluciones'],
      summary: 'Eliminar una resolución',
      description: 'Elimina una resolución del sistema.',
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
          description: 'ID de la resolución'
        }
      ],
      responses: {
        200: {
          description: 'Resolución eliminada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      mensaje: { type: 'string', example: 'Resolución eliminada exitosamente' }
                    }
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Resolución no encontrada'
        },
        401: {
          description: 'Token de autenticación inválido o expirado'
        },
        403: {
          description: 'Sin permisos para eliminar resoluciones'
        }
      }
    }
  }
};
