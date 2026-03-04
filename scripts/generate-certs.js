/**
 * Genera certificado autofirmado para HTTPS en desarrollo.
 * Ejecutar: npm run certs:generate
 * Los archivos se crean en ./certs/key.pem y ./certs/cert.pem
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(process.cwd(), 'certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

// Intentar con openssl (viene con Git en Windows)
const opensslCmd = `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost"`;

try {
  execSync(opensslCmd, { stdio: 'inherit' });
  console.log('\n✅ Certificados generados en ./certs/');
  console.log('   key.pem  (clave privada)');
  console.log('   cert.pem (certificado)');
  console.log('\nEn .env descomentá o agregá:');
  console.log('   SSL_KEY_PATH=certs/key.pem');
  console.log('   SSL_CERT_PATH=certs/cert.pem');
  console.log('\nReiniciá el servidor para usar HTTPS.');
} catch (e) {
  console.error('No se pudo ejecutar openssl. Asegurate de tener OpenSSL instalado (p. ej. con Git for Windows).');
  console.error('Alternativa: generá los certs manualmente:');
  console.error('  mkdir certs && cd certs');
  console.error('  openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"');
  process.exit(1);
}
