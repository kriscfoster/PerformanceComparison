# node-express

## Prerequisites
* Postgres running locally.
* Create a database called `node-express` & run following SQL:
```
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);
```

## Running Locally
* `npm install`
* `npm start`
