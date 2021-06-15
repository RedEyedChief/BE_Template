import config       from '../../lib/config';
import ApiClient    from './ApiClient.js';
import TestsAPI     from './Tests.js';

export default function () {
    const api = new ApiClient({
        backendRootUrl : config.backendRootUrl,
        urlPrefix      : 'api/v1'
    });

    return {
        apiClient : api,
        tests     : new TestsAPI({ apiClient: api })
    };
}
