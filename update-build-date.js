// update-build-date.js
// Actualiza la fecha y hora de compilación en environment.prod.ts
// (misma lógica que el proyecto @ejercito/intranet)
const fs = require('fs');
const path = require('path');

function updateBuildDate() {
  // Obtener fecha y hora actual en la zona horaria de Venezuela
  const now = new Date();

  // Opciones para formatear la fecha en Venezuela
  const dateOptions = {
    timeZone: 'America/Caracas',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };

  const timeOptions = {
    timeZone: 'America/Caracas',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Esto mostrará AM/PM
  };

  // Formatear fecha y hora para Venezuela
  const date = now.toLocaleDateString('es-VE', dateOptions);
  const time = now.toLocaleTimeString('es-VE', timeOptions);
  const buildDate = `${date} ${time}`;

  // Ruta al archivo environment de producción
  const envPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

  updateEnvironmentFile(envPath, buildDate);
}

function updateEnvironmentFile(envPath, buildDate) {
  if (!fs.existsSync(envPath)) {
    console.warn(`⚠️  Archivo no encontrado: ${envPath}`);
    return;
  }

  try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    if (envContent.includes('buildDate:')) {
      envContent = envContent.replace(
        /buildDate:\s*['"`].*?['"`]/,
        `buildDate: '${buildDate}'`
      );
      console.log(`✅ Build date UPDATED in ${path.relative(__dirname, envPath)}: ${buildDate}`);
    } else {
      envContent = envContent.replace(
        /export const environment = {([^}]+)};/,
        `export const environment = {$1\n  buildDate: '${buildDate}',\n};`
      );
      console.log(`✅ Build date ADDED to ${path.relative(__dirname, envPath)}: ${buildDate}`);
    }

    fs.writeFileSync(envPath, envContent, 'utf8');

  } catch (error) {
    console.error(`❌ Error updating ${envPath}:`, error.message);
  }
}

updateBuildDate();