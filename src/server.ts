import fastify from 'fastify';
import autoLoad from 'fastify-autoload';
import fastifyPostgres from 'fastify-postgres';
import { join } from 'path';
import { ClientConfig } from 'pg';

const pgOptions: ClientConfig = {
	database: process.env.POSTGRES_DB,
	host: process.env.POSTGRES_HOST || 'localhost',
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT
		? Number.parseInt(process.env.POSTGRES_PORT, 10)
		: 5432,
	user: process.env.POSTGRES_USER,
};

const server = () => {
	const instance = fastify({ logger: true });
	instance.register(fastifyPostgres, pgOptions);
	instance.register(autoLoad, {
		dir: join(__dirname, 'routes'),
	});

	const PORT = process.env.PORT || 3000;

	instance.listen(PORT, (err) => {
		if (err) {
			instance.log.error(err);
			process.exit(1);
		}
	});
};

export default server;
