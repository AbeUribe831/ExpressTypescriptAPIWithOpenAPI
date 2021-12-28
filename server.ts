require("newrelic");
import express from "express";
import * as exegesisExpress from "exegesis-express";
import path from "path";
import { Request, Response, NextFunction } from "express";
import http from "http";

const PORT = 3000;

async function createServer() {
  const options = {
    controllers: path.resolve(__dirname, "./controllers"),
    controllersPattern: "**/*.@(ts|js)",
    allowMissingControllers: true,
  };

  // create exegesis middleware compatible with express
  const exegesisMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, "./openAPI/openapi.yaml"),
    options
  );
  // use helmet
  const app = express();

  app.use(exegesisMiddleware);

  app.use((_req, res) => {
    res.status(404).send({ message: "not found" });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ message: `Internal error: ${err.message}` });
  });
  const server = http.createServer(app);
  return server;
}

// Run server
createServer()
  .then((server) => {
    server.listen(PORT);
    console.log(`Listening ${server.address()} on port ${PORT}`);
  })
  .catch((err) => {
    console.error(err.stack);
  });
