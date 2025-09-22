export const coordinadoresSchemas = {
    Coordinador: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Identificador único del coordinador',
                example: 1
            },
            documento: {
                type: 'string',
                maxLength: 20,
                description: 'Documento único del coordinador',
                example: '1123278123'
            },
            nombres: {
                type: 'string',
                maxLength: 50,
                description: 'Nombres del coordinador',
                example: 'Rodrigo'
            },
            apellidos: {
                type: 'string',
                maxLength: 50,
                description: 'Apellidos del coordinador',
                example: 'Colorado'
            },
            correo: {
                type: 'string',
                maxLength: 100,
                description: 'Correo electrónico del coordinador',
                example: 'rodrigo@gmail.com'
            },
            telefono: {
                type: 'string',
                maxLength: 20,
                description: 'Teléfono del coordinador',
                example: '31375085',
                nullable: true
            },
            estado: {
                type: 'boolean',
                description: 'Estado del coordinador (true = activo, false = inactivo)',
                example: true,
                default: true
            },
            centros_id: {
                type: 'integer',
                description: 'ID del centro asignado',
                example: 2
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de creación del registro',
                example: '2024-01-15T10:30:00.000Z'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de última actualización del registro',
                example: '2024-01-15T10:30:00.000Z',
                nullable: true
            }
        },
        required: ['documento', 'nombres', 'apellidos', 'correo', 'centros_id']
    },

    CoordinadorInput: {
        type: 'object',
        properties: {
            documento: {
                type: 'string',
                maxLength: 20,
                description: 'Documento único del coordinador',
                example: '1123278123'
            },
            nombres: {
                type: 'string',
                maxLength: 50,
                description: 'Nombres del coordinador',
                example: 'Rodrigo'
            },
            apellidos: {
                type: 'string',
                maxLength: 50,
                description: 'Apellidos del coordinador',
                example: 'Colorado'
            },
            correo: {
                type: 'string',
                maxLength: 100,
                description: 'Correo electrónico del coordinador',
                example: 'rodrigo@gmail.com'
            },
            telefono: {
                type: 'string',
                maxLength: 20,
                description: 'Teléfono del coordinador',
                example: '31375085'
            },
            estado: {
                type: 'boolean',
                description: 'Estado del coordinador (true = activo, false = inactivo)',
                example: true,
                default: true
            },
            centros_id: {
                type: 'integer',
                description: 'ID del centro asignado',
                example: 2
            }
        },
        required: ['documento', 'nombres', 'apellidos', 'correo', 'centros_id']
    },

    CoordinadorUpdate: {
        type: 'object',
        properties: {
            documento: {
                type: 'string',
                maxLength: 20,
                description: 'Documento único del coordinador',
                example: '1123278123'
            },
            nombres: {
                type: 'string',
                maxLength: 50,
                description: 'Nombres del coordinador',
                example: 'Rodrigo'
            },
            apellidos: {
                type: 'string',
                maxLength: 50,
                description: 'Apellidos del coordinador',
                example: 'Colorado'
            },
            correo: {
                type: 'string',
                maxLength: 100,
                description: 'Correo electrónico del coordinador',
                example: 'rodrigo@gmail.com'
            },
            telefono: {
                type: 'string',
                maxLength: 20,
                description: 'Teléfono del coordinador',
                example: '31375085'
            },
            estado: {
                type: 'boolean',
                description: 'Estado del coordinador (true = activo, false = inactivo)',
                example: false
            },
            centros_id: {
                type: 'integer',
                description: 'ID del centro asignado',
                example: 2
            }
        }
    },

    CoordinadoresPaginados: {
        type: 'object',
        properties: {
            coordinadores: {
                type: 'array',
                items: { $ref: '#/components/schemas/Coordinador' },
                description: 'Lista de coordinadores'
            },
            totalPages: { type: 'integer', example: 5 },
            currentPage: { type: 'integer', example: 1 },
            totalItems: { type: 'integer', example: 47 },
            itemsPerPage: { type: 'integer', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: false }
        }
    },

    CoordinadorFiltros: {
        type: 'object',
        properties: {
            page: { type: 'integer', example: 1, minimum: 1, default: 1 },
            limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
            documento: { type: 'string', example: '1123278123' },
            nombres: { type: 'string', example: 'Rodrigo' },
            apellidos: { type: 'string', example: 'Colorado' },
            correo: { type: 'string', example: 'rodrigo@gmail.com' },
            telefono: { type: 'string', example: '31375085' },
            estado: { type: 'boolean', example: true },
            centros_id: { type: 'integer', example: 2 }
        }
    },

    CoordinadorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Coordinador creado exitosamente' },
            data: { $ref: '#/components/schemas/Coordinador' }
        }
    },

    CoordinadoresListResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lista de coordinadores obtenida exitosamente' },
            data: { $ref: '#/components/schemas/CoordinadoresPaginados' }
        }
    },

    ErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error en la operación' },
            error: { type: 'string', example: 'Descripción específica del error' },
            errors: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', example: 'field' },
                        msg: { type: 'string', example: 'El campo es requerido' },
                        path: { type: 'string', example: 'documento' },
                        location: { type: 'string', example: 'body' }
                    }
                }
            }
        }
    }
};