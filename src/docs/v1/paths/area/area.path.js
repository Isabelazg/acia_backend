export const areasPaths = {
    '/areas': {
        get: {
            tags: ['Áreas'],
            summary: 'Obtener todas las áreas',
            description: 'Devuelve una lista de todas las áreas disponibles en el sistema.',
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
                    name: 'id',
                    schema: { type: 'integer' },
                    description: 'Filtrar por ID del área'
                },
                {
                    in: 'query',
                    name: 'nombre',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombre del área'
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
                    schema: { type: 'string', enum: ['id', 'nombre', 'estado'] },
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
                    schema: { type: 'integer', minimum: 1 },
                    description: 'Cantidad de resultados por página'
                },
                {
                    in: 'query',
                    name: 'pagination',
                    schema: { type: 'boolean' },
                    description: 'Si es false, devuelve todos los resultados sin paginar'
                }
            ],
            responses: {
                200: {
                    description: 'Lista de áreas obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Area' }
                                    },
                                    meta: {
                                        type: 'object',
                                        properties: {
                                            total: { type: 'integer', example: 10 }
                                        }
                                    },
                                    links: {
                                        type: 'object',
                                        properties: {
                                            self: { type: 'string', example: 'http://localhost:3000/areas/?pagination=false' }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        nombre: "Agricultura y Desarrollo Rural",
                                        estado: true
                                    },
                                    {
                                        id: 2,
                                        nombre: "Ciencias Sociales",
                                        estado: true
                                    }
                                ],
                                meta: {
                                    total: 2
                                },
                                links: {
                                    self: "http://localhost:3000/areas/?pagination=false"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Áreas'],
            summary: 'Crear un área',
            description: 'Crea una nueva área en el sistema.',
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
                    in: 'header',
                    name: 'Content-Type',
                    required: true,
                    schema: { type: 'string', example: 'application/json' },
                    description: 'Tipo de contenido de la solicitud'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/AreaInput' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Área creada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Area' }
                                }
                            },
                            example: {
                                data: {
                                    id: 3,
                                    nombre: "Nueva área",
                                    estado: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/areas/{id}': {
        get: {
            tags: ['Áreas'],
            summary: 'Obtener un área por ID',
            description: 'Devuelve un área específica según su ID.',
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
                    schema: { type: 'integer' },
                    description: 'ID del área a consultar'
                }
            ],
            responses: {
                200: {
                    description: 'Área obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Area' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    nombre: "Agricultura y Desarrollo Rural",
                                    estado: true
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: ['Áreas'],
            summary: 'Actualizar un área por ID',
            description: 'Actualiza un área específica según su ID.',
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
                    schema: { type: 'integer' },
                    description: 'ID del área a actualizar'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/AreaUpdate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Área actualizada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Area' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    nombre: "Área actualizada",
                                    estado: false
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/areas/{id}/estado': {
        patch: {
            tags: ['Áreas'],
            summary: 'Cambiar el estado de un área',
            description: 'Cambia el estado de un área específica según su ID.',
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
                    schema: { type: 'integer' },
                    description: 'ID del área a modificar estado'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                estado: { type: 'boolean', description: 'Nuevo estado del área', example: false }
                            },
                            required: ['estado']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Estado del área actualizado exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer', example: 1 },
                                    nombre: { type: 'string', example: 'Área de ejemplo' },
                                    estado: { type: 'boolean', example: false }
                                }
                            },
                            example: {
                                id: 1,
                                nombre: "Área de ejemplo",
                                estado: false
                            }
                        }
                    }
                }
            }
        }
    },
    '/areas/list': {
        get: {
            tags: ['Áreas'],
            summary: 'Obtener lista simplificada de áreas',
            description: 'Devuelve una lista simplificada de áreas activas.',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Lista simplificada de áreas obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                nombre: { type: 'string', example: 'Área de ejemplo' }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    { id: 1, nombre: "Agricultura y Desarrollo Rural" },
                                    { id: 2, nombre: "Ciencias Sociales" }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};