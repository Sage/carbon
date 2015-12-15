import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import TableRow from './table-row';
import ImmutableHelper from './../../utils/helpers/immutable';
import Immutable from 'immutable';
import Textbox from './../textbox';
import Decimal from './../decimal';
import DropdownSuggest from './../dropdown-suggest';

describe('TableRow', () => {
  let regular, gutter, placeholder,
      regularTable, gutterTable, placeholderTable,
      baseData;

  let deleteSpy = jasmine.createSpy('deleteSpy');
  let updateSpy = jasmine.createSpy('updateSpy');

  beforeEach(() => {
    let fields = [
      <Textbox
        name="foo"
        key="foo" />,

      <Decimal
        key='bar'
        name='bar'/>,

      <DropdownSuggest
        key='baz'
        name='baz'
        path='' />
    ]

    baseData = ImmutableHelper.parseJSON({ foo: 'text',
      bar: '1.00',
      baz: Immutable.fromJS({ id: 1, name: 'baz' })
    });

    regularTable = document.createElement('table');
    regularTable.innerHTML = '<tbody></tbody>';

    regular = ReactDOM.render((<TableRow
      name='regular'
      key='regular_1'
      row_id='regular_1_reg'
      data={ baseData }
      fields={ fields }
      deleteRowHandler={ deleteSpy }
      updateRowHandler={ updateSpy } />), regularTable.children[0]);

    gutterTable = document.createElement('table');
    gutterTable.innerHTML = '<tbody></tbody>';
    let gutterFields = { foo: <Textbox name='foo' /> }

    gutter = ReactDOM.render((<TableRow
          name='gutter'
          key='gutter_1'
          row_id='gutter_1_gut'
          fields={ fields }
          gutterFields={ gutterFields } />), gutterTable.children[0]);

    placeholderTable = document.createElement('table');
    placeholderTable.innerHTML = '<tbody></tbody>';

    placeholder = ReactDOM.render((<TableRow
          name='placeholder'
          key='placeholder_1'
          placeholder='true'
          row_id='placeholder_1_place'
          fields={ fields } />), placeholderTable.children[0]);
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
            expect(gutter.shouldComponentUpdate({ gutterFields: 'foo' })).toBeTruthy();
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
            data: ImmutableHelper.parseJSON({ foo: 'change', bar: '10000.0' })
          };
          expect(regular.shouldComponentUpdate(nextProps)).toBeTruthy();
        });
      });

      describe('when props have not changed', () => {
        it('should update the component', () => {
          let nextProps = {
            data: baseData
          };
          expect(regular.shouldComponentUpdate(nextProps)).toBeFalsy();
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
        let regularRow = TestUtils.findRenderedDOMComponentWithClass(regular, 'ui-table-row');
        let regularCells = TestUtils.scryRenderedDOMComponentsWithClass(regular, 'ui-table-row__td');
        expect(regularCells.length).toEqual(4);
        expect(regularCells[0].children[0].type).toEqual('button');
        expect(regularCells[1].children[0].classList[0]).toEqual('ui-textbox');
        expect(regularCells[2].children[0].classList[0]).toEqual('ui-decimal');
      });

      it('sets the value for each field', () => {
        let textbox = TestUtils.findRenderedDOMComponentWithClass(regular, 'ui-textbox__input');
        let decimal = TestUtils.findRenderedDOMComponentWithClass(regular, 'ui-decimal__input');
        expect(textbox.value).toEqual('text');
        expect(decimal.value).toEqual('1.00');
      });

    });

    describe('placeholder row', () => {
      it('Does not add a delete button', () => {
        let deleteButtons = TestUtils.scryRenderedDOMComponentsWithClass(placeholder, 'ui-table-row__delete');
        expect(deleteButtons.length).toEqual(0);
      });

      it('builds each field', () => {
        let placeholderRow = TestUtils.findRenderedDOMComponentWithClass(placeholder, 'ui-table-row');
        let placeholderCells = TestUtils.scryRenderedDOMComponentsWithClass(placeholder, 'ui-table-row__td');
        expect(placeholderCells.length).toEqual(4);
        expect(placeholderCells[0].children.length).toEqual(0);
        expect(placeholderCells[1].children[0].classList[0]).toEqual('ui-textbox');
        expect(placeholderCells[2].children[0].classList[0]).toEqual('ui-decimal');
      });

      it('sets no values', () => {
        let textbox = TestUtils.findRenderedDOMComponentWithClass(placeholder, 'ui-textbox__input');
        let decimal = TestUtils.findRenderedDOMComponentWithClass(placeholder, 'ui-decimal__input');
        expect(textbox.value).toEqual('');
        expect(decimal.value).toEqual('0.00');
      });

    });

    describe('gutter row', () => {
      it('Does not add a delete button', () => {
        let deleteButtons = TestUtils.scryRenderedDOMComponentsWithClass(gutter, 'ui-table-row__delete');
        expect(deleteButtons.length).toEqual(0);
      });

      it('builds empty tds where a gutter field is not present', () => {
        let gutterCells = TestUtils.scryRenderedDOMComponentsWithClass(gutter, 'ui-table-row__td');
        expect(gutterCells.length).toEqual(4);
        expect(gutterCells[0].children.length).toEqual(0);
      });

      it('builds cells where a gutterField is present', () => {
        let gutterCells = TestUtils.scryRenderedDOMComponentsWithClass(gutter, 'ui-table-row__td');
        expect(gutterCells[1].children[0].classList[0]).toEqual('ui-textbox');
      });
    });
  });

  describe('deleteMethod', () => {
    it('triggers the deleteRowHandler', () => {
      let deleteButton = TestUtils.findRenderedDOMComponentWithClass(regular, 'ui-table-row__delete');
      TestUtils.Simulate.click(deleteButton);
      expect(deleteSpy).toHaveBeenCalled();
    });
  });

  describe('buildCell', () => {
    describe('regular rows', () => {
      let cell, input;

      beforeEach(() => {
        cell = TestUtils.scryRenderedDOMComponentsWithClass(regular, 'ui-table-row__td')[1];
        input = cell.getElementsByTagName('INPUT')[0];
      });

      it('builds a td cell', () => {
        expect(cell.tagName).toEqual("TD");
      });

      it('sets the name property', () => {
        expect(input.name).toEqual('[regular_attributes][regular_1_reg][foo]');
      });

      it('adds the updateRowHandler', () => {
        TestUtils.Simulate.change(input);
        expect(updateSpy).toHaveBeenCalled();
      });
    });

    describe('When value is an object', () => {
      it('Strips out id and name from the object', () => {
        let cells = TestUtils.scryRenderedDOMComponentsWithClass(regular, 'ui-table-row__td');
        let visibleDropdownInput = cells[3].getElementsByTagName('INPUT')[0];
        let hiddenDropdownInput= cells[3].getElementsByTagName('INPUT')[1];
        expect(visibleDropdownInput.value).toEqual('baz');
        expect(hiddenDropdownInput.value).toEqual('1');
      });
    });
  });

  describe('render', () => {
    it('renders a tr with ui-table-row class', () => {
      let row = TestUtils.findRenderedDOMComponentWithTag(regular, 'tr');
      expect(row.className).toEqual('ui-table-row');
    });

    describe('when a gutter row', () => {
      it('adds a gutter class', () => {
        let row = TestUtils.findRenderedDOMComponentWithTag(gutter, 'tr');
        expect(row.classList[1]).toEqual('ui-table-row--gutter');
      });
    });
  });
});
