import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, createReadStream, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  base: '/portfolio/',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true
  },
  publicDir: 'public',
  plugins: [{
    name: 'cv-download',
    configureServer(server) {
      server.middlewares.use('/download-cv', (_req, res) => {
        const filePath = join(__dirname, 'public', 'soumadip_basu_cv.pdf')
        if (existsSync(filePath)) {
          const stat = statSync(filePath)
          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="soumadip_basu_cv.pdf"',
            'Content-Length': stat.size,
          })
          createReadStream(filePath).pipe(res)
        } else {
          res.writeHead(404)
          res.end('File not found')
        }
      })
    }
  }]
})
