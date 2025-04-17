export default defineNuxtConfig({
 devtools: { enabled: false },
 ssr: false,
 srcDir: "src",
 css: ['~/assets/css/main.css'],
 routeRules: {
	"/": { prerender: true }
},
 modules: [
	"@nuxt/ui",
	'@pinia/nuxt'
],
 compatibilityDate: "2025-04-10",
 vite: {
    optimizeDeps: {
      include: ['@tauri-apps/api']
    },
    build: {
      target: ['es2021', 'chrome100', 'safari13'],
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
    }
 },
 typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@tauri-apps/api']
      }
    }
 }
});