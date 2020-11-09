<template>
	<div style="position: relative;">
		<loader-item v-if="loading" text="Calcul en cours"/>
		<div>
			<v-row>
				<v-col>
					<h3>Cas d'un chargement continu</h3>
					<v-row>
						<v-col md="4">
							<v-text-field type="number" label="Longeur du trou" v-model="d.lt"/>
							<v-text-field type="number" label="Diametre du trou" v-model="d.dt"/>
						</v-col>
						<v-col md="4">
							<v-text-field type="number" label="Banquette" v-model="d.b"/>
							<v-text-field type="number" label="Espacement" v-model="d.e"/>
						</v-col>
						<v-col md="4">
							<v-text-field type="number" label="Nombre de trou" v-model="d.nt"/>
							<v-text-field type="number" label="Nombre de rangés" v-model="d.nr"/>
						</v-col>
						<v-col md="12">
							<v-text-field type="number" label="Nombre de trou par rangé" v-model="d.ntpr"/>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-btn color="primary" large @click="calc" rounded class="mr-2">
								Calculer
							</v-btn>
							<v-btn color="green" rounded large class="mr-2" @click="ttt">
								<v-icon>mdi-download</v-icon>
								Enregistrer
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
				<v-col v-if="calculated">
					<cc-results :d="d" v-if="calculated" />
				</v-col>
			</v-row>
		</div>
		<v-snackbar v-model="snackbar" :timeout="2000">
			{{ text }}
		</v-snackbar>
	</div>
</template>

<script>
	import LoaderItem from "../../../components/LoaderItem";
	import {ipcRenderer} from "electron"
	import CcResults from "../../../components/cc-results";

	export default {
		name: "chargement-continu",
		components: {CcResults, LoaderItem},
		data() {
			return {
				d: {
					lt: '', // Longeur du trou
					dt: '', // Diametre du trou
					b: '', // Banquette
					e: '', // Espacement
					nt: '', // Nombre de trou
					nr: '', // Nombre de rangés
					ntpr: '', // Nombre de trou par rangé
				},
				loading: false, // Afficher le chargement : true = oui | false = non
				calculated: false, // On a deja effectué au moins un calcul

				snackbar: false,
				text: ""
			}
		},
		methods: {
			calc() {
				this.loading = true
				this.calculated = false
				// Arreter le chargement
				setTimeout(() => {
					this.loading = false;
					this.calculated = true
				}, 500)
			},
			ttt() {
				ipcRenderer.send('test-event', [
					this.d.lt,
					this.d.dt,
					this.d.b,
					this.d.e,
					this.d.nt,
					this.d.nr,
					this.d.ntpr,
					new Date().getTime()
				])

				ipcRenderer.on('test-reply', (event, args) => {
					this.loading =true
					this.text = args === 1 ? "Donnees enregistrees avec succes !" : args
					setTimeout(() => {
						this.loading = false
						this.snackbar = true
					}, 800)
				})
			}
		}
	}
</script>

