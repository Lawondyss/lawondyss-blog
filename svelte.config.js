//import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
		}),
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		alias: {
			'$config': 'src/lib/config.ts',
			'$types': 'src/lib/types.ts',
			'$data': 'src/lib/data.ts',
			'$utils': 'src/lib/utils.ts',
			'$css': 'src/css',
			'$atoms': 'src/components/atoms',
			'$molecules': 'src/components/molecules',
			'$composites': 'src/components/composites',
		},
	},
}

export default config
