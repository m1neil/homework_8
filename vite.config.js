import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@src': '/src', // Алиас для папки src
			'@components': '/src/components', // Алиас для папки components,
			'@pages': '/src/pages',
			'@styles': '/src/styles',
			'@img': '/src/assets',
		},
	},
})
