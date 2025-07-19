import express from "express";
import mySql from "mysql2";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "GradeFlow",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello from backend!");
});

app.get("/Student", (req, res) => {
  const q = "SELECT * FROM Student";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/Student", (req, res) => {
  const { firstName, lastName, class: classId } = req.body;

  const q =
    "INSERT INTO Student (firstName, lastName, class_id) VALUES (?, ?, ?)";
  const values = [firstName, lastName, classId];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Fehler beim Einfügen:", err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "Student hinzugefügt", id: data.insertId });
  });
});

app.delete("/Student/:id", (req, res) => {
  const studentId = req.params.id;
  const q = "DELETE FROM Student WHERE id = ?";

  db.query(q, [studentId], (err, data) => {
    if (err) {
      console.error("Fehler beim Löschen:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Student gelöscht" });
  });
});

app.put("/Student/:id", (req, res) => {
  const studentId = req.params.id;
  const q =
    "UPDATE Student SET `firstName` = ?, `lastName` = ?, `class_id` = ? WHERE id = ?";

  const values = [req.body.firstName, req.body.lastName, req.body.class_id];

  db.query(q, [...values, studentId], (err, data) => {
    if (err) {
      console.error("Fehler beim Update:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Student geupdated" });
  });
});

app.get("/Student/:id", (req, res) => {
  const studentId = req.params.id;
  const q = "SELECT * FROM Student WHERE id = ?";

  db.query(q, [studentId], (err, data) => {
    if (err) {
      console.error("Fehler beim Abrufen des Studenten:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Student nicht gefunden" });
    }
    return res.json(data[0]);
  });
});
app.get("/Class", (req, res) => {
  const q = "SELECT * FROM Class";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Fehler beim Laden der Klassen:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/Student/class/:classId", (req, res) => {
  const classId = req.params.classId;
  const q = "SELECT * FROM Student WHERE class_id = ?";

  db.query(q, [classId], (err, data) => {
    if (err) {
      console.error("Fehler beim Abrufen der Schüler:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.post("/Class", (req, res) => {
  const { name } = req.body;
  const q = "INSERT INTO Class (name) VALUES (?)";

  db.query(q, [name], (err, data) => {
    if (err) {
      console.error("Fehler beim Einfügen der Klasse:", err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "Klasse hinzugefügt", id: data.insertId });
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
