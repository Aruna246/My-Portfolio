import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function cmsServerPlugin(): Plugin {
  return {
    name: 'cms-server-plugin',
    configureServer(server) {
      const dataDir = path.resolve(__dirname, 'data');
      const publicDir = path.resolve(__dirname, 'public');
      const uploadsDir = path.resolve(publicDir, 'uploads');
      const dataFilePath = path.resolve(dataDir, 'portfolio-data.json');

      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      // Unwatch data and upload directories to prevent Vite from reloading the page when files are saved
      server.watcher.unwatch([
        dataFilePath,
        path.resolve(dataDir, '**'),
        path.resolve(uploadsDir, '**')
      ]);

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        // 1. GET /api/portfolio
        if (url === '/api/portfolio' && req.method === 'GET') {
          if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ notFound: true }));
            return;
          }
        }

        // 2. POST /api/portfolio
        if (url === '/api/portfolio' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              fs.writeFileSync(dataFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, timestamp: Date.now() }));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: String(err) }));
            }
          });
          return;
        }

        // 3. POST /api/upload
        if (url === '/api/upload' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { fileName, fileData } = JSON.parse(body);
              if (!fileData) {
                throw new Error('fileData is required');
              }

              const match = fileData.match(/^data:([^;]+);base64,(.+)$/);
              let buffer: Buffer;
              if (match) {
                buffer = Buffer.from(match[2], 'base64');
              } else {
                buffer = Buffer.from(fileData, 'base64');
              }

              const ext = path.extname(fileName || 'file.bin') || '.bin';
              const cleanBase = path
                .basename(fileName || 'file', ext)
                .replace(/[^a-zA-Z0-9_-]/g, '_');
              const uniqueFileName = `${cleanBase}_${Date.now()}${ext}`;
              const targetPath = path.resolve(uploadsDir, uniqueFileName);

              fs.writeFileSync(targetPath, buffer);

              const publicUrl = `/uploads/${uniqueFileName}`;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  url: publicUrl,
                  fileName: fileName,
                  savedName: uniqueFileName
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: String(err) }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cmsServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/data/**', '**/public/uploads/**', '**/portfolio-data.json'],
      },
    },
  };
});
