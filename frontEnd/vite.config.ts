import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
      port: 5173
  },    
})


// import tailwindcss from '@tailwindcss/vite'
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//         react(),
//         tailwindcss()
//       ],
//   root: "src", // Ensure Vite knows the root folder
//   build: {
//     outDir: "dist",
//   }, // Ensure the output directory is dist
//   server: {    // Ensure the server runs on port 3000          
// });



// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}"
// //   ],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [],
// // }

