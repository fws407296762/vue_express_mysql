import Vue from "./lib/vue.min";
import VueRouter from "./lib/vue-router.min";
Vue.use(VueRouter);
import VNav from '../../vue/nav.vue';
import VApp from '../../vue/app.vue';


Vue.config.debug = true;

let App = Vue.extend({});
let router = new VueRouter();

var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})
var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})
router.map({
    "/":{
        component:Foo
    },
    "/news":{
        component:Bar
    },
})
router.start(App,"#app");

new Vue({
    el:"body",
    components:{
        VApp:VApp,
        VNav:VNav
    }
})