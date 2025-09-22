export const experienciasLaboralSchemas = {
  ExperienciaLaboral: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      empresa: {
        type: 'string',
        example: 'OpenAI'
      },
      cargo: {
        type: 'string',
        example: 'Desarrollador Backend'
      },
      fecha_ingreso: {
        type: 'string',
        format: 'date',
        example: '2022-01-15'
      },
      fecha_retiro: {
        type: 'string',
        format: 'date',
        nullable: true,
        example: '2023-05-20'
      },
      experiencia_docente: {
        type: 'integer',
        description: '0 = No, 1 = Sí',
        example: 1
      },
      informacion_personal_id: {
        type: 'integer',
        example: 10
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T12:00:00Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-06-01T12:00:00Z'
      }
    }
  }
}
