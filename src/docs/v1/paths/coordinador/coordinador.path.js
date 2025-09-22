export const coordinadoresPaths = {
    '/coordinadores': {
        get: {
            tags: ['Coordinadores'],
            summary: 'Obtener todos los coordinadores',
            description: 'Devuelve una lista de todos los coordinadores disponibles en el sistema.',
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
                    description: 'Filtrar por documento del coordinador'
                },
                {
                    in: 'query',
                    name: 'nombres',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombres del coordinador'
                },
                {
                    in: 'query',
                    name: 'apellidos',
                    schema: { type: 'string' },
                    description: 'Filtrar por apellidos del coordinador'
                },
                {
                    in: 'query',
                    name: 'correo',
                    schema: { type: 'string' },
                    description: 'Filtrar por correo del coordinador'
                },
                {
                    in: 'query',
                    name: 'telefono',
                    schema: { type: 'string' },
                    description: 'Filtrar por teléfono del coordinador'
                },
                {
                    in: 'query',
                    name: 'estado',
                    schema: { type: 'boolean' },
                    description: 'Filtrar por estado (activo/inactivo)'
                },
                {
                    in: 'query',
                    name: 'centros_id',
                    schema: { type: 'integer' },
                    description: 'Filtrar por ID de centro'
                },
                {
                    in: 'query',
                    name: 'sortBy',
                    schema: { type: 'string', enum: ['documento', 'nombres', 'apellidos', 'correo', 'estado'] },
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
                }
            ],
            responses: {
                200: {
                    description: 'Lista de coordinadores obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Coordinador' }
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
                                            self: { type: 'string', example: 'http://localhost:3000/coordinadores/?pagination=false' }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        documento: "1123278123",
                                        nombres: "Rodrigo",
                                        apellidos: "Colorado",
                                        correo: "rodrigo@gmail.com",
                                        telefono: "31375085",
                                        estado: true,
                                        centros_id: 2
                                    },
                                    {
                                        id: 2,
                                        documento: "1098765432",
                                        nombres: "Ana",
                                        apellidos: "Martínez",
                                        correo: "ana@gmail.com",
                                        telefono: "31375086",
                                        estado: true,
                                        centros_id: 3
                                    }
                                ],
                                meta: {
                                    total: 2
                                },
                                links: {
                                    self: "http://localhost:3000/coordinadores/?pagination=false"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Coordinadores'],
            summary: 'Crear un nuevo coordinador',
            description: 'Crea un nuevo coordinador en el sistema.',
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
                        schema: { $ref: '#/components/schemas/CoordinadorInput' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Coordinador creado exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Coordinador' }
                                }
                            },
                            example: {
                                data: {
                                    id: 3,
                                    documento: "1123278123",
                                    nombres: "Rodrigo",
                                    apellidos: "Colorado",
                                    correo: "rodrigo@gmail.com",
                                    telefono: "31375085",
                                    estado: true,
                                    centros_id: 2
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/coordinadores/{id}': {
        get: {
            tags: ['Coordinadores'],
            summary: 'Obtener un coordinador por ID',
            description: 'Devuelve un coordinador específico según su ID.',
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
                    description: 'ID del coordinador a consultar'
                }
            ],
            responses: {
                200: {
                    description: 'Coordinador obtenido exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Coordinador' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    documento: "1123278123",
                                    nombres: "Rodrigo",
                                    apellidos: "Colorado",
                                    correo: "rodrigo@gmail.com",
                                    telefono: "31375085",
                                    estado: true,
                                    centros_id: 2
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: ['Coordinadores'],
            summary: 'Actualizar un coordinador por ID',
            description: 'Actualiza un coordinador específico según su ID.',
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
                    description: 'ID del coordinador a actualizar'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/CoordinadorUpdate' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Coordinador actualizado exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Coordinador' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    documento: "1123278123",
                                    nombres: "Rodrigo Actualizado",
                                    apellidos: "Colorado",
                                    correo: "rodrigo_actualizado@gmail.com",
                                    telefono: "31375085",
                                    estado: false,
                                    centros_id: 2
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/coordinadores/list': {
        get: {
            tags: ['Coordinadores'],
            summary: 'Obtener lista simplificada de coordinadores',
            description: 'Devuelve una lista simplificada de coordinadores activos.',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Lista simplificada de coordinadores obtenida exitosamente',
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
                                                documento: { type: 'string', example: '1123278123' },
                                                nombres: { type: 'string', example: 'Rodrigo' },
                                                apellidos: { type: 'string', example: 'Colorado' }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        documento: "1123278123",
                                        nombres: "Rodrigo",
                                        apellidos: "Colorado"
                                    },
                                    {
                                        id: 2,
                                        documento: "1098765432",
                                        nombres: "Ana",
                                        apellidos: "Martínez"
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