import type {
  FastifyInstance,
  FastifySchema,
  RouteHandler,
  RouteOptions,
} from "fastify";
import { BaseController } from "../common/common.controller";

const tempSchema: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
      },
    },
  },
};

const tempHandler: RouteHandler = async (request, reply) => {
  return {
    id: "abc",
    email: "test@mailinator.com",
    name: "John Doe",
    password: "abcdefg12345",
  };
};

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  protected routes: RouteOptions[] = [
    {
      method: "GET",
      url: "/",
      schema: tempSchema,
      handler: tempHandler,
    },
  ];
}
