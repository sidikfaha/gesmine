<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<v-row>
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
</template>

<script>
	export default {
		name: "cc-results",
		props: {
			d: {
				lt: 0,
			}
		},
		data() {
			return {
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
			}
		},
		methods: {
			calc() {
				this.lb = this.d.b
				this.m = this.d.e * this.d.b
				this.c = this.m * this.d.nt * this.d.lt
				this.t = this.c * 2700
				this.ltf = this.d.nt * this.d.lt
				this.yp = Math.round(this.d.lt / 1.6)
				this.lcp = this.yp * 0.4
				this.ng = this.yp * this.d.nt
				this.ncg = this.ng / 9
				this.mtg = this.ncg * 25
				this.hcc = this.d.lt - (this.lb + this.lcp)
				this.nsnpt = this.hcc * 6.615767
				this.mtn = this.nsnpt * 25
				this.cu = (this.mtg + this.mtn) / this.d.nt
				this.cs = ((this.mtg + this.mtn) * 1000) / this.c
				this.nccd = (0.008 * (this.d.lt + 1) * this.d.nt + (this.d.ntpr - 1) * this.d.nr)

				// Arreter le chargement
				setTimeout(() => {
					this.loading = false;
					this.calculated = true
				}, 500)
			},
		},
		mounted() {
			this.calc()
		}
	}
</script>

<style scoped>

</style>