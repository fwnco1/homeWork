//ES6提供的模块化语法

import $ from 'jquery'

//CommonJS规范
//1.要求全局作用域中必须要有module require exports
//2.moduel.require() module.exports
//CommonJS不适合在前段运行，因为它是同步加载模块
// const $ = require('jquery')

$(function(){
    $('li:odd').css('backgroundColor','pink')
    $('li:evev').css('backgroundColor','red')
})