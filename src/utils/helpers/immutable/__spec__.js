import Immutable from 'immutable';
import ImmutableHelper from './immutable';

describe('Immutable Helper', () => {
  describe('parseJSON', () => {
    describe('when the passed json is not an object', () => {
      it('returns the json', () => {
        expect(ImmutableHelper.parseJSON('a')).toEqual('a');
      });
    });

    describe('when the passed json is null', () => {
      it('returns null', () => {
        expect(ImmutableHelper.parseJSON(null)).toBeNull();
      });
    });

    describe('when the JSON is a simple array', () => {
      let data, expectedData, result;

      beforeEach(() => {
        data = ['a', 'b', 'c'];
        expectedData = Immutable.Seq(data).toList();
        result = ImmutableHelper.parseJSON(data);
      });

      it('returns a immutable object of that array', () => {
        expect(result).toEqual(expectedData);
        expect(result.get(0)).toEqual('a');
        expect(result.get(1)).toEqual('b');
        expect(result.get(2)).toEqual('c');
      });
    });

    describe('when the JSON object is a array of objects', () => {
      let data, result;

      it('returns a immutable object of that array', () => {
        data = [{ foo: 'a' }, { bar: 'b' }, { baz: 'c' }];
        result = ImmutableHelper.parseJSON(data);

        expect(result.get(0).get('foo')).toEqual('a');
        expect(result.get(1).get('bar')).toEqual('b');
        expect(result.get(2).get('baz')).toEqual('c');
      });
    });

    describe('when JSON is a object', () => {
      let data, expectedData;

      beforeEach(() => {
        data = { foo: 'bar', baz: 'qux' };
        expectedData = Immutable.Seq(data).toMap();
      });

      it('returns a ordered immutable map', () => {
        const result = ImmutableHelper.parseJSON(data);
        expect(result).toEqual(expectedData);
        expect(result.get('foo')).toEqual('bar');
        expect(result.get('baz')).toEqual('qux');
      });
    });

    describe('when JSON is a complex value with nest arrays and objects', () => {
      let data, expectedData;

      beforeEach(() => {
        data = [{ foo: 'bar', baz: 'qux' }, { a: ['a', 'b', 'c'], b: 'b' }];

        const obj1 = Immutable.Seq({ foo: 'bar', baz: 'qux' }).toMap();
        const array1 = Immutable.Seq(['a', 'b', 'c']).toList();
        const obj2 = Immutable.Seq({ a: array1, b: 'b' }).toMap();
        expectedData = Immutable.Seq([obj1, obj2]).toList();
      });

      it('creates a immutable object in the same format', () => {
        const result = ImmutableHelper.parseJSON(data);
        expect(result.toJS()).toEqual(expectedData.toJS());
      });
    });

    describe('when passed a number', () => {
      it('casts it to a string', () => {
        expect(ImmutableHelper.parseJSON(1)).toEqual(Immutable.fromJS('1'));
        expect(ImmutableHelper.parseJSON(3.142)).toEqual(Immutable.fromJS('3.142'));
      });

      describe('as a nested element', () => {
        it('casts all numbers to a string', () => {
          const data = [{ foo: 'bar', baz: 'qux' }, { a: [1, 2, 'c'], b: 2 }];

          const obj1 = Immutable.Seq({ foo: 'bar', baz: 'qux' }).toMap();
          const array1 = Immutable.Seq(['1', '2', 'c']).toList();
          const obj2 = Immutable.Seq({ a: array1, b: '2' }).toMap();
          const expectedData = Immutable.Seq([obj1, obj2]).toList();

          const result = ImmutableHelper.parseJSON(data);
          expect(result.toJS()).toEqual(expectedData.toJS());
        });
      });
    });

    describe('when passed an object containing "length" field', () => {
      it('returns immutable map containing that field', () => {
        const data = { length: 5 };
        const expectedData = Immutable.Map({ length: '5' });
        const result = ImmutableHelper.parseJSON(data);
        expect(result.toJS()).toEqual(expectedData.toJS());
      });
    });
  });
});
