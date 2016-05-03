import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableCell } from './../table';
import TableRow from './table-row';
import TableHeader from './../table-header';
import Icon from './../../icon';
import Checkbox from './../../checkbox';

describe('TableRow', () => {
  let instance, clickableInstance, row;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo">
          <TableCell />
        </TableRow>
      </Table>
    );

    clickableInstance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo" onClick={ function() {}}>
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  describe('selectable and multiSelectable', () => {
    it('throws an error if selectable and no id', () => {
      spyOn(console, 'error');
      <TableRow selectable={ true }></TableRow>;
      expect(console.error).toHaveBeenCalledWith("Warning: Failed propType: A selectable TableRow must provide a uniqueID prop to track itself within the Table.");
    });

    it('throws an error if both are true', () => {
      spyOn(console, 'error');
      <TableRow selectable={ true } multiSelectable={ true }></TableRow>;
      expect(console.error).toHaveBeenCalledWith("Warning: Failed propType: A TableRow can only either be 'selectable' or 'multiSelectable' - not both.");
    });

    it('throws an error if multiSelectable and no id', () => {
      spyOn(console, 'error');
      <TableRow multiSelectable={ true }></TableRow>;
      expect(console.error).toHaveBeenCalledWith("Warning: Failed propType: A multiSelectable TableRow must provide a uniqueID prop to track itself within the Table.");
    });
  });

  describe('componentWillMount', () => {
    describe('if selectable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table selectable={ true }><TableRow></TableRow></Table>);
          }
          expect(render).toThrowError('A selectable TableRow must provide a uniqueID prop to track itself within the Table.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table selectable={ true }><TableRow uniqueID="foo"></TableRow></Table>);
          }
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if multiSelectable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table multiSelectable={ true }><TableRow></TableRow></Table>);
          }
          expect(render).toThrowError('A selectable TableRow must provide a uniqueID prop to track itself within the Table.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table multiSelectable={ true }><TableRow uniqueID="foo"></TableRow></Table>);
          }
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if neither selectable or multiSelectable', () => {
      it('does not throw error', () => {
        var render = function() {
          TestUtils.renderIntoDocument(<Table><TableRow></TableRow></Table>);
        }
        expect(render).not.toThrowError();
      });
    });

    describe('if attachToTable is defined', () => {
      describe('if uniqueID', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'attachToTable');
          spyOn(row.context, 'checkSelection');
          row.componentWillMount();
        });

        it('calls attachToTable', () => {
          expect(row.context.attachToTable).toHaveBeenCalled();
        });

        it('calls checkSelection', () => {
          expect(row.context.checkSelection).toHaveBeenCalled();
        });
      });

      describe('if no uniqueID', () => {
        it('does not call attachToTable', () => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'attachToTable');
          row.componentWillMount();
          expect(row.context.attachToTable).not.toHaveBeenCalled();
        });
      });
    });

    describe('if selected via props', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ selected: true });
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('if detachFromTable', () => {
      describe('if uniqueID', () => {
        it('calls detachFromTable', () => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'detachFromTable');
          row.componentWillUnmount();
          expect(row.context.detachFromTable).toHaveBeenCalledWith('foo');
        });
      });

      describe('if no uniqueID', () => {
        it('calls detachFromTable', () => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'detachFromTable');
          row.componentWillUnmount();
          expect(row.context.detachFromTable).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when uniqueID does not match', () => {
      it('calls checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: "bar" });
        expect(row.context.checkSelection).toHaveBeenCalled();
      });
    });

    describe('when uniqueID matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: "foo" });
        expect(row.context.checkSelection).not.toHaveBeenCalled();
      });
    });

    describe('when selected prop does not match', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: false });
        expect(row.setState).toHaveBeenCalledWith({ selected: false });
      });
    });

    describe('when selected prop matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('onSelectAll', () => {
    it('calls selectAll via the context', () => {
      instance = TestUtils.renderIntoDocument(<Table><TableRow selected={ true }></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectAll');
      row.onSelectAll();
      expect(row.context.selectAll).toHaveBeenCalledWith(row);
    });
  });

  describe('onRowClick', () => {
    it('calls selectRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectRow');
      row.onRowClick();
      expect(row.context.selectRow).toHaveBeenCalledWith("foo", row, true);
    });

    describe('if onSelect is defined as a prop', () => {
      it('calls onSelect', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow onSelect={ spy }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick();
        expect(spy).toHaveBeenCalledWith(row, true);
      });
    });

    describe('if onClick is defined as a prop', () => {
      it('calls onClick', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow onClick={ spy }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick("foo");
        expect(spy).toHaveBeenCalledWith("foo");
      });
    });
  });

  describe('onMultiSelect', () => {
    it('calls selectRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectRow');
      row.onMultiSelect();
      expect(row.context.selectRow).toHaveBeenCalledWith("foo", row, true);
    });

    describe('if onSelect is defined as a prop', () => {
      it('calls onSelect', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow onSelect={ spy }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onMultiSelect();
        expect(spy).toHaveBeenCalledWith(row, true);
      });
    });
  });

  it('renders a tr with correct classes', () => {
    let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
    expect(tr).toBeDefined();
    expect(tr.className).toEqual('ui-table-row foo');
  });

  describe('if the row is clickable', () => {
    it('adds a clickable class', () => {
      let tr = TestUtils.findRenderedDOMComponentWithTag(clickableInstance, 'tr');
      expect(tr.className).toMatch('ui-table-row--clickable');
    });
  });

  describe('other props', () => {
    it('consumes other props on the tr element', () => {
      let spy = jasmine.createSpy();

      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow className="foo" onClick={ spy }>
            <TableCell />
          </TableRow>
        </Table>
      );

      let tr = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-table-row');
      TestUtils.Simulate.click(tr);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('without selectability', () => {
      it('renders its children', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(2);
      });
    });

    describe('with selectAll', () => {
      it('renders a select all cell', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selectAll={ true }><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelectAll);
      });
    });

    describe('with multiSelectable via context', () => {
      it('renders a multi select cell', () => {
        instance = TestUtils.renderIntoDocument(<Table multiSelectable={ true }><TableRow uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onMultiSelect);
      });
    });

    describe('with multiSelectable via prop', () => {
      it('renders a multi select cell', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow multiSelectable={ true } uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onMultiSelect);
      });
    });

    describe('with hideMultiSelect', () => {
      it('renders a multi select cell without a checkbox', () => {
        instance = TestUtils.renderIntoDocument(<Table multiSelectable={ true }><TableRow hideMultiSelect={ true } uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        expect(row.children.length).toEqual(3);
        expect(row.children[0].children()).toBe(undefined);
      });
    });

    describe('if is header', () => {
      it('renders a table header', () => {
        instance = TestUtils.renderIntoDocument(<Table multiSelectable={ true }><TableRow as="header" uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let th = TestUtils.findRenderedComponentWithType(instance, TableHeader);
        expect(th).toBeTruthy();
      });
    });
  });
});
