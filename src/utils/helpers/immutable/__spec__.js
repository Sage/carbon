import ImmutableHelper from './immutable';
import Immutable from 'immutable';

describe('Immutable Helper', () => {
  describe('parseJSON', () => {
    describe('when the passed json is not an object', () => {
      it('returns the json', () => {
        expect(ImmutableHelper.parseJSON(1)).toEqual(1);
      });
    });

    describe('when the passed json is null', () => {
      it('returns null', () => {
        expect(ImmutableHelper.parseJSON(null)).toBeNull();
      });
    });

    describe('when the JSON is a simple array', () => {
      let data;
      let expectedData; 
      let result;

      beforeEach(() => {
        data = [ 1, 2, 3 ];
        expectedData = Immutable.Seq(data).toList();
        result = ImmutableHelper.parseJSON(data);
      });

      it('returns a immutable object of that array', () => {
        expect(result).toEqual(expectedData);
        expect(result.get(0)).toEqual(1);
        expect(result.get(1)).toEqual(2);
        expect(result.get(2)).toEqual(3);
      });
    });

    describe('when the JSON object is a array of objects', () => {
      let data, result;

      it('returns a immutable object of that array', () => {
        data = [ { foo: 'a' }, { bar: 'b' }, { baz: 'c' } ];
        result = ImmutableHelper.parseJSON(data);

        expect(result.get(0).get('foo')).toEqual('a');
        expect(result.get(1).get('bar')).toEqual('b');
        expect(result.get(2).get('baz')).toEqual('c');
      });
    });

    describe('when JSON is a object', () => {
      let data;
      let expectedData; 

      beforeEach(() => {
        data = { foo: 'bar', baz: 'qux' };
        expectedData = Immutable.Seq(data).toOrderedMap();
      });

      it('returns a ordered immutable map', () => {
        let result = ImmutableHelper.parseJSON(data);
        expect(result).toEqual(expectedData);
        expect(result.get('foo')).toEqual('bar');
        expect(result.get('baz')).toEqual('qux');
      });
    });

    describe('when JSON is a complex value with nest arrays and objects', () => {
      let data;
      let expectedData;

      beforeEach(() => {
        data = [{ foo: 'bar', baz: 'qux' }, { a: ['a', 'b', 'c'], b: 'b' }];

        let obj1 = Immutable.Seq({ foo: 'bar', baz: 'qux' }).toOrderedMap();
        let array1 = Immutable.Seq(['a','b','c']).toList();
        let obj2 = Immutable.Seq({a: array1, b: 'b'}).toOrderedMap();
        expectedData = Immutable.Seq([obj1, obj2]).toList();
      });

      it('creates a immutable object in the same format', () => {
        let result = ImmutableHelper.parseJSON(data);
        expect(result.toJS()).toEqual(expectedData.toJS());
      });
    });
  });

});
