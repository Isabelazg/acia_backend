export const registrosPresupuestalesSchemas = {
  RegistroPresupuestal: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      numero_proceso_secop: {
        type: 'string',
        example: 'SECOP-2025-001'
      },
      link_proceso_secop: {
        type: 'string',
        nullable: true,
        example: 'https://www.secop.gov.co/SECOP/SECOP-2025-001'
      },
      contratos_id: {
        type: 'integer',
        example: 3
      },
      created_at: {
        type: 'string',
        example: '2025-09-16T10:30:00Z'
      },
      updated_at: {
        type: 'string',
        example: '2025-09-16T10:30:00Z'
      }
    }
  }
}
