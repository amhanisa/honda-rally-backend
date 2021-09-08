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
app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Honda Rally Backend");
});

app.get("/getAll", (req, res) => {
  const type = req.query.type;

  pool.query(
    `SELECT * FROM score WHERE type='${type}'`,
    (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
    }
  );
});

app.get("/getRanks", (req, res) => {
  type = req.query.type;

  if (type === "") {
    pool.query(
      `SELECT * FROM score ORDER BY score DESC`,
      (err, rows, fields) => {
        console.log(rows);
        const ranks = rows;

        pool.query(
          `SELECT MAX(last_update) as time FROM score`,
          (err, rows, fields) => {
            console.log(rows);
            const updateTime = rows[0].time;
            res.send({ ranks, updateTime });
          }
        );
      }
    );
  } else {
    pool.query(
      `SELECT * FROM score WHERE type='${type}' ORDER BY score DESC`,
      (ex, rows) => {
        const ranks = rows;

        pool.query(
          `SELECT MAX(last_update) as time FROM score WHERE type='${type}'`,
          (ex, rows) => {
            let updateTime;
            if (rows) {
              updateTime = rows[0].time;
            }

            res.send({ ranks, updateTime });
          }
        );
      }
    );
  }
});

app.post("/addTeam", (req, res) => {
  pool.query(
    `INSERT INTO score (team, type) values ('${req.body.team}', '${req.body.type}')`,
    (err, rows, fields) => {
      if (err) throw err;
      const id = rows.insertId;
      res.status(200).send({ id: id });
    }
  );
});

app.post("/updateTeam", (req, res) => {
  const { id, team, score } = req.body;

  pool.query(
    `UPDATE score SET team='${team}', score=${score}, last_update=now() WHERE id=${id}`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).send(rows);
    }
  );
});

app.post("/deleteTeam", (req, res) => {
  const { id } = req.body;

  pool.query(`DELETE FROM score WHERE id=${id}`, (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
