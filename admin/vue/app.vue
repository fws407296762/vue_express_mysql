<template>
    <header class="header clearfix">
        <h1 class="logo">松鼠闹IT</h1>
    </header>
    <router-view></router-view>
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
</style>

<script>
    export default {
        
    }
</script>
