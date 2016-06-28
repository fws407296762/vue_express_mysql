<template>
    <div class="page-content">
        <div class="page-header">
            <h1>今日新闻</h1>
        </div>
        <div class="page-body">
            <div class="news-channel-list">
                <a v-link="{name:'newsChannel',params:{channelid:c.channelId},activeClass: 'channel-active'}" role="button" @click="channelSelect(c.channelId)" v-text="c.channelName" v-for="c in channel"></a>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="tal">标题</th>
                        <th>栏目</th>
                        <th>来源</th>
                        <th>日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="news.length" v-for="n in news">
                        <td><a v-link="{path:'/news/page',query:{id:n.id}}" v-text="n.title"></a></td>
                        <td class="tac cgray" v-text="n.channelName"></td>
                        <td class="tac"><a :href="n.sourceurl" target="_blank" v-text="n.source"></a></td>
                        <td class="tac cgray" v-text="n.datetime"></td>
                        <td class="tac action-box">
                            <button class="iconfont icon-edit"></button>
                            <button class="iconfont icon-delete"></button>
                        </td>
                    </tr>
                    <tr v-if="!news.length">
                        <td colspan="5" class="tac" v-text="loading"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
    .data-table{width: 100%;border-collapse: collapse;}
    .data-table th,.data-table td{height: 36px;padding-left: 10px;padding-right: 10px;border-bottom: 1px solid #ddd;}
    .data-table th{background: #f3f3f3;}
    .data-table a{color: #0885bd;}
    .channel-name{color: #999;}
    .action-box button{color: #999;cursor: pointer;}
    .action-box button:hover{color: #333;}
    .news-channel-list a{display: inline-block;border: 1px solid #ddd;padding: 5px 10px;border-radius: 4px;color: #666;margin-right: 10px;margin-bottom: 10px;}
    .news-channel-list a:hover,.news-channel-list a.channel-active{background: #2db7f5;color: #fff;border: 1px solid #0885bd;}
</style>

<script>
    export default {
        data (){
            return {
                news:[],
                channel:[{"channelId":"0","channelName":"全部"}],
                loading:""
            }
        },
        methods :{
            channelSelect:function(channelid){
                channelid = channelid === "0" ? "" : channelid;
                this.showNewsList({
                    channelid:channelid
                })
            },
            showNewsList:function(options){
                let self = this;
                let data = {
                        page:1,
                        pageno:20
                    };
                if(options){
                    for(let i in options){
                        data[i] = options[i]
                    }
                }
                this.$http({
                    url:"/admin/getNewsList",
                    data:data,
                    beforeSend:function(request){
                        self.loading = "正在加载数据..."
                    }
                }).then(function(getData){
                    self.loading = "加载完成";
                    let data = getData.data;
                    let code = parseInt(data.code),
                        msg = data.msg;
                    let news = data.data;
                    self.news = news;
                }).catch(function(err){
                    console.log(err);
                });
            }
        },
        ready () {
            let self = this;
            let channelid = this.$route.params.channelid;
            channelid = channelid === "0" ? "" : channelid;
            
            this.$http({
                url:"/admin/getChannel"
            }).then(function(getData){
                getData = getData.data;
                let code = parseInt(getData.code);
                let msg = getData.msg;
                if(code){
                    return Promise.reject(msg);
                }
                getData.data.forEach(function(item){
                    self.channel.push(item);
                })
            });
            this.showNewsList({
                channelid:channelid
            });
        }
    }

 
</script>