const { spawnSync } = require('child_process');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Uso: npm run migration:create -- <NombreMigracion>');
  process.exit(1);
}

const output = path.join('src', 'database', 'migrations', name);

const res = spawnSync(
  'npx',
  ['typeorm-ts-node-commonjs', 'migration:create', output],
  { stdio: 'inherit', shell: process.platform === 'win32' }
);

process.exit(res.status ?? 1);