import express from 'express';

const port = process.env.PORT || 5000;
const app = express();

app.get('/books', (_req, res) => res.send({}));
app.get('/books/:id', (_req, res) => res.send({}));
app.post('/books', (_req, res) => res.send({}));
app.patch('/books', (_req, res) => res.send({}));
app.delete('/books', (_req, res) => res.send({}));

app.listen(5000);
console.log(`listening on port: ${port}`);
