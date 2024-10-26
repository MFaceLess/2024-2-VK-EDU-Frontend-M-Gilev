import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/2024-2-VK-EDU-Frontend-M-Gilev/',
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({server: {
//     base: '2024-2-VK-EDU-Frontend-M-Gilev',
//     watch: {
//       usePolling: true,
//     },
//   },
//     plugins: [react()],
// })