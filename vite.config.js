import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-simple-typewriter'],
    exclude: ['some-other-weird-package-if-needed']
  }
})
