//ES6提供的模块化语法

import $ from 'jquery'

//CommonJS规范
//1.要求全局作用域中必须要有module require exports
//2.moduel.require() module.exports
//CommonJS不适合在前段运行，因为它是同步加载模块
// const $ = require('jquery')

// 使用 import 语法，导入 CSS样式表
import './css/index.css'
import './css/index.less'
import './css/index.scss'
import 'bootstrap/dist/css/bootstrap.css'

//class关键字， 是es6中提供的新语法，是用来实现es6中面向对象编程的方式
class Person {
    //使用static关键字，可以定义静态属性
    //所谓的静态属性，就是可以直接通过类名,直接访问的属性
    //实例属性：只能通过类的实例额，来访问的属性，叫做实例属性
    static info = {name:'zs',age:20}
}
console.log(Person.info);

//通过babel，可以帮我们将高级语法转为低级语法



$(function(){
    $('li:odd').css('backgroundColor','pink')
    $('li:even').css('backgroundColor','blue')
})