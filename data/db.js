require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_NAME,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connesso al database!");
});

module.exports = connection;
