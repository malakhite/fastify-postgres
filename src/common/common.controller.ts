import { FastifyPluginAsync, RegisterOptions, RouteOptions } from "fastify";

export abstract class BaseController {
  constructor() {}

  protected abstract routes: RouteOptions[];

  wireRoutes: FastifyPluginAsync<RegisterOptions> = async (
    fastifyInstance,
    opts
  ) => {
    this.routes.forEach((route) => {
      fastifyInstance.route(route);
      fastifyInstance.log.info(
        `${route.method} ${opts.prefix}${route.url} registered`
      );
    });
  };
}
