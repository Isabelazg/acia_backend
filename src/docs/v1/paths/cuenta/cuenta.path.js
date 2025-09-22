export const cuentaPaths = {
    '/mi-cuenta': {
        get: {
            tags: ['Cuenta'],
            summary: 'Obtener mi cuenta',
            description: 'Permite a un usuario obtener la información de su cuenta utilizando el token de acceso.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    in: 'header',
                    name: 'Authorization',
                    required: true,
                    schema: { type: 'string', example: 'Bearer <refresh_token>' },
                    description: 'Refresh token en formato Bearer'
                }
            ],
            responses: {
                200: {
                    description: 'Información de la cuenta obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            documento: { type: 'string', example: '1234567890' },
                                            nombres: { type: 'string', example: 'Juan' },
                                            apellidos: { type: 'string', example: 'Pérez' },
                                            nombre_usuario: { type: 'string', example: 'juanperez' },
                                            correo: {
                                                type: 'string', format: 'email', example: 'juanperez@email.com',
                                                telefono: { type: 'string', example: '3001234567' },
                                                estado: { type: 'string', example: 'activo' },
                                                rol: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'integer', example: 1 },
                                                        nombre: { type: 'string', example: 'Administrador' }
                                                    }
                                                },
                                                created_at: { type: 'string', format: 'date-time', example: '2023-01-01T12:00:00Z' },
                                                updated_at: { type: 'string', format: 'date-time', example: '2023-01-01T12:00:00Z' },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'No autorizado. Token de acceso inválido o expirado.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Token de acceso inválido o expirado.' },
                                    errors: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                code: { type: 'string', example: 'UNAUTHORIZED' },
                                                detail: { type: 'string', example: 'El token proporcionado no es válido.' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }

        },
    },
    '/mi-cuenta/permisos': {
        get: {
            tags: ['Cuenta'],
            summary: 'Obtener permisos de mi cuenta',
            description: 'Permite a un usuario obtener los permisos asociados a su cuenta utilizando el token de acceso.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    in: 'header',
                    name: 'Authorization',
                    required: true,
                    schema: { type: 'string', example: 'Bearer <access_token>' },
                    description: 'Token de acceso en formato Bearer'
                }
            ],
            responses: {
                200: {
                    description: 'Permisos obtenidos exitosamente',
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
                                                nombre: { type: 'string', example: 'Crear Usuario' },
                                                descripcion: { type: 'string', example: 'Permite crear nuevos usuarios en el sistema.' }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                data: [
                                    {
                                        id: 1,
                                        nombre: 'Crear Usuario',
                                        descripcion: 'Permite crear nuevos usuarios en el sistema.'
                                    },
                                    {
                                        id: 2,
                                        nombre: 'Editar Usuario',
                                        descripcion: 'Permite editar usuarios existentes.'
                                    }
                                ]
                            }
                        }
                    }
                },
                401: {
                    description: 'No autorizado. Token de acceso inválido o expirado.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Token de acceso inválido o expirado.' },
                                    errors: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                code: { type: 'string', example: 'UNAUTHORIZED' },
                                                detail: { type: 'string', example: 'El token proporcionado no es válido.' }
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
    }
};