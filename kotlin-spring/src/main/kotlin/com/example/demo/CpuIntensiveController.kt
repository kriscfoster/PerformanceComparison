package com.example.demo

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/cpu-intensive")
class CpuIntensiveController() {

    @GetMapping()
    fun cpuIntensive(@RequestParam num: Double): Double {
        var result = 0.0
        for (i in 0 upto Math.pow(num, 7.0)) {
            result += Math.atan(i) * Math.tan(i)
        }
        return result
    }
}
