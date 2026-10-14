import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'src',
  publicDir: path.resolve(rootDir, 'public'),
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'src/index.html'),
        about: path.resolve(rootDir, 'src/about.html'),
        login: path.resolve(rootDir, 'src/login.html'),
        signin: path.resolve(rootDir, 'src/signin.html'),
        signup: path.resolve(rootDir, 'src/signup.html'),
        decks: path.resolve(rootDir, 'src/decks.html'),
        design: path.resolve(rootDir, 'src/design.html'),
      },
    },
  },
})
