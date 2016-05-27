<template>
    <div id="sidebar" class="sidebar">
        <ul class="nav">
            <li v-for="n in nav"><a v-link="{path:n.url}" v-text="n.name"></a></li>
        </ul>
    </div>
    <div class="main-content">
        <div class="main-content-inner">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    .sidebar{
        width: 190px;
        float: left;
        background: #f2f2f2;
        border-style: solid;
        border-color: #ccc;
        border-width: 0 1px 0 0;
    }
    .sidebar:before{
        content: "";
        display: block;
        width: inherit;
        background: inherit;
        border-style: inherit;
        border-color: inherit;
        border-width: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
    }
    .sidebar+.main-content{
        margin-left: 190px;
    }
    
    .nav{
        list-style: none;
        padding: 0;
        margin: 0;
        &>li{
            position: relative;
            border-style: solid;
            border-width: 1px 0 0;
            border-color: #e5e5e5;
            &>a{
                display: block;
                height: 40px;
                line-height: 20px;
                color: #585858;
                padding: 10px 15px;
                text-decoration: none;
                font-size: 14px;
            }
            &:last-of-type{
                border-bottom-width: 1px;
            }
            &:hover {
                &:before{
                    display: block;
                }
                &>a{
                    background: #fff;
                    color: #629cc9;
                }
            }
            &:before{
                display: none;
                content: "";
                height: 40px;
                position: absolute;
                left: 0;
                tab-size: 0;
                width: 3px;
                max-width: 3px;
                background: #629cc9;
                overflow: hidden;  
            }
        }
    }
    
    .main-content{
        min-height: 100%;
        padding: 0;
    }
    .main-content:before,.main-content:after{
        content: "";
        display: table;
    }
    .main-content::after{
        clear:both;
    }
    .main-content-inner{
        float: left;
        width: 100%;
    }
</style>

<script>
    
    export default {
        data () {
            return {
                nav:[
                    {name:"首页",url:"/"},
                    {name:"今日新闻",url:"/news"},
                ]
            }
        }
    }
</script>