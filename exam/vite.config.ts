import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/2024-2-VK-EDU-Frontend-M-Gilev',
  server: {
    watch: {
      usePolling: true
    }
  },
  plugins: [react()]
})