<template>
    <div class="page-content">
        <div class="page-header">
            <h1>今日新闻</h1>
        </div>
        <div class="page-body">
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
                    <tr v-for="n in news">
                        <td><a href="#/news/{{n.id}}" v-text="n.title"></a></td>
                        <td class="tac"><span class="channel-name" v-text="n.channelName"></span></td>
                        <td class="tac"><a :href="n.link" target="_blank" v-text="n.source"></a></td>
                        <td class="tac" v-text="n.datetime"></td>
                        <td class="tac">
                            <button>编辑</button>
                            <button>删除</button>
                        </td>
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
    .channel-name{color: #666;}
</style>

<script>
    export default {
        data (){
            return {
                news:[],
                loading:""
            }
        },
        ready () {
            let self = this;
            this.$http({
                url:"/admin/getNews",
                data:{
                    page:1,
                    pageno:10
                },
                beforeSend:function(request){
                    self.loading = "正在加载数据..."
                }
            }).then(function(getData){
                self.loading = "加载完成";
                let data = getData.data;
                let code = parseInt(data.code),
                    msg = data.msg;
                let news = data.data;
                news = news.map(function(item){
                    let date = new Date(item.datetime).toLocaleString();
                    console.log(date)
                    return item;
                })
                self.news = news;
            }).catch(function(err){
                console.log(err);
            })
        }
    }
</script>