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
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pass TEXT NOT NULL,
    avatar_name TEXT NOT NULL
);

CREATE TABLE offers
(
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_date DATE,
    picture_name TEXT,
    price BIGINT NOT NULL,
    offer_type TEXT NOT NULL,
    description_text TEXT,

    author_id BIGINT,

    FOREIGN KEY (author_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments
(
    id BIGSERIAL PRIMARY KEY,
    comment_text TEXT NOT NULL,
    offer_id BIGINT,
    author_id BIGINT,

    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE categories
(
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    picture_name TEXT NOT NULL
);

CREATE TABLE offers_categories
(
    offer_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),

    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE INDEX offer_title ON offers (title);
