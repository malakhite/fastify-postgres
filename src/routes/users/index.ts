import { FastifyPluginAsync, RegisterOptions, RouteOptions } from 'fastify';
import { UsersController } from './users.controller';

const register: FastifyPluginAsync<RegisterOptions> = async (instance) => {
	new UsersController({ instance }).wireRoutes();
};

export default register;
