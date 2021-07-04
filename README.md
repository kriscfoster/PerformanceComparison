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

### 1 pod (no memory/cpu limits)

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 308            | 0.6%            | 15.9/sec       |
| `[GET] /cpu-intensive?num=8`  | 100        | 487            | 1%              |   |
| `[POST] /books`               | 100        | 590            | 2%              |   |
| `[PATCH] /books/1`            | 100        | 427            | 0%              |   |
| `[GET] /books/1`              | 100        | 16             | 0%              |   |
| `[GET] /books`                | 100        | 6              | 0%              |   |

#### kotlin/spring

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 117            | 0%              | 41.7/sec     |
| `[GET] /cpu-intensive?num=8`  | 100        | 481            | 0%              |   |
| `[POST] /books`               | 100        | 67             | 0%              |   |
| `[PATCH] /books/1`            | 100        | 16             | 0%              |   |
| `[GET] /books/1`              | 100        | 11             | 0%              |   |
| `[GET] /books`                | 100        | 12             | 0%              |   |

### 2 pods (no memory/cpu limits)

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 178            | 0%              | 26.1/sec       |
| `[GET] /cpu-intensive?num=8`  | 100        | 357            | 0%              |   |
| `[POST] /books`               | 100        | 313            | 0%              |   |
| `[PATCH] /books/1`            | 100        | 214            | 0%              |   |
| `[GET] /books/1`              | 100        | 3              | 0%              |   |
| `[GET] /books`                | 100        | 3              | 0%              |   |

#### kotlin/spring

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 84             | 0%              | 57.3/sec     |
| `[GET] /cpu-intensive?num=8`  | 100        | 327            | 0%              |   |
| `[POST] /books`               | 100        | 58             | 0%              |   |
| `[PATCH] /books/1`            | 100        | 16             | 0%              |   |
| `[GET] /books/1`              | 100        | 10             | 0%              |   |
| `[GET] /books`                | 100        | 10             | 0%              |   |

### 5 pods (no memory/cpu limits)

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 122            | 0%              | 37.0/sec       |
| `[GET] /cpu-intensive?num=8`  | 100        | 348            | 0%              |   |
| `[POST] /books`               | 100        | 139            | 0%              |   |
| `[PATCH] /books/1`            | 100        | 115            | 0%              |   |
| `[GET] /books/1`              | 100        | 3              | 0%              |   |
| `[GET] /books`                | 100        | 4              | 0%              |   |

#### kotlin/spring

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 64             | 0%              | 82.31/sec     |
| `[GET] /cpu-intensive?num=8`  | 100        | 245            | 0%              |   |
| `[POST] /books`               | 100        | 48             | 0%              |   |
| `[PATCH] /books/1`            | 100        | 10             | 0%              |   |
| `[GET] /books/1`              | 100        | 7              | 0%              |   |
| `[GET] /books`                | 100        | 9              | 0%              |   |

### 1 pod, cpu limit (1000m / 1 core)

#### node/express

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 314            | 4.4%            | 15.6/sec       |
| `[GET] /cpu-intensive?num=8`  | 100        | 563            | 10%             |   |
| `[POST] /books`               | 100        | 622            | 12%             |   |
| `[PATCH] /books/1`            | 100        | 368            | 0%              |   |
| `[GET] /books/1`              | 100        | 6              | 0%              |   |
| `[GET] /books`                | 100        | 5              | 0%              |   |

#### kotlin/spring

| Route                         | # Samples  | Average (ms)   | % Over 1000ms   | Throughput   |
|---|---|---|---|---|
| `*`                           | 500        | 238            | 18.4%           | 20.8/sec     |
| `[GET] /cpu-intensive?num=8`  | 100        | 994            | 92%             |   |
| `[POST] /books`               | 100        | 127            | 0%              |   |
| `[PATCH] /books/1`            | 100        | 20             | 0%              |   |
| `[GET] /books/1`              | 100        | 17             | 0%              |   |
| `[GET] /books`                | 100        | 31             | 0%              |   |
