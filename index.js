require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Honda Rally Backend");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
