-- SCHEMA: table_ceo

-- DROP SCHEMA IF EXISTS table_ceo ;

CREATE SCHEMA IF NOT EXISTS table_ceo
    AUTHORIZATION postgres;

COMMENT ON SCHEMA table_ceo
    IS 'Tablas de los usuarios y datos del proyecto ';


-- Crear la tabla Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear la tabla Permissions
CREATE TABLE Permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Crear la tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    authorisation VARCHAR(100),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    institution VARCHAR(255),
    group_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);

-- Crear la tabla intermedia RolePermissions
CREATE TABLE RolePermissions (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(id),
    FOREIGN KEY (permission_id) REFERENCES Permissions(id),
    UNIQUE (role_id, permission_id)
);
