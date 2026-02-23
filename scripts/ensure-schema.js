/**
 * Crea el schema "pj" en Neon si no existe.
 * Se ejecuta antes de start:dev para que TypeORM pueda crear las tablas.
 */
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');

async function main() {
  const envPath = path.join(__dirname, '..', '.env');
  let databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl && fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const line = content.split('\n').find((l) => /^\s*DATABASE_URL=/.test(l));
    if (line) databaseUrl = line.replace(/^\s*DATABASE_URL=/, '').trim();
  }
  if (!databaseUrl) {
    console.error('No se encontró DATABASE_URL en .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query('CREATE SCHEMA IF NOT EXISTS pj');
    console.log('Schema pj listo.');
  } catch (err) {
    console.error('Error creando schema:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();

