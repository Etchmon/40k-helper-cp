-- TABLES AND RELATIONS
CREATE TABLE missions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- Needs work
CREATE TABLE battlefields (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
);

CREATE TABLE factions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    title VARCHAR(50) NOT NULL
);

-- Add to schema image
CREATE TABLE faction_enhancements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    faction_id INTEGER NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
);

-- Add to schema image
CREATE TABLE faction_objectives (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    faction_id INTEGER NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    faction_id INTEGER NOT NULL,
    movement INTEGER NOT NULL,
    toughness INTEGER NOT NULL,
    save INTEGER NOT NULL,
    wounds INTEGER NOT NULL,
    leadership INTEGER NOT NULL,
    control INTEGER NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
);

CREATE TABLE weapons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_id INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    range INTEGER NOT NULL,
    attacks INTEGER NOT NULL,
    strength INTEGER NOT NULL,
    arm_pen INTEGER NOT NULL,
    damage INTEGER NOT NULL,
    bs INTEGER NOT NULL,
    ws INTEGER NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

CREATE TABLE stratagems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    faction_id INTEGER NOT NULL,
    phase VARCHAR(255) NOT NULL,
    target VARCHAR(255) NOT NULL,
    effect TEXT NOT NULL,
    cp_cost INTEGER NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
);

CREATE TABLE abilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE faction_abilities (
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    faction_id INTEGER NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
);

CREATE TABLE unit_abilities (
    unit_id INTEGER NOT NULL,
    ability_id INTEGER NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (ability_id) REFERENCES abilities(id)
);

CREATE TABLE weapon_abilities (
    weapon_id INTEGER NOT NULL,
    ability_id INTEGER NOT NULL,
    FOREIGN KEY (weapon_id) REFERENCES weapons(id),
    FOREIGN KEY (ability_id) REFERENCES abilities(id)
);

-- COPY COMMANDS

