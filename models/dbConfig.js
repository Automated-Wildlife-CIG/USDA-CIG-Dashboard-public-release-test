import { Pool } from "pg";

// Need to fix the below

// local host db
const devConnString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// IONOS cloud.fdtchirp.com 62.151.182.141
// const prodConnString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}?sslmode=disable`
const prodConnString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// check if production or debug mode
let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: prodConnString,
  });
  //console.log(`The pool is => ${prodConnString}`);
} else {
  pool = new Pool({
    connectionString: devConnString,
  });
  // console.log(`The pool is => ${devConnString}`);
}

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export { pool };
