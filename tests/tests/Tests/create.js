import { assert }   from 'chai';
import test         from '../../core/ava';
import Api          from '../../api';
import { TESTS }    from '../../constants';
import Factory      from './../../core/TestFactory';


const api = new Api();

test.beforeEach(async () => {
    await Factory.cleanup();
});

test('Positive: Create test', async t => {
    const res = await api.tests.create(TESTS.DEFAULT_TESTS[0]);

    const expected = {
        id          : '0b1c5f9c-7454-49f3-955d-92b28b11494c',
        name        : "new",
        description : "info",
        price       : "12"
    };

    console.log('TEST RESPONSE ', res);

    t.is(res.status, 1);
    // t.is(assert.deepInclude(res.data, expected));
});
