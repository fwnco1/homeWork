<template>

    <div>
        <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" >
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref='numbox' id="test">
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>
    </div>
</template>

<script>
 import mui from "../../lib/mui/js/mui.min.js";   
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        //初始化数字选择框的组件
        mui('.mui-numbox').numbox()
    },
    methods: {
        countChanged(){
            //每当文本框的数据被修改的时候,立即把最新的数据,用过事件调用,传递给父组件
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
           
            
        }
    },
    props:["max"],
    watch: {
        //属性监听
        max:function(newVal,oldVal) {
            //使用js api 设置numbox 的最大值
            mui('.mui-numbox').numbox().setOption("max",newVal)
        }
    },
}
</script>


<style lang="less" scoped>

</style>
