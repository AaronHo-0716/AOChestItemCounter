import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://aaronho-0716.github.io/AOChestItemCounter",
  plugins: [react()],
})
