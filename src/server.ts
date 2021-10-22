import fastify, { FastifyInstance } from "fastify";
import fastifyPostgres, { PostgresPluginOptions } from "fastify-postgres";
import { ClientConfig } from "pg";
import { BaseController } from "./common/common.controller";
import { UsersController } from "./users/users.controller";

export default class Server {
  public server: FastifyInstance;

  private routes: Record<string, BaseController> = {};

  constructor() {
    this.server = fastify({ logger: true });
    this.routes["/user"] = new UsersController();
  }

  private connectToPostgres() {
    const options: ClientConfig = {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST || "localhost",
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT
        ? Number.parseInt(process.env.POSTGRES_PORT, 10)
        : 5432,
      user: process.env.POSTGRES_USER,
    };

    this.server.register(fastifyPostgres, options);
    this.server.log.info("Connected to database");
  }

  public register() {
    Object.entries(this.routes).forEach(([route, controller]) => {
      this.server.register(controller.wireRoutes, { prefix: route });
    });
    this.connectToPostgres();
    return this;
  }

  public listen(port: number | string) {
    this.server.listen(port, (err) => {
      if (err) {
        this.server.log.error(err);
        process.exit(1);
      }
    });
  }
}
