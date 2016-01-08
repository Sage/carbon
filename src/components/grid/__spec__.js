import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ImmutableHelper from './../../utils/helpers/immutable';
import Grid from './grid';
import GridRow from './grid_row';

describe('Grid', () => {
  let instance, fields;

  beforeEach(() => {
    fields = [{name: 'foo', displayName: 'Foo'},
              {name: 'bar', className: 'customClass'}, 
              {name: 'baz', displayName: 'BazBaz', align: 'right'}];

    instance = TestUtils.renderIntoDocument(
      <Grid
        fields={ fields }
        className='customClass'
        data={ ImmutableHelper.parseJSON( [
                  { foo: '1', bar: '2', baz: '3' },
                  { foo: '4', bar: '5', baz: '6' } 
              ]) } />
    );
  });

  describe('Columns', () => {
    let headings;

    beforeEach(() => {
      headings = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'th');
    });

    it('builds a column for each field', () => {
      expect(headings.length).toEqual(3);
    });

    describe('when a custom displayName is NOT passed', () => {
      it('uses a capitalized version of the column name', () => {
        expect(headings[0].textContent).toEqual('Foo');
        expect(headings[1].textContent).toEqual('Bar');
      });
    });

    describe('when a custom display name is passed', () => {
      it('uses it as the text for the column header cell', () => {
        expect(headings[2].textContent).toEqual('BazBaz');
      });
    });

    describe('when a custom className is passed', () => {
      it('adds the custom className to the classList', () => {
        expect(headings[1].className).toEqual('common-grid__header__cell ui-grid__header__cell customClass');
      });
    });

    describe('when a align option is passed', () => {
      it('adds a align class to the specified side', () => {
        expect(headings[2].className).toEqual('common-grid__header__cell ui-grid__header__cell ui-grid__header__cell--align-right');
      });
    });
  });

  describe('Rows', () => {
    it('builds a grid row for each data element', () => {
      let rows = TestUtils.scryRenderedComponentsWithType(instance, GridRow); 
      expect(rows.length).toEqual(2);
    });
  });

  describe('gridClasses', () => {
    it('extends from common grid decorator and sets base ui-grid class', () => {
      instance = TestUtils.renderIntoDocument(
      <Grid fields={ fields }
        data={ ImmutableHelper.parseJSON([]) } />
      );

      expect(instance.gridClasses).toEqual('common-grid ui-grid'); 
    });

    it('adds any classes passed as props', () => {
      expect(instance.gridClasses).toEqual('common-grid ui-grid customClass'); 
    });
  });

  describe('gridHeaderClasses', () => {
    it('extends from common grid decorator and sets base ui-grid__header class', () => {
      expect(instance.gridHeaderClasses).toEqual('common-grid__header ui-grid__header'); 
    });
  });

  describe('gridHeaderRowClasses', () => {
    it('extends from common grid decorator and sets base ui-grid__header__row class', () => {
      expect(instance.gridHeaderRowClasses).toEqual('common-grid__header__row ui-grid__header__row'); 
    });
  });

  describe('Render', () => {
    it('renders a full table', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag).toBeTruthy();
    });

    it('renders a table row for the header and for each data element', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr').length).toEqual(3);
    });
  });
});
