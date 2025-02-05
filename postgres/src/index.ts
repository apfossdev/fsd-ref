import { Client } from "pg";

const pgClient = new Client(
  ""
)

// const pgClient = new Client({
//   user: "neondb_owner",
//   password: "npg_BWl2Ri1JoKdv",
//   port: 5434,
//   host: "ep-floral-grass-a1s3h3ia-poo-edited-this-out-to-push-on-github",
//   database: "neondb",
//   ssl: true,
// });

const main = async () => {
  await pgClient.connect();
  const response = await pgClient.query("SELECT * FROM users");
  console.log(response.rows);
};

main();
