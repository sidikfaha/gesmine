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
									<v-text-field v-model="d.teff" label="Temps effectif de travail" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.tc" label="temps de cycle de l’engins" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kr" label="coefficient de remplissage" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kf" label="le coefficient de foisonnement" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.p" label="densité du matériau" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.h" label="nombre d’heure de travail par jour" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.njm" label="nombre de jour de travail par mois" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.nja" label="nombre de jour de travail par an" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.c" label="facteur de conduite" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.v" label="volume du godet de la pelle" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.ku" label="coefficient d’utilisation du poste" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.d" label="facteur d’expérience de l’opérateur" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kip" label="coefficient d’irrégularité de la production" />
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.n" label="Nombre de camions" />
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
														<td>Nombre des cycles effectué par la chargeuse</td>
														<td>{{ nc }} Cycles</td>
													</tr>
													<tr>
														<td>Rendement de la chargeuse par jour</td>
														<td>{{ rchj }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Rendement de la chargeuse par mois</td>
														<td>{{ rchm }} Tonnes/mois</td>
													</tr>
													<tr>
														<td>Rendement de la chargeuse par an</td>
														<td>{{ rcha }} Tonnes/an</td>
													</tr>
													<tr>
														<td>Production journalière de la chargeuse</td>
														<td>{{ pjp }} Tonnes/jour</td>
													</tr>
													<tr>
														<td>Production mensuelle de la chargeuse</td>
														<td>{{ pmc }} Tonnes/mois</td>
													</tr>
													<tr>
														<td>Production annuelle de la chargeuse</td>
														<td>{{ pac }} Tonnes/an</td>
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
		name: "chargeuse",
		data: () => ({
			d: {
				teff: 0, // le temps effectif de travail
				tc: 0, // le temps de cycle de l’engins
				kr: 0, // le coefficient de remplissage
				kf: 0, // le coefficient de foisonnement
				p: 0, // la densité du matériau
				h: 0, // le nombre d’heure de travail par jour
				njm: 0, // le nombre de jour de travail par mois
				nja: 0, // le nombre de jour de travail par an
				c: 0, // le facteur de conduite
				v: 0, // le volume du godet de la pelle
				ku: 0, // coefficient d’utilisation du poste
				d: 0, // facteur d’expérience de l’opérateur
				kip: 0, // coefficient d’irrégularité de la production
				n: 0, // Nombre de camions
			},
			loading: false,
			loadingSave: false,
			calculated: false,
			nc: 0,
			rchj: 0,
			rchm: 0,
			rcha: 0,
			pjp: 0,
			pmc: 0,
			pac: 0,

			text: '',
			snackbar: false
		}),
		methods: {
			calc(){
				this.loading = true
				this.calculated = false

				this.nc = (this.d.teff * this.d.h * this.d.ku) / this.d.tc
				this.rchj = (this.d.teff * this.d.v * this.d.h * this.d.kr * this.d.ku * this.d.p) / (this.d.tc * this.d.kf)
				this.rchm = this.rchj * 30
				this.rcha = this.rchm * 12
				this.pjp = (this.nc * this.d.v * this.d.kip * this.d.p * this.d.d * this.d.c * this.d.h * this.d.kr) / this.d.kf
				console.log(this.d)
				this.pmc = this.pjp * 30 * this.d.kr
				this.pac = this.pjp * 365 * this.d.kr

				setTimeout(() => {
					this.calculated = true
					this.loading = false
				}, 500)
			},
			save(){

				ipcRenderer.send('save-datas', {table: 'chargeuse_data', datas: [
					this.d.teff,
					this.d.tc,
					this.d.kr,
					this.d.kf,
					this.d.p,
					this.d.h,
					this.d.njm,
					this.d.nja,
					this.d.c,
					this.d.v,
					this.d.ku,
					this.d.d,
					this.d.kip,
					this.d.n,
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

