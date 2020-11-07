<template>
	<div style="position: relative;">
		<loader-item v-if="loading" text="Calcul en cours"/>
		<div>
			<v-row>
				<v-col>
					<h3>Cas d'un chargement continu</h3>
					<v-row :disabled="calculated">
						<v-col md="4">
							<v-text-field type="number" label="Longeur du trou" v-model="lt"/>
							<v-text-field type="number" label="Diametre du trou" v-model="dt"/>
						</v-col>
						<v-col md="4">
							<v-text-field type="number" label="Banquette" v-model="b"/>
							<v-text-field type="number" label="Espacement" v-model="e"/>
						</v-col>
						<v-col md="4">
							<v-text-field type="number" label="Nombre de trou" v-model="nt"/>
							<v-text-field type="number" label="Nombre de rangés" v-model="nr"/>
						</v-col>
						<v-col md="12">
							<v-text-field type="number" label="Nombre de trou par rangé" v-model="ntpr"/>
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
					<v-row>
						<v-col>
							<h3>Résultats des calculs</h3>
							<v-simple-table dark fixed-header>
								<template v-slot:default>
									<thead>
									<tr>
										<th>Elément</th>
										<th>Résultat</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>Longeur de bourrage</td>
										<td>{{ lb }} m²</td>
									</tr>
									<tr>
										<td>Maille</td>
										<td>{{ m }}m²</td>
									</tr>
									<tr>
										<td>Cubage</td>
										<td>{{ m }}m<sup>3</sup></td>
									</tr>
									<tr>
										<td>Tonnage</td>
										<td>{{ t }}t</td>
									</tr>
									<tr>
										<td>La longueur totale forée</td>
										<td>{{ ltf }}m</td>
									</tr>
									<tr>
										<td>La longueur de la charge de pieds</td>
										<td>{{ lcp }}m</td>
									</tr>
									<tr>
										<td>Nombre total de gommes</td>
										<td>{{ ng }} gommes</td>
									</tr>
									<tr>
										<td>Nombre de cartons de gommes</td>
										<td>{{ ncg }} cartons</td>
									</tr>
									<tr>
										<td>Masse totale de gommes</td>
										<td>{{ mtg }} kg</td>
									</tr>
									<tr>
										<td>Nombre de sacs de Nitrate par trou</td>
										<td>{{ nsnpt }} sacs</td>
									</tr>
									<tr>
										<td>Nombre total de Sacs de Nitrate</td>
										<td>{{ ntsn }} sacs</td>
									</tr>
									<tr>
										<td>Masse totale de Nitrate</td>
										<td>{{ mtn }} kg</td>
									</tr>
									<tr>
										<td>Charge Unitaire</td>
										<td>{{ cu }} kg/trou</td>
									</tr>
									<tr>
										<td>Charge Spécifique</td>
										<td>{{ cu }} kg/m³</td>
									</tr>
									<tr>
										<td>Nombre de carton de cordeau détonant</td>
										<td>{{ nccd }} cartons</td>
									</tr>
									</tbody>
								</template>
							</v-simple-table>
						</v-col>
					</v-row>
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

	export default {
		name: "chargement-continu",
		components: {LoaderItem},
		data() {
			return {
				lt: '', // Longeur du trou
				dt: '', // Diametre du trou
				b: '', // Banquette
				e: '', // Espacement
				nt: '', // Nombre de trou
				nr: '', // Nombre de rangés
				ntpr: '', // Nombre de trou par rangé,
				loading: false, // Afficher le chargement : true = oui | false = non
				calculated: false, // On a deja effectué au moins un calcul
				lb: 0, // Longeur de bourage (m²)
				m: 0, // Maille (m2)
				c: 0, // Cubage (m3)
				t: 0, // Tonnage (t)
				ltf: 0, // La longueur totale forée (m)
				yp: 0, // Y'
				lcp: 0, // La longueur de la charge de pieds (m)
				ng: 0, // Nombre total de gommes (gommes)
				ncg: 0, // Nombre de cartons de gommes (cartons)
				mtg: 0, // Masse totale de gommes (kg)
				hcc: 0, // Masse totale de gommes (kg)
				nsnpt: 0, // Nombre de sacs de Nitrate par trou (sacs)
				ntsn: 0, // Nombre total de Sacs de Nitrate (sacs)
				mtn: 0, // Masse totale de Nitrate (kg)
				cu: 0, // Charge Unitaire (kg/trou)
				cs: 0, // Charge Spécifique (kg/m 3 )
				nccd: 0, // Nombre de carton de cordeau détonant (cartons)

				snackbar: false,
				text: ""
			}
		},
		methods: {
			calc() {
				this.loading = true
				this.lb = this.b
				this.m = this.e * this.b
				this.c = this.m * this.nt * this.lt
				this.t = this.c * 2700
				this.ltf = this.nt * this.lt
				this.yp = Math.round(this.lt / 1.6)
				this.lcp = this.yp * 0.4
				this.ng = this.yp * this.nt
				this.ncg = this.ng / 9
				this.mtg = this.ncg * 25
				this.hcc = this.lt - (this.lb + this.lcp)
				this.nsnpt = this.hcc * 6.615767
				this.mtn = this.nsnpt * 25
				this.cu = (this.mtg + this.mtn) / this.nt
				this.cs = ((this.mtg + this.mtn) * 1000) / this.c
				this.nccd = (0.008 * (this.lt + 1) * this.nt + (this.ntpr - 1) * this.nr)

				// Arreter le chargement
				setTimeout(() => {
					this.loading = false;
					this.calculated = true
				}, 500)
			},
			ttt() {
				ipcRenderer.send('test-event', [
					this.lt,
					this.dt,
					this.b,
					this.e,
					this.nt,
					this.nr,
					this.ntpr,
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

