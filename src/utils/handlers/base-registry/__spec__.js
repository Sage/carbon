import BaseRegistry from './base-registry';

describe('BaseRegistry', () => {
  let instance;

  beforeEach(() => {
    instance = new BaseRegistry;
  });

  describe('defaultHandler', () => {
    it('returns the same value you pass it', () => {
      expect(instance.defaultHandler.call('foo')).toEqual('foo');
    });
  });

  describe('handlers', () => {
    it('is an empty array', () => {
      expect(instance.handlers).toEqual([]);
    });
  });

  describe('register', () => {
    it('adds to the handlers array', () => {
      instance.register('foo');
      instance.register('bar');
      expect(instance.handlers).toEqual(['foo', 'bar']);
    });
  });

  describe('obtain', () => {
    describe('when it cannot find a handler', () => {
      it('returns the defaultHandler', () => {
        expect(instance.obtain()).toEqual(instance.defaultHandler);
      });
    });

    describe('when it can find a handler', () => {
      it('returns the handler that checks true', () => {
        let handler1 = {
          check: () => { return false; },
          name: "1"
        }, handler2 = {
          check: () => { return true; },
          name: "2"
        }, handler3 = {
          check: () => { return false; },
          name: "3"
        };

        instance.register(handler1);
        instance.register(handler2);
        instance.register(handler3);

        expect(instance.obtain().name).toEqual("2");
      });

      it('returns the handler that checks true with params', () => {
        let handler1 = {
          check: (foo, bar) => {
            return foo == "a" && bar == "a";
          },
          name: "1"
        }, handler2 = {
          check: (foo, bar) => {
            return foo == "a" && bar == "b";
          },
          name: "2"
        }, handler3 = {
          check: (foo, bar) => {
            return foo == "b" && bar == "a";
          },
          name: "3"
        };

        instance.register(handler1);
        instance.register(handler2);
        instance.register(handler3);

        expect(instance.obtain("a", "a").name).toEqual("1");
        expect(instance.obtain("a", "b").name).toEqual("2");
        expect(instance.obtain("b", "a").name).toEqual("3");
      });
    });
  });
});
