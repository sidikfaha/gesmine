<template>
	<div>

	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			d: {
				pap: 0, // Production annuelle planifiee
				teff: 0, // temps effectif de travail
				h: 0, // temps de travail
				kr: 0, // Coefficient de remplissage
				njm: 0, // Nombre de jour de travail par mois
				nja: 0,
				v: 0,
				ku: 0,
				kip: 0,
				nc: 0,
				d: 0,
			},

			loading: false,
			snackbar: false,
			loadingSave: false,

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
				this.pm = Math.ceil(this.d.pap / (12 * this.d.kip * 0.9))
				this.pjm = Math.ceil(this.pm / (30 * this.d.kip))
				this.phm = Math.ceil(this.pjm / (this.d.h * this.d.kip))
				this.pac = Math.ceil( this.phm * this.d.h * 365 * 0.89 )
				this.pmc = Math.ceil( this.phm * this.d.h * 30 * 0.9 )
				this.pjc = Math.ceil( this.phm * this.d.h * 0.9 )
				this.phc = Math.ceil( this.phm * 0.9 )
				this.rhc = Math.ceil( this.phc / 0.98 )
				this.rjc = Math.ceil( this.rhc * this.d.h )
				this.rmc = Math.ceil( this.rjc * this.d.kip * 30 )
				this.rac = Math.ceil( this.rmc * this.d.kip * 12 )
				this.nca = Math.ceil( (this.pjc * 1.2) / this.rjc ) + 1
				this.vgbc = Math.ceil( ( this.d.d <= 1.2 ? (5 * this.d.e) : this.d.d >= 1.5 || this.d.d < 5 ? (9 * this.d.e) : (this.d.e * 10) ) )
				this.ng = Math.ceil( this.vgbc / ( this.d.e * this.d.kr * this.d.nca ) ) + 1
				this.tcc = Math.ceil( (this.d.teff * this.d.h * this.ng * this.d.e * this.d.kr * this.d.nc) / this.rjc )
				this.nccpj = Math.ceil( (this.d.teff * this.d.h * this.ng * this.d.e * this.d.ku) / this.tcc )

			},
			save() {
				return false
			}
		}
	}
</script>
