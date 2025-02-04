import postgres from "postgres";

let psql: postgres.Sql<{}>;
export let psql2: postgres.Sql<{}>;

if (process.env.LABEVAL_USE_NEON === "true") {
  psql = postgres({
    database: process.env.LABEVAL_PGDATABASE,
    username: process.env.LABEVAL_PGUSER,
    host: process.env.LABEVAL_PGHOST,
    password: process.env.LABEVAL_PGPASSWORD,
    ssl: "require",
  });
} else {
  psql2 = postgres({
    database: process.env.LABEVAL_PGDATABASE,
    username: process.env.LABEVAL_PGUSER,
    host: process.env.LABEVAL_PGHOST,
    password: process.env.LABEVAL_PGPASSWORD,
    ssl: "require",
  });
  psql = postgres({
    database: process.env.LABEVAL_PGDATABASE2,
    username: process.env.LABEVAL_PGUSER2,
    host: process.env.LABEVAL_PGHOST2,
    password: process.env.LABEVAL_PGPASSWORD2,
  });
}

export default psql;
