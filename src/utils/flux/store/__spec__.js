import Store from './index';
import { Dispatcher } from 'flux';

describe('Store', () => {
  var instance, dispatcher;

  beforeEach(() => {
    dispatcher = new Dispatcher();
  });

  describe('constructor', () => {
    describe('init without a dispatcher', () => {
      it('throws an error', () => {
        expect(function() { new Store }).toThrowError("You need to initialize your store with your application's dispatcher. Check the initialization of Store.");
      });
    });

    describe('init with a dispatcher', () => {
      it('registers the dispatcher and store the token', () => {
        spyOn(dispatcher, 'register').and.returnValue('foo');
        instance = new Store(dispatcher);
        expect(dispatcher.register).toHaveBeenCalledWith(instance.dispatcherCallback);
        expect(instance.dispatchToken).toEqual('foo');
      });
    });
  });

  describe("with an actual store", () => {
    beforeEach(() => {
      instance = new Store(dispatcher);
      instance.name = 'foo';
      instance.data = 'some data';
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
            expect(instance.history).toBeUndefined();
          });
        });

        describe('if history is enabled', () => {
          beforeEach(() => {
            instance.history = ['foo'];
            instance.data = 'bar';
            instance.dispatcherCallback({ actionType: 'foobar' });
          });

          it('adds the data to the history', () => {
            expect(instance.history).toEqual(['foo', 'bar']);
          });
        });
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

        it('resets the history array', () => {
          expect(instance.history).toEqual([]);
        });

        it('sets the data to the first entry', () => {
          expect(instance.data).toEqual('foo');
        });

        it('calls trigger change', () => {
          expect(instance._triggerChange).toHaveBeenCalled();
        });
      });

      describe('if there is no history left', () => {
        it('does not call trigger change', () => {
          instance.history = [];
          instance.reset();
          expect(instance._triggerChange).not.toHaveBeenCalled();
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
