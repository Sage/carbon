import ImmutableHelper from './immutable';
import Immutable from 'immutable';

describe('Immutable Helper', () => {

  describe('guid', () => {
    it('returns a 36 character id', () => {
      expect(ImmutableHelper.guid().length).toEqual(36);
    });

    it('returns a unique id', () => {
      let id = ImmutableHelper.guid();
      expect(ImmutableHelper.guid()).not.toEqual(id);
    });
  });

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

      it('does not add a row id', () => {
        expect(result.get('_row_id')).toBeFalsy();
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

      describe('_row_id', () => {
        describe('if the objects do not have a id', () => {
          it('adds a row_id to each object', () => {
            spyOn(ImmutableHelper, 'guid').and.returnValue('bla');
            data = [ { foo: 'a' }, { bar: 'b' }, { baz: 'c' } ];
            result = ImmutableHelper.parseJSON(data);

            expect(result.get(0).get('_row_id')).toEqual('bla');
            expect(result.get(1).get('_row_id')).toEqual('bla');
            expect(result.get(2).get('_row_id')).toEqual('bla');
          });
        });

        describe('if obj does have a id', () => {
          it('uses obj.id as the row id', () => {
            data = [ { id: 1, foo: 'a' }, { id: 2, bar: 'b' }, { id: 3, baz: 'c' } ];
            result = ImmutableHelper.parseJSON(data);

            expect(result.get(0).get('_row_id')).toEqual(1);
            expect(result.get(1).get('_row_id')).toEqual(2);
            expect(result.get(2).get('_row_id')).toEqual(3);
          });
        });
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
        spyOn(ImmutableHelper, 'guid').and.returnValue('bla');

        data = [{ foo: 'bar', baz: 'qux' }, { a: ['a', 'b', 'c'], b: 'b' }];
        
        let obj1 = Immutable.Seq({ foo: 'bar', baz: 'qux',  _row_id: 'bla' }).toOrderedMap();
        let array1 = Immutable.Seq(['a','b','c']).toList();
        let obj2 = Immutable.Seq({_row_id: 'bla', a: array1, b: 'b'}).toOrderedMap();
        expectedData = Immutable.Seq([obj1, obj2]).toList();
      });

      it('creates a immutable object in the same format', () => {
        let result = ImmutableHelper.parseJSON(data);
        expect(result.toJS()).toEqual(expectedData.toJS());
      });
    });
  });

  describe('getLineItemIndex', () => {
    let line_items;
    beforeEach(() => {
      line_items = Immutable.Seq([ 
        Immutable.Seq({ _row_id: 1 }).toOrderedMap(), 
        Immutable.Seq({ _row_id: 2 }).toOrderedMap(), 
        Immutable.Seq({ _row_id: 3 }).toOrderedMap(), 
        Immutable.Seq({ _row_id: 4 }).toOrderedMap() 
        ]).toList();
    });

    it('returns the index from a list of objects where the row_id matches the param row_id', () => {
      expect(ImmutableHelper.getLineItemIndex(line_items, 2)).toEqual(1);
    });

    it('returns -1 when the row does not exist', () => {
      expect(ImmutableHelper.getLineItemIndex(line_items, 5)).toEqual(-1);
    });
  });

  describe('parseLineItemAttribute', () => {
    it('parses a string of arrays and returns the correct indexed element', () => {
      let data = '[foo][bar][baz]';
      expect(ImmutableHelper.parseLineItemAttribute(data, 0)).toEqual('foo');
      expect(ImmutableHelper.parseLineItemAttribute(data, 1)).toEqual('bar');
      expect(ImmutableHelper.parseLineItemAttribute(data, 2)).toEqual('baz');
    });

    it('returns when element is not present', () => {
      let data = '[foo][bar][baz]';
      expect(ImmutableHelper.parseLineItemAttribute(data, 100)).toBeFalsy();
    });
  });

  describe('updateLineItem', () => {
    let data, line_item_key, attribute;

    beforeEach(() => {
      data = ImmutableHelper.parseJSON({ lines: [ { baz: '1' }, { baz: '2' }, { baz: '3' } ] });
      line_item_key = 'lines';
      attribute = '[foo][bar][baz]'
    });

    describe('when the line exists', () => {
      it('updates the line item', () => {
        let _row_id = data.get('lines').get(1).get('_row_id');

        let result = ImmutableHelper.updateLineItem([data, line_item_key, _row_id, attribute], 'NEWVALUE');
        expect(result.get('lines').get(1).get('baz')).toEqual('NEWVALUE');
      });
    });

    describe('when editing the placeholder', () => {
      let result, _row_id;

      beforeEach(() => {
        _row_id = '123';
        result = ImmutableHelper.updateLineItem([data, line_item_key, _row_id, attribute], 'NEWVALUE');
      });

      it('adds a new line', () => {
        expect(result.get('lines').size).toEqual(4);
      });

      it('updates the line item', () => {
        expect(result.get('lines').get(3).get('baz')).toEqual('NEWVALUE');
      });
    });
  });

  describe('deleteLineItem', () => { 
    let data, line_item_key;

    beforeEach(() => {
      data = ImmutableHelper.parseJSON({ lines: [ { baz: '1' }, { baz: '2' }, { baz: '3' } ] });
      line_item_key = 'lines';
    });


    describe('when the row exisits', () => {
      it('deletes the given row', () => {
        let _row_id = data.get('lines').get(1).get('_row_id');

        let result = ImmutableHelper.deleteLineItem([data, line_item_key, _row_id]);
        expect(result.get('lines').size).toEqual(2);
      });
    });

    describe('when the row does not exist', () => {
      it('does not change the data', () => {
        let result = ImmutableHelper.deleteLineItem([data, line_item_key, 'no_row']);
        expect(result.get('lines').size).toEqual(3);
      });
    });
  });
});
