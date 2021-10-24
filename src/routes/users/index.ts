import type { FastifyPluginAsync, RegisterOptions } from 'fastify';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const register: FastifyPluginAsync<RegisterOptions> = async (instance) => {
	const usersRepository = new UsersRepository({ instance });
	const usersService = new UsersService({ usersRepository });
	new UsersController({ instance, usersService }).wireRoutes();
};

export default register;
