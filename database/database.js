import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts"; 

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "gcmumiyf",
  user: "gcmumiyf",
  password: "op2fVNYoMVJ6LPB967RXEva1Ja6tPDDB",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };