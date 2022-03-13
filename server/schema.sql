CREATE TABLE users (
  id                     SERIAL PRIMARY KEY,
  first_name             VARCHAR(30) NOT NULL,
  last_name              VARCHAR(30) NOT NULL,
  email                  VARCHAR(30) NOT NULL,
  password               VARCHAR(12) NOT NULL,
  created_at             TIMESTAMP  NOT NULL
);

CREATE TABLE stars (
    id                   SERIAL PRIMARY KEY,
    user_id              INTEGER,
    competence_id        INTEGER NOT NULL,
    title                TEXT NOT NULL,
    situation            TEXT NOT NULL,
    task                 TEXT NOT NULL,
    action               TEXT NOT NULL,
    result               TEXT NOT NULL,
    created_at           TIMESTAMP  NOT NULL,
    updated_at           TIMESTAMP  NOT NULL
);

CREATE TABLE competencies (
    id                  SERIAL PRIMARY KEY,
    name                TEXT NOT NULL
);

/* Proprity 4
CREATE TABLE examples (
    id                       SERIAL PRIMARY KEY,
    example_competence_id    INT NOT NULL,
    example_title            TEXT NOT NULL,
    example_situation        TEXT NOT NULL,
    example_task             TEXT NOT NULL,
    example_action           TEXT NOT NULL,
    example_result           TEXT NOT NULL,
);  */