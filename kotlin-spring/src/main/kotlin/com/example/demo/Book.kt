package com.example.demo

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Book(var title: String) {
    @Id
    @GeneratedValue
    val id: Long? = null
}
