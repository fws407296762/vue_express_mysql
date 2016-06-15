<template>
    <div class="page-content">
        <div class="page-header">
            <h1 v-text="title"></h1>
            <div class="news-info">
                <span class="news-info-item">创建日期：{{datetime}}</span>
                <span class="news-info-item news-info-channel">所属栏目：<a v-link="{name:'newsChannel',params:{channelid:channelId}}" v-text="channelName"></a></span>
                <span class="news-info-item">来源：<a target="_blank" href="{{sourceurl}}" v-text="source"></a></span>
            </div>
        </div>
        <div class="page-body" v-html="html"></div>
    </div>
</template>

<style>
    .page-header{margin-top: 10px}
    .news-info{color: #999;font-size: 12px;margin-top: 5px;}
    .news-info-item{margin-right: 10px}
    .news-info-item a{color: #0885bd;}
    .news-info-item a:hover{color: #065679;}
    .page-body{color: #666;}
    .page-body p{font-size: 14px;line-height: 25px;margin-top: 0;margin-bottom: 15px;}
    .image{text-align: center;}
</style>

<script>
    module.exports = {
        data:function(){
            return {
                title:"",
                datetime:"",
                channelName:"",
                channelId:"",
                sourceurl:"",
                source:"",
                html:""
            }
        },
        ready:function(){
            let id = this.$route.query.id;
            let self = this;
            this.$http({
                url:"/admin/getNewsOne",
                data:{
                    id:id
                }
            }).then(function(getData){
                getData = getData.data;
                let code = parseInt(getData.code);
                if(code){
                    return;
                }
                let result = getData.result;
                self.title = result.title;
                self.datetime = result.datetime;
                self.channelName = result.channelName;
                self.channelId = result.channelId;
                self.sourceurl = result.sourceurl;
                self.source = result.source;
                let html = result.content;
                console.log(self.sourceurl)
                html = html.replace(/(\<p\>)(\s*)/g,"$1");
                self.html = html;
            }).catch(function(err){
                console.log(err);
            })
        }
    }
</script>
