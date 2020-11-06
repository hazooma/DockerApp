import * as pino from "pino";
import * as supertest from "supertest";
import { createContainer } from "../src/container";
import { createServer } from "../src/server";
import { database } from "./database-utils";

const logger = pino({ name: "test", level: "silent" });
const container = createContainer(database, logger);
const port = Number(process.env.PORT) || 8081;

export const appServer = createServer(container);
export const testServer = appServer.listen(port);

export async function createMovieTest(movie: any): Promise<any> {
  const res = await supertest(testServer)
    .post("/api/movies")
    .send(movie)
    .expect(201);

  return res.body;
}
