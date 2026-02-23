/**
 * Crea el primer usuario admin en la base de datos (solo si no existe ningún usuario).
 * Uso: node scripts/seed-admin.js
 * Opcional en .env: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NOMBRE
 *
 *
 * USUARIO: admin@gmail.com
 * CONTRASEÑA: Admin123!
 *
 */
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const out = {};
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) out[m[1].trim()] = m[2].trim();
  });
  return out;
}

async function main() {
  const env = loadEnv();
  const databaseUrl = process.env.DATABASE_URL || env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('No se encontró DATABASE_URL en .env');
    process.exit(1);
  }

  const email = process.env.SEED_ADMIN_EMAIL || env.SEED_ADMIN_EMAIL || 'admin@gmail.com';
  const password = process.env.SEED_ADMIN_PASSWORD || env.SEED_ADMIN_PASSWORD || 'Admin123!';
  const nombre = process.env.SEED_ADMIN_NOMBRE || env.SEED_ADMIN_NOMBRE || 'Administrador';

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const { rows: existing } = await client.query('SELECT id FROM pj.usuario LIMIT 1');
    if (existing.length > 0) {
      console.log('Ya existen usuarios en la base de datos.');
      console.log('Usá POST /auth/login con tu email y contraseña.');
      process.exit(0);
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await client.query(
      `INSERT INTO pj.usuario (nombre, email, password_hash, rol, activo, created_at, updated_at)
       VALUES ($1, $2, $3, 'admin', true, NOW(), NOW())`,
      [nombre, email, passwordHash],
    );

    console.log('Usuario admin creado correctamente.');
    console.log('  Email:', email);
    console.log('  Contraseña: (la que configuraste en SEED_ADMIN_PASSWORD o por defecto Admin123!)');
    console.log('');
    console.log('Iniciá sesión con: POST http://localhost:3000/auth/login');
    console.log('Body: { "email": "' + email + '", "password": "' + password + '" }');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();

