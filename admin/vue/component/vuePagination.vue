<template>
    <ul class="pagination pagination-md pull-right ">
        <li v-if="this.combination.cur>1"><a v-on:click="combination.cur-- ,pageClick()">上一页</a></li>
        <li v-else class="disabled"><a>上一页</a></li>
        <li v-for="index in indexs" v-bind:class="{'active': combination.cur === index }">
            <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="this.combination.cur != this.combination.all"><a v-on:click="combination.cur++,pageClick()">下一页</a></li>
        <li v-else class="disabled"><a>下一页</a></li>
        <li class="disabled"><a>共<i>{{ combination.all }}</i>页</a></li>
    </ul>
</template>

<style>
    .pagination {
        margin-bottom: 20px;
        margin-top: 20px;
        list-style: none;
        padding: 0;
        text-align: right;
        
    }
    .pagination li{display: inline-block;}
    .pagination li a{display: inline-block;padding: 5px 10px;border: 1px solid #ddd;margin-left: 5px;margin-right: 5px;cursor: pointer;}
    .pagination li.disabled a{cursor: not-allowed;}
    .pagination i{font-style: normal;}
    .pagination li.active a{background: #2db7f5;border: 1px solid #0885bd;color: #fff;}
</style>
<script>
  module.exports = {
    props: ['combination'],
    computed: {
      indexs: function(){
        var left = 1;
        var right = this.combination.all;
        var ar = [];
        if(this.combination.all>= 7){
          if(this.combination.cur > 5 && this.combination.cur < this.combination.all-4){
            left = this.combination.cur - 3;
            right = this.combination.cur + 3;
          }else{
            if(this.combination.cur<=5){
              left = 1;
              right = 7;
            }else{
              right = this.combination.all;
              left = this.combination.all - 6;
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left ++;
        }
        return ar;
      },
    },
    methods: {
      btnClick: function (value) {
        if(value != this.combination.cur){
          this.combination.cur = value;
        }
        // this.$http.get('/'+this.combination.type+'/page'+this.combination.cur, function (data) {
        //   this.combination = data;
        //});
        console.log('现在在'+this.combination.cur+'页');
        this.combination.cb(this.combination.cur)
        // this.combination.callback(value);
      },
      pageClick: function () {
        console.log('现在在'+this.combination.cur+'页');
        this.combination.cb(this.combination.cur)
        // this.$http.get('/'+this.combination.type+'/page'+this.combination.cur, function (data) {
        //   this.combination = data;
        //});
      },
    }
  };
</script>