---
title: continue-break-return
date: 2021-11-25 16:08:48
tags: JS
---

## continue&break&return

1. continue 在for循环中使用，跳过当此循环
2. break 在for循环、switch中使用，跳过当前循环
3. return 在函数中使用，跳过当前函数

````
    var num = [1,2,3,4,5]

    function fun1() {
      for (let item of num) {
        console.log(item)
        if (item == 3) {
          continue
        }
      }
      console.log('end')
    }
    function fun2() {
      for (let item of num) {
        console.log(item)
        if (item == 3) {
          break
        }
      }
      console.log('end')
    }
    function fun3() {
      for (let item of num) {
        console.log(item)
        if (item == 3) {
          return
        }
      }
      console.log('end')
    }
    fun1()  1 2 3 4 5 end
    console.log('--------')
    fun2()  1 2 3 end
    console.log('--------')
    fun3()  1 2 3
````