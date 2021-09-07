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

app.get("/getAll", (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM score`, (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
      connection.release();
    });
  });
});

app.get("/getRanks", (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM score ORDER BY score DESC`,
      (err, rows, fields) => {
        console.log(rows);
        const ranks = rows;

        // res.send(ranks);
        connection.query(
          `SELECT MAX(last_update) as time FROM score`,
          (err, rows, fields) => {
            console.log(rows);
            const updateTime = rows[0].time;
            connection.release();
            res.send({ ranks, updateTime });
          }
        );
      }
    );
  });
});

app.post("/addTeam", (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO score (team) values ('${req.body.team}')`,
      (err, rows, fields) => {
        if (err) throw err;
        const id = rows.insertId;
        res.status(200).send({ id: id });
        connection.release();
      }
    );
  });
});

app.post("/updateTeam", (req, res) => {
  const { id, team, score } = req.body;

  pool.getConnection((err, connection) => {
    connection.query(
      `UPDATE score SET team='${team}', score=${score}, last_update=now() WHERE id=${id}`,
      (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
        connection.release();
      }
    );
  });
});

app.post("/deleteTeam", (req, res) => {
  const { id } = req.body;

  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM score WHERE id=${id}`,
      (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
        connection.release();
      }
    );
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
