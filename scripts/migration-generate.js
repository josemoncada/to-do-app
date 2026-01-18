const { spawnSync } = require('child_process');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Uso: npm run migration:generate -- <NombreMigracion>');
  process.exit(1);
}

const output = path.join('src', 'database', 'migrations', name);

const res = spawnSync(
  'npx',
  [
    'typeorm-ts-node-commonjs',
    'migration:generate',
    '-d',
    'src/database/data-source.ts',
    output
  ],
  { stdio: 'inherit', shell: process.platform === 'win32' }
);

process.exit(res.status ?? 1);