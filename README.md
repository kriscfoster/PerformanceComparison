# PerformanceComparison

## Overview
This aims to provide a comparison of performance for web applications built using different technologies.
I will be using [Apache Jmeter](https://jmeter.apache.org/) to compare the performance of REST APIs built with:
1. Kotlin & Spring
1. NodeJS & Express

For consistency, all our web applications use a postgres database with the same schema for persistence.

### What endpoints are we using for our performance tests?
* `[POST] /books` - Persists a book in database.
* `[GET] /books` - Gets all books from database.
* `[GET] /books/{id}` - Gets book with specified `id` if it exists.
* `[PATCH] /books/{id}` - Updates book with specified `id` if it exists.
* `[DELETE] /books/{id}` - Deletes book with specified `id` if it exists.
* `[GET] /cpu-intensive?num={number}` - Performs CPU intensive math operations using `number` as a parameter.

#### CPU Intensive Endpoint
```
function cpuIntensive(number) {
  let result = 0;
  for (let i=0; i<Math.pow(number, 7); i++) {
    result += Math.atan(i) * Math.tan(i);
  }

  return result;
}
```
## Results
TODO

## Running Tests Locally
TODO
