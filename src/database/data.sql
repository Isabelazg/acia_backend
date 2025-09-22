-- Inserción de provincias
INSERT INTO provincias (id, nombre) VALUES
(1, 'Amazonas'), (2, 'Antioquia'), (3, 'Arauca'), (4, 'Atlántico'), (5, 'Bolívar'),
(6, 'Boyacá'), (7, 'Caldas'), (8, 'Caquetá'), (9, 'Casanare'), (10, 'Cauca'),
(11, 'Cesar'), (12, 'Chocó'), (13, 'Córdoba'), (14, 'Cundinamarca'), (15, 'Guainía'),
(16, 'Guaviare'), (17, 'Huila'), (18, 'La Guajira'), (19, 'Magdalena'), (20, 'Meta'),
(21, 'Nariño'), (22, 'Norte de Santander'), (23, 'Putumayo'), (24, 'Quindío'),
(25, 'Risaralda'), (26, 'San Andrés y Providencia'), (27, 'Santander'), (28, 'Sucre'),
(29, 'Tolima'), (30, 'Valle del Cauca'), (31, 'Vaupés'), (32, 'Vichada');

-- Inserción de ciudades
INSERT INTO ciudades (id, nombre, provincia_id) VALUES
(1, 'Leticia', 1), (2, 'Puerto Nariño', 1), (3, 'Tarapacá', 1),
(4, 'Medellín', 2), (5, 'Bello', 2), (6, 'Envigado', 2),
(7, 'Arauca', 3), (8, 'Arauquita', 3), (9, 'Cravo Norte', 3),
(10, 'Barranquilla', 4), (11, 'Soledad', 4), (12, 'Malambo', 4),
(13, 'Cartagena', 5), (14, 'Magangué', 5), (15, 'Arjona', 5),
(16, 'Bogotá D.C.', 14), (17, 'Itagüí', 2), (18, 'Rionegro', 2),
(19, 'Cali', 30), (20, 'Buenaventura', 30), (21, 'Floridablanca', 27),
(22, 'Piedecuesta', 27), (23, 'Girardot', 14), (24, 'Buga', 30),
(25, 'El Bagre', 2), (26, 'Mosquera', 14);

-- Inserción de regionales
INSERT INTO regionales (id, codigo, nombre) VALUES
(1, 'AMZ', 'Amazonas'), (2, 'ANT', 'Antioquia'), (3, 'ARA', 'Arauca'), (4, 'ATL', 'Atlántico'),
(5, 'BOL', 'Bolívar'), (6, 'BOY', 'Boyacá'), (7, 'CAL', 'Caldas'), (8, 'CAQ', 'Caquetá'),
(9, 'CAS', 'Casanare'), (10, 'CAU', 'Cauca'), (11, 'CES', 'Cesar'), (12, 'CHO', 'Chocó'),
(13, 'COR', 'Córdoba'), (14, 'CUN', 'Cundinamarca'), (15, 'GUA', 'Guaviare'), (16, 'GUL', 'Guainía'),
(17, 'HUI', 'Huila'), (18, 'LAG', 'La Guajira'), (19, 'MAG', 'Magdalena'), (20, 'MET', 'Meta'),
(21, 'NAR', 'Nariño'), (22, 'NSA', 'Norte de Santander'), (23, 'PUT', 'Putumayo'), (24, 'QUI', 'Quindío'),
(25, 'RIS', 'Risaralda'), (26, 'SAP', 'San Andrés y Providencia'), (27, 'SAN', 'Santander'),
(28, 'SUC', 'Sucre'), (29, 'TOL', 'Tolima'), (30, 'VAC', 'Valle del Cauca'), (31, 'VAU', 'Vaupés'),
(32, 'VIC', 'Vichada'), (33, 'D_C', 'Distrito Capital');

