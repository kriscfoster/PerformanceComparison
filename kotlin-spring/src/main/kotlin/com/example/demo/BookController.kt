package com.example.demo

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/books")
class BookController(val bookService: BookService) {

    @GetMapping
    fun getBooks(): List<Book> {
        return bookService.getBooks()
    }

    @GetMapping("/{id}")
    fun getBook(@PathVariable id: Long): Book {
        return bookService.getBook(id)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createBook(@RequestBody book: Book): Book {
        return bookService.createBook(book)
    }

    @PatchMapping("/{id}")
    fun changeBook(@PathVariable id: Long, @RequestBody updatedBook: Book): Book {
        return bookService.changeBook(id, updatedBook)
    }

    @DeleteMapping("/{id}")
    fun deleteBook(@PathVariable id: Long) {
        return bookService.deleteBook(id)
    }

}
