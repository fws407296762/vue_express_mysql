import "../scss/index.scss";
import Vue from "./lib/vue.min";
import VueRouter from "./lib/vue-router.min";
import {configRouter} from "../../vue/router";
import VApp from '../../vue/app.vue';

Vue.use(VueRouter);

const router = new VueRouter({});
configRouter(router);
router.start(Vue.extend(VApp),"#root");