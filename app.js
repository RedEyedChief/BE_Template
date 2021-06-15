import express          from 'express';
import config           from './lib/config.js';
import router           from './lib/router.js';
import middlewares      from './lib/middlewares.js';
import sequelize        from './lib/sequelize.js';
import initModels       from './lib/models/initModels.js';

// import shutdown from './shutdown.js';

initModels();

const app = express();
const { appPort } = config;

const server = app.listen(appPort, (error) => {
  if (error) throw error;

  console.log(`Example app started at http://localhost:${appPort}`)
});

try {
    (async function checkConnection() {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    })();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(middlewares.cors);
app.use(middlewares.json);
app.use(middlewares.urlendcoded);
app.use('/api/v1', router);

process.on('uncaughtException', async () => {
  await exitHandler(1, 'Unexpected Error')
});
process.on('unhandledRejection', async () => {
  await exitHandler(1, 'Unhandled Promise')
});
process.on('SIGTERM', async () => {
  await exitHandler(0, 'SIGTERM')
});
process.on('SIGTSTP', async () => {
  await exitHandler(0, 'SIGTERM')
});
process.on('SIGINT', async () => {
  await exitHandler(0, 'SIGINT')
});

async function exitHandler(code, reason) {
  if (server) server.close();

  console.log('Exit reason: ', reason);
  console.log('Graceful shutdown');
  process.exit(code);
}

// export default app;
module.exports = { app, server };
