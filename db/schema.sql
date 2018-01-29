DROP TABLE IF EXISTS destination;

CREATE TABLE destination (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  is_done BOOLEAN
);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_digest TEXT NOT NULL, 
firstname VARCHAR(255), 
lastname VARCHAR(255)
);