export const certificacionesSchema = {
  Certificacion: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      codigo_norma: {
        type: 'string',
        maxLength: 50,
        example: 'NOM-123'
      },
      nombre_norma: {
        type: 'string',
        maxLength: 255,
        example: 'Certificación en Seguridad Informática'
      },
      institucion: {
        type: 'string',
        maxLength: 100,
        example: 'SENA'
      },
      fecha_expedicion: {
        type: 'string',
        format: 'date',
        example: '2023-05-15'
      },
      fecha_vigencia: {
        type: 'string',
        format: 'date',
        nullable: true,
        example: '2026-05-15'
      },
      informacion_personal_id: {
        type: 'integer',
        example: 10
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-05-15T10:20:30Z'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2023-05-20T14:45:00Z'
      }
    },
    required: [
      'codigo_norma',
      'nombre_norma',
      'institucion',
      'fecha_expedicion',
      'informacion_personal_id'
    ]
  }
}
