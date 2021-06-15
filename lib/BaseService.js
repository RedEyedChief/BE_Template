import LIVR      from 'livr';
LIVR.Validator.defaultAutoTrim(true);

export default class BaseService {
    constructor(args) {
        if(!args) throw new Error('CONTEXT_REQUIRED');
        this.context = args.context;
    }

    run(data) {
        try {
            let validData;

            if (this.constructor.validationRules) {
                validData = this.doValidation(this.constructor.validationRules, data);
            } else if (typeof this.validate === "function") {
                validData = this.validate(data);
            } else {
                throw new Error('INPUT VALIDATION REQUIRED');
            }

            return this.execute(validData);
        } catch (e) {
            throw e;
        }
    }

    doValidation(rules, data, tag) {
        try {
            const validator = new LIVR.Validator(rules);
            const validData = validator.validate(data);

            if (!validData) {
                console.log('errors', validator.getErrors());
                throw new Error('VALIDATION ERROR');
            }

            return validData;
        } catch (e) {
            console.log('SOME ERROR ON VALIDATION STEP');
            throw e;
        }
    }
}
