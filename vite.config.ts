import { defineConfig } from 'vite'
import { reactRouter } from "@react-router/dev/vite";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@setting': path.resolve(__dirname, './src/setting'),
      '@ui-system': path.resolve(__dirname, './src/ui-system'),
      "@react-router-type": path.resolve(__dirname, "./.react-router/types/src")
    },
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
    netlifyPlugin(),
    svgr({
    svgrOptions: {
      icon: '16px',
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: {
        plugins: [
          {
            name: "convertColors",
            params: { currentColor: true, }
          },
          {
            name: "removeAttrs",
            params: { attrs: ['stroke-width'], }
          }
        ]
      }
    },
  })],
})
