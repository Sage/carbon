import axios from 'axios';
import { assign } from 'lodash';

let config = {
  csrfToken: null,
  onSuccess: null,
  onError: null
}

class Service {
  static configure(opts) {
    assign(config, config, opts)
  }

  constructor() {
    this.client = axios.create({
      headers: {
        'X-CSRF-Token': config.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      transformResponse: [ this._responseTransform ]
    });

    this.client.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess = (response) => {
    if (response.data.message) {
      if (response.data.status === "error") {
        if (config.onError) { config.onError(response.data.message); }
        return Promise.reject(response);
      } else {
        if (config.onSuccess) { config.onSuccess(response.data.message); }
        return response;
      }
    } else {
      return response;
    }
  }

  handleError = (error) => {
    if (config.onError) { config.onError(error); }
    return Promise.reject(error);
  }

  setURL = (url) => {
    this.client.defaults.baseURL = url;
  }

  setTransformRequest = (func) => {
    this.client.defaults.transformRequest[1] = func;
  }

  setTransformResponse = (func) => {
    this.client.defaults.transformResponse[1] = func;
  }

  get = (id, onSuccess, onError) => {
    this.client.get(id).then(
      this.successResponse.bind(this, onSuccess),
      this.errorResponse.bind(this, onError)
    );
  }

  post = (data, onSuccess, onError) => {
    this.client.post(data).then(
      this.successResponse.bind(this, onSuccess),
      this.errorResponse.bind(this, onError)
    );
  }

  put = (id, data, onSuccess, onError) => {
    this.client.put(id, data).then(
      this.successResponse.bind(this, onSuccess),
      this.errorResponse.bind(this, onError)
    );
  }

  del = (id, onSuccess, onError) => {
    this.client.del(id).then(
      this.successResponse.bind(this, onSuccess),
      this.errorResponse.bind(this, onError)
    );
  }

  successResponse = (onSuccess, response) => {
    if (onSuccess) { onSuccess(response); }
  }

  errorResponse = (onError, error) => {
    if (onError) { onError(error); }
  }

  _responseTransform = (response) => {
    response = JSON.parse(response);

    if (response.data) {
      response.data = JSON.parse(response.data);
    }

    return response;
  }
}

export default Service;
