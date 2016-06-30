<template>
    <div class="page-content">
        <div class="news-edit-content">
            <dl class="edit-item">
                <dt>新闻标题：</dt>
                <dd>
                    <input type="text" class="form-control" v-model="title" name="" id="">
                </dd>
            </dl>
            <dl class="edit-item">
                <dt>栏目名：</dt>
                <dd>
                    <select v-model="channelId" class="form-control" name="" id="">
                        <option :value="c.channelId" v-for="c in channel" v-text="c.channelName"></option>
                    </select>
                </dd>
            </dl>
            <dl class="edit-item source-item">
                <dt>来源：</dt>
                <dd>
                    <input type="text" class="form-control" v-model="source" name="" id="">
                    <input type="text" class="form-control" v-model="sourceurl" name="" id="">
                </dd>
            </dl>
            <dl class="edit-item">
                <dt>更新日期：</dt>
                <dd>
                    <input type="text" v-model="datetime" name="" id="" class="form-control">
                    <!--<v-datepicker></v-datepicker>-->
                </dd>
            </dl>
            <dl class="edit-item">
                <dt>图片：</dt>
                <dd>
                    <div v-for="imgurl in imageurls" class="imageurl-input-box">
                        <input type="text" v-model="imgurl" name="" id="" class="form-control">
                    </div>
                </dd>
            </dl>
        </div>
    </div>
    
</template>
<style>
    .page-header{margin-top: 10px}
    .edit-item:after,.edit-item:before{
        content:"";
        display: table;
    }
    .edit-item:after{
        clear: both;
    }
    .edit-item{padding-left: 100px;}
    .edit-item dt{float: left;width: 100px;margin-left: -100px;text-align: right;color: #666;line-height: 2.8571428;}
    .edit-item dd{margin-left: 10px;}
    input[type="text"].form-control{width: 500px;height: 40px;padding: 10px;border: 1px solid #ddd;color: #333;font-family: "Microsoft YaHei","\5FAE\8F6F\96C5\9ED1";font-size: 14px;}
    select.form-control{width: 500px;height: 40px;border: 1px solid #ddd;font-family: "Microsoft YaHei","\5FAE\8F6F\96C5\9ED1";font-size: 14px;}
    .source-item input[type="text"].form-control:first-of-type{width: 100px;text-align: center;}
    .source-item input[type="text"].form-control:last-of-type{width: 396px;}
    .imageurl-input-box{margin-bottom: 10px;}
</style>
<script>
    import vDatepicker from "../component/vueDatepicker.vue"
    module.exports = {
        components:{
            vDatepicker:vDatepicker
        },
        data:function(){
            return {
                title:"",
                channel:[],
                channelId:"",
                channelName:"",
                source:"",
                sourceurl:"",
                datetime:"",
                imageurls:[]
            }
        },
        ready:function(){
            let self = this;
            let id = this.$route.params.id;

            this.$http({  //获取栏目名
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

            this.$http({  //获取新闻内容
                url:"/admin/getNewsOne",
                method:"GET",
                data:{
                    id:id
                }
            }).then(function(getData){
                getData = getData.data;
                let result = getData.result;
                self.title = result.title;
                self.channelName = result.channelName;
                self.channelId = result.channelId;
                self.source = result.source;
                self.sourceurl = result.sourceurl;
                self.datetime = result.datetime;
                self.imageurls = result.imageurls.split(",");
            }).catch(function(err){
                console.log(err);
            })
        }
    }
</script>