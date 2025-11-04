



-- Tabla central para la autenticación y roles de todos los usuarios del sistema.
-- NOTA: Se usa SERIAL en lugar de AUTO_INCREMENT para compatibilidad con PostgreSQL.
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    hash_contrasena VARCHAR(255) NOT NULL, -- Guardar siempre contraseñas hasheadas.
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('paciente', 'doctor', 'administrador')), -- Usar VARCHAR y CHECK en lugar de ENUM
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Se actualiza desde la aplicación.
);

-- Tabla para las especialidades médicas.
CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla con la información detallada de los pacientes.
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('Masculino', 'Femenino', 'Otro')),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla con la información detallada de los doctores.
CREATE TABLE doctores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad_id INT,
    numero_licencia VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id) ON DELETE SET NULL
);

-- Tabla con la información de los administradores (recepcionistas, gerentes, etc.).
CREATE TABLE administradores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    puesto VARCHAR(100), -- Ej: 'Recepcionista', 'Admin de Sistemas'
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla para gestionar las citas médicas.
-- NOTA: Se usa TIMESTAMP en lugar de DATETIME para PostgreSQL.
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL,
    doctor_id INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    motivo VARCHAR(255),
    estado VARCHAR(20) NOT NULL DEFAULT 'Programada' CHECK (estado IN ('Programada', 'Confirmada', 'Cancelada', 'Completada')),
    creada_por_usuario_id INT, -- Quién agendó la cita (un admin o el propio paciente)
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctores(id) ON DELETE CASCADE,
    FOREIGN KEY (creada_por_usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla para el historial clínico asociado a cada cita completada.
CREATE TABLE historial_clinico (
    id SERIAL PRIMARY KEY,
    cita_id INT NOT NULL UNIQUE, -- Cada entrada de historial corresponde a una única cita.
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    notas_doctor TEXT,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE
);

DROP TABLE usuarios;
ALTER TABLE pacientes RENAME COLUMN id_usuario_id TO id_usuario;

-- Para doctores
ALTER TABLE doctores ADD COLUMN id_usuario integer;
ALTER TABLE doctores ADD CONSTRAINT doctores_id_usuario_fk 
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE;

-- Para administradores  
ALTER TABLE administradores ADD COLUMN id_usuario integer;
ALTER TABLE administradores ADD CONSTRAINT administradores_id_usuario_fk 
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE;

ALTER TABLE citas DROP CONSTRAINT citas_estado_check;
ALTER TABLE citas ADD CONSTRAINT citas_estado_check 
CHECK (estado IN ('programada', 'confirmada', 'cancelada', 'completada', 'pendiente'));

Select * From Citas;