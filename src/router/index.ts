import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Home from "../views/Home.vue";
import "../assets/scss/app.scss"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/about",
		name: "About",
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
	},
	{
		path: "/new",
		name: "New",
		component: () => import(/* webpackChunkName: "about" */ "../views/calc/plan-de-tirs/index.vue"),
		children: [
			{
				path: '',
				name: 'accueil',
				component: () => import("../views/calc/plan-de-tirs/accueil.vue")
			},
			{
				path: 'premier-cas',
				name: 'first',
				component: () => import("../views/calc/plan-de-tirs/chargement-continu.vue")
			}
		]
	},

];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
