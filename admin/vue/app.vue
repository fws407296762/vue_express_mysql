<template>
    <header class="header clearfix">
        <h1 class="logo">简单的小工具</h1>
    </header>
    <div class="main-container clearfix">
        <router-view></router-view>
    </div>
</template>    

<style lang="sass" scoped>
    .header{
        background: #2db7f5;
        color: #fff;
        padding: 12px 20px;
        line-height: 1;
    }
    .logo{
        margin: 0;
        font-size: 24px;
        font-weight: normal;
    }
    .main-container:before{
        display: block;
        content: "";
        position: absolute;
        z-index: -2;
        width: 100%;
        max-width: inherit;
        bottom: 0;
        top: 0;
        background: #fff;
    }
</style>

<script>
    export default {
        
    }
</script>
