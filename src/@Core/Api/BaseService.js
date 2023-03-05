/*
 * Created Date: 04-02-2023, 10:45 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) ...
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import has from 'lodash.has';
import middlewares from './Middleware';
import createInstance from './Axios';

class BaseService {
    BASE_URL = '/';

    BASE_ENDPOINT = '/api';

    DEFAULT_LIMIT = 10;

    DEFAULT_PAGE = 1;

    PRIMARY_KEY = 'id'

    DEFAULT_SORT = 'created_at desc';

    ALL_MIDDLEWARES = {
        ...middlewares
    };

    constructor(props) {
        if (has(props, 'BASE_URL')) {
            this.BASE_URL = props.BASE_URL;
        }

        if (has(props, 'BASE_ENDPOINT')) {
            this.BASE_ENDPOINT = props.BASE_ENDPOINT;
        }

        if (has(props, 'DEFAULT_SORT')) {
            this.DEFAULT_SORT = props.DEFAULT_SORT;
        }

        this.setRequest();
    }

    /**
     * @param {AxiosRequestConfig} requestConfig 
     * @returns 
     */
    middleware = (requestConfig) => {
        const arr = Object.values(this.ALL_MIDDLEWARES).map(m => {
            if (typeof m === 'function') {
                return m(requestConfig);
            }

            return m;
        });
        return arr;
    }

    setRequest() {
        this.request = createInstance(this.BASE_URL, this.middleware);

        this.requestParams = {
            page: this.DEFAULT_PAGE,
            limit: this.DEFAULT_LIMIT,
            sort: this.DEFAULT_SORT
        };
    }

    /**
     * @param {Object} query 
     * @returns 
     */
    list(query = {}) {
        const params = {
            ...this.requestParams,
            ...query
        };
        return this.request.get(this.BASE_ENDPOINT, { params });
    }

    /**
     * @param {string} id 
     * @returns 
     */
    find(id) {
        const url = `${this.BASE_ENDPOINT}/${id}`;
        return this.request.get(url);
    }

    /**
     * @param {Object} data 
     * @returns 
     */
    create(data) {
        return this.request.post(this.BASE_URL, data)
    }

    /**
     * @param {Object} data 
     * @returns 
     */
    update(data) {
        const {PRIMARY_KEY} = this
        return this.request.put(`${this.BASE_URL}/${data[PRIMARY_KEY]}`,data)
    }

    /**
     * @param {Object} data 
     * @returns 
     */
    save(data) {
        if(data.hasOwnProperty(this.PRIMARY_KEY) && data[this.PRIMARY_KEY]){
            return this.update(data)
        }else {
            return this.create(data)
        }
    }
}

export default BaseService;
