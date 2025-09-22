export const registrosPresupuestalesPaths = {
  '/registros-presupuestales': {
    get: {
      tags: ['Registros Presupuestales'],
      summary: 'Obtener todos los registros presupuestales',
      description: 'Devuelve una lista de registros presupuestales registrados en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID del registro presupuestal' },
        { in: 'query', name: 'numero_proceso_secop', schema: { type: 'string' }, description: 'Filtrar por número de proceso SECOP' },
        { in: 'query', name: 'contratos_id', schema: { type: 'integer' }, description: 'Filtrar por ID de contrato' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'numero_proceso_secop', 'contratos_id'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de registros presupuestales obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/RegistroPresupuestal' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/registros-presupuestales/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, numero_proceso_secop: "SECOP-2025-001", link_proceso_secop: "https://secop.gov/001", contratos_id: 2, created_at: "2025-09-16", updated_at: "2025-09-16" },
                  { id: 2, numero_proceso_secop: "SECOP-2025-002", link_proceso_secop: null, contratos_id: 3, created_at: "2025-09-16", updated_at: "2025-09-16" }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/registros-presupuestales/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['Registros Presupuestales'],
      summary: 'Registrar un nuevo registro presupuestal',
      description: 'Crea un nuevo registro presupuestal en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegistroPresupuestal' }
          }
        }
      },
      responses: {
        201: {
          description: 'Registro presupuestal creado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/RegistroPresupuestal' } } },
              example: {
                data: {
                  id: 3,
                  numero_proceso_secop: "SECOP-2025-003",
                  link_proceso_secop: "https://secop.gov/003",
                  contratos_id: 5,
                  created_at: "2025-09-16",
                  updated_at: "2025-09-16"
                }
              }
            }
          }
        }
      }
    }
  },

  '/registros-presupuestales/{id}': {
    get: {
      tags: ['Registros Presupuestales'],
      summary: 'Obtener un registro presupuestal por ID',
      description: 'Devuelve un registro presupuestal específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del registro presupuestal a consultar' }
      ],
      responses: {
        200: {
          description: 'Registro presupuestal obtenido exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/RegistroPresupuestal' } } },
              example: { data: { id: 1, numero_proceso_secop: "SECOP-2025-001", link_proceso_secop: "https://secop.gov/001", contratos_id: 2 } }
            }
          }
        },
        404: {
          description: 'Registro presupuestal no encontrado'
        }
      }
    },

    put: {
      tags: ['Registros Presupuestales'],
      summary: 'Actualizar un registro presupuestal por ID',
      description: 'Actualiza un registro presupuestal específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID del registro presupuestal a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegistroPresupuestal' }
          }
        }
      },
      responses: {
        200: {
          description: 'Registro presupuestal actualizado exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/RegistroPresupuestal' } } },
              example: { data: { id: 1, numero_proceso_secop: "SECOP-2025-001", link_proceso_secop: "https://secop.gov/001", contratos_id: 2 } }
            }
          }
        }
      }
    }
  }
};