-- Inserción de supervisores
INSERT INTO supervisores (documento, nombres, apellidos, sexo, correo, cargo) VALUES
('10203041', 'Carlos', 'García Pérez', 1, 'carlos.garcia@empresa.com', 'Supervisor de Operaciones'),
('10203042', 'Ana', 'Martínez López', 2, 'ana.martinez@empresa.com', 'Supervisora de Calidad'),
('10203043', 'Luis', 'Rodríguez Sánchez', 1, 'luis.rodriguez@empresa.com', 'Jefe de Turno'),
('10203044', 'María', 'González Fernández', 2, 'maria.gonzalez@empresa.com', 'Coordinadora de Proyectos'),
('10203045', 'Javier', 'Gómez Ruiz', 1, 'javier.gomez@empresa.com', 'Supervisor de Logística'),
('10203046', 'Laura', 'Hernández Díaz', 2, 'laura.hernandez@empresa.com', 'Líder de Equipo de Producción'),
('10203047', 'Miguel Ángel', 'Moreno Jiménez', 1, 'miguel.moreno@empresa.com', 'Supervisor de Mantenimiento'),
('10203048', 'Sofía', 'Álvarez Romero', 2, 'sofia.alvarez@empresa.com', 'Supervisora de Seguridad e Higiene');

-- Inserción de centros
INSERT INTO centros (codigo, nombre, direccion, estado, ciudad_id, regional_id, supervisores_id) VALUES
('9201', 'Centro de Diseño y Metrología', 'Carrera 30 # 17B-25 Sur, Bogotá D.C.', '1', 16, 33, 5),
('9203', 'Centro de Electricidad, Electrónica y Telecomunicaciones', 'Av. Cra 30 # 1-04, Bogotá D.C.', '1', 16, 33, 2),
('9208', 'Centro de Gestión de Mercados, Logística y T.I.', 'Calle 52 # 13-65, Bogotá D.C.', '1', 16, 33, 1),
('9401', 'Centro Tecnológico del Mobiliario', 'Cl. 76 # 48-16, Itagüí, Antioquia', '1', 17, 2, 3),
('9301', 'Centro de Diseño Tecnológico Industrial', 'Cl. 52 # 2BIS-15, Cali, Valle del Cauca', '1', 19, 30, 1),
('9101', 'Centro Nacional Colombo Alemán', 'Calle 30 # 3E-164, Barranquilla, Atlántico', '1', 10, 4, 7);

INSERT INTO roles (nombre, descripcion, estado) VALUES
('SuperAdministrador', 'Rol con todos los permisos y acceso total al sistema', TRUE),
('Administrador', 'Rol para gestión de procesos y personal a cargo', TRUE),
('Usuario', 'Rol con permisos de consulta y tareas básicas', TRUE);

