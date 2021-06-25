import express from 'express';
import bodyParser from 'body-parser';
import db from './database.js';
const { sequelize, Book } = db;
sequelize.sync();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(5000);
console.log(`listening on port: ${port}`);

app.get('/books', async (_req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch(err) {
    res.status(500).send();
  }
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) res.status(404).send();
    res.status(200).json(book);
  } catch(err) {
    res.status(500).send();
  }
});

app.post('/books', async (req, res) => {
  const { title } = req.body;
  try {
    const book = await Book.create({ title });
    res.status(201).json(book);
  } catch(err) {
    res.status(500).send();
  }
});

app.patch('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const book = await Book.update({ title }, { where: { id }, returning: true });
    if (!book[1].length) res.status(404).send();
    res.status(200).json(book[1][0]);
  } catch(err) {
    res.status(500).send();
  }
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.destroy({ where: { id } });
    if (book === 0) res.status(404).send();
    res.status(200).send();
  } catch(err) {
    res.status(500).send();
  }
});

app.get('/cpu-intensive', (req, res) => {
  const { num } = req.query;
  let result = 0;
  for (let i = 0; i < Math.pow(num, 7); i++) {
    result += Math.atan(i) * Math.tan(i);
  }

  res.json(result);
});
