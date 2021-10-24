import '../lib/env';
import { readdir, readFile } from 'fs/promises';
import { resolve } from 'path';
import { ClientConfig, Pool } from 'pg';

const pgOptions: ClientConfig = {
	database: process.env.POSTGRES_DB,
	host: process.env.POSTGRES_HOST || 'localhost',
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT
		? Number.parseInt(process.env.POSTGRES_PORT, 10)
		: 5432,
	user: process.env.POSTGRES_USER,
};

(async function init() {
	const pool = new Pool(pgOptions);
	const bootstrapPath = resolve(__dirname, 'bootstrap');

	const bootstrapFiles: string[] = await readdir(bootstrapPath, 'utf-8');
	console.log(bootstrapFiles);
	for (const file of bootstrapFiles) {
		const query = await readFile(resolve(bootstrapPath, file), 'utf-8');
		await pool.query(query);
	}

	pool.end();
})();
