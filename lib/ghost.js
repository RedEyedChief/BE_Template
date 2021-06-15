import logger           from './logger.js'
import { generateId }   from './utils/common.js'

function runService(serviceClass) {
    return function serviceRunner(req, res, context = {}) {
        try {
            const promise = new serviceClass({ context }).run(req.body);

            return renderPromiseAsJson(promise, res, serviceClass.name);
        } catch (e) {
            console.error('INTO runService ', e);
            throw e;
        }
    }
}

 async function renderPromiseAsJson(promise, res, serviceName) {
    let result = {};
    const logBlank = (service = serviceName) => ({
        transactionId: generateId(10),
        service
    });

    try {
        const data = await promise;
        result = {
            ...data,
            status: 1
        }
        logger.info({
            ...logBlank(),
            result
        });
    } catch (error) {
        result = {
            status : 0,
            error  : {
                code    : 'SERVER_ERROR',
                message : 'Please, contact your system administartor!'
            }
        };
        logger.error({
            ...logBlank(),
            error
        });
    } finally {
        return res.send(result);
    }
}

export default {
    runService
}
