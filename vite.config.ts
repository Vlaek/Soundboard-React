import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	build: {
		outDir: 'dist',
	},
	resolve: {
		alias: {
			API: '/src/API',
			components: '/src/components',
			hooks: '/src/hooks',
			store: '/src/store',
			types: '/src/styles',
		},
	},
})
