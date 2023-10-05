<script lang="ts" context="module">
	async function getImageUrl(file: string): Promise<string> {
		return file
	}
</script>

<script lang="ts">
	import { writable } from 'svelte/store'
	import { onMount, onDestroy } from 'svelte'

    export let filename: string
	export let title: string | undefined = undefined
	export let description: string | undefined = undefined
	export let crop: boolean = false

	const file = writable(filename)
	let image: { src: string } | undefined

	$: alt = title ?? description ?? filename
	$: file.update(() => filename)

	onMount(() => {
		file.subscribe(async f => {
			image = new Image
			image.src = await getImageUrl(f)
		})
	})

	onDestroy(() => image = undefined)

</script>

<picture class:crop>
	{#if image}
		<img src={image.src} {alt} loading="lazy" decoding="async" />
	{/if}
	{#if description}
		<!-- svelte-ignore a11y-structure -->
		<figcaption>{description}</figcaption>
	{/if}
</picture>

<style>
	picture {
		position: relative;
		width: 100%;
        overflow: hidden;
		border-radius: var(--round-big);
	}

	.crop {
		height: 200px;
		height: 300px;
		height: 400px;
	}

	picture::before {
		content: 'načítám...';
		position: absolute;
		z-index: -1;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #525252;
		color: #a3a3a3;
		font-size: 2rem;
		font-weight: bold;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	figcaption {
		font-size: var(--text-small);
		text-align: center;
		margin-top: 0.85rem;
		color: var(--color-text-shade);
	}
</style>
