export const hojasDeVidaSchemas = {
  HojaDeVida: {
    type: 'object',
    properties: {
      informacion_personal: {
        $ref: '#/components/schemas/InformacionPersonal'
      },
      educacion_informal: {
        type: 'array',
        items: { $ref: '#/components/schemas/EducacionInformal' }
      },
      certificaciones: {
        type: 'array',
        items: { $ref: '#/components/schemas/Certificacion' }
      },
      experiencias_laborales: {
        type: 'array',
        items: { $ref: '#/components/schemas/ExperienciaLaboral' }
      },
      informaciones_previas_contratos: {
        $ref: '#/components/schemas/InformacionPreviaContrato'
      },
    }
  }
}
