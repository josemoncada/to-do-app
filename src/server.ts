import 'reflect-metadata';
import { buildApp } from './app';
import { initializeDatabase } from './database/data-source';
import { config } from './config/app.config';

async function startServer() {
  try {
    
    await initializeDatabase();

    const app = await buildApp();

    await app.listen({
      port: config.app.port,
      host: config.app.host,
    });

    console.log(`


   🚀 Servidor iniciado exitosamente

   📌 Puerto: ${config.app.port.toString().padEnd(45)}
   📌 Entorno: ${config.app.nodeEnv.padEnd(43)}
   📌 API: http://${config.app.host}:${config.app.port}${config.app.apiPrefix}/${config.app.apiVersion.padEnd(26)}
   📚 Docs: http://${config.app.host}:${config.app.port}/docs${' '.padEnd(30)}

   
    `);
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\n⏹️  Cerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⏹️  Cerrando servidor...');
  process.exit(0);
});

startServer();