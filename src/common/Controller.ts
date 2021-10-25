import { basename } from 'path';
import type { FastifyInstance, RouteOptions } from 'fastify';

export interface IControllerOpts {
	instance: FastifyInstance;
}

export default abstract class Controller {
	protected instance: FastifyInstance;
	protected abstract prefix: string;
	protected abstract routes: RouteOptions[];

	constructor(opts: IControllerOpts) {
		this.instance = opts.instance;
	}

	wireRoutes() {
		this.routes.forEach((route) => {
			const prefix = __dirname.includes('routes')
				? `/${basename(__dirname)}`
				: '';
			this.instance.route(route);
			this.instance.log.info(`${prefix}${route.url} registered`);
		});
	}
}
