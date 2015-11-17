import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import TableRow from './index';
import ImmutableHelper from './../../utils/helpers/immutable';
import Textbox from './../textbox';
import Decimal from './../decimal';

describe('TableRow', () => {
  let regular;
  let gutter;

  beforeEach(() => {
    let fields = [
      <Textbox
        name="foo"
        key="foo"
        value="1"/>,

      <Decimal
        key='2'
        name='debit'/>
    ]

    regular = TestUtils.renderIntoDocument(

          <TableRow
            name='regular'
            key='regular_1'
            row_id='regular_1_reg'
            data={ ImmutableHelper.parseJSON([{ foo: 'bar' }, { foo: 'qux' }])  }
            fields={ fields }
            deleteRowHandler={ function() {} }
            updateRowHandler={ function() {} } />
);


    gutter = TestUtils.renderIntoDocument(

        <TableRow
          name='gutter'
          key='gutter_1'
          row_id='gutter_1_gut'
          data={ ImmutableHelper.parseJSON([{ foo: 'bar' }, { foo: 'qux' }])  }
          fields={ fields }
          gutter= { <Textbox name="gutter" /> }
          deleteRowHandler={ function() {} }
          updateRowHandler={ function() {} } />);

    let regularInstance = TestUtils.findRenderedDOMComponentWithClass(regular , 'ui-table-row');
    debugger;
  });

  describe('lifecycle functions', () => {
    describe('shouldComponentUpdate', () => {
      describe('when force update is true', () => {
        it('should update the component', () => {
          let nextProps = { forceUpdate: true };

          expect(regular.shouldComponentUpdate(nextProps)).toBeTruthy();
        });
      });

      describe('gutter fields', () => {
        describe('when the table has gutter fields', () => {
          it('should always update', () => {
            expect(gutter.shouldComponentUpdate({})).toBeTruthy();
          });
        });

        describe('when the table has no gutter fields', () => {
          it('should not update when props have not changed', () => {
            expect(regular.shouldComponentUpdate(regular.props)).toBeFalsy();
          });
        });
      });

      describe('when props have changed', () => {
        it('should update the component', () => {
          let nextProps = {
            data: ImmutableHelper.parseJSON([{ foo: 'change' }, { foo: 'change'}])
          };
          expect(regular.shouldComponentUpdate(nextProps)).toBeTruthy();
        });
      });
    });
  });

  describe('buildRows', () => {

    describe('regular row', () => {
      it('Adds a delete button to the row', () => {
        let deleteButton = TestUtils.findRenderedDOMComponentWithClass(regular, 'ui-table-row__delete');
        expect(deleteButton.type).toEqual('button')

      });

      it('builds each field', () => {

      });

      it('sets the value for each field', () => {

      });

    });

    describe('placeholder row', () => {

    });

    describe('gutter row', () => {

    });
  });
});
