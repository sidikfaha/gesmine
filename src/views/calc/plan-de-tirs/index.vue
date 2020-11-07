<template>
	<div class="pt-5">
		<h1>Plans de tirs</h1>
		<small>Veuillez choisir le type de chargement</small>
		<v-container class="pt-2">
			<v-row>
				<v-col>
					<v-btn class="mr-2" text x-large color="primary" :to="{ name: 'first' }">
						<v-icon>mdi-math-compass</v-icon> Continu
					</v-btn>
					<v-btn text x-large color="primary" :to="{ name: 'accueil' }">
						<v-icon>mdi-math-compass</v-icon> Avec bourrage
						intermédiaire
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<v-container class="pt-4">
			<router-view />
		</v-container>
	</div>
</template>

<script>
export default {
	name: "calc-index",
	data: () => ({})
};
</script>

<style scoped></style>
