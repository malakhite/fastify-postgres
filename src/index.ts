import "./lib/env";
import Server from "./server";

const PORT = process.env.PORT || 3000;

new Server().register().listen(PORT);