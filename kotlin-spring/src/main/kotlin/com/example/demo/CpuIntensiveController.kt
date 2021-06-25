package com.example.demo

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import kotlin.math.atan
import kotlin.math.pow
import kotlin.math.tan

@RestController
@RequestMapping("/cpu-intensive")
class CpuIntensiveController() {

    @GetMapping()
    fun cpuIntensive(@RequestParam num: Double): Double {
        var result = 0.0
        var i = 0.0;
        while (i < num.pow(7.0)) {
            result += atan(i) * tan(i)
            i++
        }

        return result
    }
}
