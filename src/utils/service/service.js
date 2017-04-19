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
      transformResponse: [ this.responseTransform ]
    });

    this.client.interceptors.response.use(this.handleSuccess, this.handleError);

    this.enableGlobalCallbacks();
  }

  handleSuccess = (response) => {
    if (response.data.message) {
      if (response.data.status === "error") {
        if (this.globalCallbacks && config.onError) { config.onError(response.data.message); }
        return Promise.reject(response);
      } else {
        if (this.globalCallbacks && config.onSuccess) { config.onSuccess(response.data.message); }
        return response.data;
      }
    } else {
      return response.data;
    }
  }

  handleError = (error) => {
    if (this.globalCallbacks && config.onError) { config.onError(error.response.data); }
    return Promise.reject(error.response);
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

  enableGlobalCallbacks = () => {
    this.globalCallbacks = true;
  }

  disableGlobalCallbacks = () => {
    this.globalCallbacks = false;
  }

  get = (id, onSuccess, onError) => {
    this.client.get(String(id)).then(
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
    this.client.put(String(id), data).then(
      this.successResponse.bind(this, onSuccess),
      this.errorResponse.bind(this, onError)
    );
  }

  del = (id, onSuccess, onError) => {
    this.client.del(String(id)).then(
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

  responseTransform = (response) => {
    return JSON.parse(response);
  }
}

export default Service;
