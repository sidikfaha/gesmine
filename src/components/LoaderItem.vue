<template>
	<div class="loader">
		<span>{{ text || 'Chargement' }}...</span>
	</div>
</template>
<script>
	export default {
		name: 'loader-item',
		props: ['text']
	}
</script>

<style lang="scss">
	.loader{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #fffd;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		cursor: wait;
	}
</style>