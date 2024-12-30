// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     base: '/2024-2-VK-EDU-Frontend-M-Gilev/',
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/2024-2-VK-EDU-Frontend-M-Gilev',
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://vkedu-fullstack-div2.ru/api',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//     watch: {
//       usePolling: true,
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2024-2-VK-EDU-Frontend-M-Gilev',
  server: {
    proxy: {
      '/api': {
        target: 'https://vkedu-fullstack-div2.ru/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },

    watch: {
      usePolling: true
    }
  },
  plugins: [react()]
})
