# CV - Manuel Andrés Carrera Galafate

CV profesional construido con **Astro** y arquitectura de componentes reutilizables.

## 🌐 Live Demo

- **Website**: https://maancga.github.io/cv/
- **PDF**: https://maancga.github.io/cv/cv.pdf

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (hot reload)
npm run dev

# Construir para producción
npm run build

# Generar PDF automáticamente
npm run pdf

# Preview de la build de producción
npm run preview
```

## 📁 Estructura del proyecto

```
cv-astro/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.astro     # Foto, nombre, contacto
│   │   ├── Skills.astro     # Habilidades técnicas
│   │   ├── Experience.astro # Experiencia laboral
│   │   ├── SideProjects.astro
│   │   ├── Articles.astro
│   │   └── Footer.astro     # Educación y lenguajes
│   ├── layouts/
│   │   └── CVLayout.astro   # Layout base (HTML, head, fonts)
│   ├── pages/
│   │   └── index.astro      # Página principal con todos los datos
│   ├── styles/
│   │   └── global.css       # Estilos globales (colores, tipografía)
│   └── public/
│       └── img.png          # Foto de perfil
├── scripts/
│   └── generate-pdf.mjs     # Script para generar PDF con Playwright
├── dist/                    # Build de producción (generado)
└── cv.pdf                   # PDF generado automáticamente
```

## 🎨 Cómo actualizar tu CV

1. **Edita los datos** en `src/pages/index.astro`:
   - Información personal (header)
   - Habilidades técnicas
   - Experiencia laboral
   - Proyectos personales
   - Artículos

2. **Cambia la foto** reemplazando `public/img.png`

3. **Modifica estilos** en `src/styles/global.css`:
   - Colores en `:root`
   - Fuentes
   - Espaciados

## 📄 Generación de PDF

### Local (desarrollo)
El comando `npm run pdf`:
1. Construye el proyecto (`npm run build`)
2. Inicia un servidor local
3. Usa Playwright para generar PDF con formato A4
4. Cierra el servidor automáticamente

El PDF generado se guarda en `cv.pdf` en la raíz del proyecto.

### Automático (GitHub)
Cada push a `main`:
1. ✨ Se ejecuta el workflow de GitHub Actions
2. 🏗️ Se construye el sitio Astro
3. 📄 Se genera el PDF automáticamente
4. 🚀 Se despliega todo a GitHub Pages

El PDF queda disponible en: https://maancga.github.io/cv/cv.pdf

## 🧩 Componentes

Cada componente es reutilizable y acepta datos como props:

```astro
<!-- Ejemplo: Usar el componente Header -->
<Header
  name="Tu nombre"
  role="Tu rol"
  email="tu@email.com"
  ...
/>
```

## 🛠️ Tecnologías

- **Astro**: Framework para sitios estáticos
- **TypeScript**: Tipado estático
- **Playwright**: Generación de PDF
- **Google Fonts**: DM Sans + JetBrains Mono

## 📝 Notas

- Los estilos están optimizados para impresión (formato A4)
- El diseño es responsive pero optimizado para PDF
- Las fuentes se cargan desde Google Fonts (asegúrate de tener conexión para el desarrollo)
- El PDF mantiene los colores exactos gracias a `print-color-adjust: exact`

## 🚀 Deployment

El CV se despliega automáticamente a GitHub Pages en cada push a `main`:

- **Sitio web**: https://maancga.github.io/cv/
- **PDF descargable**: https://maancga.github.io/cv/cv.pdf

## 🔗 Enlaces útiles

- [Documentación de Astro](https://docs.astro.build)
- [Playwright](https://playwright.dev)
- [TypeScript](https://www.typescriptlang.org)
