import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Table, TableCell } from './../table';
import TableRow from './table-row';
import TableHeader from './../table-header';
import Icon from './../../icon';
import Checkbox from './../../checkbox';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

import { shallow, mount } from 'enzyme';
import { WithDragAndDrop, DraggableContext } from './../../drag-and-drop';

describe('TableRow', () => {
  let instance, clickableInstance, row;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table actions={ [] }>
        <TableRow className="foo">
          <TableCell />
        </TableRow>
      </Table>
    );

    clickableInstance = TestUtils.renderIntoDocument(
      <Table actions={ [] }>
        <TableRow className="foo" onClick={ function() {}}>
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  describe('componentWillMount', () => {
    describe('if highlightable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table actions={ [] }highlightable={ true }><TableRow></TableRow></Table>);
          }
          expect(render).toThrowError('A TableRow which is selectable or highlightable should provide a uniqueID.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table actions={ [] }highlightable={ true }><TableRow uniqueID="foo"></TableRow></Table>);
          }
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if selectable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table actions={ [] }selectable={ true }><TableRow></TableRow></Table>);
          }
          expect(render).toThrowError('A TableRow which is selectable or highlightable should provide a uniqueID.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          var render = function() {
            TestUtils.renderIntoDocument(<Table actions={ [] }selectable={ true }><TableRow uniqueID="foo"></TableRow></Table>);
          }
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if neither highlightable or selectable', () => {
      it('does not throw error', () => {
        var render = function() {
          TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow></TableRow></Table>);
        }
        expect(render).not.toThrowError();
      });
    });

    describe('if attachToTable is defined', () => {
      describe('if uniqueID', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
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
          instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'attachToTable');
          row.componentWillMount();
          expect(row.context.attachToTable).not.toHaveBeenCalled();
        });
      });
    });

    describe('if selected via props', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ selected: true });
      });
    });

    describe('if highlighted via props', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow highlighted={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ highlighted: true });
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('if detachFromTable', () => {
      describe('if context', () => {
        it('calls detachFromTable', () => {
          instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'detachFromTable');
          row.componentWillUnmount();
          expect(row.context.detachFromTable).toHaveBeenCalledWith(row.rowID);
        });
      });

      describe('if no context', () => {
        it('does not throw error', () => {
          instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          row.context = {};
          row.componentWillUnmount();
          expect(row.context).toEqual({});
        });
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when uniqueID does not match', () => {
      it('calls checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: "bar" });
        expect(row.context.checkSelection).toHaveBeenCalled();
      });
    });

    describe('when uniqueID matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: "foo" });
        expect(row.context.checkSelection).not.toHaveBeenCalled();
      });
    });

    describe('when selected prop does not match', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: false });
        expect(row.setState).toHaveBeenCalledWith({ selected: false });
      });
    });

    describe('when selected prop matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selected={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });

    describe('when highlighted prop does not match', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow highlighted={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ highlighted: false });
        expect(row.setState).toHaveBeenCalledWith({ highlighted: false });
      });
    });

    describe('when highlighted prop matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow highlighted={ true }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ highlighted: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('onSelectAll', () => {
    it('calls selectAll via the context', () => {
      instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selected={ true }></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectAll');
      row.onSelectAll();
      expect(row.context.selectAll).toHaveBeenCalledWith(row);
    });
  });

  describe('onRowClick', () => {
    it('calls highlightRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table actions={ [] } highlightable={ true }><TableRow uniqueID="foo"></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'highlightRow');
      row.onRowClick();
      expect(row.context.highlightRow).toHaveBeenCalledWith("foo", row);
    });

    describe('if onHighlight is defined as a prop', () => {
      it('calls onSelect', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow onHighlight={ spy } uniqueID="foo"></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick();
        expect(spy).toHaveBeenCalledWith("foo", true, row);
      });
    });

    describe('if onClick is defined as a prop', () => {
      it('calls onClick', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow onClick={ spy }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick("foo");
        expect(spy).toHaveBeenCalledWith("foo");
      });
    });
  });

  describe('onSelect', () => {
    it('calls selectRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"></TableRow></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectRow');
      row.onSelect();
      expect(row.context.selectRow).toHaveBeenCalledWith("foo", row, true);
    });

    describe('if onSelect is defined as a prop', () => {
      it('calls onSelect', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo" onSelect={ spy }></TableRow></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onSelect({ target: { value: true } });
        expect(spy).toHaveBeenCalledWith("foo", true, row);
      });
    });
  });

  it('renders a tr with correct classes', () => {
    let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
    expect(tr).toBeDefined();
    expect(tr.className).toEqual('carbon-table-row foo');
  });

  describe('if the row is clickable', () => {
    it('adds a clickable class', () => {
      let tr = TestUtils.findRenderedDOMComponentWithTag(clickableInstance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--clickable');
    });
  });

  describe('when selected', () => {
    it('renders the selected class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table actions={ [] }>
          <TableRow selected={ true }>
            <TableCell />
          </TableRow>
        </Table>
      );
      let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--selected');
    });
  });

  describe('when highlighted', () => {
    it('renders the highlighted class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table actions={ [] }>
          <TableRow highlighted={ true }>
            <TableCell />
          </TableRow>
        </Table>
      );
      let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--highlighted');
    });
  });

  describe('when highlighted and selected', () => {
    it('only renders the selected class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table actions={ [] }>
          <TableRow highlighted={ true } selected={ true }>
            <TableCell />
          </TableRow>
        </Table>
      );
      let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--selected');
      expect(tr.className).not.toMatch('carbon-table-row--highlighted');
    });
  });

  describe('other props', () => {
    it('consumes other props on the tr element', () => {
      let spy = jasmine.createSpy();

      instance = TestUtils.renderIntoDocument(
        <Table actions={ [] }>
          <TableRow className="foo" onClick={ spy }>
            <TableCell />
          </TableRow>
        </Table>
      );

      let tr = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-table-row');
      TestUtils.Simulate.click(tr);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('without selectability', () => {
      it('renders its children', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(2);
      });
    });

    describe('without selectability on the table but disabled on the row', () => {
      it('renders its children', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] } selectable={ true }><TableRow selectable={ false }><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(2);
      });
    });

    describe('with selectAll', () => {
      it('renders a select all cell', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selectAll={ true }><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelectAll);
      });
    });

    describe('with selectable via context', () => {
      it('renders a multi select cell', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] } selectable={ true }><TableRow uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelect);
      });
    });

    describe('with selectable via prop', () => {
      it('renders a multi select cell', () => {
        let spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table actions={ [] }><TableRow selectable={ true } uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        let checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelect);
        checkbox.props.onClick({ stopPropagation: spy });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('with hideMultiSelect', () => {
      it('renders a multi select cell without a checkbox', () => {
        instance = TestUtils.renderIntoDocument(
          <Table actions={ [] } selectable={ true }><TableRow hideMultiSelect={ true } uniqueID="foo"><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        expect(row.children.length).toEqual(3);
        expect(TestUtils.scryRenderedComponentsWithType(instance, Checkbox).length).toEqual(0);
      });
    });

    describe('if is header', () => {
      it('renders a table header', () => {
        instance = TestUtils.renderIntoDocument(<Table actions={ [] } selectable={ true }><TableRow as="header" uniqueID="foo"><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        let th = TestUtils.findRenderedComponentWithType(instance, TableHeader);
        expect(th).toBeTruthy();
      });
    });

    describe('with dragDropManager via context', () => {
      let options;
      let parentTable;
      let dragDropManager;

      beforeEach(() => {
        parentTable = document.createElement('table');
        dragDropManager = jasmine.createSpyObj('dragDropManager', [ 'getActions' ]);
        options = {
          attachTo: parentTable,
          context: {
            dragDropManager: dragDropManager,
            moveItem: () => {}
          },
          childContextTypes: {
            dragDropManager: React.PropTypes.object,
            moveItem: React.PropTypes.func
          }
        };
      });

      describe('when defined', () => {
        it('renders a WithDragAndDrop component', () => {
          let wrapper = mount(
            <DraggableContext>
              <TableRow index={ 1 }>
                <td />
                <td />
              </TableRow>
            </DraggableContext>,
            options
          );

          expect(wrapper.find(WithDragAndDrop).length).toEqual(1);
        });

        describe('when a row does not have an index prop', () => {
          it('throws an error if the row is not a header row', () => {
            let render = () => {
              mount(
                <DraggableContext>
                  <TableRow>
                    <td />
                    <td />
                  </TableRow>
                </DraggableContext>,
                options
              );
            };

            expect(render).toThrowError('You need to provide an index for rows that are draggable');
          });

          it('does not throw an error for header rows', () => {
            let render = () => {
              mount(
                <DraggableContext>
                  <Table>
                    <thead>
                      <TableRow as="header" key="header">
                        <TableHeader>Country</TableHeader>
                        <TableHeader>Code</TableHeader>
                      </TableRow>
                    </thead>
                    <tbody>
                      <TableRow index={ 1 }>
                        <td />
                        <td />
                      </TableRow>
                    </tbody>
                  </Table>
                </DraggableContext>,
                options
              );
            };

            expect(render).not.toThrowError('You need to provide an index for rows that are draggable');
          });
        });

      });


      it('renders a TableRow when undefined', () => {
        delete options.context.dragDropManager;

        let wrapper = mount(
          <TableRow index={ 1 }>
            <td />
            <td />
          </TableRow>,
          options
        );

        expect(wrapper.find(TableRow).length).toEqual(1);
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<TableRow data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-row', 'bar', 'baz');
    });
  });
});
