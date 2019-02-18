<template>

    
        <div class="mui-numbox" data-numbox-step="1"  data-numbox-min="1">
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input class="mui-numbox-input" type="number" :value="initCount" readonly @change="CountChange" ref="numbox">
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
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
       CountChange(){
        //    console.log('数量改变了'+this.$refs.numbox.value);
        // 每当数量改变时 , 立即把最新的数量同步到 购物车中的 store 中,覆盖之前的数量
           this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value})
       }
    },
   props:['initCount','goodsid']
}
</script>


<style lang="less" scoped>

</style>