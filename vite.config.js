import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Alterado de 'terser' para 'esbuild' para evitar o erro de instalação
    minify: 'esbuild', 
  },
  // Se você quer remover o console.log usando o esbuild (padrão do Vite)
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
