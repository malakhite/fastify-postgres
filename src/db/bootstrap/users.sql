CREATE TABLE IF NOT EXISTS users_roles (
	id					uuid		NOT NULL DEFAULT gen_random_uuid(),
	role_name			varchar		UNIQUE NOT NULL,
	role_description	varchar		NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO users_roles (role_name, role_description)
VALUES
	('owner', 'The primary user of the system.'),
	('admin', 'A user that can do anything except mess with the owner.'),
	('guest', 'The default role. Can only view.');

CREATE OR REPLACE FUNCTION guest_role() RETURNS uuid
AS
$$
SELECT id FROM users_roles WHERE role_name = 'guest';
$$
LANGUAGE sql;

CREATE TABLE IF NOT EXISTS users (
	id				uuid			NOT NULL DEFAULT gen_random_uuid(),
	email			varchar			UNIQUE,
	name			varchar			NOT NULL,
	password		varchar			NOT NULL,
	role			uuid			REFERENCES users_roles DEFAULT guest_role(),
	active			boolean			NOT NULL DEFAULT true,
	created_date	timestamptz		NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modified_date	timestamptz,
	deleted_date	timestamptz,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users_meta_types (
	id			uuid		NOT NULL DEFAULT gen_random_uuid(),
	data		varchar		NOT NULL,
	description	varchar		NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO users_meta_types (data, description)
VALUES
	('homepage', 'An arbitrary FQDN for a user''s homepage'),
	('twitter', 'A user''s twitter handle');

CREATE TABLE IF NOT EXISTS users_meta (
	id			uuid	NOT NULL DEFAULT gen_random_uuid(),
	user_id		uuid	REFERENCES users,
	meta_type	uuid	REFERENCES users_meta_types,
	meta_data	text	NOT NULL,
	PRIMARY KEY (id)
);

CREATE INDEX users_active_idx ON users (active);
CREATE INDEX users_role_fk_idx ON users (role);
CREATE INDEX users_meta_user_fk_idx ON users_meta (user_id);
CREATE INDEX users_meta_meta_data_fk_idx ON users_meta (meta_type);
