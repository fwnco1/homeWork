<template>
  <div>
    <mt-swipe :auto="3000">
        <!-- 将来谁用到轮播图组件,谁为我们传递轮lunbotuList ,父组件向子组件传值-->
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item.img?item.img:item.src" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:['lunbotuList','isfull']
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
      text-align: center;
    img {
    
      height: 100%;
    }
    
  }
  
}
.full{
        width: 100%
    }

</style>
