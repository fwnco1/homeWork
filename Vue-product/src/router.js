import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/Homecontainer.vue'
import MemberContainer from './components/tabbar/Membercontainer.vue'
import ShopcarContainer from './components/tabbar/Shopcarcontainer.vue'
import SearchContainer from './components/tabbar/Searchcontainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

//创建路由对象
 const router = new VueRouter({
    routes:[//匹配路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        // {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/newsinfo/',component:NewsInfo},
    ],
    linkActiveClass:'mui-active'

})



// 把路由对象暴露出去
export default router