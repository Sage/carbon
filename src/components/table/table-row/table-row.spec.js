import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Table, TableCell } from '..';
import TableRow from './table-row.component';
import TableHeader from '../table-header';
import DraggableTableCell from '../draggable-table-cell';
import StyledTable from '../table.style';
import Checkbox from '../../checkbox';
import BaseTheme from '../../../style/themes/base';
import ClassicTheme from '../../../style/themes/classic';
import SmallTheme from '../../../style/themes/small';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { DraggableContext, WithDrop } from '../../drag-and-drop';
import { THEMES } from '../../../style/themes';

const themeNames = [THEMES.classic, THEMES.small];
const elements = ['th', 'td'];

describe('TableRow', () => {
  let instance, clickableInstance, row;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className='foo'>
          <TableCell />
        </TableRow>
      </Table>
    );

    clickableInstance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className='foo' onClick={ jest.fn() }>
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  describe('componentWillMount', () => {
    describe('if highlightable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          const render = function() {
            TestUtils.renderIntoDocument(<Table highlightable><TableRow /></Table>);
          };
          expect(render).toThrowError('A TableRow which is selectable or highlightable should provide a uniqueID.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          const render = function() {
            TestUtils.renderIntoDocument(<Table highlightable><TableRow uniqueID='foo' /></Table>);
          };
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if selectable via context', () => {
      describe('if no unique id', () => {
        it('throws error', () => {
          const render = function() {
            TestUtils.renderIntoDocument(<Table selectable><TableRow /></Table>);
          };
          expect(render).toThrowError('A TableRow which is selectable or highlightable should provide a uniqueID.');
        });
      });

      describe('if unique id', () => {
        it('does not throw error', () => {
          const render = function() {
            TestUtils.renderIntoDocument(<Table selectable><TableRow uniqueID='foo' /></Table>);
          };
          expect(render).not.toThrowError();
        });
      });
    });

    describe('if neither highlightable or selectable', () => {
      it('does not throw error', () => {
        const render = function() {
          TestUtils.renderIntoDocument(<Table><TableRow /></Table>);
        };
        expect(render).not.toThrowError();
      });
    });

    describe('if attachToTable is defined', () => {
      describe('if uniqueID', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
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
          instance = TestUtils.renderIntoDocument(<Table><TableRow /></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'attachToTable');
          row.componentWillMount();
          expect(row.context.attachToTable).not.toHaveBeenCalled();
        });
      });
    });

    describe('if selected via props', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ selected: true });
      });
    });

    describe('if highlighted via props', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow highlighted /></Table>);
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
          instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, 'detachFromTable');
          row.componentWillUnmount();
          expect(row.context.detachFromTable).toHaveBeenCalledWith(row.rowID);
        });
      });

      describe('if no context', () => {
        it('does not throw error', () => {
          instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
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
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: 'bar' });
        expect(row.context.checkSelection).toHaveBeenCalled();
      });
    });

    describe('when uniqueID matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, 'checkSelection');
        row.componentWillReceiveProps({ uniqueID: 'foo' });
        expect(row.context.checkSelection).not.toHaveBeenCalled();
      });
    });

    describe('when selected prop does not match', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: false });
        expect(row.setState).toHaveBeenCalledWith({ selected: false });
      });
    });

    describe('when selected prop matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selected /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ selected: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });

    describe('when highlighted prop does not match', () => {
      it('calls setState', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow highlighted /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ highlighted: false });
        expect(row.setState).toHaveBeenCalledWith({ highlighted: false });
      });
    });

    describe('when highlighted prop matches', () => {
      it('does not call checkSelection', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow highlighted /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, 'setState');
        row.componentWillReceiveProps({ highlighted: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('onSelectAll', () => {
    it('calls selectAll via the context', () => {
      instance = TestUtils.renderIntoDocument(<Table><TableRow selected /></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectAll');
      row.onSelectAll();
      expect(row.context.selectAll).toHaveBeenCalledWith(row);
    });
  });

  describe('onRowClick', () => {
    it('calls highlightRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table highlightable><TableRow uniqueID='foo' /></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'highlightRow');
      row.onRowClick();
      expect(row.context.highlightRow).toHaveBeenCalledWith('foo', row);
    });

    describe('if onHighlight is defined as a prop', () => {
      it('calls onSelect', () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow onHighlight={ spy } uniqueID='foo' /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick();
        expect(spy).toHaveBeenCalledWith('foo', true, row);
      });
    });

    describe('if onClick is defined as a prop', () => {
      it('calls onClick', () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow onClick={ spy } /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick('foo');
        expect(spy).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('onSelect', () => {
    it('calls selectRow via context', () => {
      instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' /></Table>);
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, 'selectRow');
      row.onSelect();
      expect(row.context.selectRow).toHaveBeenCalledWith('foo', row, true);
    });

    describe('if onSelect is defined as a prop', () => {
      it('calls onSelect', () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo' onSelect={ spy } /></Table>);
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onSelect({ target: { value: true } });
        expect(spy).toHaveBeenCalledWith('foo', true, row);
      });
    });
  });

  describe.each(elements)(
    'when the theme is classic',
    (element) => {
      const wrapper = mount(
        <Table>
          <TableRow>
            <TableHeader />
          </TableRow>
          <TableRow>
            <TableCell />
          </TableRow>
        </Table>
      );
      const styledElement = wrapper.find(element).hostNodes();

      it(`${element} matches the expected style`, () => {
        assertStyleMatch({
          backgroundColor: element === 'th' ? BaseTheme.table.header : BaseTheme.table.primary,
          borderBottom: `1px solid ${BaseTheme.table.secondary}`
        }, styledElement);
      });
    }
  );

  describe('if the row is clickable', () => {
    it('adds a clickable class', () => {
      const tr = TestUtils.findRenderedDOMComponentWithTag(clickableInstance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--clickable');
    });
  });

  describe('when selected', () => {
    it('renders the selected class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow
            selected
            uniqueID='foo'
          >
            <TableCell />
          </TableRow>
        </Table>
      );
      const tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--selected');
    });

    describe.each(themeNames)(
      'and the theme is %s',
      (name) => {
        it('renders the element to match the expected style', () => {
          instance = TestUtils.renderIntoDocument(
            <Table>
              <TableRow
                uniqueID='foo'
                selectable
                selected
                theme={ name === 'classic' ? ClassicTheme : SmallTheme }
              >
                <TableCell />
              </TableRow>
            </Table>
          );
          const tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');

          expect(tr.className).toEqual('carbon-table-row carbon-table-row--selected');
        });
      }
    );
  });

  describe('when highlighted', () => {
    it('renders the highlighted class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow
            highlighted
            uniqueID='foo'
          >
            <TableCell />
          </TableRow>
        </Table>
      );
      const tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--highlighted');
    });
  });

  describe('when highlighted and selected', () => {
    it('only renders the selected class', () => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow
            highlighted
            selected
            uniqueID='foo'
          >
            <TableCell />
          </TableRow>
        </Table>
      );
      const tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
      expect(tr.className).toMatch('carbon-table-row--selected');
      expect(tr.className).not.toMatch('carbon-table-row--highlighted');
    });
  });

  describe('other props', () => {
    it('consumes other props on the tr element', () => {
      const spy = jasmine.createSpy();

      instance = mount(
        <Table>
          <TableRow className='foo' onClick={ spy }>
            <TableCell />
          </TableRow>
        </Table>
      );

      const tr = instance.find(TableRow);
      tr.simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('without selectability', () => {
      it('renders its children', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow uniqueID='foo'><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(2);
      });
    });

    describe('without selectability on the table but disabled on the row', () => {
      it('renders its children', () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable><TableRow selectable={ false }><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(2);
      });
    });

    describe('with selectAll', () => {
      it('renders a select all cell', () => {
        instance = TestUtils.renderIntoDocument(<Table><TableRow selectAll><td /><td /></TableRow></Table>);
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        const tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        const checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelectAll);
      });
    });

    describe('with selectable via context', () => {
      it('renders a multi select cell', () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable><TableRow uniqueID='foo'><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        const tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        const checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelect);
      });
    });

    describe('with selectable via prop', () => {
      it('renders a multi select cell', () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(
          <Table><TableRow selectable uniqueID='foo'><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        const tr = TestUtils.findRenderedComponentWithType(instance, TableRow);
        const checkbox = TestUtils.findRenderedComponentWithType(instance, Checkbox);
        expect(row.children.length).toEqual(3);
        expect(checkbox.props.onChange).toEqual(tr.onSelect);
        checkbox.props.onClick({ stopPropagation: spy });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('with hideMultiSelect', () => {
      it('renders a multi select cell without a checkbox', () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable><TableRow hideMultiSelect uniqueID='foo'><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        expect(row.children.length).toEqual(3);
        expect(TestUtils.scryRenderedComponentsWithType(instance, Checkbox).length).toEqual(0);
      });
    });

    describe('if is header', () => {
      it('renders a table header', () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable><TableRow as='header' uniqueID='foo'><td /><td /></TableRow></Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
        const th = TestUtils.findRenderedComponentWithType(instance, TableHeader);
        expect(th).toBeTruthy();
      });
    });

    describe('if is not classic theme', () => {
      it('renders a row to match the snapshot', () => {
        const wrapper = TestRenderer.create(
          <StyledTable theme={ SmallTheme }>
            <TableRow><TableCell /></TableRow>
          </StyledTable>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('drag and drop', () => {
    let wrapper;

    describe('without drag and drop context', () => {
      beforeEach(() => {
        wrapper = mount(
          <Table>
            <TableRow>
              <TableCell>foo</TableCell>
            </TableRow>
          </Table>
        );
      });

      it('does not render a draggable cell', () => {
        const cell = wrapper.find(TableRow).find(DraggableTableCell);
        expect(cell.length).toEqual(0);
      });

      it('does not render a WithDrop component', () => {
        const wd = wrapper.find(WithDrop);
        expect(wd.length).toEqual(0);
      });
    });

    describe('ensuring index is provided', () => {
      it('throws an error if no index is provided', () => {
        expect(() => {
          mount(
            <DraggableContext onDrag={ () => {} }>
              <Table>
                <TableRow dragAndDropIdentifier='foo'>
                  <TableCell>foo</TableCell>
                </TableRow>
              </Table>
            </DraggableContext>
          );
        }).toThrow(new Error('You need to provide an index for rows that are draggable'));
      });
    });

    describe('with drag and drop context', () => {
      beforeEach(() => {
        wrapper = mount(
          <DraggableContext onDrag={ () => {} } canDrop={ () => { return true; } }>
            <Table>
              <TableRow index={ 0 } dragAndDropIdentifier='foo'>
                <TableCell>foo</TableCell>
              </TableRow>
            </Table>
          </DraggableContext>
        );
      });

      it('renders a draggable cell', () => {
        const cell = wrapper.find(TableRow).find(DraggableTableCell);
        expect(cell.props().identifier).toEqual('foo');
        expect(cell.props().draggableNode().getAttribute('class')).toEqual('carbon-table-row');
        expect(cell.props().canDrag).toEqual(true);
      });

      it('renders a WithDrop component', () => {
        const wd = wrapper.find(WithDrop);
        expect(wd.props().index).toEqual(0);
        expect(wd.props().identifier).toEqual('foo');
        expect(wd.props().canDrop()).toEqual(true);
      });

      it('renders a dragging class', () => {
        const row1 = wrapper.find(TableRow);
        row1.instance().context.dragAndDropActiveIndex = 1;
        expect(row1.instance().mainClasses).toEqual('carbon-table-row carbon-table-row--dragging');
      });

      it('renders a dragged class if the index matches', () => {
        const row1 = wrapper.find(TableRow);
        row1.instance().context.dragAndDropActiveIndex = 0;
        expect(row1.instance().mainClasses)
          .toEqual('carbon-table-row carbon-table-row--dragged carbon-table-row--dragging');
      });
    });
  });
});
