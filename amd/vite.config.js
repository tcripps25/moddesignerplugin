import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [vue()],
    base: isBuild ? '/moodle/local/moddesigner/amd/build/' : './', // Set base for production and relative for development
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: path.resolve(__dirname, '../amd/build'), // Output directory
      rollupOptions: {
        input: path.resolve(__dirname, 'src/main.js'), // Entry file
        output: {
          entryFileNames: 'bundle.js', // *This is what you have to load in the requirejs call in the moodle plugin*
          format: 'amd', // AMD format for Moodle requirejs compatibility  *It will not work in Moodle without this*
          amd: {
            define: 'define'
          }
        }
      }
    }
  }
})
