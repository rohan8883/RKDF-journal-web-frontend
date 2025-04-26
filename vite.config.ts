import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'LMS',
        short_name: 'LMS',
        display: 'standalone',
        start_url: '.',
        theme_color: '#115e59',
        background_color: '#ffffff',
        icons: [
          {
            src: 'favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon/ms-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|json)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60
              }
            }
          }
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
      }
    })
  ],
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },

  // rollup
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
          react: ['react', 'react-dom'],
          moment: ['moment'],
          axios: ['axios'],
          // @files-ui/react
          '@files-ui/react': ['@files-ui/react']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3112
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
