import Poller from './poller';
import './../../promises';

jest.mock('superagent');

/* global jest */
describe('poller', () => {
  let functions, url;

  beforeEach(() => {
    jest.useFakeTimers();
    const callback = jasmine.createSpy('callback');
    functions = {
      callback
    };
    url = 'foo/bar';
    spyOn(console, 'error');
    spyOn(console, 'warn');
  });

  describe('when no url has been provided', () => {
    it('logs a no url error', () => {
      Poller({}, functions, {});
      expect(console.error).toHaveBeenCalledWith( // eslint-disable-line no-console
        'You must provide a url to the poller');
    });

    describe('when no queryOptions object is passed', () => {
      it('logs a no url error', () => {
        Poller(null, functions, {});
        expect(console.error).toHaveBeenCalledWith( // eslint-disable-line no-console
          'You must provide a url to the poller');
      });
    });
  });

  describe('when no callback function is provided and a conditionMet function has been provided', () => {
    it('throws a no callback error', () => {
      Poller({ url }, { conditionMet: () => {} }, {});
      expect(console.error).toHaveBeenCalledWith( // eslint-disable-line no-console
        'You must provide a callback function if you are testing a condition with conditionMet');
    });
  });

  describe('when no callback function is provided', () => {
    let request, callCount;

    it('polls continuously', () => {
      Poller({ url }, {}, {});

      const filterByRequestUrl = (req) => {
        return req.url === url;
      };

      for (let i = 1; i < 10; i++) {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });

        jest.runTimersToTime(3001);

        callCount = jasmine.Ajax.requests.filter(filterByRequestUrl).length;
      }

      expect(callCount).toEqual(10);
    });
  });

  describe('default options', () => {
    it('defaults the interval to 3 seconds if none is provided', () => {
      Poller({ url }, functions, {});

      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith({
        // Disabling the quotes and quote-props here, otherwise
        // we get a "FakeXMLHttpRequest already completed" error.
        /* eslint-disable quotes, quote-props */
        "status": 200,
        "contentType": 'application/json',
        "responseText": "{\"message_type\": \"success\"}"
        /* eslint-enable quotes, quote-props */
      });

      let callCount = jasmine.Ajax.requests.filter((req) => {
        return req.url === url;
      }).length;

      expect(callCount).toEqual(1);
      jest.runTimersToTime(1000);

      callCount = jasmine.Ajax.requests.filter((req) => {
        return req.url === url;
      }).length;

      expect(callCount).toEqual(1);
      jest.runTimersToTime(2001);

      callCount = jasmine.Ajax.requests.filter((req) => {
        return req.url === url;
      }).length;

      expect(callCount).toEqual(2);
    });
  });

  describe('poll', () => {
    describe('when the pollCount exceeds the specified number of retries', () => {
      it('logs a too many requests warning', () => {
        console.warn = jest.fn(); // eslint-disable-line no-console

        Poller({ url }, functions, { interval: 1000, retries: 2 });
        jest.runTimersToTime(1000);

        for (let i = 0; i < 2; i++) {
          jest.runTimersToTime(1000);
        }
        expect(console.warn.mock.calls[0][0]).toBe( // eslint-disable-line no-console
          'The poller has made too many requests - terminating poll');
      });
    });

    describe('when time exceeds the specified endTime', () => {
      it('logs a too many requests warning 2', () => {
        const now = Date.now();
        Date.now = jest.fn();
        Date.now.mockReturnValueOnce(now)
          .mockReturnValueOnce(now)
          .mockReturnValueOnce(now);

        const testInterval = 1000;
        console.warn = jest.fn(); // eslint-disable-line no-console

        let mockDateValue = now;

        Poller({ url }, functions, { interval: testInterval, endTime: 3000 });
        for (let i = 0; i < 4; i++) {
          mockDateValue += (testInterval + i);
          Date.now.mockReturnValueOnce(mockDateValue);
          jest.runTimersToTime(testInterval);
        }
        expect(console.warn.mock.calls[0][0]).toBe( // eslint-disable-line no-console
          'The poller has made too many requests - terminating poll');
      });
    });

    describe('the request', () => {
      it('makes a get request with the provided params', () => {
        Poller({
          url,
          data: {
            foo: 'bar',
            headers: {
              Accept: 'application/json'
            }
          }
        }, functions, { interval: 1000 });

        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });
        expect(request.url).toEqual('foo/bar?foo=bar&headers%5BAccept%5D=application%2Fjson');
      });
    });

    describe('if there is an error', () => {
      describe('if a handleError function is provided', () => {
        let promise;

        beforeEach(() => {
          functions.handleError = jasmine.createSpy('handleError');

          promise = Poller({ url }, functions, { interval: 1000 });

          const request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            // Disabling the quotes and quote-props here, otherwise
            // we get a "FakeXMLHttpRequest already completed" error.
            /* eslint-disable quotes, quote-props */
            "status": 500,
            "contentType": 'application/json',
            "responseText": "{\"message_type\": \"error\"}"
            /* eslint-enable quotes, quote-props */
          });
        });

        it('calls the handleError with the error', (done) => {
          promise.then(done, done);
          expect(functions.handleError.calls.mostRecent().args.toString()).toEqual('Error: Unsuccessful HTTP response');
        });
      });

      describe('if no custom handleError function is avaliable', () => {
        let promise;

        beforeEach(() => {
          promise = Poller({ url }, functions, { interval: 1000 });

          const request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            // Disabling the quotes and quote-props here, otherwise
            // we get a "FakeXMLHttpRequest already completed" error.
            /* eslint-disable quotes, quote-props */
            "status": 500,
            "contentType": 'application/json',
            "responseText": "{\"message_type\": \"error\"}"
            /* eslint-enable quotes, quote-props */
          });
        });

        it('logs the error', (done) => {
          promise.then(done, done);
          expect(console.error).toHaveBeenCalledWith( // eslint-disable-line no-console
            'Unsuccessful HTTP response');
        });
      });
    });

    describe('terminating function', () => {
      describe('if a terminating condition function is provided', () => {
        describe('when the terminating condition is met', () => {
          beforeEach(() => {
            functions.terminate = () => {};
            spyOn(functions, 'terminate').and.returnValue(true);
            Poller({ url }, functions, { interval: 1000 });

            const request = jasmine.Ajax.requests.mostRecent();
            request.respondWith({
              // Disabling the quotes and quote-props here, otherwise
              // we get a "FakeXMLHttpRequest already completed" error.
              /* eslint-disable quotes, quote-props */
              "status": 200,
              "contentType": 'application/json',
              "responseText": "{\"message_type\": \"success\"}"
              /* eslint-enable quotes, quote-props */
            });
          });


          it('checks the response with terminate function', () => {
            expect(functions.terminate).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });

        describe('if the terminating condition has not been met', () => {
          beforeEach(() => {
            functions.terminate = () => {};
            spyOn(functions, 'terminate').and.returnValue(false);
            Poller({ url }, functions, { interval: 1000 });

            const request = jasmine.Ajax.requests.mostRecent();
            request.respondWith({
              // Disabling the quotes and quote-props here, otherwise
              // we get a "FakeXMLHttpRequest already completed" error.
              /* eslint-disable quotes, quote-props */
              "status": 200,
              "contentType": 'application/json',
              "responseText": "{\"message_type\": \"success\"}"
              /* eslint-enable quotes, quote-props */
            });
          });

          it('checks the response with terminate function', () => {
            expect(functions.terminate).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });
      });
    });

    describe('conditionMet function', () => {
      it('calls the conditionMet function with the response', () => {
        functions.conditionMet = () => {};
        spyOn(functions, 'conditionMet');
        Poller({ url }, functions, { interval: 1000 });

        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });

        expect(functions.conditionMet).toHaveBeenCalledWith(jasmine.any(Object));
      });

      describe('when a custom conditionMet function has been provided', () => {
        describe('when the condition has been met', () => {
          it('calls the callback with the response', () => {
            functions.conditionMet = () => {};
            spyOn(functions, 'conditionMet').and.returnValue(true);
            Poller({ url }, functions, { interval: 1000 });

            const request = jasmine.Ajax.requests.mostRecent();
            request.respondWith({
              // Disabling the quotes and quote-props here, otherwise
              // we get a "FakeXMLHttpRequest already completed" error.
              /* eslint-disable quotes, quote-props */
              "status": 200,
              "contentType": 'application/json',
              "responseText": "{\"message_type\": \"success\"}"
              /* eslint-enable quotes, quote-props */
            });

            expect(functions.callback).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });

        describe('when the condition has not been met', () => {
          it('does not call the callback', () => {
            functions.conditionMet = () => {};
            spyOn(functions, 'conditionMet').and.returnValue(false);
            Poller({ url }, functions, { interval: 1000 });

            const request = jasmine.Ajax.requests.mostRecent();
            request.respondWith({
              // Disabling the quotes and quote-props here, otherwise
              // we get a "FakeXMLHttpRequest already completed" error.
              /* eslint-disable quotes, quote-props */
              "status": 200,
              "contentType": 'application/json',
              "responseText": "{\"message_type\": \"success\"}"
              /* eslint-enable quotes, quote-props */
            });

            expect(functions.callback).not.toHaveBeenCalled();
          });
        });
      });

      describe('when a custom conditionMet function has not been provided', () => {
        it('never calls the callback', () => {
          Poller({ url }, functions, { interval: 1000 });

          const request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            // Disabling the quotes and quote-props here, otherwise
            // we get a "FakeXMLHttpRequest already completed" error.
            /* eslint-disable quotes, quote-props */
            "status": 200,
            "contentType": 'application/json',
            "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
          });

          expect(functions.callback).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the promise has not been resolved or rejected', () => {
      it('calls the poll again after the specified interval', () => {
        Poller({ url }, functions, { interval: 1000 });

        const filterByRequestUrl = (req) => {
          return req.url === url;
        };

        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });

        let callCount = jasmine.Ajax.requests.filter(filterByRequestUrl).length;

        expect(callCount).toEqual(1);
        jest.runTimersToTime(500);

        callCount = jasmine.Ajax.requests.filter(filterByRequestUrl).length;

        expect(callCount).toEqual(1);
        jest.runTimersToTime(501);

        callCount = jasmine.Ajax.requests.filter(filterByRequestUrl).length;

        expect(callCount).toEqual(2);
      });
    });
  });

  describe('conditionNotMetCallback', () => {
    describe('when the conditionMet returns true', () => {
      it('does not call the callback with the response', () => {
        const notMetSpy = jasmine.createSpy('conditionNotMet');
        functions.conditionMet = () => {};
        functions.conditionNotMetCallback = notMetSpy;

        spyOn(functions, 'conditionMet').and.returnValue(true);
        Poller({ url }, functions, { interval: 1000 });

        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });

        expect(notMetSpy).not.toHaveBeenCalledWith();
      });
    });

    describe('when conditionMet returns false', () => {
      it('it calls the condition not met function', () => {
        const notMetSpy = jasmine.createSpy('conditionNotMet');
        functions.conditionMet = () => {};
        functions.conditionNotMetCallback = notMetSpy;
        spyOn(functions, 'conditionMet').and.returnValue(false);
        Poller({ url }, functions, { interval: 1000 });

        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          // Disabling the quotes and quote-props here, otherwise
          // we get a "FakeXMLHttpRequest already completed" error.
          /* eslint-disable quotes, quote-props */
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"message_type\": \"success\"}"
          /* eslint-enable quotes, quote-props */
        });

        expect(notMetSpy).toHaveBeenCalled();
      });
    });
  });
});
