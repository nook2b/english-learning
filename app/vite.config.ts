/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the app from /<repo>/, so CI passes BASE_PATH.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  define: {
    // Shown in the profile, so it is easy to tell which build a phone runs.
    __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')),
  },
  // Course content lives in /content, outside the app folder.
  server: { fs: { allow: ['..'] } },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Registered in src/app/updates.ts, which also reloads onto a new build.
      injectRegister: false,
      includeAssets: ['icon.svg'],
      workbox: {
        // Sprites are large; cache them as they are first shown instead of precaching all.
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: { cacheName: 'images', expiration: { maxEntries: 400 } },
          },
        ],
      },
      manifest: {
        name: 'English Club',
        short_name: 'English Club',
        description: 'Английский от B1 до C1 через историю «Комната 17»',
        lang: 'ru',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
