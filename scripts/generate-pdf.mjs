#!/usr/bin/env node

/**
 * Script para generar PDF del CV
 *
 * Este script:
 * 1. Construye el proyecto Astro (genera HTML estático optimizado)
 * 2. Inicia un servidor HTTP local
 * 3. Usa Playwright para abrir la página y generar PDF con formato A4
 * 4. Cierra el servidor automáticamente
 */

import { chromium } from 'playwright';
import { exec } from 'child_process';
import { promisify } from 'util';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

// Obtener directorio actual (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const outputPath = path.join(projectRoot, 'cv.pdf');

// Configuración del servidor
const PORT = 8080;

console.log('📄 Generador de PDF para CV\n');

/**
 * Inicia un servidor HTTP simple para servir los archivos estáticos
 */
function startServer() {
  const server = http.createServer((req, res) => {
    // Determinar el archivo a servir
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);

    // Leer y servir el archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      // Determinar Content-Type
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };

      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(data);
    });
  });

  server.listen(PORT);
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}\n`);

  return server;
}

/**
 * Genera el PDF usando Playwright
 */
async function generatePDF() {
  console.log('🚀 Iniciando generación de PDF...\n');

  // 1. Build del proyecto
  console.log('📦 Construyendo proyecto Astro...');
  try {
    await execAsync('npm run build', { cwd: projectRoot });
    console.log('✅ Build completado\n');
  } catch (error) {
    console.error('❌ Error durante el build:', error.message);
    process.exit(1);
  }

  // 2. Iniciar servidor
  const server = startServer();

  try {
    // 3. Generar PDF con Playwright
    console.log('🌐 Generando PDF con Playwright...');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navegar a la página
    await page.goto(`http://localhost:${PORT}`, {
      waitUntil: 'networkidle'
    });

    // Generar PDF con configuración optimizada para CVs
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });

    await browser.close();
    console.log(`✅ PDF generado exitosamente: ${outputPath}\n`);

  } catch (error) {
    console.error('❌ Error generando PDF:', error.message);
    process.exit(1);
  } finally {
    // 4. Cerrar servidor
    server.close();
    console.log('🛑 Servidor cerrado\n');
  }

  console.log('🎉 ¡Proceso completado!\n');
  console.log(`📄 Tu CV está listo en: ${outputPath}`);
}

// Ejecutar
generatePDF();
