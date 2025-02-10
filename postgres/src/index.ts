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

// Transactions in SQL
// import { Client } from 'pg';

// async function insertUserAndAddress(
//     username: string, 
//     email: string, 
//     password: string, 
//     city: string, 
//     country: string, 
//     street: string, 
//     pincode: string
// ) {
//     const client = new Client({
//         host: 'localhost',
//         port: 5432,
//         database: 'postgres',
//         user: 'postgres',
//         password: 'mysecretpassword',
//     });

//     try {
//         await client.connect();

//         // Start transaction
//         await client.query('BEGIN');

//         // Insert user
//         const insertUserText = `
//             INSERT INTO users (username, email, password)
//             VALUES ($1, $2, $3)
//             RETURNING id;
//         `;
//         const userRes = await client.query(insertUserText, [username, email, password]);
//         const userId = userRes.rows[0].id;

//         // Insert address using the returned user ID
//         const insertAddressText = `
//             INSERT INTO addresses (user_id, city, country, street, pincode)
//             VALUES ($1, $2, $3, $4, $5);
//         `;
//         await client.query(insertAddressText, [userId, city, country, street, pincode]);

//         // Commit transaction
//         await client.query('COMMIT');

//         console.log('User and address inserted successfully');
//     } catch (err) {
//         await client.query('ROLLBACK'); // Roll back the transaction on error
//         console.error('Error during transaction, rolled back.', err);
//         throw err;
//     } finally {
//         await client.end(); // Close the client connection
//     }
// }

// // Example usage
// insertUserAndAddress(
//     'johndoe', 
//     'john.doe@example.com', 
//     'securepassword123', 
//     'New York', 
//     'USA', 
//     '123 Broadway St', 
//     '10001'
// );