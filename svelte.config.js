//import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'

const dev = process.argv.includes('dev')

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
		paths: {
			base: dev ? '' : process.env.BASE_PATH,
		},
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
