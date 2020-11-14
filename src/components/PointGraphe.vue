<template>
	<v-row class="py-4" v-if="isSquared">
		<v-col>
			<h3>Graphe</h3>
			<div id="box-points" style="width: 500px">
				<div v-for="i in getSqrt" :key="i"  :style="`position: relative;margin-left:${d.e * i}px`">
					<span
						:style="`width: 7px;height: 7px;border-radius:50%;position:absolute;background-color: #00AAAAFF;top:${j * d.b}px`"
						v-for="j in getSqrt"
						:key="j"></span>
				</div>
			</div>
		</v-col>
	</v-row>
</template>
<script lang="js">
	export default {
		name: 'point-graphe',
		props: {
			d: {}
		},
		computed: {
			isSquared() {
				console.log(Math.pow(Math.ceil(Math.sqrt(this.d.nt)), 2))
				console.log(this.d.nt)
				return Math.pow(Math.ceil(Math.sqrt(this.d.nt)), 2) === this.d.nt
			},
			getSqrt() {
				return Math.sqrt(this.d.nt)
			}
		}
	}
</script>