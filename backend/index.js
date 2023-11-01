import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hello12345",
    database: "testdb"
});

app.use(express.json());
app.use(cors());

// If there is an authentication problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hello12345';

app.get("/", (req, res) => {
    res.json("hello! from backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `descrip`, `cover`) VALUES(?)";
    const values = [
        req.body.title,
        req.body.descrip,
        req.body.cover
    ];
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json("Book has been created successfully!");
        } 
    });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});