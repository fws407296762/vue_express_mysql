import "../scss/index.scss";
import Vue from "./lib/vue.min";
import VueRouter from "./lib/vue-router.min";
import VueResource from "./lib/vue-resource.min"
import {configRouter} from "../../vue/router";
import VApp from '../../vue/app.vue';

Vue.use(VueRouter);  //路由

Vue.use(VueResource); //异步请求

const router = new VueRouter({});
configRouter(router);
router.start(Vue.extend(VApp),"#root");