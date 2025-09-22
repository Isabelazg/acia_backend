export const usuariosPaths = {
    '/usuarios': {
        get: {
            tags: ['Usuarios'],
            summary: 'Obtener lista de usuarios',
            description: 'Devuelve una lista de usuarios con filtros, orden y paginación. Permite filtrar por campos del usuario y por nombre de rol.',
            security: [
                { bearerAuth: [] }
            ],
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
                    description: 'Filtrar por ID de usuario'
                },
                {
                    in: 'query',
                    name: 'documento',
                    schema: { type: 'string' },
                    description: 'Filtrar por documento'
                },
                {
                    in: 'query',
                    name: 'nombres',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombres'
                },
                {
                    in: 'query',
                    name: 'apellidos',
                    schema: { type: 'string' },
                    description: 'Filtrar por apellidos'
                },
                {
                    in: 'query',
                    name: 'nombre_usuario',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombre de usuario'
                },
                {
                    in: 'query',
                    name: 'correo',
                    schema: { type: 'string' },
                    description: 'Filtrar por correo electrónico'
                },
                {
                    in: 'query',
                    name: 'telefono',
                    schema: { type: 'string' },
                    description: 'Filtrar por teléfono'
                },
                {
                    in: 'query',
                    name: 'estado',
                    schema: { type: 'boolean' },
                    description: 'Filtrar por estado (activo/inactivo)'
                },
                {
                    in: 'query',
                    name: 'rol_nombre',
                    schema: { type: 'string' },
                    description: 'Filtrar por nombre de rol'
                },
                {
                    in: 'query',
                    name: 'sortBy',
                    schema: { type: 'string', enum: ['id', 'documento', 'nombres', 'apellidos', 'nombre_usuario', 'correo', 'telefono', 'estado', 'rol_id'] },
                    description: 'Campo por el cual ordenar'
                },
                {
                    in: 'query',
                    name: 'order',
                    schema: { type: 'string', enum: ['asc', 'desc', 'ASC', 'DESC'] },
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
                    description: 'Lista de usuarios',
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
                                                documento: { type: 'string', example: '123456789' },
                                                nombres: { type: 'string', example: 'Juan' },
                                                apellidos: { type: 'string', example: 'Pérez' },
                                                nombre_usuario: { type: 'string', example: 'juanp' },
                                                correo: { type: 'string', example: 'juan@email.com' },
                                                telefono: { type: 'string', example: '3001234567' },
                                                estado: { type: 'boolean', example: true },
                                                rol: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'integer', example: 1 },
                                                        nombre: { type: 'string', example: 'Administrador' }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    meta: {
                                        type: 'object',
                                        properties: {
                                            total: { type: 'integer', example: 2 }
                                        }
                                    },
                                    links: {
                                        type: 'object',
                                        properties: {
                                            self: { type: 'string', example: 'http://localhost:3000/usuarios/?pagination=false' }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        documento: "123456789",
                                        nombres: "Juan",
                                        apellidos: "Pérez",
                                        nombre_usuario: "juanp",
                                        correo: "juan@email.com",
                                        telefono: "3001234567",
                                        estado: true,
                                        rol: {
                                            id: 1,
                                            nombre: "Administrador"
                                        }
                                    },
                                    {
                                        id: 2,
                                        documento: "987654321",
                                        nombres: "Ana",
                                        apellidos: "García",
                                        nombre_usuario: "anag",
                                        correo: "ana@email.com",
                                        telefono: "3019876543",
                                        estado: true,
                                        rol: {
                                            id: 2,
                                            nombre: "Empleado"
                                        }
                                    }
                                ],
                                meta: {
                                    total: 2
                                },
                                links: {
                                    self: "http://localhost:3000/usuarios/?pagination=false"
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'No autorizado'
                },
                500: {
                    description: 'Error interno del servidor'
                }
            }
        }
    },
    '/usuarios/{id}': {
        get: {
            tags: ['Usuarios'],
            summary: 'Obtener usuario por ID',
            description: 'Devuelve la información de un usuario específico por su ID, incluyendo su rol asociado.',
            security: [
                { bearerAuth: [] }
            ],
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
                    description: 'ID del usuario a consultar'
                }
            ],
            responses: {
                200: {
                    description: 'Usuario obtenido exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            documento: { type: 'string', example: '123456789' },
                                            nombres: { type: 'string', example: 'Juan' },
                                            apellidos: { type: 'string', example: 'Pérez' },
                                            nombre_usuario: { type: 'string', example: 'juanp' },
                                            correo: { type: 'string', example: 'juan@email.com' },
                                            telefono: { type: 'string', example: '3001234567' },
                                            estado: { type: 'boolean', example: true },
                                            rol: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'integer', example: 1 },
                                                    nombre: { type: 'string', example: 'Administrador' }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: {
                                    id: 1,
                                    documento: "123456789",
                                    nombres: "Juan",
                                    apellidos: "Pérez",
                                    nombre_usuario: "juanp",
                                    correo: "juan@email.com",
                                    telefono: "3001234567",
                                    estado: true,
                                    rol: {
                                        id: 1,
                                        nombre: "Administrador"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
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
                                                title: { type: 'string', example: 'Usuario no encontrado' },
                                                detail: { type: 'string', example: 'No existe un usuario con id 5' },
                                                code: { type: 'string', example: 'USER_NOT_FOUND' }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                errors: [
                                    {
                                        status: "404",
                                        title: "Usuario no encontrado",
                                        detail: "No existe un usuario con id 5",
                                        code: "USER_NOT_FOUND"
                                    }
                                ]
                            }
                        }
                    }
                },
                401: {
                    description: 'No autorizado'
                },
                500: {
                    description: 'Error interno del servidor'
                }
            }
        }
    },
};