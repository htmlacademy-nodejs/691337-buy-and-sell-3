CREATE DATABASE olx
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS offers_categories;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    pass VARCHAR (50) NOT NULL,
    avatar_name VARCHAR (50) NOT NULL
);

CREATE TABLE offers
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_date DATE,
    picture_name TEXT,
    price INTEGER NOT NULL,
    offer_type TEXT NOT NULL,
    description_text TEXT,

    author_id INTEGER,

    FOREIGN KEY (author_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR (1000) NOT NULL,
    offer_id INTEGER,
    author_id INTEGER,

    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    picture_name VARCHAR (50) NOT NULL
);

CREATE TABLE offers_categories
(
    offer_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),

    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX user_email ON users (email);
CREATE INDEX offer_title ON offers (title);
