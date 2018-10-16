import Request from 'superagent';
import Poller from './poller';
import Logger from '../../logger';

/* global jest */
jest.mock('superagent');

describe('poller', () => {
  let functions, url;

  beforeEach(() => {
    jest.useFakeTimers();
    const callback = jasmine.createSpy('callback');
    functions = {
      callback
    };
    url = 'foo/bar';
    spyOn(Logger, 'error');
    spyOn(Logger, 'warn');

    Request.__setMockResponse({
      status() {
        return 200;
      },
      ok() {
        return true;
      },
      body: {
        message_type: 'success'
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('when no url has been provided', () => {
    it('logs a no url error', () => {
      Poller({}, functions, {});
      expect(Logger.error).toHaveBeenCalledWith(
        'You must provide a url to the poller');
    });

    describe('when no queryOptions object is passed', () => {
      it('logs a no url error', () => {
        Poller(null, functions, {});
        expect(Logger.error).toHaveBeenCalledWith(
          'You must provide a url to the poller');
      });
    });
  });

  describe('when no callback function is provided and a conditionMet function has been provided', () => {
    it('throws a no callback error', () => {
      Poller({ url }, { conditionMet: () => {} }, {});
      expect(Logger.error).toHaveBeenCalledWith(
        'You must provide a callback function if you are testing a condition with conditionMet');
    });
  });

  describe('when no callback function is provided', () => {
    it('polls continuously', () => {
      Request.get = jest.fn().mockReturnThis();

      Poller({ url }, {}, {});

      for (let i = 1; i < 10; i++) {
        jest.runTimersToTime(3001);
        expect(Request.get).toBeCalledWith(url);
      }

      expect(Request.get.mock.calls.length).toBe(10);
    });
  });

  describe('default options', () => {
    it('defaults the interval to 3 seconds if none is provided', () => {
      Request.get = jest.fn().mockReturnThis();

      Poller({ url }, functions, {});

      expect(Request.get.mock.calls.length).toBe(1);

      jest.runTimersToTime(1000);

      expect(Request.get.mock.calls.length).toBe(1);

      jest.runTimersToTime(2001);

      expect(Request.get.mock.calls.length).toEqual(2);
    });
  });

  describe('poll', () => {
    describe('when the pollCount exceeds the specified number of retries', () => {
      it('logs a too many requests warning', () => {
        Logger.warn = jest.fn();

        Poller({ url }, functions, { interval: 1000, retries: 2 });
        jest.runTimersToTime(1000);

        for (let i = 0; i < 2; i++) {
          jest.runTimersToTime(1000);
        }

        expect(Logger.warn.mock.calls[0][0]).toBe(
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
        Logger.warn = jest.fn();

        let mockDateValue = now;

        Poller({ url }, functions, { interval: testInterval, endTime: 3000 });
        for (let i = 0; i < 4; i++) {
          mockDateValue += (testInterval + i);
          Date.now.mockReturnValueOnce(mockDateValue);
          jest.runTimersToTime(testInterval);
        }
        expect(Logger.warn.mock.calls[0][0]).toBe(
          'The poller has made too many requests - terminating poll');
      });
    });

    describe('when polling terminates and theres an onMaxRetries function', () => {
      it('calls the onMaxRetries function', () => {
        const onMaxRetriesSpy = jest.fn();
        functions.onMaxRetries = onMaxRetriesSpy;

        Poller({ url }, functions, { interval: 1000, retries: 2 });

        for (let i = 0; i < 2; i++) {
          expect(onMaxRetriesSpy).not.toHaveBeenCalled();
          jest.runTimersToTime(1000);
        }

        expect(onMaxRetriesSpy).toHaveBeenCalled();
      });
    });

    describe('the request', () => {
      it('makes a get request with the provided params', () => {
        Request.query = jest.fn().mockReturnThis();
        Poller({
          url,
          data: {
            foo: 'bar',
            headers: {
              Accept: 'application/json'
            }
          }
        }, functions, { interval: 1000 });

        expect(Request.query).toBeCalledWith({
          foo: 'bar',
          headers: {
            Accept: 'application/json'
          }
        });
      });
    });

    describe('if there is an error', () => {
      beforeEach(() => {
        Request.__setMockResponse({
          status() {
            return 500;
          },
          ok() {
            return false;
          },
          body: {
            message_type: 'error'
          }
        });

        Request.__setMockError({
          message: 'Unsuccessful HTTP response'
        });
      });

      afterEach(() => {
        Request.__setMockError(undefined);
      });

      describe('if a handleError function is provided', () => {
        it('calls the handleError with the error', (done) => {
          functions.handleError = jest.fn();
          Poller({ url }, functions, { interval: 1000 });
          done();
          expect(functions.handleError).toBeCalled();
        });
      });

      describe('if no custom handleError function is avaliable', () => {
        it('logs the error', (done) => {
          Poller({ url }, functions, { interval: 1000 });
          done();
          expect(Logger.error).toHaveBeenCalledWith(
            'Unsuccessful HTTP response');
        });
      });
    });

    describe('terminating function', () => {
      beforeEach(() => {
        functions.terminate = jest.fn();
      });

      describe('if a terminating condition function is provided', () => {
        describe('when the terminating condition is met', () => {
          beforeEach(() => {
            functions.terminate.mockReturnValue(true);
            Poller({ url }, functions, { interval: 1000 });
          });

          it('checks the response with terminate function', () => {
            expect(functions.terminate).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });

        describe('if the terminating condition has not been met', () => {
          beforeEach(() => {
            functions.terminate.mockReturnValue(false);
            Poller({ url }, functions, { interval: 1000 });
          });

          it('checks the response with terminate function', () => {
            expect(functions.terminate).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });
      });
    });

    describe('conditionMet function', () => {
      it('calls the conditionMet function with the response', () => {
        functions.conditionMet = jest.fn();
        Poller({ url }, functions, { interval: 1000 });

        expect(functions.conditionMet).toBeCalledWith(jasmine.any(Object));
      });

      describe('when a custom conditionMet function has been provided', () => {
        describe('when the condition has been met', () => {
          it('calls the callback with the response', () => {
            functions.conditionMet = jest.fn().mockReturnValue(true);
            Poller({ url }, functions, { interval: 1000 });
            expect(functions.callback).toBeCalledWith(jasmine.any(Object));
          });
        });

        describe('when the condition has not been met', () => {
          it('does not call the callback', () => {
            functions.conditionMet = jest.fn().mockReturnValue(false);
            Poller({ url }, functions, { interval: 1000 });
            expect(functions.callback).not.toHaveBeenCalled();
          });
        });
      });

      describe('when a custom conditionMet function has not been provided', () => {
        it('never calls the callback', () => {
          Poller({ url }, functions, { interval: 1000 });
          expect(functions.callback).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the promise has not been resolved or rejected', () => {
      it('calls the poll again after the specified interval', () => {
        Request.get = jest.fn().mockReturnThis();

        Poller({ url }, functions, { interval: 1000 });

        expect(Request.get.mock.calls.length).toBe(1);
        jest.runTimersToTime(500);

        expect(Request.get.mock.calls.length).toEqual(1);
        jest.runTimersToTime(501);

        expect(Request.get.mock.calls.length).toEqual(2);
      });
    });
  });

  describe('conditionNotMetCallback', () => {
    describe('when the conditionMet returns true', () => {
      it('does not call the callback with the response', () => {
        functions.conditionMet = jest.fn().mockReturnValue(true);
        functions.conditionNotMetCallback = jest.fn();

        Poller({ url }, functions, { interval: 1000 });

        expect(functions.conditionNotMetCallback).not.toBeCalled();
      });
    });

    describe('when conditionMet returns false', () => {
      it('it calls the condition not met function', () => {
        functions.conditionMet = jest.fn().mockReturnValue(false);
        functions.conditionNotMetCallback = jest.fn();
        Poller({ url }, functions, { interval: 1000 });

        expect(functions.conditionNotMetCallback).toBeCalled();
      });
    });
  });
});
