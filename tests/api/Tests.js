import Base from './Base.js';

class Tests extends Base {
    list(param = {}) {
        return this.apiClient.get('tests/list', params);
    }

    create(data) {
        return this.apiClient.post('tests', data);
    }
}

export default Tests;
