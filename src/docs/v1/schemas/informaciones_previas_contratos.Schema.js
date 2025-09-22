export const informacionesPreviasContratosSchemas = {
  InformacionPreviaContrato: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      banco: {
        type: 'string',
        example: 'Banco de Bogotá'
      },
      tipo_cuenta: {
        type: 'string',
        example: 'Ahorros'
      },
      numero_cuenta: {
        type: 'string',
        example: '1234567890'
      },
      regimenes_ivas_id: {
        type: 'integer',
        example: 2
      },
      servicios_excluidos_iva: {
        type: 'integer',
        description: '0 = No, 1 = Sí',
        example: 1
      },
      eps: {
        type: 'string',
        example: 'Sura EPS'
      },
      fondo_pensiones: {
        type: 'string',
        example: 'Protección'
      },
      informacion_personales_id: {
        type: 'integer',
        example: 15
      },
      clasificacion_persona_natural_id: {
        type: 'integer',
        example: 3
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
