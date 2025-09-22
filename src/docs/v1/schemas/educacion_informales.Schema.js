export const educacionInformalSchemas = {
  EducacionInformal: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      tipo_formacion_id: {   // 🔹 Cambiado
        type: 'integer',
        example: 2
      },
      titulo: {   // 🔹 Nuevo campo
        type: 'string',
        example: 'Diplomado en Gestión de Proyectos'
      },
      institucion: {
        type: 'string',
        example: 'SENA'
      },
      fecha_inicio: {
        type: 'string',
        format: 'date',
        example: '2023-01-10'
      },
      fecha_terminacion: {
        type: 'string',
        format: 'date',
        example: '2023-06-15'
      },
      intensidad_horaria: {
        type: 'integer',
        example: 120
      },
      estado_id: {
        type: 'integer',
        example: 1
      },
      informacion_personal_id: {
        type: 'integer',
        example: 5
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T10:00:00Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-15T15:30:00Z'
      }
    }
  }
}
