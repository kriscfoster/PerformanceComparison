# PerformanceComparison

## Overview

This aims to provide a comparison of performance for web applications built using different technologies.
I will be using [Apache Jmeter](https://jmeter.apache.org/) to compare the performance of REST APIs built with:

1. Kotlin & Spring
1. NodeJS & Express

For consistency, all our web applications use a postgres database with the same schema for persistence.

### What endpoints are we using for our performance tests?

- `[POST] /books` - Persists a book in database.
- `[GET] /books` - Gets all books from database.
- `[GET] /books/{id}` - Gets book with specified `id` if it exists.
- `[PATCH] /books/{id}` - Updates book with specified `id` if it exists.
- `[DELETE] /books/{id}` - Deletes book with specified `id` if it exists.
- `[GET] /cpu-intensive?num={number}` - Performs CPU intensive math operations using `number` as a parameter.

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

## Running Tests Locally

### Prerequesites

* `docker` installed.
* `kubernetes` installed & running locally.

### Running APIs In Docker Container

* `./start-node-express.sh`
* `./start-kotlin-spring.sh`

## Results

### 1 pod, default memory & cpu

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 307            | 2.4%            | 16/sec       |
| `[POST] /books`               | 100        | 493            | 8%              |   |
| `[PATCH] /books`              | 100        | 127            | 0%              |   |
| `[GET] /books/1`              | 100        | 92             | 0%              |   |
| `[GET] /books`                | 100        | 274            | 2%              |   |
| `[GET] /cpu-intensive?num=8`  | 100        | 547            | 2%              |   |

#### kotlin/spring

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 80             | 0%              | 58.8/sec     |
| `[POST] /books`               | 100        | 7              | 0%              |   |
| `[PATCH] /books`              | 100        | 3              | 0%              |   |
| `[GET] /books/1`              | 100        | 4              | 0%              |   |
| `[GET] /books`                | 100        | 5              | 0%              |   |
| `[GET] /cpu-intensive?num=8`  | 100        | 371            | 0%              |   |

### 2 pods, default memory & cpu

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 163            | 0%              | 27.9/sec       |
| `[POST] /books`               | 100        | 185            | 0%              |   |
| `[PATCH] /books`              | 100        | 70             | 0%              |   |
| `[GET] /books/1`              | 100        | 54             | 0%              |   |
| `[GET] /books`                | 100        | 113            | 0%              |   |
| `[GET] /cpu-intensive?num=8`  | 100        | 392            | 0%              |   |

#### kotlin/spring

### 10 pods, default memory & cpu

#### node/express

#### kotlin/spring

### 1 pod, low memory & default cpu

#### node/express

#### kotlin/spring

### 1 pod, high memory & default cpu

#### node/express

#### kotlin/spring

### 1 pod, default memory & low cpu

#### node/express

#### kotlin/spring

### 1 pod, default memory & high cpu

#### node/express

#### kotlin/spring
