<template>
	<div class="pt-5">
		<h1>Calcul des prévensions</h1>
		<v-container class="pt-4">
			<div>
				<div>
					<v-row>
						<v-col>
							<v-row>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.pap" label="Production annuelle planifiee"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.teff" label="Temps effectif de travail"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.h" label="temps de travail"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kr" label="Coefficient de remplissage"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.njm" label="Nombre de jour de travail/mois"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.nja" label="Nombre de jour de travail/an"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.v" label="Volume du godet de la pelle"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.ku" label="Coefficient d’utilisation"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.kip" label="Coefficient d’irrégularité de la production"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.nc" label="Coefficient de compactage du matériau"/>
								</v-col>
								<v-col md="3" cols="6">
									<v-text-field v-model="d.d" label="Distance de transport"/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn color="primary" large @click="calc" rounded class="mr-2" :loading="loading">
										Calculer
									</v-btn>
									<v-btn :disabled="!calculated" color="green" rounded large class="mr-2" @click="save"
												 :loading="loadingSave">
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
														<td>Production mensuelle</td>
														<td>{{ pm }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Production journalière de la mine</td>
														<td>{{ pjm }} tonnes/jour</td>
													</tr>
													<tr>
														<td>Production horaire de la mine</td>
														<td>{{ phm }} tonnes/heure</td>
													</tr>
													<tr>
														<td>Production annuelle des camions</td>
														<td>{{ pac }} tonnes/an</td>
													</tr>
													<tr>
														<td>Production mensuelle des camions</td>
														<td>{{ pmc }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Production journalière des camions</td>
														<td>{{ pjc }} tonnes/jour</td>
													</tr>
													<tr>
														<td>Production horaire des camions</td>
														<td>{{ phc }} tonnes/heure</td>
													</tr>
													<tr>
														<td>Rendement horaire des camions</td>
														<td>{{ rhc }} tonnes/heure</td>
													</tr>
													<tr>
														<td>Rendement journalier des camions</td>
														<td>{{ rjc }} tonnes/jour</td>
													</tr>
													<tr>
														<td>Rendement mensuelle des camions</td>
														<td>{{ rmc }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Rendement annuelle des camions</td>
														<td>{{ rac }} tonnes/an</td>
													</tr>
													<tr>
														<td>Nombre de camions</td>
														<td>{{ nca }} camions</td>
													</tr>
													<tr>
														<td>Nombre de camions</td>
														<td>{{ nca }} camions</td>
													</tr>
													<tr>
														<td>Volume Géométrique de la benne des camions</td>
														<td>{{ vgbc }} m<sup>3</sup></td>
													</tr>
													<tr>
														<td>Le nombre de godet</td>
														<td>{{ ng }} godets</td>
													</tr>
													<tr>
														<td>Temps de cycle des camions</td>
														<td>{{ tcc }} min</td>
													</tr>
													<tr>
														<td>Nombre de cycle de camions par jour</td>
														<td>{{ nccpj }} cycle/jour</td>
													</tr>
													<tr>
														<td>Production Annuelle de la pelle excavatrice</td>
														<td>{{ pape }} tonnes/an</td>
													</tr>
													<tr>
														<td>Production mensuelle de la pelle</td>
														<td>{{ pmpe }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Production journalière de la pelle</td>
														<td>{{ pjpe }} tonnes/jour</td>
													</tr>
													<tr>
														<td>Production horaire de la pelle</td>
														<td>{{ phpe }} tonnes/heure</td>
													</tr>
													<tr>
														<td>Rendement horaire de la pelle</td>
														<td>{{ rhpe }} tonnes/heure</td>
													</tr>
													<tr>
														<td>Rendement journalier de la pelle</td>
														<td>{{ rjpe }} tonnes/jour</td>
													</tr>
													<tr>
														<td>Rendement mensuelle de la pelle</td>
														<td>{{ rmpe }} tonnes/mois</td>
													</tr>
													<tr>
														<td>Rendement annuelle de la pelle</td>
														<td>{{ rape }} tonnes/an</td>
													</tr>
													<tr>
														<td>Nombre de pelle excavatrice</td>
														<td>{{ npe }} pelles</td>
													</tr>
													<tr>
														<td>Temps de cycle</td>
														<td>{{ tc }} min</td>
													</tr>
													<tr>
														<td>Nombre de cycle des pelles</td>
														<td>{{ ncp }} cycles</td>
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
		name: "index",
		data: () => ({
			d: {
				pap: 0, // Production annuelle planifiee
				teff: 0, // temps effectif de travail
				h: 0, // temps de travail
				kr: 0, // Coefficient de remplissage
				njm: 0, // Nombre de jour de travail par mois
				nja: 0, // nombre de jour de travail par an
				v: 0, // volume du godet de la pelle
				ku: 0, // Coefficient d’utilisation
				kip: 0, // coefficient d’irrégularité de la production
				nc: 0, // coefficient de compactage du matériau
				d: 0, // la distance de transport
			},

			loading: false,
			snackbar: false,
			loadingSave: false,
			text: '',

			pm: 0,
			pjm: 0,
			phm: 0,
			pac: 0,
			pmc: 0,
			pjc: 0,
			phc: 0,
			rhc: 0,
			rjc: 0,
			rmc: 0,
			rac: 0,
			nca: 0,
			vgbc: 0,
			ng: 0,
			tcc: 0,
			nccpj: 0,
			pape: 0,
			pmpe: 0,
			pjpe: 0,
			phpe: 0,
			rhpe: 0,
			rjpe: 0,
			rmpe: 0,
			rape: 0,
			npe: 0,
			tc: 0,
			ncp: 0,
		}),
		methods: {
			calc() {
				this.loading = true
				this.calculated = false

				this.pm = Math.ceil(this.d.pap / (12 * this.d.kip * 0.9))
				this.pjm = Math.ceil(this.pm / (30 * this.d.kip))
				this.phm = Math.ceil(this.pjm / (this.d.h * this.d.kip))
				this.pac = Math.ceil(this.phm * this.d.h * 365 * 0.89)
				this.pmc = Math.ceil(this.phm * this.d.h * 30 * 0.9)
				this.pjc = Math.ceil(this.phm * this.d.h * 0.9)
				this.phc = Math.ceil(this.phm * 0.9)
				this.rhc = Math.ceil(this.phc / 0.98)
				this.rjc = Math.ceil(this.rhc * this.d.h)
				this.rmc = Math.ceil(this.rjc * this.d.kip * 30)
				this.rac = Math.ceil(this.rmc * this.d.kip * 12)
				this.nca = Math.ceil((this.pjc * 1.2) / this.rjc) + 1
				this.vgbc = Math.ceil((this.d.d <= 1.2 ? (5 * this.d.v) : this.d.d >= 1.5 || this.d.d < 5 ? (9 * this.d.v) : (this.d.v * 10)))
				this.ng = Math.ceil(this.vgbc / (this.d.v * this.d.kr * this.nca)) + 1
				this.tcc = Math.ceil((this.d.teff * this.d.h * this.ng * this.d.v * this.d.kr * this.d.nc) / this.rjc)
				this.nccpj = Math.ceil((this.d.teff * this.d.h * this.ng * this.d.v * this.d.ku) / this.tcc) + 1
				this.pape = Math.ceil(1.1 * this.d.pap)
				this.pmpe = this.pape / (12 * this.d.kip)
				this.pjpe = this.pmpe / (30 * this.d.kip)
				this.phpe = this.pjpe / (this.d.h)
				this.rhpe = this.phpe / 0.98
				this.rjpe = this.rhpe * this.d.h
				this.rmpe = this.rjpe * this.d.kip * 30
				this.rape = this.rmpe * this.d.kip * 12
				this.npe = Math.ceil(((this.pjpe * 1.2) / this.rjpe) > 1 ? (this.pjpe * 1.2) / this.rjpe : 1) + 8.5
				this.tc = (this.d.teff * this.d.h * this.ng * this.d.v * this.d.kr * this.d.nc) / this.rjpe
				this.ncp = Math.ceil((this.d.teff * this.d.h * this.d.ku) / this.tc) + 1

				setTimeout(() => {
					this.calculated = true
					this.loading = false
				}, 500)

			},
			save() {

				ipcRenderer.send('save-datas', {
					table: 'prevision_data', datas: [
						this.d.pap,
						this.d.teff,
						this.d.h,
						this.d.kr,
						this.d.njm,
						this.d.nja,
						this.d.v,
						this.d.ku,
						this.d.kip,
						this.d.nc,
						this.d.d,
						new Date().getTime()
					]
				})

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
