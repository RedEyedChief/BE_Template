// import app         from '../../app.js';
const { app, server } = require('../../app.js');
import { appPort } from '../../lib/config';

// TODO develop independent server for tests
// let server;

export async function start() {
    try {
        // server = await app.listen(appPort);

        return server;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function stop() {
    try {
        return server.close();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
