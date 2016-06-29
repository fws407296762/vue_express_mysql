<template>
    <div class="datepicker-box">
        <input type="text" name="" id="" class="form-control">
        <div class="datepicker-select-box">
            <div class="datepicker-select-header">日期选择器</div>
            <div class="datepicker-select-body">
                <table class="datepicker-select-table">
                    <thead>
                        <tr>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>{{getFirstDayWeek}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="d in day" v-text="d+1"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
    .datepicker-box{position: relative;}
    .datepicker-select-box{width: 300px;}
    .datepicker-select-header{border: 1px solid #ddd;text-align: center;height: 30px;background: #f0f0f0;line-height: 30px;}
    .datepicker-select-table{border: none;border-collapse: collapse;width: 100%;}
    .datepicker-select-table th{border: 1px solid #ddd;border-top: none;height: 30px;}
</style>

<script>
    module.exports = {
        props:{
            day:0
        },
        methods:{
            getMonthDay:function(year,month){
                var date = new Date(year,month,0);
                return date.getDate();
            }
        },
        computed:{
            initDatepicker:function(){
                var date = new Date();
                var year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate(),
                    week = date.getDay() + 1;
                return {
                    days:this.getMonthDay(year,month),
                    day:day,
                    week:week,
                    year:year,
                    month:month
                };
            },
            getFirstDayWeek:function(){
                var initDatepicker = this.initDatepicker;
                var year = initDatepicker.year,
                    month = initDatepicker.month-1;
                var date = new Date(year,month,1);
                return date.getDay();
            },
            renderData:function(){
                var initDatepicker = this.initDatepicker;
                var days = initDatepicker.days,   //获取总天数
                    week = this.getFirstDayWeek;  //获取1日是星期几
                var daysAry = [];
                //构建日期数组
                var weeks = Math.ceil(days/7);  //获取有多少个星期
                var _days = days;
                var date = 1;
                for(var i = 0;i<weeks;i++){
                    daysAry[i] = [];
                    for(var j = 0;j<7;j++){
                        if(j < week && date === 1 || date > days){
                            daysAry[i][j] = 0;
                            continue;
                        }
                        daysAry[i][j] = date++;
                    }
                }
                return daysAry;
            },
            renderDatepicker:function(){

            }
        },
        ready:function(){
            var initDatepicker = this.initDatepicker;
            this.day = initDatepicker.days;
            console.log(this.renderData);
        }
    }
</script>