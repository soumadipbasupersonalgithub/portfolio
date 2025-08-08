import { defineConfig } from 'vite'

export default defineConfig({
  // Configure server settings
  server: {
    port: 5173,
    host: true,
    // Add headers for secure downloads
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  
  // Configure build settings
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure static assets are properly handled
    copyPublicDir: true
  },
  
  // Configure public directory
  publicDir: 'public',
  
  // Add middleware for handling downloads
  configureServer(server) {
    server.middlewares.use('/download-cv', (req, res, next) => {
      const path = require('path')
      const fs = require('fs')
      
      const filePath = path.join(__dirname, 'public', 'soumadip_basu_cv.pdf')
      
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename="soumadip_basu_cv.pdf"')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Access-Control-Allow-Origin', '*')
        
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(res)
      } else {
        res.status(404).send('File not found')
      }
    })
  }
})
