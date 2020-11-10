<template>
	<v-app>
		<v-app-bar app dark>
			<v-btn text to="/" class="mr-2">
				<v-icon>mdi-home</v-icon> Accueil
			</v-btn>
			<v-btn text class="mr-2" :to="{ name: 'plan-tir' }"> Plan de tir</v-btn>
			<v-btn text class="mr-2" :to="{ name: 'param-calc' }"> Parametres</v-btn>
			<v-spacer />
			<v-btn text color="info" :to="{ name: 'About' }">
				<v-icon>mdi-information</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main style="padding-left: 2em;padding-right: 2em;">
			<transition name="slide-fade">
				<router-view>

				</router-view>
			</transition>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "App",

		data: () => ({
			//
		})
	});
</script>
