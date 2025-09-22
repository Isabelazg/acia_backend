export const permisosPaths = {
    '/permisos': {
        get: {
            tags: ['Permisos'],
            summary: 'Obtener todos los permisos',
            description: 'Devuelve una lista de todos los permisos disponibles en el sistema.',
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
                    description: 'Filtrar por ID de permiso'
                },
                {
                    in: 'query',
                    name: 'nombre',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombre de permiso'
                },
                {
                    in: 'query',
                    name: 'descripcion',
                    schema: { type: 'string' },
                    description: 'Filtrar por descripción de permiso'
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
                    schema: { type: 'string', enum: ['id', 'nombre', 'descripcion', 'estado'] },
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
                    description: 'Lista de permisos obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Permiso' }
                                    },
                                    meta: {
                                        type: 'object',
                                        properties: {
                                            total: { type: 'integer', example: 15 }
                                        }
                                    },
                                    links: {
                                        type: 'object',
                                        properties: {
                                            self: { type: 'string', example: 'http://localhost:3000/permisos/?pagination=false' }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        nombre: "ver_usuarios",
                                        descripcion: "Permite ver la lista de usuarios del sistema",
                                        estado: true
                                    },
                                    {
                                        id: 2,
                                        nombre: "crear_usuarios",
                                        descripcion: "Permite crear nuevos usuarios en el sistema",
                                        estado: true
                                    }
                                ],
                                meta: {
                                    total: 2
                                },
                                links: {
                                    self: "http://localhost:3000/permisos/?pagination=false"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Permisos'],
            summary: 'Crear un nuevo permiso',
            description: 'Crea un nuevo permiso en el sistema.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Permiso' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Permiso creado exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Permiso' }
                                }
                            },
                            example: {
                                data: {
                                    id: 3,
                                    nombre: "eliminar_usuarios",
                                    descripcion: "Permite eliminar usuarios del sistema",
                                    estado: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/permisos/{id}': {
        get: {
            tags: ['Permisos'],
            summary: 'Obtener un permiso por ID',
            description: 'Devuelve un permiso específico según su ID.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID del permiso a consultar'
                }
            ],
            responses: {
                200: {
                    description: 'Permiso obtenido exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Permiso' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    nombre: "ver_usuarios",
                                    descripcion: "Permite ver la lista de usuarios del sistema",
                                    estado: true
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: ['Permisos'],
            summary: 'Actualizar un permiso por ID',
            description: 'Actualiza un permiso específico según su ID.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'ID del permiso a actualizar'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Permiso' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Permiso actualizado exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: { $ref: '#/components/schemas/Permiso' }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    nombre: "ver_usuarios_completo",
                                    descripcion: "Permite ver toda la información detallada de los usuarios",
                                    estado: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/permisos/list': {
        get: {
            tags: ['Permisos'],
            summary: 'Obtener lista simplificada de permisos',
            description: 'Devuelve una lista simplificada de permisos activos.',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Lista simplificada de permisos obtenida exitosamente',
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
                                                nombre: { type: 'string', example: 'ver_usuarios' },
                                                descripcion: { type: 'string', example: 'Permite ver la lista de usuarios' },
                                                estado: { type: 'boolean', example: true }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        nombre: "ver_usuarios",
                                        descripcion: "Permite ver la lista de usuarios",
                                        estado: true
                                    },
                                    {
                                        id: 2,
                                        nombre: "crear_usuarios",
                                        descripcion: "Permite crear nuevos usuarios",
                                        estado: true
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