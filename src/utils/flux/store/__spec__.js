import Store from './store';
import Flux from 'flux';
import Logger from './../../logger';
import { Dispatcher } from './../../flux';
import { EventEmitter } from 'events';

describe('Store', () => {
  let instance;

  describe('constructor', () => {
    describe('init without a name', () => {
      it('throws an error', () => {
        expect(function() { new Store }).toThrowError("You need to initialize your store with a name. Check the initialization of Store.");
      });
    });

    describe('init without data', () => {
      it('throws an error', () => {
        expect(function() { new Store('foo') }).toThrowError("You need to initialize your store with data. Check the initialization of Store.");
      });
    });

    describe('with no dispatcher given', () => {
      it('registers the carbon dispatcher and stores the token', () => {
        spyOn(Dispatcher, 'register').and.returnValue('foo');
        instance = new Store('foo', {});
        expect(Dispatcher.register).toHaveBeenCalledWith(instance.dispatcherCallback);
        expect(instance.dispatchToken).toEqual('foo');
      });
    });

    describe('with a custom dispatcher', () => {
      it('uses the custom dispatcher', () => {
        const dispatcher = new Flux.Dispatcher();
        spyOn(dispatcher, 'register').and.returnValue('foo');
        instance = new Store('foo', {}, { dispatcher });
        expect(dispatcher.register).toHaveBeenCalledWith(instance.dispatcherCallback);
        expect(instance.dispatchToken).toEqual('foo');
      });
    });

    it('sets history to an array with init data', () => {
      instance = new Store('foo', { foo: 'bar' });
      expect(instance.history).toEqual([{ foo: 'bar' }]);
    });

    it('sets trackHistory to false', () => {
      instance = new Store('foo', {});
      expect(instance.trackHistory).toBeFalsy();
    });

    describe('init with history enabled', () => {
      it('sets trackHistory to true', () => {
        instance = new Store('foo', {}, { history: true });
        expect(instance.trackHistory).toBeTruthy();
      });
    });

    describe('max event listeners', () => {
      it('set to 50', () => {
        spyOn(EventEmitter.prototype, 'setMaxListeners');
        instance = new Store('foo', 'some data');
        expect(EventEmitter.prototype.setMaxListeners).toHaveBeenCalledWith(50);
      });
    });
  });

  describe("with an actual store", () => {
    beforeEach(() => {
      instance = new Store('foo', 'some data');
    });

    describe('addChangeListener', () => {
      it('calls on to set the listener', () => {
        spyOn(instance, 'on');
        instance.addChangeListener('foo');
        expect(instance.on).toHaveBeenCalledWith('change', 'foo');
      });
    });

    describe('removeChangeListener', () => {
      it('calls removeListener to remove the listener', () => {
        spyOn(instance, 'removeListener');
        instance.removeChangeListener('foo');
        expect(instance.removeListener).toHaveBeenCalledWith('change', 'foo');
      });
    });

    describe('getState', () => {
      it('returns the data property', () => {
        expect(instance.getState()).toEqual(instance.data);
      });
    });

    describe('dispatcherCallback', () => {
      beforeEach(() => {
        spyOn(instance, '_triggerChange');
      });

      describe('if store does not respond to action', () => {
        it('does not trigger change', () => {
          instance.dispatcherCallback({ actionType: 'foobar' });
          expect(instance._triggerChange).not.toHaveBeenCalled();
        });
      });

      describe('if store responds to action', () => {
        beforeEach(() => {
          instance.foobar = jasmine.createSpy();
          instance.dispatcherCallback({ actionType: 'foobar' });
        });

        it('calls trigger change', () => {
          expect(instance._triggerChange).toHaveBeenCalled();
        });

        it('calls the action', () => {
          expect(instance.foobar).toHaveBeenCalled();
        });

        describe('if history is not enabled', () => {
          it('does nothing with the history', () => {
            expect(instance.history).toEqual(['some data']);
          });
        });

        describe('if history is enabled', () => {
          beforeEach(() => {
            instance.history = ['foo'];
            instance.trackHistory = true;
            instance.data = 'bar';
            instance.dispatcherCallback({ actionType: 'foobar' });
          });

          it('adds the data to the history', () => {
            expect(instance.history).toEqual(['foo', 'bar']);
          });
        });
      });

      describe('when an invalid action is dispatched', () => {
        let message = "You are dispatching an invalid action (maybe the constant is incorrect or missing)",
            invalid = ['', null, undefined];

        for (let index in invalid) {
          let value = invalid[index];

          it(`throws an error for ${value}`, () => {
            expect(function() { instance.dispatcherCallback({ actionType: value }) }).toThrowError(message);
          });
        }
      });
    });

    describe('undo', () => {
      beforeEach(() => {
        spyOn(instance, '_triggerChange');
      });

      describe('if there is history', () => {
        beforeEach(() => {
          instance.history = ['foo', 'bar'];
          instance.undo();
        });

        it('removes the last history entry', () => {
          expect(instance.history).toEqual(['foo']);
        });

        it('sets the data to the previous entry', () => {
          expect(instance.data).toEqual('bar');
        });

        it('calls trigger change', () => {
          expect(instance._triggerChange).toHaveBeenCalled();
        });
      });

      describe('if there is no history left', () => {
        it('does not call trigger change', () => {
          instance.history = [];
          instance.undo();
          expect(instance._triggerChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('reset', () => {
      beforeEach(() => {
        spyOn(instance, '_triggerChange');
      });

      describe('if there is history', () => {
        beforeEach(() => {
          instance.history = ['foo', 'bar'];
          instance.reset();
        });

        it('resets the history array to the first entry', () => {
          expect(instance.history).toEqual(['foo']);
        });

        it('sets the data to the first entry', () => {
          expect(instance.data).toEqual('foo');
        });

        it('calls trigger change', () => {
          expect(instance._triggerChange).toHaveBeenCalled();
        });
      });

      describe('if there is only one history entry', () => {
        beforeEach(() => {
          instance.history = ['foo'];
          instance.reset();
        });

        it('maintains the same history array', () => {
          expect(instance.history).toEqual(['foo']);
        });

        it('maintains the same data', () => {
          expect(instance.data).toEqual('foo');
        });
      });
    });

    describe('_triggerChange', () => {
      it('emits the change', () => {
        spyOn(instance, 'emit');
        instance._triggerChange();
        expect(instance.emit).toHaveBeenCalledWith('change', instance.name);
      });
    });
  });
});