INSERT INTO permisos (nombre, descripcion, estado) VALUES
('gestionar_usuarios', 'Permite gestión completa del módulo de usuarios', TRUE),
('gestionar_roles', 'Permite gestión completa del módulo de roles', TRUE),
('gestionar_permisos', 'Permite gestión completa del módulo de permisos', TRUE),
('gestionar_centros', 'Permite gestión completa del módulo de centros', TRUE),
('gestionar_regionales', 'Permite gestión completa del módulo de regionales', TRUE),
('gestionar_provincias', 'Permite gestión completa del módulo de provincias', TRUE),
('gestionar_ciudades', 'Permite gestión completa del módulo de ciudades', TRUE),
('gestionar_areas', 'Permite gestión completa del módulo de áreas', TRUE),
('gestionar_dependencias', 'Permite gestión completa del módulo de dependencias', TRUE),
('gestionar_coordinadores', 'Permite gestión completa del módulo de coordinadores', TRUE),
('gestionar_supervisores', 'Permite gestión completa del módulo de supervisores', TRUE),
('gestionar_cargos', 'Permite gestión completa del módulo de cargos', TRUE),
('gestionar_cdps', 'Permite gestión completa del módulo de CDPs', TRUE),
('gestionar_rubros', 'Permite gestión completa del módulo de rubros', TRUE),
('gestionar_codigo_rubros', 'Permite gestión completa del módulo de código rubros', TRUE),
('gestionar_fuentes_recursos', 'Permite gestión completa del módulo de fuentes de recursos', TRUE),
('gestionar_cuenta', 'Permite gestión de la cuenta personal del usuario', TRUE),
('ver_dashboard', 'Permite acceso al dashboard principal del sistema', TRUE),
('gestionar_ordenadores', 'Permite gestión completa del modulo de ordenadores ', TRUE),
('gestionar_resoluciones', 'Permite gestión completa del modulo de resoluciones ', TRUE),
('gestionar_grupo_mixto', 'Permite gestión completa del modulo de grupo mixto', TRUE),
('gestionar_autorizaciones', 'Permite gestión completa del modulo de autorizaciones', TRUE),
('gestionar_contratos', 'Permite gestión completa del modulo de contratos', TRUE),
('gestionar_obligaciones', 'Permite gestión completa del modulo de obligaciones', TRUE),
('gestionar_tipo_contratacion', 'Permite gestión completa del modulo de tipo de contratación', TRUE),
('gestionar_necesidad_contratacion', 'Permite gestión completa del modulo de necesidad de contratación', TRUE),
('gestionar_proyecto_autorizacion', 'Permite gestión completa del modulo de proyecto de autorización', TRUE),
('gestionar_estado_formaciones', 'Permite gestión completa del modulo de estado de formaciones', TRUE),
('gestionar_nivel_formacion', 'Permite gestión completa del modulo de nivel de formación', TRUE),
('gestionar_informacion_personal', 'Permite gestión completa del modulo de información personal', TRUE),
('gestionar_educacion_formales', 'Permite gestión completa del modulo de educación formal', TRUE),
('gestionar_formaciones_complementarias', 'Permite gestión completa del modulo de formaciones complementarias', TRUE),
('gestionar_hoja_de_vida', 'Permite gestión completa del modulo de hoja de vida', TRUE);

INSERT INTO usuarios (documento, nombres, apellidos, nombre_usuario, correo, telefono, contrasena, estado, rol_id) VALUES
('123456789', 'Carlos', 'Pérez', 'cperez', 'cperez@sena.edu.co', '3001234567', '$2b$12$8KzE5mE1xLjKQeKH8p7DoO41j7RC5ikKt6xMuyaJ0nKbDkCkhvwXS', TRUE, 1),
('987654321', 'María', 'Gómez', 'mgomez', 'mgomez@sena.edu.co', '3009876543', '$2b$12$8KzE5mE1xLjKQeKH8p7DoO41j7RC5ikKt6xMuyaJ0nKbDkCkhvwXS', TRUE, 2),
('456123789', 'Andrés', 'Rodríguez', 'arodriguez', 'arodriguez@sena.edu.co', '3014567890', '$2b$12$8KzE5mE1xLjKQeKH8p7DoO41j7RC5ikKt6xMuyaJ0nKbDkCkhvwXS', FALSE, 2),
('321654987', 'Laura', 'Martínez', 'lmartinez', 'lmartinez@sena.edu.co', '3023216549', '$2b$12$8KzE5mE1xLjKQeKH8p7DoO41j7RC5ikKt6xMuyaJ0nKbDkCkhvwXS', TRUE, 3);

INSERT INTO rol_permiso (rol_id, permiso_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), 
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10), 
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15), 
(1, 16), (1, 17), (1, 18), (1, 19), 
(1, 20),  (1, 21), (1, 22), (1, 23), (1, 24),
(1, 25), (1, 26), (1, 27), (1, 28),  
(1, 29), (1, 30), (1, 31), (1, 32), (1, 33), 

