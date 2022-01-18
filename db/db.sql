--
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

--
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(80) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOLEAN NULL,
    session_token VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

--
DROP TABLE IF EXISTS user_has_roles CASCADE;

CREATE TABLE user_has_roles (
    id_user BIGSERIAL,
    id_rol BIGSERIAL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_rol)
);

--
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

--
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,0) DEFAULT 0,
    image1 VARCHAR(255) NULL,
    image2 VARCHAR(255) NULL,
    image3 VARCHAR(255) NULL,
    id_category BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);