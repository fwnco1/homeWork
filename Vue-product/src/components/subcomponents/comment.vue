<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="最多输入180字" maxlength="180" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
            <!-- <div class="cmt-list">
                <div class="cmt-item">
                    <div class="cmt-title">
                        第1楼&nbsp;&nbsp;用户:匿名用户&nbsp;&nbsp;发表时间:2019-02-08 12:12:12
                    </div>
                    <div class="cmt-body">
                        锄禾日当午,汗滴禾下土
                    </div>
                </div>
            </div> -->
            <div class="cmt-list">
                <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time"> 
                    <div class="cmt-title">
                        第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_nanme}}&nbsp;&nbsp;发表时间:{{add_time | dateFormat}}
                    </div>
                    <div class="cmt-body">
                        {{item.content==="undefined"?'此用户很懒,什么都没输入':item.content}}
                    </div>
                </div>
            </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageIndex:1,//默认显示第一页
            comments:[],//所有评论的信息
            msg:'',//用户输入的内容
        }
    },

    created(){
         getComments()
    }
    ,

    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex)
            .then(result=>{
                if (result.body.status==0) {
                    // this.comments = result.body.message
                    //每当获取新数据的时候,应该以老数据拼接上新获取的数据
                    this.comments = this.comments.concat(result.body.message)
                } else {
                    Toast('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageIndex++
            this.getComments()
        },
        postComment(){
            if (this.msg.trim().length==0) {
                return Toast('评论内容不能为空')
            }
            //参数1 请求的url接口地址
            //参数2 提交给服务器的数据对象 {content:this.msg}  trim()清除空格
            this.$http.post('api/postcomment/' + this.$route.params.id,{content:this.msg.trim()})
            .then(result=>{
                if (result.body.status==0) {
                    //1.拼接出一个评论对象
                    var cmt = {
                        user_nanme:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg=""
                }
            })
        }
    },
    props:['id']
}
</script>

<style lang="less" scoped>
    .cmt-container{
        h3 {
            font-size: 16px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
