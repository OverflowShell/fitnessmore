-- =============================================
-- Crear base de datos
-- =============================================
DROP DATABASE IF EXISTS fitnessdb;
CREATE DATABASE fitnessdb
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE fitnessdb;

-- =============================================
-- Tabla de USUARIOS
-- =============================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    edad INT,
    peso DECIMAL(5,2),
    altura DECIMAL(4,2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Tabla de HÁBITOS
-- =============================================
CREATE TABLE habitos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    unidad VARCHAR(20),
    objetivo DECIMAL(8,2),
    frecuencia ENUM('diario','semanal','mensual') DEFAULT 'diario',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
-- Tabla de METAS
-- =============================================
CREATE TABLE metas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
-- Tabla de REGISTROS/PROGRESO
-- =============================================
CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habito_id INT NOT NULL,
    fecha DATE NOT NULL,
    tipo VARCHAR(50),
    valor DECIMAL(8,2),
    cantidad INT,
    nota TEXT,
    FOREIGN KEY (habito_id) REFERENCES habitos(id) ON DELETE CASCADE
);

-- =============================================
-- DATOS DE PRUEBA
-- =============================================

-- Usuarios (password: password123 - hash BCrypt)
INSERT INTO usuarios (nombre, email, password, edad, peso, altura) VALUES
('Juan Pérez', 'juan@example.com', '$2a$10$u2hIcXh5Ul1v4oJOTupWQO2w9qAFvXcQmU.Ws/ZUj8gxfP1Vh7TWC', 25, 70.5, 1.75),
('María García', 'maria@example.com', '$2a$10$u2hIcXh5Ul1v4oJOTupWQO2w9qAFvXcQmU.Ws/ZUj8gxfP1Vh7TWC', 30, 65.2, 1.68);

-- Hábitos
INSERT INTO habitos (usuario_id, nombre, descripcion, categoria, unidad, objetivo, frecuencia) VALUES
(1, 'Beber agua', 'Beber 2 litros de agua al día', 'hidratacion', 'ml', 2000.00, 'diario'),
(1, 'Ejercicio cardio', '30 minutos de ejercicio cardiovascular', 'ejercicio', 'minutos', 30.00, 'diario'),
(1, 'Dormir bien', 'Dormir 8 horas cada noche', 'sueño', 'horas', 8.00, 'diario'),
(2, 'Meditación', 'Meditar 15 minutos al día', 'mental', 'minutos', 15.00, 'diario'),
(2, 'Leer', 'Leer 20 páginas diarias', 'aprendizaje', 'paginas', 20.00, 'diario');

-- Metas
INSERT INTO metas (usuario_id, nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES
(1, 'Bajar 5kg', 'Perder 5kg en 3 meses', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 'EN_PROGRESO'),
(1, 'Correr 10km', 'Entrenar para correr 10km sin parar', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 'PENDIENTE'),
(2, 'Meditación constante', 'Meditar todos los días durante 30 días', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 'EN_PROGRESO');

-- Registros/Progreso
INSERT INTO registros (habito_id, fecha, tipo, valor, cantidad, nota) VALUES
(1, CURDATE(), 'agua', 1500.00, 1, 'Casi llego a la meta'),
(1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'agua', 2000.00, 1, 'Meta cumplida'),
(2, CURDATE(), 'cardio', 25.00, 1, 'Corrí en la cinta'),
(2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'cardio', 30.00, 1, 'Entrenamiento completo'),
(3, CURDATE(), 'sueño', 7.5, 1, 'Buen descanso'),
(4, CURDATE(), 'meditacion', 15.00, 1, 'Sesión matutina'),
(5, CURDATE(), 'lectura', 25.00, 1, 'Libro de desarrollo personal');

-- =============================================
-- VISTAS ÚTILES
-- =============================================

-- Vista para ver progreso de hábitos
CREATE VIEW vista_progreso_habitos AS
SELECT 
    u.nombre as usuario,
    h.nombre as habito,
    h.categoria,
    h.unidad,
    h.objetivo,
    r.fecha,
    r.valor,
    r.cantidad,
    r.nota
FROM registros r
JOIN habitos h ON r.habito_id = h.id
JOIN usuarios u ON h.usuario_id = u.id;

-- Vista para resumen de metas
CREATE VIEW vista_resumen_metas AS
SELECT 
    u.nombre as usuario,
    m.nombre as meta,
    m.estado,
    m.fecha_inicio,
    m.fecha_fin,
    DATEDIFF(m.fecha_fin, CURDATE()) as dias_restantes
FROM metas m
JOIN usuarios u ON m.usuario_id = u.id;

-- =============================================
-- CONSULTAS DE EJEMPLO
-- =============================================

-- Ver todos los hábitos con usuarios
SELECT '=== HÁBITOS ===' as '';
SELECT u.nombre, h.nombre, h.categoria, h.unidad, h.objetivo 
FROM habitos h 
JOIN usuarios u ON h.usuario_id = u.id;

-- Ver progreso reciente
SELECT '=== PROGRESO RECIENTE ===' as '';
SELECT * FROM vista_progreso_habitos 
ORDER BY fecha DESC 
LIMIT 10;

-- Ver estado de metas
SELECT '=== ESTADO DE METAS ===' as '';
SELECT * FROM vista_resumen_metas;

-- =============================================
-- ÍNDICES PARA MEJOR PERFORMANCE
-- =============================================
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_habitos_usuario ON habitos(usuario_id);
CREATE INDEX idx_metas_usuario ON metas(usuario_id);
CREATE INDEX idx_registros_habito_fecha ON registros(habito_id, fecha);
CREATE INDEX idx_registros_fecha ON registros(fecha);

SELECT '=== BASE DE DATOS FITNESSDB CREADA EXITOSAMENTE ===' as '';