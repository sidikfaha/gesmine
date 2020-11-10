<template>
	<v-row style="height: 90vh;" justify="space-around" align-content="center">
		<v-col md="6" cols="12">
			<v-card elevation="5" dark color="primary" @click="allons('param-chargeuse')">
				<v-card-text>
					<div class="d-flex flex-column align-center py-9">
						<v-icon size="8em">
							mdi-shovel
						</v-icon>

						<h2 class="py-3">Parametres de la chargeuse</h2>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col md="6" cols="12">
			<v-card elevation="5" dark color="green" @click="allons('param-camion')">
				<v-card-text>
					<div class="d-flex flex-column align-center py-9">
						<v-icon size="8em">
							mdi-truck
						</v-icon>

						<h2 class="py-3">Parametres du camion</h2>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: "index",
		methods: {
			async allons(target = 'home'){
				await this.$router.push({name: target})
			}
		}
	}
</script>
