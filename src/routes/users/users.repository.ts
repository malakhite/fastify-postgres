import { FastifyInstance } from 'fastify';
import { User } from './users.model';

interface IUsersRepositoryOptions {
	instance: FastifyInstance;
}
export interface IUsersRepository {
	findUserById(id: string): Promise<User>;
	findUserByEmail(email: string): Promise<User>;
	findAllUsers(): Promise<User[]>;
}

export class UsersRepository implements IUsersRepository {
	private instance: FastifyInstance;

	constructor({ instance }: IUsersRepositoryOptions) {
		this.instance = instance;
	}

	public async findUserById(id: string) {
		const client = await this.instance.pg.connect();
		const result = await client.query<User>(
			'SELECT * FROM users WHERE id = $1',
			[id],
		);
		await client.release();
		return result.rows[0];
	}

	public async findUserByEmail(email: string) {
		const client = await this.instance.pg.connect();
		const result = await client.query<User>(
			'SELECT * FROM users WHERE email = $1',
			[email],
		);
		await client.release();
		return result.rows[0];
	}

	public async findAllUsers() {
		const client = await this.instance.pg.connect();
		const result = await client.query<User>(
			'SELECT * FROM users WHERE active = true',
		);
		await client.release();
		return result.rows;
	}
}
