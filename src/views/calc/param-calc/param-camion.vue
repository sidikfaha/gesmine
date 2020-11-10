<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="pt-5">
		<h1>Calcul des paramètres de la chargeuse</h1>
		<v-container class="pt-4">
			<div>
				<div>
					<v-row>
						<v-col>
							<v-row>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.teffc" label="Temps effectif de travail"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.tcc" label="temps de cycle du camion"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kr" label="coefficient de remplissage"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kf" label="le coefficient de foisonnement"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.p" label="densité du matériau"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.h" label="nombre d’heure de travail par jour"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.njm" label="nombre de jour de travail par mois"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.nja" label="nombre de jour de travail par an"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.c" label="facteur de conduite"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.e" label="Capacité nominale du camion"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.v" label="volume du godet de la pelle"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.ku" label="coefficient d’utilisation"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kex" label="facteur d’expérience de l’opérateur"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kip" label="coefficient d’irrégularité de la production"/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn color="primary" large @click="calc" rounded class="mr-2" :loading="loading">
										Calculer
									</v-btn>
									<v-btn :disabled="!calculated" color="green" rounded large class="mr-2" @click="save" :loading="loadingSave">
										<v-icon>mdi-download</v-icon>
										Enregistrer
									</v-btn>
								</v-col>
							</v-row>
						</v-col>
						<transition name="fade">
							<v-col v-if="calculated" cols="12" lg="6">
								<transition name="slide-fade">
									<v-row v-if="calculated">
										<v-col>
											<h3>Résultats des calculs</h3>
											<v-simple-table dark>
												<template v-slot:default>
													<thead>
													<tr>
														<th>Elément</th>
														<th>Résultat</th>
													</tr>
													</thead>
													<tbody>
													<tr>
														<td>ombre de godets</td>
														<td>{{ ng }} Cycles</td>
													</tr>
													<tr>
														<td>onnage de matériau dans le camion</td>
														<td>{{ tmc }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Nombre de cycle par jours</td>
														<td>{{ ncpj }} Cycle /jour</td>
													</tr>
													<tr>
														<td>Rendement des camions par jour</td>
														<td>{{ rcpj }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Rendement camions par mois</td>
														<td>{{ rcpm }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Rendement camions par an</td>
														<td>{{ rcpa }} Tonnes/an</td>
													</tr>
													<tr>
														<td>Production journalière de camion</td>
														<td>{{ pjc }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Production journalière de N camion</td>
														<td>{{ pjnc }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Production mensuelle de camion</td>
														<td>{{ pmc }} Tonnes/mois</td>
													</tr>
													<tr>
														<td>Production Mensuelle de N camion</td>
														<td>{{ pmnc }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Production Annuelle de camion</td>
														<td>{{ pac }} Tonnes/an</td>
													</tr>
													<tr>
														<td>Production Annuelle de N camion(</td>
														<td>{{ panc }} Tonnes/an</td>
													</tr>
													<tr>
														<td>Production journalière de la carrière(</td>
														<td>{{ pjca }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Production mensuelle de la carrière(</td>
														<td>{{ pmca }} Tonnes/mois</td>
													</tr>
													<tr>
														<td>Production an de la carrière(</td>
														<td>{{ paca }} Tonnes/an</td>
													</tr>
													</tbody>
												</template>
											</v-simple-table>
										</v-col>
									</v-row>
								</transition>
							</v-col>
						</transition>
					</v-row>
				</div>
				<v-snackbar v-model="snackbar" :timeout="2000">
					{{ text }}
				</v-snackbar>
			</div>
		</v-container>
	</div>
</template>

<script>
	import {ipcRenderer} from "electron"

	export default {
		name: "param-camion",
		data: () => ({
			d: {
				teffc: 0, // le temps effectif de travail du camion
				tcc: 0, // le temps de cycle du camion
				kr: 0, // le coefficient de remplissage
				kf: 0, // le coefficient de foisonnement
				p: 0, // la densité du matériau
				h: 0, // le nombre d’heure de travail par jour
				njm: 0, // le nombre de jour de travail par mois
				nja: 0, // le nombre de jour de travail par an
				c: 0, // le facteur de conduite
				e: 0, // Capacité nominale du camion
				v: 0, // le volume du godet de la pelle
				ku: 0, // le coefficient d’utilisation
				kex: 0, // facteur d’expérience de l’opérateur
				kip: 0, // coefficient d’irrégularité de la production
			},

			loading: false,
			loadingSave: false,
			calculated: false,

			text: '',
			snackbar: false,

			ng: 0, // Nombre de godets (godets)
			tmc: 0, // Tonnage de matériau dans le camion(tonnes)
			ncpj: 0, // Nombre de cycle par jours (Cycle /jour)
			rcpj: 0, // Rendement des camions par jour
			rcpm: 0, // Rendement camions par mois(tonnes/mois)
			rcpa: 0, // Rendement camions par an(tonnes/an)
			pjc: 0, // Production journalière de camion(tonnes/jour)
			pjnc: 0, // Production journalière de N camion(tonnes/jour)
			pmc: 0, // Production mensuelle de camion(tonnes/mois)
			pmnc: 0, // Production Mensuelle de N camion(tonnes/jour)
			pac: 0, // Production Annuelle de camion(tonnes/an)
			panc: 0, // Production Annuelle de N camion(tonnes/an)
			pjca: 0, // Production journalière de la carrière(tonnes/jour)
			pmca: 0, // Production mensuelle de la carrière(tonnes/jour)
			paca: 0, // Production annuelle de la carrière(tonnes/jour)
			n: 1, // Production annuelle de la carrière(tonnes/jour)

		}),
		methods: {
			calc() {
				this.loading = true
				this.calculated = false

				this.ng =  (this.d.e * this.d.kf) / (this.d.v * this.d.kr * this.d.p)
				this.tmc =  (this.ng * this.d.v * this.d.kr * this.d.p) / this.d.kf
				this.ncpj =  (this.d.teffc * this.d.h * this.d.ku) / this.d.tcc
				this.rcpj =  this.tmc *  this.n
				this.rcpm =  this.rcpj / 30
				this.rcpa =  this.rcpj / 365
				this.pjc =  (this.d.teffc * this.d.h * this.d.ku * this.ng * this.tmc ) / this.d.tcc
				this.pjnc =  this.pjc * this.n
				this.pmc =  this.pjc * this.d.kr * 30
				this.pmnc =  this.pmc * this.n
				this.pac =  this.pjc * this.d.kr * 365
				this.panc =  this.pac * this.n
				this.pjca =  this.pjc * this.n * this.d.kr * 0.8
				this.pmca =  this.pjca * 30 * this.d.kr * 0.75
				this.paca =  this.pmca * 365 * this.d.kr * 0.7

				setTimeout(() => {
					this.calculated = true
					this.loading = false
				}, 500)
			},
			save() {
				ipcRenderer.send('save-datas', {table: 'camion_data', datas: [
						this.d.teffc,
						this.d.tcc,
						this.d.kr,
						this.d.kf,
						this.d.p,
						this.d.h,
						this.d.njm,
						this.d.nja,
						this.d.c,
						this.d.e,
						this.d.v,
						this.d.ku,
						this.d.kex,
						this.d.kip,
						this.n,
						new Date().getTime()
					]})

				ipcRenderer.on('save-reply', (event, args) => {
					this.loadingSave = true
					this.text = args === 1 ? "Donnees enregistrees avec succes !" : args
					setTimeout(() => {
						this.loadingSave = false
						this.snackbar = true
					}, 800)
				})
			}
		}
	}
</script>

<style scoped>

</style>