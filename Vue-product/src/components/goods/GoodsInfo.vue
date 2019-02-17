<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="banners" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 购物车小球 -->
    <transition
     @before-enter="beforeEnter"
          @enter="Enter"
          @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">市场价:
            <del>¥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">¥{{goodsInfo.sell_price}}</span>
          </p>
          <div>购买数量:
              <numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
          </div>
          <div>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button size="small" type="danger" @click="addball" :disabled="moveFlag">加入购物车</mt-button>
            <!-- 分析:如何实现加入购物车时候,拿到 选择的数量
            1.经过分析发现:按钮属于goodinfo 页面 , 数字 属于 numberbox 组件
            2.由于涉及到了父子组件的嵌套了 , 所以 , 无法直接在goodsinfo 页面中 获取到 选中的商品数量值
            3.怎么解决这个问题: 涉及到了 子组件向父组件传值了 (事件调用机制) 
            4.事件调用的本质 : 父向子传递方法, 子调用这个方法 , 同时把 数据当做参数 传递给这个方法 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button size="large" type="primary" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button size="large" type="danger" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue"
import numbox from "../subcomponents/goodsinfo_num.vue"
export default {
  data() {
    return {
      id: this.$route.params.id, //获取路由id
      banners: [],
      isfull: false,
      goodsInfo:{},
      ballFlag:false,
      moveFlag:false,
      selectedCount:1
    };
  },
  methods: {
    getbanners() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          //在赋值之前,选循环出轮播图数组的每一项,为item每一项添加img属性=src,
          //因为swiper组件内部只识别item.img属性
          // result.body.message.forEach(item => {
          //     item.img=item.src
          // });
          //或者直接在swiper插件中用三元表达式判断item.img?item.img:item.src

          this.banners = result.body.message;
        }
      })
    },
    getGoodsInfo(){
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          //在赋值之前,选循环出轮播图数组的每一项,为item每一项添加img属性=src,
          //因为swiper组件内部只识别item.img属性
          // result.body.message.forEach(item => {
          //     item.img=item.src
          // });
          //或者直接在swiper插件中用三元表达式判断item.img?item.img:item.src

          
          this.goodsInfo = result.body.message[0];
        }
      })
    },
    goDesc(id){
      this.$router.push({name:'goodsdesc',params:{id}})
    },
    goComment(id){
      this.$router.push({name:'goodscomment',params:{id}})
    },
    addball(){
        this.ballFlag=!this.ballFlag
        this.moveFlag=!this.moveFlag
        setTimeout(()=>{
            this.moveFlag=!this.moveFlag
        },700)

    },
    beforeEnter(el){
        el.style.transform="translate(0,0)"
    },
    Enter(el,done){
        el.offsetWidth
        //获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        //获取会标的位置
        const badgePosition = document.getElementById('badge').getBoundingClientRect()

        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top


       el.style.transform=`translate(${xDist}px,${yDist}px)`
       el.style.transition="all .7s ease"
      done()
    },
    afterEnter(el){
      this.ballFlag=!this.ballFlag
    },
    getSelectedCount(count) {
      //当子组件把选中的数量传递给父组件的时候,把选中的值保存到 data上
      this.selectedCount=count
      console.log(this.selectedCount);
      
    }      
  },
  created() {
    this.getbanners()
    this.getGoodsInfo()
  },
  components: {
    swiper,
    numbox
  }
};
</script>


<style lang="less" scoped>
.goodsinfo-container {
  overflow-x: hidden;
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer{
    display: block;
    button{
      margin:15px 0 ;
    }
  }
  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 410px;
    left: 77px;
    z-index: 99;
    
  }
}
</style>
