<template>
    <ul class="nav">
        <li v-for="n in nav"><a v-link="{path:n.url}" v-text="n.name"></a></li>
    </ul>
    <router-view></router-view>
</template>

<style lang="sass" scoped>
    ul{list-style: none;margin: 0;padding: 0}
</style>

<script>
    
    export default {
        data () {
            return {
                nav:[
                    {name:"首页",url:"/"},
                    {name:"新闻",url:"/news"},
                ]
            }
        }
    }
</script>