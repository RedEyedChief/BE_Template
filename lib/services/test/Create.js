import BaseService  from '../../BaseService.js';
import Test         from '../../models/Test.js';
import { dumpTest } from '../../utils/dumps.js';

export default class TestCreate extends BaseService {
    // ===== Here 2 variations of validation rules using

    // static validationRules = {
    //     data : [ 'required', { 'nested_object' : {
    //         name        : [ 'required', 'string', { 'max_length': 255 } ],
    //         description : [ 'required', { 'max_length': 255 } ],
    //         price       : [ 'required', 'integer', { 'min_number': 0 }, { 'max_number': 2147483647 } ]
    //     } } ]
    // }

    validate(data) {
        const rules = {
            data : [ 'required', { 'nested_object' : {
                name        : [ 'required', 'string', { 'max_length': 255 } ],
                description : [ 'required', { 'max_length': 255 } ],
                price       : [ 'required', 'integer', { 'min_number': 0 }, { 'max_number': 2147483647 } ]
            } } ]
        };

        return this.doValidation(rules, data);
    }

    // ----- End of examples


    async execute({ data }) {
        try {
            const newTest = await Test.create(data);
            return { data: dumpTest(newTest) };
        } catch (e) {
            throw e;
        }
    }
}
