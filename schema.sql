DROP TABLE IF EXISTS event_role CASCADE;
DROP TABLE IF EXISTS user_event CASCADE;
DROP TABLE IF EXISTS charisma_applicant_data CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS docs CASCADE;
DROP TABLE IF EXISTS applicant_data CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS charisma CASCADE;
DROP TABLE IF EXISTS event_type CASCADE;
DROP TABLE IF EXISTS council_role CASCADE;
DROP TABLE IF EXISTS headquarter CASCADE;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE headquarter (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) UNIQUE NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE council_role (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE event_type (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE charisma (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charisma VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE "user" (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    national_id VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    f_lastname VARCHAR(100) NOT NULL,
    s_lastname VARCHAR(100),
    dob DATE NOT NULL,
    phone VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    headquarter_uuid UUID NOT NULL REFERENCES headquarter(uuid),
    council_role_uuid UUID UNIQUE REFERENCES council_role(uuid)
);

CREATE TABLE applicant_data (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_start DATE NOT NULL,
    date_end DATE,
    status VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    user_uuid UUID NOT NULL REFERENCES "user"(uuid)
);

CREATE TABLE docs (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path VARCHAR(500) UNIQUE NOT NULL,
    user_uuid UUID NOT NULL REFERENCES "user"(uuid)
);

CREATE TABLE event (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    headquarter_uuid UUID NOT NULL REFERENCES headquarter(uuid),
    event_type_uuid UUID NOT NULL REFERENCES event_type(uuid),
    applicant_meeting BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE charisma_applicant_data (
    charisma_uuid UUID NOT NULL REFERENCES charisma(uuid),
    applicant_data_uuid UUID NOT NULL REFERENCES applicant_data(uuid),
    PRIMARY KEY (charisma_uuid, applicant_data_uuid)
);

CREATE TABLE event_role (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(100) NOT NULL
);

CREATE TABLE user_event (
    user_uuid UUID NOT NULL REFERENCES "user"(uuid),
    event_uuid UUID NOT NULL REFERENCES event(uuid),
    event_role_uuid UUID NOT NULL REFERENCES event_role(uuid),
    PRIMARY KEY (user_uuid, event_uuid)
);
