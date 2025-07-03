import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
   server: {
    historyApiFallback: true, // 🔥 This will fix refresh 404s on dynamic routes
  },
})
