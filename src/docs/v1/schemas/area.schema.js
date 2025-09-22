export const areasSchemas = {
    Area: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Identificador único del área',
                example: 1
            },
            nombre: {
                type: 'string',
                maxLength: 100,
                description: 'Nombre del área',
                example: 'Agricultura y Desarrollo Rural'
            },
            estado: {
                type: 'boolean',
                description: 'Estado del área (true = activo, false = inactivo)',
                example: true,
                default: true
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
        required: ['nombre']
    },

    AreaInput: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                maxLength: 100,
                description: 'Nombre del área',
                example: 'Agricultura y Desarrollo Rural'
            },
            estado: {
                type: 'boolean',
                description: 'Estado del área (true = activo, false = inactivo)',
                example: true,
                default: true
            }
        },
        required: ['nombre']
    },

    AreaUpdate: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                maxLength: 100,
                description: 'Nombre del área',
                example: 'Área actualizada'
            },
            estado: {
                type: 'boolean',
                description: 'Estado del área (true = activo, false = inactivo)',
                example: false
            }
        }
    },

    AreasPaginadas: {
        type: 'object',
        properties: {
            areas: {
                type: 'array',
                items: { $ref: '#/components/schemas/Area' },
                description: 'Lista de áreas'
            },
            totalPages: { type: 'integer', example: 5 },
            currentPage: { type: 'integer', example: 1 },
            totalItems: { type: 'integer', example: 47 },
            itemsPerPage: { type: 'integer', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: false }
        }
    },

    AreaFiltros: {
        type: 'object',
        properties: {
            page: { type: 'integer', example: 1, minimum: 1, default: 1 },
            limit: { type: 'integer', example: 10, minimum: 1, maximum: 100, default: 10 },
            nombre: { type: 'string', example: 'Agricultura' },
            estado: { type: 'boolean', example: true }
        }
    },

    AreaResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Área creada exitosamente' },
            data: { $ref: '#/components/schemas/Area' }
        }
    },

    AreasListResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lista de áreas obtenida exitosamente' },
            data: { $ref: '#/components/schemas/AreasPaginadas' }
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
                        path: { type: 'string', example: 'nombre' },
                        location: { type: 'string', example: 'body' }
                    }
                }
            }
        }
    }
};