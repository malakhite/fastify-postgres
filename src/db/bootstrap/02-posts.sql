CREATE TABLE IF NOT EXISTS posts (
	id				uuid			NOT NULL DEFAULT gen_random_uuid(),
	slug			varchar			UNIQUE NOT NULL,
	title			varchar,
	content			text,
	author			uuid			NOT NULL REFERENCES users (id),
	tsv				tsvector,
	created_date	timestamptz		NOT NULL DEFAULT CURRENT_TIMESTAMP,
	published_date	timestamptz,
	modified_date	timestamptz,
	deleted_date	timestamptz,
	PRIMARY KEY (id)
);

CREATE FUNCTION posts_trigger() RETURNS trigger AS
$$
BEGIN
new.tsv :=
	setweight(to_tsvector('pg_catalog.english', coalesce(new.title, '')), 'A') ||
	setweight(to_tsvector('pg_catalog,english', coalesce(new.content, '')), 'D');
return new;
END
$$
LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
	ON posts FOR EACH ROW EXECUTE FUNCTION posts_trigger();

CREATE TABLE IF NOT EXISTS posts_meta_types (
	id			uuid		NOT NULL DEFAULT gen_random_uuid(),
	data		varchar		NOT NULL,
	description	varchar		NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO posts_meta_types (data, description)
VALUES
	('tweet_id', 'The id of the tweet (or first tweet of thread) that belongs to the post.'),
	('instagram_id', 'The media id of the Instagram post for this post.');

CREATE TABLE posts_meta (
	id			uuid	NOT NULL DEFAULT gen_random_uuid(),
	post_id		uuid	REFERENCES posts,
	meta_type	uuid	REFERENCES posts_meta_types,
	meta_data	text	NOT NULL,
	PRIMARY KEY (id)
);

CREATE INDEX posts_tsv_idx ON posts USING GIN (tsv);
CREATE INDEX posts_users_fk_idx ON posts (author);
CREATE INDEX posts_meta_post_fk_idx ON posts_meta (post_id);
CREATE INDEX posts_meta_meta_type_fk_idx ON posts_meta (meta_type);
