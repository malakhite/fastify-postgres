import { basename } from 'path';
import type { FastifySchema, RouteHandler, RouteOptions } from 'fastify';
import { Controller } from '../../common/Controller';

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

export class UsersController extends Controller {
	protected prefix: string = __dirname.includes('routes')
		? `/${basename(__dirname)}`
		: '';

	protected routes: RouteOptions[] = [
		{
			method: 'GET',
			url: '/',
			schema: tempSchema,
			handler: tempHandler,
		},
	];
}
