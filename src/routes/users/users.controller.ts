import { basename } from 'path';
import type {
	FastifyInstance,
	FastifySchema,
	RouteHandler,
	RouteOptions,
} from 'fastify';

import Controller from '../../common/Controller';
import type UsersService from './users.service';

interface UsersControllerOptions {
	instance: FastifyInstance;
	usersService: UsersService;
}

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

const tempHandler: RouteHandler = async (request, reply) => {
	return {
		id: 'abc',
		email: 'test@mailinator.com',
		name: 'John Doe',
		password: 'abcdefg12345',
	};
};

export default class UsersController extends Controller {
	private usersService: UsersService;

	protected prefix: string = __dirname.includes('routes')
		? `/${basename(__dirname)}`
		: '';

	constructor({ instance, usersService }: UsersControllerOptions) {
		super({ instance });
		this.usersService = usersService;
	}

	protected routes: RouteOptions[] = [
		{
			method: 'GET',
			url: '/',
			schema: tempSchema,
			handler: async (request, reply) => {
				return await this.usersService.findAllUsers();
			},
		},
	];
}
