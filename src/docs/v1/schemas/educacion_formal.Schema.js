export const educacionFormalSchemas = {
  EducacionFormal: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      nivel_formacion_id: {
        type: 'integer',
        example: 2
      },
      titulo: {
        type: 'string',
        example: 'Ingeniería de Sistemas'
      },
      institucion: {
        type: 'string',
        example: 'Universidad Nacional de Colombia'
      },
      numero_semestres: {
        type: 'integer',
        example: 10
      },
      fecha_inicio: {
        type: 'string',
        example: '2020-01-15'
      },
      fecha_terminacion: {
        type: 'string',
        example: '2024-06-20'
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
        example: '2025-09-10T12:34:56Z'
      },
      updated_at: {
        type: 'string',
        example: '2025-09-10T12:34:56Z'
      }
    }
  }
}
