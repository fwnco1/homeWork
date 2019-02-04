//如何在webpack 构建的项目中，使用vue进行开发

//安装vue ,并导入vue包
//注意，这个语句引用的vue不完整，只是引入runtime-only阉割版,我们在配置文件中修改了文件路径
import Vue from "vue"

// import Vue from '../node_modules/vue/dist/vue.js'

var vm=new Vue({
    el:"#app",
    data:{
        msg:123
    },

})