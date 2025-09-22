export const informacionPersonalSchemas = {
  InformacionPersonal: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      documento: {
        type: 'string',
        example: '1234567890'
      },
      tipo_documentos_id: {
        type: 'integer',
        example: 2
      },
      ciudad_expedicion_id: {
        type: 'integer',
        example: 5
      },
      fecha_nacimiento: {
        type: 'string',
        example: '2000-05-20'
      },
      nombres: {
        type: 'string',
        example: 'Juan Carlos'
      },
      apellidos: {
        type: 'string',
        example: 'Pérez Gómez'
      },
      sexo: {
        type: 'integer',
        example: 1 // 1=Masculino, 2=Femenino, 3=Otro
      },
      direccion_domicilio: {
        type: 'string',
        example: 'Calle 123 #45-67'
      },
      ciudad_domicilio_id: {
        type: 'integer',
        example: 7
      },
      celular_uno: {
        type: 'string',
        example: '3001234567'
      },
      celular_dos: {
        type: 'string',
        example: '3019876543'
      },
      correo_personal: {
        type: 'string',
        example: 'juan.perez@email.com'
      },
      correo_institucional: {
        type: 'string',
        example: 'jperez@miempresa.com'
      },
      cargo_actual_id: {
        type: 'integer',
        example: 3
      },
      tiempo_cargo: {
        type: 'integer',
        example: 24 // en meses
      },
      area_id: {
        type: 'integer',
        example: 4
      },
      foto: {
        type: 'string',
        example: 'https://miapp.com/uploads/fotos/juanperez.png'
      },
      formaciones_complementarias_id: {
        type: 'integer',
        example: 6
      },
      centro_id: {
        type: 'integer',
        example: 2
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
