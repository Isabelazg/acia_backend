
export const centrosSchemas = {
    Centro: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'Identificador único del centro',
                example: 1
            },
            codigo: {
                type: 'string',
                maxLength: 50,
                description: 'Código único del centro',
                example: 'CEN001'
            },
            nombre: {
                type: 'string',
                maxLength: 300,
                description: 'Nombre completo del centro',
                example: 'Centro de Biotecnología Industrial'
            },
            direccion: {
                type: 'string',
                maxLength: 255,
                description: 'Dirección física del centro',
                example: 'Calle 52 # 13-65, Medellín',
                nullable: true
            },
            estado: {
                type: 'string',
                maxLength: 45,
                description: 'Estado del centro',
                example: 'activo',
                enum: ['activo', 'inactivo'],
                default: 'activo'
            },
            ciudad_id: {
                type: 'integer',
                description: 'ID de la ciudad donde se ubica el centro',
                example: 1
            },
            regional_id: {
                type: 'integer',
                description: 'ID de la regional a la que pertenece el centro',
                example: 1
            },
            supervisores_id: {
                type: 'integer',
                description: 'ID del supervisor del centro',
                example: 1,
                nullable: true
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
        required: ['codigo', 'nombre', 'ciudad_id', 'regional_id']
    },

    CentroInput: {
        type: 'object',
        properties: {
            codigo: {
                type: 'string',
                maxLength: 50,
                description: 'Código único del centro',
                example: 'CEN001'
            },
            nombre: {
                type: 'string',
                maxLength: 300,
                description: 'Nombre completo del centro',
                example: 'Centro de Biotecnología Industrial'
            },
            direccion: {
                type: 'string',
                maxLength: 255,
                description: 'Dirección física del centro',
                example: 'Calle 52 # 13-65, Medellín'
            },
            ciudad_id: {
                type: 'integer',
                description: 'ID de la ciudad donde se ubica el centro',
                example: 1,
                minimum: 1
            },
            regional_id: {
                type: 'integer',
                description: 'ID de la regional a la que pertenece el centro',
                example: 1,
                minimum: 1
            },
            supervisores_id: {
                type: 'integer',
                description: 'ID del supervisor del centro',
                example: 1,
                minimum: 1
            }
        },
        required: ['codigo', 'nombre', 'ciudad_id', 'regional_id']
    },

    CentroUpdate: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                maxLength: 300,
                description: 'Nombre completo del centro',
                example: 'Centro de Biotecnología Industrial Actualizado'
            },
            direccion: {
                type: 'string',
                maxLength: 255,
                description: 'Dirección física del centro',
                example: 'Nueva dirección actualizada'
            },
            ciudad_id: {
                type: 'integer',
                description: 'ID de la ciudad donde se ubica el centro',
                example: 2,
                minimum: 1
            },
            regional_id: {
                type: 'integer',
                description: 'ID de la regional a la que pertenece el centro',
                example: 2,
                minimum: 1
            },
            supervisores_id: {
                type: 'integer',
                description: 'ID del supervisor del centro',
                example: 2,
                minimum: 1
            }
        }
    },

    CentroEstado: {
        type: 'object',
        properties: {
            estado: {
                type: 'string',
                description: 'Nuevo estado del centro',
                example: 'inactivo',
                enum: ['activo', 'inactivo']
            }
        },
        required: ['estado']
    },

    CentrosPaginados: {
        type: 'object',
        properties: {
            centros: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Centro'
                },
                description: 'Lista de centros'
            },
            totalPages: {
                type: 'integer',
                description: 'Número total de páginas',
                example: 5
            },
            currentPage: {
                type: 'integer',
                description: 'Página actual',
                example: 1
            },
            totalItems: {
                type: 'integer',
                description: 'Número total de elementos',
                example: 47
            },
            itemsPerPage: {
                type: 'integer',
                description: 'Elementos por página',
                example: 10
            },
            hasNextPage: {
                type: 'boolean',
                description: 'Indica si hay una página siguiente',
                example: true
            },
            hasPreviousPage: {
                type: 'boolean',
                description: 'Indica si hay una página anterior',
                example: false
            }
        }
    },

    CentroFiltros: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                description: 'Número de página',
                example: 1,
                minimum: 1,
                default: 1
            },
            limit: {
                type: 'integer',
                description: 'Cantidad de elementos por página',
                example: 10,
                minimum: 1,
                maximum: 100,
                default: 10
            },
            nombre: {
                type: 'string',
                description: 'Filtrar por nombre del centro (búsqueda parcial)',
                example: 'Biotecnología'
            },
            codigo: {
                type: 'string',
                description: 'Filtrar por código exacto del centro',
                example: 'CEN001'
            },
            ciudad_id: {
                type: 'integer',
                description: 'Filtrar por ID de ciudad',
                example: 1,
                minimum: 1
            },
            regional_id: {
                type: 'integer',
                description: 'Filtrar por ID de regional',
                example: 1,
                minimum: 1
            },
            supervisores_id: {
                type: 'integer',
                description: 'Filtrar por ID de supervisor',
                example: 1,
                minimum: 1
            },
            estado: {
                type: 'string',
                description: 'Filtrar por estado',
                example: 'activo',
                enum: ['activo', 'inactivo']
            }
        }
    },

    CentroResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                description: 'Indica si la operación fue exitosa',
                example: true
            },
            message: {
                type: 'string',
                description: 'Mensaje descriptivo de la operación',
                example: 'Centro creado exitosamente'
            },
            data: {
                $ref: '#/components/schemas/Centro',
                description: 'Datos del centro'
            }
        }
    },

    CentrosListResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                description: 'Indica si la operación fue exitosa',
                example: true
            },
            message: {
                type: 'string',
                description: 'Mensaje descriptivo de la operación',
                example: 'Lista de centros obtenida exitosamente'
            },
            data: {
                $ref: '#/components/schemas/CentrosPaginados',
                description: 'Datos paginados de centros'
            }
        }
    },

    CentroEstadoResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                description: 'Indica si la operación fue exitosa',
                example: true
            },
            message: {
                type: 'string',
                description: 'Mensaje descriptivo de la operación',
                example: 'Centro activado exitosamente'
            },
            data: {
                type: 'object',
                properties: {
                    codigo: {
                        type: 'string',
                        description: 'Código del centro',
                        example: 'CEN001'
                    },
                    nombre: {
                        type: 'string',
                        description: 'Nombre del centro',
                        example: 'Centro de Biotecnología Industrial'
                    },
                    estadoAnterior: {
                        type: 'string',
                        description: 'Estado anterior del centro',
                        example: 'inactivo'
                    },
                    estadoActual: {
                        type: 'string',
                        description: 'Estado actual del centro',
                        example: 'activo'
                    }
                }
            }
        }
    },

    ErrorResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                description: 'Indica si la operación fue exitosa',
                example: false
            },
            message: {
                type: 'string',
                description: 'Mensaje descriptivo del error',
                example: 'Error en la operación'
            },
            error: {
                type: 'string',
                description: 'Descripción detallada del error',
                example: 'Descripción específica del error'
            },
            errors: {
                type: 'array',
                description: 'Lista de errores de validación',
                items: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            example: 'field'
                        },
                        msg: {
                            type: 'string',
                            example: 'El campo es requerido'
                        },
                        path: {
                            type: 'string',
                            example: 'nombre'
                        },
                        location: {
                            type: 'string',
                            example: 'body'
                        }
                    }
                }
            }
        }
    }
};