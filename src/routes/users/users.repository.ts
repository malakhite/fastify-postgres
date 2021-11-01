import { FastifyInstance } from 'fastify';
import { User } from './users.model';

export interface IUsersRepository {
	findAll: () => Promise<User[]>;
}

const usersRepository: (
	instance: FastifyInstance,
) => Promise<IUsersRepository> = async (instance) => {
	const pool = instance.pg.pool;

	return {
		findAll: async () => {
			const { rows } = await pool.query<User>(
				'SELECT * FROM users WHERE active = true;',
			);
			console.log(rows);
			return rows;
		},
	};
};

export default usersRepository;
