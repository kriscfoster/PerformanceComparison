package com.example.demo

import org.springframework.stereotype.Service

@Service
class BookService(val bookRepository: BookRepository) {

    fun getBooks(): List<Book> {
        return bookRepository.findAll()
    }

    fun getBook(id: Long): Book {
        var b = bookRepository.findById(id);
        if (b.isPresent) {
            return b.get()
        }

        throw BookNotFoundException()
    }

    fun createBook(book: Book): Book {
        return bookRepository.save(book)
    }

    fun changeBook(id: Long, updatedBook: Book): Book {
        var b = bookRepository.findById(id);
        if (b.isPresent) {
            val book = b.get();
            book.title = updatedBook.title;
            return bookRepository.save(book);
        }

        throw BookNotFoundException()
    }

    fun deleteBook(id: Long) {
        var b = bookRepository.findById(id);
        if (b.isPresent) {
            val book = b.get()
            return bookRepository.delete(book);
        }

        throw BookNotFoundException()
    }
}
