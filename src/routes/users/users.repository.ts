import { FastifyInstance } from 'fastify';
import { PostgresDb } from 'fastify-postgres';
import { User } from './users.model';

interface IUsersRepositoryOptions {
	db: PostgresDb;
}
export interface IUsersRepository {
	findUserById(id: string): Promise<User>;
	findUserByEmail(email: string): Promise<User>;
	findAllUsers(): Promise<User[]>;
}

interface Find {
	column: 'id' | 'email';
	predicate: string;
	active?: boolean;
}

export default class UsersRepository {
	private db: PostgresDb;

	constructor({ db }: IUsersRepositoryOptions) {
		this.db = db;
	}

	public async find(findObject?: Find): Promise<User[]> {
		if (findObject) {
			const { active = true, column, predicate } = findObject;
			const { rows } = await this.db.query(
				`SELECT * FROM users WHERE active = $1 AND ${column} = $2;`,
				[active, predicate],
			);
			return rows;
		}
		const { rows } = await this.db.query(
			'SELECT * FROM users WHERE active = true;',
		);
		return rows;
	}
}
