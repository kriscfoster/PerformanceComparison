import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';

const app = express();
app.use(bodyParser.json());
const { databaseUrl } = config;
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: databaseUrl,
});

const port = process.env.PORT || 5000;
app.listen(5000);
console.log(`listening on port: ${port}`);

app.get('/books', (_req, res) => {
  pool.query('SELECT * FROM book', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM book WHERE id = $1', [id], (error, results) => {
    if (error) throw error
    if (!results.rows.length) return res.status(404).send();
    res.status(200).json(results.rows[0]);
  });
});

app.post('/books', (req, res) => {
  const { title } = req.body;
  pool.query('INSERT INTO book(title) VALUES ($1) RETURNING *', [title], (error, results) => {
    if (error) throw error
    res.status(201).json(results.rows[0]);
  });
});

app.patch('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  pool.query('UPDATE book SET title = $1 WHERE id = $2 RETURNING *', [title, id], (error, results) => {
    if (error) throw error
    if (!results.rows.length) return res.status(404).send();
    res.status(200).json(results.rows[0]);
  });
});


app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM book WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) throw error;
    if (!results.rows.length) return res.status(404).send();
    res.status(200).send(`book deleted with id: ${results.rows[0].id}`);
  });
});

