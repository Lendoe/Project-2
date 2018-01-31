\c destination_list

DROP TABLE IF EXISTS destination CASCADE;

CREATE TABLE destination (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  population VARCHAR(255),
  capital VARCHAR(255),
  flag_url VARCHAR(255)
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password_digest TEXT NOT NULL,
counter INTEGER
);