export const educacionFormalPaths = {
  '/educacion-formales': {
    get: {
      tags: ['Educación Formales'],
      summary: 'Obtener todas las formaciones académicas',
      description: 'Devuelve una lista de todas las formaciones académicas registradas en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'id', schema: { type: 'integer' }, description: 'Filtrar por ID de educación formal' },
        { in: 'query', name: 'nivel_formacion_id', schema: { type: 'integer' }, description: 'Filtrar por nivel de formación' },
        { in: 'query', name: 'titulo', schema: { type: 'string' }, description: 'Filtrar por título académico' },
        { in: 'query', name: 'institucion', schema: { type: 'string' }, description: 'Filtrar por institución educativa' },
        { in: 'query', name: 'estado_id', schema: { type: 'integer' }, description: 'Filtrar por estado' },
        { in: 'query', name: 'informacion_personal_id', schema: { type: 'integer' }, description: 'Filtrar por persona' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'titulo', 'institucion', 'estado_id'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' },
        { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 }, description: 'Número de página para paginación' },
        { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 }, description: 'Cantidad de resultados por página' },
        { in: 'query', name: 'pagination', schema: { type: 'boolean' }, description: 'Si es false, devuelve todos los resultados sin paginar' }
      ],
      responses: {
        200: {
          description: 'Lista de formaciones académicas obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/EducacionFormal' } },
                  meta: { type: 'object', properties: { total: { type: 'integer', example: 2 } } },
                  links: { type: 'object', properties: { self: { type: 'string', example: 'http://localhost:3000/educacion-formales/?pagination=false' } } }
                }
              },
              example: {
                data: [
                  { id: 1, nivel_formacion_id: 2, titulo: "Ingeniería de Sistemas", institucion: "Universidad Nacional", numero_semestres: 10, fecha_inicio: "2020-01-10", fecha_terminacion: "2024-06-15", estado_id: 1, informacion_personal_id: 5 },
                  { id: 2, nivel_formacion_id: 3, titulo: "Tecnología en Desarrollo de Software", institucion: "SENA", numero_semestres: 6, fecha_inicio: "2021-02-01", fecha_terminacion: "2023-07-30", estado_id: 1, informacion_personal_id: 8 }
                ],
                meta: { total: 2 },
                links: { self: "http://localhost:3000/educacion-formales/?pagination=false" }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ['Educación Formales'],
      summary: 'Registrar una nueva formación académica',
      description: 'Crea un nuevo registro de educación formal en el sistema.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'header', name: 'Content-Type', required: true, schema: { type: 'string', example: 'application/json' }, description: 'Tipo de contenido de la solicitud' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EducacionFormal' }
          }
        }
      },
      responses: {
        201: {
          description: 'Formación académica creada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EducacionFormal' } } },
              example: {
                data: {
                  id: 3,
                  nivel_formacion_id: 1,
                  titulo: "Maestría en Inteligencia Artificial",
                  institucion: "Universidad de los Andes",
                  numero_semestres: 4,
                  fecha_inicio: "2025-01-15",
                  fecha_terminacion: "2026-12-15",
                  estado_id: 1,
                  informacion_personal_id: 10
                }
              }
            }
          }
        }
      }
    }
  },

  '/educacion-formales/{id}': {
    get: {
      tags: ['Educación Formales'],
      summary: 'Obtener una formación académica por ID',
      description: 'Devuelve un registro de educación formal específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la educación formal a consultar' }
      ],
      responses: {
        200: {
          description: 'Formación académica obtenida exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EducacionFormal' } } },
              example: { data: { id: 1, nivel_formacion_id: 2, titulo: "Ingeniería de Sistemas", institucion: "Universidad Nacional", numero_semestres: 10, fecha_inicio: "2020-01-10", fecha_terminacion: "2024-06-15", estado_id: 1, informacion_personal_id: 5 } }
            }
          }
        },
        404: {
          description: 'Formación académica no encontrada',
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
                        title: { type: 'string', example: 'Educación formal no encontrada' },
                        detail: { type: 'string', example: 'No existe una educación formal con id 5' },
                        code: { type: 'string', example: 'EDUCACION_FORMAL_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Educación formal no encontrada",
                    detail: "No existe una educación formal con id 5",
                    code: "EDUCACION_FORMAL_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    },

    put: {
      tags: ['Educación Formales'],
      summary: 'Actualizar una formación académica por ID',
      description: 'Actualiza un registro de educación formal específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la educación formal a actualizar' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EducacionFormal' }
          }
        }
      },
      responses: {
        200: {
          description: 'Formación académica actualizada exitosamente',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/EducacionFormal' } } },
              example: { data: { id: 1, nivel_formacion_id: 2, titulo: "Ingeniería de Software", institucion: "Universidad Nacional", numero_semestres: 10, fecha_inicio: "2020-01-10", fecha_terminacion: "2024-06-15", estado_id: 1, informacion_personal_id: 5 } }
            }
          }
        },
        404: {
          description: 'Educación formal no encontrada',
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
                        title: { type: 'string', example: 'Educación formal no encontrada' },
                        detail: { type: 'string', example: 'No existe una educación formal con id 5' },
                        code: { type: 'string', example: 'EDUCACION_FORMAL_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Educación formal no encontrada",
                    detail: "No existe una educación formal con id 5",
                    code: "EDUCACION_FORMAL_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },

  '/educacion-formales/{id}/estado': {
    patch: {
      tags: ['Educación Formales'],
      summary: 'Cambiar el estado de una formación académica (activar/desactivar)',
      description: 'Cambia el estado de un registro de educación formal específico según su ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, description: 'ID de la educación formal a modificar estado' }
      ],
      responses: {
        200: {
          description: 'Estado de la formación académica actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  titulo: { type: 'string', example: 'Ingeniería de Sistemas' },
                  estado_id: { type: 'integer', example: 0 }
                }
              },
              example: { id: 1, titulo: "Ingeniería de Sistemas", estado_id: 0 }
            }
          }
        },
        404: {
          description: 'Formación académica no encontrada',
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
                        title: { type: 'string', example: 'Educación formal no encontrada' },
                        detail: { type: 'string', example: 'No existe una educación formal con id 5' },
                        code: { type: 'string', example: 'EDUCACION_FORMAL_NOT_FOUND' }
                      }
                    }
                  }
                }
              },
              example: {
                errors: [
                  {
                    status: "404",
                    title: "Educación formal no encontrada",
                    detail: "No existe una educación formal con id 5",
                    code: "EDUCACION_FORMAL_NOT_FOUND"
                  }
                ]
              }
            }
          }
        }
      }
    }
  },

  '/educacion-formales/list': {
    get: {
      tags: ['Educación Formales'],
      summary: 'Obtener lista de formaciones académicas',
      description: 'Devuelve una lista de formaciones académicas con atributos básicos.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'header', name: 'Authorization', required: true, schema: { type: 'string', example: 'Bearer <refresh_token>' }, description: 'Token de acceso en formato Bearer' },
        { in: 'query', name: 'estado_id', schema: { type: 'integer' }, description: 'Filtrar por estado (activo/inactivo)' },
        { in: 'query', name: 'sortBy', schema: { type: 'string', enum: ['id', 'titulo', 'institucion', 'estado_id'] }, description: 'Campo por el cual ordenar' },
        { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Orden ascendente o descendente' }
      ],
      responses: {
        200: {
          description: 'Lista de formaciones académicas obtenida exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/EducacionFormal' } }
                }
              },
              example: {
                data: [
                  { id: 1, titulo: "Ingeniería de Sistemas", institucion: "Universidad Nacional", estado_id: 1 },
                  { id: 2, titulo: "Tecnología en Desarrollo de Software", institucion: "SENA", estado_id: 1 }
                ]
              }
            }
          }
        }
      }
    }
  }
};
