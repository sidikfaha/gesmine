<template>
	<div class="home">
		<v-container>
			<v-row>
				<v-col md="12">
					<v-list rounded>
						<v-subheader>Historique des calculs</v-subheader>
						<v-list-item-group v-model="selectedItem" color="primary">
							<v-list-item v-for="(item, i) in rows" :key="i" @click="modal = true">
								<v-list-item-icon>
									<v-icon>mdi-history</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title v-text="`Calcul n°${item.id}`"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
			</v-row>
		</v-container>
		<v-row>
			<v-col>
				<v-dialog v-model="modal" fullscreen hide-overlay transition="dialog-bottom-transition">
					<v-card class="pa-0" flat raised>
						<v-container fluid>
							<v-row tile>
								<v-col>
									<v-toolbar flat dark color="primary">
										<v-btn icon dark @click="modal = false">
											<v-icon>mdi-close</v-icon>
										</v-btn>
										<v-toolbar-title>Informations sur le calcul n° {{ selectedRow.id }}</v-toolbar-title>
									</v-toolbar>
								</v-col>
							</v-row>
							<v-row>
								<v-col lg="6">
									<h4>Données</h4>
									<v-card>
										<v-list-item two-line v-for="(l, i) in labels" :key="i">
											<v-list-item-content>
												<v-list-item-title>{{ l.t }}</v-list-item-title>
												<v-list-item-subtitle>{{ selectedRow[l.id] }}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-card>
									<point-graphe :d="selectedRow"/>
								</v-col>
								<v-col lg="6" class="py-lg-0 py-6">
									<cc-results :d="selectedRow" v-if=" selectedRow.lbi === null"></cc-results>
									<cbi-results v-else :d="selectedRow"></cbi-results>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="js">
	import Vue from "vue"
	import {ipcRenderer} from "electron"
	import CcResults from "../components/cc-results.vue"
	import CbiResults from "../components/cbi-results.vue"
	import PointGraphe from "../components/PointGraphe.vue"

	export default Vue.extend({
		name: "Home",
		components: {CcResults, CbiResults, PointGraphe},
		data() {
			return {
				rows: [],
				selectedItem: 0,
				modal: false,
				labels: [
					{
						t: 'Longeur du trou',
						id: 'lt'
					},
					{
						t: 'Diametre du trou',
						id: 'dt'
					},
					{
						t: 'Banquette',
						id: 'b'
					},
					{
						t: 'Espacement',
						id: 'e'
					},
					{
						t: 'Nombre de trou',
						id: 'nt'
					},
					{
						t: 'Nombre de rangés',
						id: 'nr'
					},
					{
						t: 'Nombre de trou par rangé',
						id: 'ntpr'
					},
					{
						t: 'Longueur de bourrage intermédiaire',
						id: 'lbi'
					},
				],
				mobile: false
			}
		},
		computed: {
			selectedRow: function () {
				return this.rows[this.selectedItem || 0]
			},
		},
		mounted() {
			if (!this.mobile) {
				ipcRenderer.send('get-latest', 'cas_continu')
				ipcRenderer.on('reply:get-latest', (event, args) => {
					this.rows = args
				})
			}
		}
	});
</script>
