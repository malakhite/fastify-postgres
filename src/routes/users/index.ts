import type {
	FastifyPluginAsync,
	FastifySchema,
	RegisterOptions,
	RouteOptions,
} from 'fastify';
import UsersRepository from './users.repository';
import UsersService from './users.service';

const tempSchema: FastifySchema = {
	response: {
		200: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				email: { type: 'string' },
				name: { type: 'string' },
			},
		},
	},
};

const users: FastifyPluginAsync<RegisterOptions> = async (instance) => {
	const usersRepository = await UsersRepository(instance);
	const usersService = await UsersService(usersRepository);

	const routes: RouteOptions[] = [
		{
			method: 'GET',
			url: '/',
			handler: async (request, reply) => {
				return await usersService.findAllUsers();
			},
			schema: {
				response: {
					200: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: { type: 'string' },
								email: { type: 'string' },
								name: { type: 'string' },
							},
						},
					},
				},
			},
		},
	];

	routes.forEach((route) => {
		instance.route(route);
	});
};

export default users;
