import test         from 'ava';
import * as server  from './serverAPI';
import factory      from './TestFactory';

test.before(async () => {
    await server.start();
    await factory.cleanup();
});

test.after(async () => {
    await server.stop();
    await factory.cleanup();
});

export default test;
