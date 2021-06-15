import BaseService  from '../../BaseService.js';
import Test         from '../../models/Test.js';
import { dumpTest } from '../../utils/dumps.js';

export default class TestList extends BaseService {
    async execute() {
        try {
            const tests = await Test.findAll();
            const response = tests.map(test => dumpTest(test));

            return response;
        } catch (e) {
            throw e;
        }
    }
}
