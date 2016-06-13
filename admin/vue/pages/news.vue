<template>
    <div class="page-content">
        <div class="page-header">
            <h1>今日新闻</h1>
        </div>
        
    </div>
</template>

<script>
    export default {
        ready () {
            this.$http({
                url:"/admin/getNews",
                data:{
                    page:2,
                    pageno:10
                }
            }).then(function(data){
                console.log(data);
            },function(err){
                console.log(err);
            })
        }
    }
</script>