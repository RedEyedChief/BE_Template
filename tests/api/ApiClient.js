import queryString  from 'query-string';
import fetch        from 'isomorphic-fetch';

export default class ApiClient {
    constructor(params) {
        this.token  = '';
        this.backendRootUrl = params.backendRootUrl;
        this.urlPrefix = params.urlPrefix;
    }

    async get(url, params) {
        return this.request({
            url,
            params,
            method : 'GET'
        });
    }

    async post(url, payload = {}) {
        return this.request({
            url,
            method : 'POST',
            body   : payload
        });
    }

    async postFile(url, files) {
        const formData  = new FormData();

        for (const file of files) {
            formData.append('file', file);
        }

        return this.request({
            url,
            method : 'POST',
            formData
        });
    }

    async put(url, payload = {}) {
        return this.request({
            url,
            method : 'PUT',
            body   : payload
        });
    }

    async patch(url, payload = {}) {
        return this.request({
            url,
            method : 'PATCH',
            body   : payload
        });
    }

    async delete(url, payload = {}) {
        return this.request({
            url,
            method : 'DELETE',
            body   : payload
        });
    }

    async request({ url, method, params = {}, body, formData }) {
        try {
            const query = Object.keys(params).length ? `?${queryString.stringify(params, { arrayFormat: 'comma' })}` : '';

            const bodyData = method !== 'GET' ? JSON.stringify({ data: body }) : undefined;

            const response = await fetch(
                `${this.backendRootUrl}/${this.urlPrefix}/${url}${query}`,
                {
                    method,
                    headers : {
                        'Cache-Control' : 'no-cache',
                        'pragma'        : 'no-cache',
                        'X-AuthToken'   : this.token,
                        ...(!formData ? { 'Content-Type': 'application/json' } : {})
                    },
                    withCredentials : true,
                    crossDomain     : false,
                    body            : formData ? formData : bodyData
                }
            );

            if (!response.ok) {
                throw new Error('REQUEST_ERROR');
            }

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    setToken(token) {
        this.token = token;
    }

    removeToken() {
        this.token = '';
    }
}
