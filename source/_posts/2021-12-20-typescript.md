---
title: TypeScript
date: 2021-12-20 10:57:06
tags: ts
---

# TypeScript

### 个人想法
hahahhahhah  
+ ts的主要目的是静态类型检查，及代码规范
+ 代码规范：如a.split(""); 如果在ts中给a声明了类型，则只有string类型的a，可以调用split方法，其余报错，所以写代码时能调用split时，就不必考虑许多。
+ 只解决静态类型检查，不负责运行时
```
let a:string
a.split("") // 编译为js，运行报错，a不可为underfined
```

+ ts 与 js文件混用   
不建议，可以把同一变量相关的代码放入ts或者js一方中，
+ ts 有类型推断，
```
let b = 123; ts会推断b为number类型
```
  - 可通过定义变量、注解、结构、结构化等进行类型推断
  - 类型推断不是万能的，可能推断不出来

## 目录
+ 泛型
  + 泛型变量
  + 泛型数组
  + 泛型接口
  + 泛型类
  + 泛型函数
+ 关键字
  - type
  - interface
  - decale
  - extends
  - 实现

## 泛型

+ 同一个单位中，使用泛型的变量的类型一样（隐藏信息）
+ 需要捕获类型，只有捕获到类型，才能使用
  - 显示传入类型参数
  - 类型推断（可能推断不出来）
+ 不能推断泛型变量有哪些属性，因为它是通用的类型（任意 || 所有类型）
+ 捕获类型后，可以用此类型变量声明|构成其他变量
+ 至少两个变量使用泛型（提供类型之间的约束）
+ 无法创建泛型枚举和泛型命名空间

###  泛型函数
+ 函数签名
  ```
  let myIdentity: <T>(arg: T) => T = identity;
  let myIdentity: {<T>(arg: T): T} = identity;
  ```

### 泛型接口
+ 需要捕获
  ```
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }
  ```

### 泛型类
  ```
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
  let myGenericNumber = new GenericNumber<number>();
  ```

### 泛型约束
限定泛型有什么属性，对泛型的类型提供约束  
提供了泛型约束后，泛型不适用于任意类型，但是对于实际业务来说，实用且必须
  
  ```
  interface Lengthwise {
      length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);  // Now we know it has a .length property, so no more error
      return arg;
  }
  ```


### 类类型
？？？





## 接口 interface
为代码定义契约、结构
+ 变量声明的时候进行强校验，形参传参的时候不会强校验
+ 可选属性、
+ 变量定义时，不声明类型，ts会推断其类型
 - 基本类型  
   string number boolean 等
 - 对象类型
   




## tsconfig.json
+ 如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。

# 疑问
+ 接口
  ```
  interface Test {
    (): number;
  }
  function fn1() {
    return 1;
  }
  let test: Test = fn1;
  ```