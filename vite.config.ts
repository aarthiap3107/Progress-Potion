import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['efficiency.png', 'employment.png'],
      manifest: {
        name: 'Progress Potion',
        short_name: 'Progress Potion',
        description: 'Your magical personal productivity OS ⚡',
        theme_color: '#0d0b1e',
        background_color: '#0d0b1e',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'efficiency.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'employment.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})