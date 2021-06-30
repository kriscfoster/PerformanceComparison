# node-express

### Endpoints

- `[POST] /books` - Persists a book in database.
- `[GET] /books` - Gets all books from database.
- `[GET] /books/{id}` - Gets book with specified `id` if it exists.
- `[PATCH] /books/{id}` - Updates book with specified `id` if it exists.
- `[DELETE] /books/{id}` - Deletes book with specified `id` if it exists.
- `[GET] /cpu-intensive?num={number}` - Performs CPU intensive math operations using `number` as a parameter.

## Running Locally

### Prerequisites
* docker installed

### Starting Application
* `docker build ./ -t kriscfoster/node-express`
* `docker compose up`

### Stopping Application
* `docker compose down`
