import Request from 'superagent';
import Poller from './poller';
import './../../promises';

fdescribe('poller', () => {
  let functions, url;

  beforeEach(() => {
    jasmine.Ajax.install();
    jasmine.clock().install();
    let callback = jasmine.createSpy('callback');
    functions = {
      callback: callback
    };
    url = 'foo/bar';
    spyOn(console, 'error');
    spyOn(console, 'warn');
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
    jasmine.clock().uninstall();
  });

//   it('returns a Promise object', () => {
// debugger
//     let promise = Poller({ url: url, data: { foo: 'bar', headers: { Accept: 'application/json' }} }, functions, { interval: 1000 });
//   });

  describe('when no url has been provided', () => {
    it('logs a no url error', () => {
      Poller({}, functions, {});
      expect(console.error).toHaveBeenCalledWith('You must provide a url to the poller');
    });

    describe('when no queryOptions object is passed', () => {
      it('logs a no url error', () => {
        Poller(null, functions, {})
        expect(console.error).toHaveBeenCalledWith('You must provide a url to the poller');
      });
    });
  });

  describe('when no callback function is provided', () => {
    it('throws a no callback error', () => {
      Poller({ url: url }, {}, {});
      expect(console.error).toHaveBeenCalledWith('You must provide a callback function to the poller');
    });
  });

  describe('poll', () => {
    describe('when the pollCount exceeds the specified number of retries', () => {
      it('logs a too many requests warning', () => {
        Poller({ url: url }, functions, { interval: 1000, retries: 2 });
        jasmine.clock().tick(1000);

        for (let i = 0; i < 2; i++) {
          let request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            "status": 200,
            "contentType": 'application/json',
            "responseText": JSON.stringify({ processing_done: false })
          });
          jasmine.clock().tick(1000);
        }
        expect(console.warn).toHaveBeenCalledWith('The poller has made too many requests - terminating poll');
      });
    });

    xdescribe('when time exceeds the specified endTime',() => {
      it('logs a too many requests warningh', () => {
        Poller({ url: url }, functions, { interval: 1000, endTime: 100 });
        jasmine.clock().tick(10000);

        for (let i = 0; i < 10; i++) {
          let request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            "status": 200,
            "contentType": 'application/json',
            "responseText": JSON.stringify({ processing_done: false })
          });
          jasmine.clock().tick(1000);
        }
        expect(console.warn).toHaveBeenCalledWith('The poller has made too many requests - terminating poll');
      });
    });

    describe('the request', () => {
      it('makes a get request with the provided params', () => {
        Poller({ url: url, data: { foo: 'bar', headers: { Accept: 'application/json' }} }, functions, { interval: 1000 });

        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 200,
          "contentType": 'application/json',
          "responseText": JSON.stringify({ processing_done: false })
        });
        expect(request.url).toEqual('foo/bar?foo=bar&headers=%5Bobject%20Object%5D');
      });
    });

    describe('if there is an error', () => {
      describe('if a handleError function is provided', () => {
        it('calls the handleError with the error', () => {
          functions.handleError = jasmine.createSpy('handleError');

          Poller({ url: url }, functions, { interval: 1000 });

          let request = jasmine.Ajax.requests.mostRecent();

          request.respondWith({
            "status": 500,
            "contentType": 'application/json',
            "responseText": "{\"message_type\": \"error\"}"
          });

          expect(functions.handleError.calls.mostRecent().args.toString()).toEqual('Error: Unsuccessful HTTP response');
        });
      });

      describe('if no custom handleError function is avaliable', () => {
        Poller({ url: 'foo/bar' }, { callback: jasmine.createSpy('callback') }, { interval: 1000 });
        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 500,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"error\"}"
        });

        expect(console.error).toHaveBeenCalledWith('Err');
      });
    });
  });
});
