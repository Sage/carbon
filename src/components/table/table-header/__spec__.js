import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Table, TableRow } from './../table';
import TableHeader from './table-header';
import Icon from './../../icon';
import { shallow, mount } from 'enzyme';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('TableHeader', () => {
  let instance, instanceSortable, instanceCustomSort,
      sortableColumn, sortableHeader, changeSpy, sortableCustomHeader,
      sortableCustomColumn;

  beforeEach(() => {
    changeSpy = jasmine.createSpy('changeSpy');

    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableHeader className="foo" align="right" style={{ width: "50px" }} />
        </TableRow>
      </Table>
    );

    instanceSortable = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy }>
        <TableRow>
          <TableHeader sortable={ true } name='name' />
        </TableRow>
      </Table>
    );

    instanceCustomSort = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy } sortOrder='desc'>
        <TableRow>
          <TableHeader sortable={ true } align='right' name='name' />
        </TableRow>
      </Table>
    );

    sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
    sortableHeader = TestUtils.scryRenderedComponentsWithType(instanceSortable, TableHeader)[0];
    sortableCustomColumn = TestUtils.findRenderedDOMComponentWithTag(instanceCustomSort, 'th');
    sortableCustomHeader = TestUtils.scryRenderedComponentsWithType(instanceCustomSort, TableHeader)[0];
  });

  describe('prop checking', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    it('throws an error if no name prop is passed', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable={ true }/>
          </TableRow>
        </Table>
      );
      expect(console.error.calls.argsFor(0)[0]).toMatch(`Failed prop type: Sortable columns require a prop of name of type String`);
    });

    it('throws an error if the name is not a string', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable={ true } name={ 123 }/>
          </TableRow>
        </Table>
      );
      expect(console.error.calls.argsFor(0)[0]).toMatch(`Failed prop type: name must be a string`);
    });
  });

  describe('emitSortEvent', () => {
    describe('if no sortOrder has been specified', () => {
      it('calls the tables onSort function with the default params', () => {
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            pageSize: '',
            filter: {},
            sortedColumn: 'name',
            sortOrder: 'desc'
          }
        );
      });

      describe('if the column has already has been sorted', () => {
        it('flips the sortOrder when clicked', () => {
          sortableHeader.context.sortedColumn = 'name';
          sortableHeader.context.sortOrder = 'asc';
          TestUtils.Simulate.click(sortableColumn);
          expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
            'table', {
              currentPage: '',
              filter: {},
              pageSize: '',
              sortedColumn: 'name',
              sortOrder: 'desc'
            }
          );
        });
      });
    });

    describe('if a sortOrder has been passed', () => {
      it('sends the passed in sortOrder prop to the onSort function', () => {
        sortableHeader.context.sortOrder = 'desc';
        TestUtils.Simulate.click(sortableColumn);
        expect(instanceSortable.props.onChange).toHaveBeenCalledWith(
          'table', {
            currentPage: '',
            filter: {},
            pageSize: '',
            sortedColumn: 'name',
            sortOrder: 'desc'
          }
        );
      });
    });
  });

  describe('sortable columns', () => {
    describe('if a column is sortable', () => {
      let ariaLink;

      beforeEach(() => {
        ariaLink = sortableColumn.querySelector('a[aria-label]');
      });

      describe('aria-label', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(
            <Table onChange={ changeSpy }>
              <TableRow>
                <TableHeader sortable={ true } name="name" />
              </TableRow>
            </Table>
          );
        });

        it('states the column is sortable, and activating will sort descending', () => {
          let ariaLink = wrapper.find('a[aria-label="Sortable column, activate to sort column descending"]');
          expect(ariaLink.exists()).toBe(true);
        });

        it('includes the current sort order after sorting', () => {
          wrapper.setProps({ 'sortOrder': 'desc' });
          let ariaLink = wrapper.find('a[aria-label="Sortable column, sorted descending, activate to sort column ascending"]');
          expect(ariaLink.exists()).toBe(true);
        });
      });

      describe('aria-sort', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(
            <Table onChange={ changeSpy }>
              <TableRow>
                <TableHeader sortable={ true } name="name" />
                <TableHeader sortable={ true } name="age" />
              </TableRow>
            </Table>
          );
        });

        it('does not exist until after a column has been sorted', () => {
          let header = wrapper.find('th[aria-sort]');
          expect(header.exists()).toBe(false);
        });

        it('is set to ascending when the name column is sorted ascending', () => {
          wrapper.setProps({ 
            sortedColumn: 'name', 
            sortOrder: 'asc' 
          });
          
          let header = wrapper.find('th[aria-sort]');
          expect(header.length).toEqual(1);
          expect(header.props()['aria-sort']).toEqual('ascending');
        });

        it('is set to descending when the age column is sorted descending', () => {
          wrapper.setProps({ 
            sortedColumn: 'age', 
            sortOrder: 'desc' 
          });

          let header = wrapper.find('th[aria-sort="descending"]');
          expect(header.length).toEqual(1);
          expect(header.props()['aria-sort']).toEqual('descending');
        });
      });

      describe('before a sortable header is clicked', () => {
        it('does not display an icon', () => {
          expect(sortableHeader.sortIconHTML).not.toBeDefined();
        });

        it('contains a link with a descriptive aria-label that defaults to descending', () => {
          expect(ariaLink.getAttribute('aria-label')).toEqual('Sortable column, activate to sort column descending');
        });
      });

      describe('after a sortable header has been clicked', () => {
        describe('when the sortOrder is descending', () => {
          beforeEach(() => {
            sortableHeader.context.sortedColumn = 'name';
            sortableHeader.context.sortOrder = 'desc';
            TestUtils.Simulate.click(sortableColumn);
          });

          it('adds the sort-down icon', () => {
            expect(sortableHeader.sortIconHTML.props.type).toEqual('sort-down');
          });
        });

        describe('when the sortOrder is ascending or not specified', () => {
          it('adds the sort-up icon', () => {
            sortableHeader.context.sortedColumn = 'name';
            TestUtils.Simulate.click(sortableColumn);
            expect(sortableHeader.sortIconHTML.props.type).toEqual('sort-up');
          });
        })
      });
    });

    describe('if a column is not sortable', () => {
      it('does not return an icon', () => {
        let nonSortableHeader = TestUtils.scryRenderedComponentsWithType(instance, TableHeader)[0];
        expect(nonSortableHeader.sortIconHTML).not.toBeDefined();
      });
      
      it('does not contain an aria-label element', () => {
        let wrapper = mount(
          <Table onChange={ changeSpy }>
            <TableRow>
              <TableHeader sortable={ false } name="name" />
            </TableRow>
          </Table>
        );

        let ariaLabel = wrapper.find('a[aria-label]');
        expect(ariaLabel.length).toEqual(0);
      });
    });

    describe('sortDescription', () => {
      describe('when a column is sortable', () => {
        let wrapper;
        let context;

        beforeEach(() => {
          context = {
            sortOrder: null
          };
          wrapper = shallow(<TableHeader sortable={ true } name="name" />, { context });
        });

        it('says the column is a "Sortable column, activate to sort column descending"', () => {
          expect(wrapper.instance().sortDescription).toEqual('Sortable column, activate to sort column descending');
        });

        it('includes "sorted descending"  when the current sort order is "desc"', () => {
          wrapper.setContext({ sortOrder: 'desc' });
          expect(wrapper.instance().sortDescription).toEqual('Sortable column, sorted descending, activate to sort column ascending');
        });

        it('includes "sorted ascending"  when the current sort order is "asc"', () => {
          wrapper.setContext({ sortOrder: 'asc' });
          expect(wrapper.instance().sortDescription).toEqual('Sortable column, sorted ascending, activate to sort column descending');
        });
      });

      describe('when a column is not sortable', () => {
        it('returns null', () => {
          let wrapper = shallow(<TableHeader sortable={ false } name="name" />);
          expect(wrapper.instance().sortDescription).toBeNull();
        });
      });
    });

    describe('onSortableColumnClick', () => {
      it('calls event.preventDefault', () => {
        let wrapper = shallow(<TableHeader sortable={ true } name="name" />);
        let link = wrapper.find('a[href]');

        let mockEvent = {
          preventDefault() {
            console.log('mockEvent.preventDefault() called');
          }
        };

        spyOn(mockEvent, 'preventDefault');

        link.simulate('click', mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
      });
    })
  });


  describe('render', () => {
    it('renders additional props to the th element', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th.style.width).toEqual("50px");
    });

    it('renders a th with correct classes', () => {
      let th = TestUtils.findRenderedDOMComponentWithTag(instance, 'th');
      expect(th).toBeDefined();
      expect(th.className).toEqual('carbon-table-header foo carbon-table-header--align-right');
    });

    it('renders the sort icon with correct classes', () => {
      sortableHeader.context.sortedColumn = 'name';
      sortableHeader.forceUpdate();
      let icon = TestUtils.findRenderedComponentWithType(instanceSortable, Icon);
      expect(icon.props.className).toEqual('carbon-table-header__icon');
    });

    describe('when aligned to the right', () => {
      it('renders the sort icon with correct classes', () => {
        sortableCustomHeader.context.sortedColumn = 'name';
        sortableCustomHeader.forceUpdate();
        let icon = TestUtils.findRenderedComponentWithType(instanceCustomSort, Icon);
        expect(icon.props.className).toEqual('carbon-table-header__icon carbon-table-header__icon--align-right');
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<TableHeader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-header', 'bar', 'baz');
    });
  });
});
