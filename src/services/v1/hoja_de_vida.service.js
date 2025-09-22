import db from "../../models/index.js";
import sequelize from "../../config/db.config.js";

/**
 * 🔹 Servicio para guardar toda la información completa
 */
export const storeInformacionCompletaService = async (data) => {
  const t = await sequelize.transaction();

  try {
    // 1. Guardar información personal
    const infoPersonal = await db.informacion_personal.create(data.informacion_personal, { transaction: t });
    // 🔹 CORREGIDO: Se incluye el modelo anidado 'formaciones_complementarias' para que Sequelize lo cree junto.
    const personaId = infoPersonal.id;

    // 2. Guardar información previa al contrato (solo el primer elemento del array)
    await db.informacion_previa_contrato.create({
      ...data.informacion_previa_contrato[0],
      informacion_personales_id: personaId,
      // 🔹 CORREGIDO: El nombre de la clave foránea es 'informacion_personal_id' (singular).
      informacion_personal_id: personaId,
    }, { transaction: t });

    // 3. Guardar educación formal
    for (const eduFormal of data.educacion_formal) {
      await db.educacion_formal.create({
        ...eduFormal,
        informacion_personal_id: personaId,
      }, { transaction: t });
    }

    // 4. Guardar educación informal
    for (const eduInformal of data.educacion_informal) {
      await db.educacion_informal.create({
        ...eduInformal,
        informacion_personal_id: personaId,
      }, { transaction: t });
    }

    // 5. Guardar certificaciones
    for (const cert of data.certificaciones) {
      await db.certificacion.create({
        ...cert,
        persona_id: personaId,
        // 🔹 CORREGIDO: Se usa 'informacion_personal_id' como lo espera la base de datos.
        informacion_personal_id: personaId,
      }, { transaction: t });
    }

    // 6. Guardar experiencia laboral
    for (const exp of data.experiencia_laboral) {
      await db.experiencia_laboral.create({
        ...exp,
        informacion_personal_id: personaId,
      }, { transaction: t });
    }

    await t.commit();
    return { success: true, id: personaId };

  } catch (error) {
    await t.rollback();
    console.error("❌ Sequelize Validation Error:", error.errors || error);
    throw error;
  }
};

/**
 * 🔹 Servicio para listar información completa con paginación
 */
export const getListpageinformacion_completaService = async (query) => {
  const {
    documento,
    nombres,
    apellidos,
    search,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10,
  } = query;

  const where = {};
  if (documento) where.documento = documento;
  if (nombres) where.nombres = { [db.Sequelize.Op.like]: `%${nombres}%` };
  if (apellidos) where.apellidos = { [db.Sequelize.Op.like]: `%${apellidos}%` };

  if (search) {
    where[db.Sequelize.Op.or] = [
      { documento: { [db.Sequelize.Op.like]: `%${search}%` } },
      { nombres: { [db.Sequelize.Op.like]: `%${search}%` } },
      { apellidos: { [db.Sequelize.Op.like]: `%${search}%` } },
    ];
  }

  // Asegurar valores por defecto y tipos correctos para paginación
  const parsedLimit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const parsedPage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (parsedPage - 1) * parsedLimit;

  // Normalizar sortBy: aceptar valores cualificados como 'informacion_personal.created_at'
  const rawSort = typeof sortBy === 'string' ? sortBy : 'id';
  const sortKey = rawSort.includes('.') ? rawSort.split('.').pop() : rawSort;

  const validSortColumns = [
    "id",
    "documento",
    "nombres",
    "apellidos",
    "created_at",
  ];
  const sortColumn = validSortColumns.includes(sortKey) ? sortKey : "id";
  const sortOrder = typeof order === 'string' && order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  try {
    const { rows, count } = await db.informacion_personal.findAndCountAll({
      where,
      include: [
        {
          model: db.tipo_documento,
          as: "tipo_documento",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen tipo de documento.
        },
        {
          model: db.Ciudad,
          as: "ciudad_expedicion",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen ciudad de expedición.
        },
        {
          model: db.Ciudad,
          as: "ciudad_domicilio",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen ciudad de domicilio.
        },
        {
          model: db.Cargo,
          as: "cargo_actual",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen cargo.
        },
        {
          model: db.Area,
          as: "area",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen área.
        },
        {
          model: db.Centro,
          as: "centro",
          attributes: ["id", "nombre"],
          required: false, // ¡CLAVE! Evita que desaparezcan registros si no tienen centro.
        },
      ],
      order: [
        [sortColumn, sortOrder]
      ],
      limit: parsedLimit,
      offset: offset,
      attributes: [
        "id",
        "documento",
        "fecha_nacimiento",
        "nombres",
        "apellidos",
        "sexo",
        "direccion_domicilio",
        "celular_uno",
        "celular_dos",
        "correo_personal",
        "correo_institucional",
        "tiempo_cargo",
        "foto",
        "created_at",
        "updated_at",
      ],
    });

    return { data: rows, count };
  } catch (err) {
    // Loguear parámetros y stack para facilitar diagnóstico desde los logs del servidor
    console.error("Error en getListpageinformacion_completaService -> params:", {
      documento,
      nombres,
      apellidos,
      search,
      sortBy,
      order,
      page,
      limit,
    });
    console.error(err && err.stack ? err.stack : err);
    throw err;
  }
};


/**
 * 🔹 Servicio para listar SOLO información personal
 */
export const getListinformacion_completaService = async () => {
  const { rows, count } = await db.informacion_personal.findAndCountAll({
    order: [
      // Al usar ['id', 'ASC'], evitas que la base de datos interprete `idid`
      ['id', 'ASC']
    ],
    attributes: [
      "id",
      "documento",
      "tipo_documentos_id",
      "ciudad_expedicion_id",
      "fecha_nacimiento",
      "nombres",
      "apellidos",
      "sexo",
      "direccion_domicilio",
      "ciudad_domicilio_id",
      "celular_uno",
      "celular_dos",
      "correo_personal",
      "correo_institucional",
      "cargo_actual_id",
      "tiempo_cargo",
      "area_id",
      "foto",
      "centro_id",
      "created_at",
      "updated_at",
    ],
  });

  return { data: rows, count };
};

/**
 * 🔹 Servicio para obtener la información completa de un usuario
 */
export const obtenerInformacionCompletaService = async (usuarioId) => {
  return await db.informacion_personal.findOne({
    where: { id: usuarioId },
    include: [
      { model: db.educacion_formal, as: "educacionFormal" },
      { model: db.educacion_informal, as: "educacionInformal" },
      { model: db.certificacion, as: "certificaciones" },
      { model: db.experiencia_laboral, as: "experienciaLaboral" },
      { model: db.informacion_previa_contrato, as: "informacionPreviaContrato" },
    ],
  });
};
