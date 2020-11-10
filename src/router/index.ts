import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import "../assets/scss/app.scss"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "home",
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
	},
	{
		path: "/about",
		name: "About",
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
	},
	{
		path: "/plan-tir",
		name: "plan-tir",
		component: () => import(/* webpackChunkName: "about" */ "../views/calc/plan-de-tirs/index.vue")
	},
	{
		path: "/param-calc",
		name: "param-calc",
		component: () => import(/* webpackChunkName: "about" */ "../views/calc/param-calc/index.vue")
	},
	{
		path: "/param-chargeuse",
		name: "param-chargeuse",
		component: () => import(/* webpackChunkName: "about" */ "../views/calc/param-calc/param-chargeuse.vue")
	},
	{
		path: "/param-camion",
		name: "param-camion",
		component: () => import(/* webpackChunkName: "about" */ "../views/calc/param-calc/param-camion.vue")
	},

];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