(2, 1), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16),
(2, 17), (2, 18), (2, 19), (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (2, 25), 
(2, 26), (2, 27), (2, 28), (2, 29), (2, 30), (2, 31), (2, 32), (2, 33),

(3, 8), (3, 9);
INSERT INTO centro_usuario (centro_id, usuario_id) VALUES (1, 1), (1, 2), (2, 3), (2, 4), (3, 1), (3, 3);

INSERT INTO cargos (nombre, estado) VALUES
('Instructor Técnico', 1), ('Instructor Especializado', 1), ('Coordinador Académico', 1),
('Coordinador Administrativo', 1), ('Subdirector de Centro', 1), ('Director de Centro', 1),
('Profesional de Apoyo', 1), ('Técnico Administrativo', 1), ('Técnico de Sistemas', 1);
INSERT INTO cargo_centro (cargo_id, centro_id) VALUES (1, 1), (3, 1), (6, 1), (2, 2), (4, 2), (5, 2), (1, 3), (9, 3);

INSERT INTO areas (nombre) VALUES ('Ingeniería, Manufactura y Construcción'), ('Ciencias Sociales y del Comportamiento'), ('Tecnologías de la Información y las Comunicaciones');
INSERT INTO ordenadores (documento, nombres, apellidos, lugar_expedicion_id, lugar_domicilio_id, sexo, correo, telefono, estado, cargo_id) VALUES
('52341567', 'Ana Patricia', 'Rodríguez Morales', 16, 16, 2, 'ana.rodriguez@sena.edu.co', '3001234567', 1, 6),
('80456789', 'Carlos Eduardo', 'Gómez Hernández', 10, 10, 1, 'carlos.gomez@sena.edu.co', '3009876543', 1, 5),
('63789012', 'María Fernanda', 'López Castillo', 19, 19, 2, 'maria.lopez@sena.edu.co', '3012345678', 1, 3),
('41234567', 'Luis Alberto', 'Martínez Ruiz', 13, 13, 1, 'luis.martinez@sena.edu.co', '3023456789', 0, 4);


INSERT INTO coordinadores (nombre, descripcion, centros_id) VALUES
('Coordinación Administrativa', 'Coordinación administrativa del centro', 1),
('Coordinación Académica', 'Coordinación académica del centro', 4);

-- Flujo de contratación (sin cambios desde aquí, pero ahora funcionará)
INSERT INTO tipo_documento (nombre) VALUES ('Cédula de Ciudadanía'), ('Tarjeta de Identidad'), ('Cédula de Extranjería');
INSERT INTO estado_formaciones (nombre) VALUES ('Finalizado'), ('En curso'), ('Abandonado');
INSERT INTO nivel_formacion (nombre) VALUES ('Bachillerato'), ('Técnico'), ('Tecnólogo'), ('Profesional'), ('Especialización'), ('Maestría');
INSERT INTO formaciones_complementarias (informatica_basica, tics, sve, formacion_pedagogica, formacion_competencias, formacion_proyectos) VALUES (1, 1, 0, 1, 1, 0);
INSERT INTO informacion_personales (documento, tipo_documentos_id, ciudad_expedicion_id, fecha_nacimiento, nombres, apellidos, sexo, direccion_domicilio, ciudad_domicilio_id, celular_uno, correo_personal, cargo_actual_id, area_id, formaciones_complementarias_id, centro_id)
VALUES ('52341567', 1, 16, '1985-05-15', 'Ana Patricia', 'Rodríguez Morales', 2, 'Calle 100 # 20-30', 16, '3001234567', 'ana.p.rodriguez.m@email.com', 6, 1, 1, 1);
INSERT INTO educacion_formales (nivel_formacion_id, titulo, institucion, fecha_terminacion, estado_id, informacion_personal_id)
VALUES (4, 'Administradora de Empresas', 'Universidad Nacional de Colombia', '2008-12-10', 1, 1),
       (6, 'Maestría en Gerencia de Proyectos', 'Universidad de los Andes', '2012-06-20', 1, 1);
INSERT INTO dependencias (codigo, nombre) VALUES ('DEP01-ADM', 'Coordinación Administrativa'), ('DEP02-ACAD', 'Coordinación Académica');
INSERT INTO centro_dependencia (centro_id, dependencia_id) VALUES (1, 1), (1, 2);
INSERT INTO tipo_contratacion (nombre) VALUES ('Prestación de Servicios'), ('Contrato de Aprendizaje'), ('Obra o Labor');
INSERT INTO necesidad_contratacion (nombre) VALUES ('Apoyo a la gestión'), ('Formación profesional integral'), ('Reemplazo por licencia');

INSERT INTO coordinador_grupo_mixto (documento, nombres, apellidos, correo, telefono)
VALUES ('11223344', 'Elena', 'Ramírez', 'elena.ramirez@sena.edu.co', '3209876543');

-- Crear una fuente de recurso de prueba requerida por la tabla cdps
INSERT INTO fuente_recursos (nombre, descripcion) VALUES ('Fuente Principal', 'Fuente de recursos para pruebas'),
('Propios', 'Fuente de recursos para pruebas'),
('Nación', 'Fuente de recursos para pruebas');

insert into codigo_rubros(codigo, dependencia_id) values("C-3603-1300-20-20305C-3603025-02 ADQUIS. DE BYS - S", 1),
("C-3605-1300-3-40402A-3605007-02", 1),
("C-3603-1300-20-20305C-3603025-02", 1);

insert into rubros(descripcion, codigo_rubro_id) values("rubro 1", 1),
("rubro 2", 2),
("rubro 3", 3);

INSERT INTO cdps (codigo, descripcion, fecha, valor, vigencia, quien_expide_id, fuente_recurso_id, centro_id)
VALUES ('CDP-2024-001', 'Recursos para contratación de apoyo a la gestión', '2024-03-15', 50000000.00, '2024', 1, 1, 1);

-- Insertar autorización adaptada al esquema actual (numero_linea_PAA, numero_autorizacion, fecha, vigencia, tipo_contratacion_id, ordenador_id, objeto, cantidad_autorizados, cdp_id, necesidad_contratacion_id, centro_id, descripcion, programa_acreditacion)
INSERT INTO autorizaciones (numero_linea_PAA, numero_autorizacion, fecha, vigencia, tipo_contratacion_id, ordenador_id, objeto, cantidad_autorizados, cdp_id, necesidad_contratacion_id, centro_id, descripcion, programa_acreditacion)
VALUES ('PAA-001', 'AUT-2024-050', '2024-04-01', '2024', 1, 4, 'Prestar servicios de apoyo a la gestión en la coordinación administrativa del Centro de Diseño y Metrología', 1, 1, 1, 1, '', NULL);

-- Separar obligaciones en filas independientes en lugar de concatenarlas en un solo campo
INSERT INTO obligaciones (numero_orden, nombre) VALUES
('ORD-001-1', 'Elaborar informes mensuales de gestión'),
('ORD-001-2', 'Apoyar en la supervisión de contratos'),
('ORD-001-3', 'Realizar seguimiento a PQR');

-- Vincular las tres obligaciones a la autorización (autorizacion_id = 1)
INSERT INTO autorizacion_obligacion (autorizacion_id, obligacion_id) VALUES (1, 1), (1, 2), (1, 3);

-- Insertar contrato consistente con el esquema actual. Añadimos centro_id, informacion_personal_id y autorizacion_id.
INSERT INTO contratos (supervisor_id, centro_id, informacion_personal_id, autorizacion_id, coordinador_id, acta_seleccion, fecha_acta_seleccion, tiene_poliza, tipo_ejecucion_contrato, valor_mensual, fecha_estimada_inicio, fecha_estimada_terminacion, lugar_ejecucion, domicilio_contractual, tiene_plan_pagos)
VALUES (2, 1, 1, 1, 1, 'AS-2024-123', '2024-04-15', 0, 'Meses', NULL, '2024-05-01', '2024-11-01', 'Centro de Diseño y Metrología', 'Carrera 30 # 17B-25 Sur, Bogotá D.C.', 1);