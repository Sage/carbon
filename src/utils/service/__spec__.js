import moxios from 'moxios';
import Service from './service';
import { assign } from 'lodash';

describe('Service', () => {
  let service, onSuccessSpy, onErrorSpy;

  beforeEach(() => {
    // configure Service with global config
    onSuccessSpy = jasmine.createSpy('onSuccess');
    onErrorSpy = jasmine.createSpy('onError');
    Service.configure({
      csrfToken: 'FOO',
      onSuccess: onSuccessSpy,
      onError: onErrorSpy
    });
    // init an instance of the service
    service = new Service;
  });

  describe('constructor', () => {
    it('sets the headers of the axios client', () => {
      let headers = service.client.defaults.headers;
      expect(headers['Accept']).toEqual('application/json');
      expect(headers['Content-Type']).toEqual('application/json');
    });

    it('sets the transformResponse of the axios client', () => {
      spyOn(JSON, 'parse');
      service.client.defaults.transformResponse[0]('test');
      expect(JSON.parse).toHaveBeenCalledWith('test');
    });

    it('sets the interceptors of the axios client', () => {
      expect(service.client.interceptors.response.handlers[0].fulfilled).toEqual(service.handleSuccess);
      expect(service.client.interceptors.response.handlers[0].rejected).toEqual(service.handleError);
    });

    it('enables globalCallbacks', () => {
      expect(service.globalCallbacks).toBeTruthy();
    });

    it('does not enable globalCallbacks if initialized with false', () => {
      service = new Service({ globalCallbacks: false });
      expect(service.globalCallbacks).toBeFalsy();
    });
  });

  describe('handleSuccess', () => {
    describe('when there is no message in the response', () => {
      it('returns the data', () => {
        let data = { foo: true };
        expect(service.handleSuccess({ data })).toEqual(data);
      });
    });

    describe('when there is a message in the response', () => {
      describe('if the status is error', () => {
        let response;

        beforeEach(() => {
          spyOn(Promise, 'reject');
          response = { data: { message: 'message', status: 'error' } };
        });

        describe('if global callbacks are enabled', () => {
          it('calls onError', () => {
            service.handleSuccess(response);
            expect(onErrorSpy).toHaveBeenCalledWith('message');
            expect(Promise.reject).toHaveBeenCalledWith(response);
          });
        });

        describe('if global callbacks are disabled', () => {
          it('does not call onError', () => {
            service.disableGlobalCallbacks();
            service.handleSuccess(response);
            expect(onErrorSpy).not.toHaveBeenCalled();
            expect(Promise.reject).toHaveBeenCalledWith(response);
            service.enableGlobalCallbacks();
          });
        });
      });

      describe('if the status is not error', () => {
        describe('if global callbacks are enabled', () => {
          it('calls onSuccess', () => {
            service.handleSuccess({ data: { message: 'message' } });
            expect(onSuccessSpy).toHaveBeenCalledWith('message');
          });
        });

        describe('if global callbacks are disabled', () => {
          it('does not call onSuccess', () => {
            service.disableGlobalCallbacks();
            service.handleSuccess({ data: { message: 'message' } });
            expect(onSuccessSpy).not.toHaveBeenCalled();
            service.enableGlobalCallbacks();
          });
        });
      });
    });
  });

  describe('handleError', () => {
    beforeEach(() => {
      spyOn(Promise, 'reject');
    });

    describe('if global callbacks are enabled', () => {
      it('calls onError', () => {
        service.handleError({ response: { data: true } });
        expect(onErrorSpy).toHaveBeenCalledWith(true);
        expect(Promise.reject).toHaveBeenCalledWith({ data: true });
      });
    });

    describe('if global callbacks are not enabled', () => {
      it('calls onError', () => {
        service.disableGlobalCallbacks();
        service.handleError({ response: { data: true } });
        expect(onErrorSpy).not.toHaveBeenCalled();
        expect(Promise.reject).toHaveBeenCalledWith({ data: true });
        service.enableGlobalCallbacks();
      });
    });
  });

  describe('setURL', () => {
    it('sets the base URL of the client', () => {
      service.setURL('/foo');
      expect(service.client.defaults.baseURL).toEqual('/foo');
    });
  });

  describe('enableGlobalCallbacks', () => {
    it('enables the global callbacks', () => {
      service.enableGlobalCallbacks();
      expect(service.globalCallbacks).toBeTruthy();
    });
  });

  describe('disableGlobalCallbacks', () => {
    it('disables the global callbacks', () => {
      service.disableGlobalCallbacks();
      expect(service.globalCallbacks).toBeFalsy();
    });
  });

  describe('RESTful endpoints', () => {
    let successSpy, errorSpy;

    beforeEach(() => {
      moxios.install(service.client);
      successSpy = jasmine.createSpy('success');
      errorSpy = jasmine.createSpy('error');
    });

    afterEach(() => {
      moxios.uninstall(service.client);
    });

    let testEndpoint = (done, status, spy) => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent(),
            data = { data: {} };
        request.respondWith({
          status: status,
          response: JSON.stringify(data)
        }).then((response) => {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });
    };

    describe('errors', () => {
      describe('GET with object params', () => {
        it('calls the GET endpoint with query params', (done) => {
          service.get(5,
            {
              params: { foo: 'bar' },
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });

        it('calls the GET endpoint without query params', (done) => {
          service.get(5,
            {
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });
      });

      describe('POST with object params', () => {
        it('calls the POST endpoint with query params', (done) => {
          service.post({},
            {
              params: { foo: 'bar' },
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });

        it('calls the POST endpoint without query params', (done) => {
          service.post({},
            {
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });
      });

      describe('PUT with object params', () => {
        it('calls the PUT endpoint with query params', (done) => {
          service.put(1, {},
            {
              params: { foo: 'bar' },
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });

        it('calls the PUT endpoint without query params', (done) => {
          service.put(1, {},
            {
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });
      });

      describe('DELETE with object params', () => {
        it('calls the DELETE endpoint with query params', (done) => {
          service.delete(1,
            {
              params: { foo: 'bar' },
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });

        it('calls the DELETE endpoint without query params', (done) => {
          service.delete(1,
            {
              onSuccess: successSpy,
              onError: errorSpy
            });
          testEndpoint(done, 400, errorSpy);
        });
      });

      it('without an error callback', (done) => {
        service.delete(1, successSpy);
        moxios.wait(() => {
          let request = moxios.requests.mostRecent(),
              data = { data: {} };

          request.respondWith({
            status: 400,
            response: JSON.stringify(data)
          }).then((response) => {
            expect(errorSpy).not.toHaveBeenCalled();
            done();
          });
        });
      });
    });

    describe('success', () => {
      describe('GET with object params', () => {
        it('calls the GET endpoint', (done) => {
          service.get(5,
            {
              params: { foo: 'bar' },
              onError: errorSpy,
              onSuccess: successSpy
            }
          );
          testEndpoint(done, 200, successSpy);
        });
      });
    });

    describe('with a transformRequest', () => {
      it('transforms the data', (done) => {
        service.setTransformRequest((data) => {
          let d = { bar: 'custom' };
          return JSON.stringify(d);
        });
        service.post({ foo: "posted" }, () => {}, () => {});

        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          expect(request.config.data).toEqual(JSON.stringify({ bar: 'custom' }));
          done();
        });
      });
    });

    describe('with a transformResponse', () => {
      it('transforms the data', () => {
        service.setTransformResponse((data) => {
          let d = assign({}, data, { bar: 'custom' });
          return JSON.stringify(d);
        });
        service.get(1, () => {}, () => {});

        moxios.wait(() => {
          let request = moxios.requests.mostRecent();

          request.respondWith({
            status: 200,
            response: JSON.stringify({ foo: 'responded' })
          }).then((response) => {
            expect(response.data).toEqual(
              JSON.stringify({ foo: 'responded', bar: 'custom' })
            );
          });
        });
      });
    });
  });
});
