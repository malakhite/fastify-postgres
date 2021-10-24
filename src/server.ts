import fastify, { FastifyInstance } from 'fastify';
import autoLoad from 'fastify-autoload';
import fastifyPostgres from 'fastify-postgres';
import path from 'path';
import { ClientConfig } from 'pg';

export default class Server {
	private instance: FastifyInstance;
	private pgOptions: ClientConfig = {
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST || 'localhost',
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.POSTGRES_PORT
			? Number.parseInt(process.env.POSTGRES_PORT, 10)
			: 5432,
		user: process.env.POSTGRES_USER,
	};

	constructor() {
		this.instance = fastify({ logger: true });
	}

	public bootstrap() {
		this.instance.register(fastifyPostgres, this.pgOptions);
		this.instance.register(autoLoad, {
			dir: path.join(__dirname, 'routes'),
		});
		return this;
	}

	public listen(port: number | string) {
		this.instance.listen(port, (err) => {
			if (err) {
				this.instance.log.error(err);
				process.exit(1);
			}
		});
	}
}
