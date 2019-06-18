import React from 'react';
import 'jest-styled-components';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { Table, TableRow } from '..';
import TableHeader from '.';
import StyledTableHeader from './table-header.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import BaseTheme from '../../../style/themes/base';
import ClassicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import tableSizes from '../table-sizes.style';

describe('TableHeader', () => {
  let instance, instanceSortable, sortableColumn, sortableHeader, changeSpy;

  beforeEach(() => {
    changeSpy = jasmine.createSpy('changeSpy');

    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableHeader
            align='right'
            style={ { width: '50px' } }
          />
        </TableRow>
      </Table>
    );

    instanceSortable = TestUtils.renderIntoDocument(
      <Table onChange={ changeSpy }>
        <TableRow>
          <TableHeader sortable name='name' />
        </TableRow>
      </Table>
    );

    sortableColumn = TestUtils.findRenderedDOMComponentWithTag(instanceSortable, 'th');
    sortableHeader = TestUtils.scryRenderedComponentsWithType(instanceSortable, TableHeader)[0];
  });

  describe('prop checking', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    it('throws an error if no name prop is passed', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable />
          </TableRow>
        </Table>
      );
      expect(
        console.error.calls.argsFor(0)[0]
      ).toMatch('Failed prop type: Sortable columns require a prop of name of type String');
    });

    it('throws an error if the name is not a string', () => {
      TestUtils.renderIntoDocument(
        <Table onChange={ changeSpy } sortOrder='desc'>
          <TableRow>
            <TableHeader sortable name={ 123 } />
          </TableRow>
        </Table>
      );
      expect(console.error.calls.argsFor(0)[0]).toMatch('Failed prop type: name must be a string');
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
                <TableHeader sortable name='name' />
              </TableRow>
            </Table>
          );
        });

        it('states the column is sortable, and activating will sort descending', () => {
          ariaLink = wrapper.find('a[aria-label="Sortable column, activate to sort column descending"]');
          expect(ariaLink.exists()).toBe(true);
        });

        it('includes the current sort order after sorting', () => {
          wrapper.setProps({ sortOrder: 'desc' });
          ariaLink = wrapper
            .find('a[aria-label="Sortable column, sorted descending, activate to sort column ascending"]');
          expect(ariaLink.exists()).toBe(true);
        });
      });

      describe('aria-sort', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(
            <Table onChange={ changeSpy }>
              <TableRow>
                <TableHeader sortable name='name' />
                <TableHeader sortable name='age' />
              </TableRow>
            </Table>
          );
        });

        it('does not exist until after a column has been sorted', () => {
          const header = wrapper.find('th[aria-sort]');
          expect(header.exists()).toBe(false);
        });

        it('is set to ascending when the name column is sorted ascending', () => {
          wrapper.setProps({
            sortedColumn: 'name',
            sortOrder: 'asc'
          });

          const header = wrapper.find('th[aria-sort]');
          expect(header.length).toEqual(1);
          expect(header.props()['aria-sort']).toEqual('ascending');
        });

        it('is set to descending when the age column is sorted descending', () => {
          wrapper.setProps({
            sortedColumn: 'age',
            sortOrder: 'desc'
          });

          const header = wrapper.find('th[aria-sort="descending"]');
          expect(header.length).toEqual(1);
          expect(header.props()['aria-sort']).toEqual('descending');
        });
      });

      describe('before a sortable header is clicked', () => {
        it('does not display an icon', () => {
          expect(sortableHeader.sortIconHTML).toEqual(null);
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
        });
      });
    });

    describe('if a column is not sortable', () => {
      it('does not return an icon', () => {
        const nonSortableHeader = TestUtils.scryRenderedComponentsWithType(instance, TableHeader)[0];
        expect(nonSortableHeader.sortIconHTML).toEqual(null);
      });

      it('does not contain an aria-label element', () => {
        const wrapper = mount(
          <Table onChange={ changeSpy }>
            <TableRow>
              <TableHeader sortable={ false } name='name' />
            </TableRow>
          </Table>
        );

        const ariaLabel = wrapper.find('a[aria-label]');
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
          wrapper = shallow(<TableHeader sortable name='name' />, { context });
        });

        it('says the column is a "Sortable column, activate to sort column descending"', () => {
          expect(wrapper.instance().sortDescription).toEqual('Sortable column, activate to sort column descending');
        });

        it('includes "sorted descending"  when the current sort order is "desc"', () => {
          wrapper.setContext({ sortOrder: 'desc' });
          expect(
            wrapper.instance().sortDescription
          ).toEqual('Sortable column, sorted descending, activate to sort column ascending');
        });

        it('includes "sorted ascending"  when the current sort order is "asc"', () => {
          wrapper.setContext({ sortOrder: 'asc' });
          expect(
            wrapper.instance().sortDescription
          ).toEqual('Sortable column, sorted ascending, activate to sort column descending');
        });
      });

      describe('when a column is not sortable', () => {
        it('returns null', () => {
          const wrapper = shallow(<TableHeader sortable={ false } name='name' />);
          expect(wrapper.instance().sortDescription).toBeNull();
        });
      });
    });

    describe('onSortableColumnClick', () => {
      it('calls event.preventDefault', () => {
        const wrapper = shallow(<TableHeader sortable name='name' />);
        const link = wrapper.find('a[href]');

        const mockEvent = {
          preventDefault() {
            console.log('mockEvent.preventDefault() called');
          }
        };

        spyOn(mockEvent, 'preventDefault');

        link.simulate('click', mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
      });
    });
  });

  describe.each(['compact', 'small', 'medium', 'large'])(
    'when the theme is classic',
    (size) => {
      const wrapper = mount(
        <StyledTableHeader
          theme={ ClassicTheme }
          size={ size }
        />
      );

      const th = wrapper.find('th').hostNodes();
      it(`matches the expected style when the size is ${size}`, () => {
        assertStyleMatch({
          height: tableSizes.medium.height
        }, th);
      });
    },
  );

  describe('render', () => {
    let wrapper, th;
    beforeEach(() => {
      wrapper = mount(
        <Table>
          <TableRow>
            <TableHeader
              align='right'
              style={ { width: '50px' } }
            />
          </TableRow>
        </Table>
      );
      th = wrapper.find('th').hostNodes();
    });

    it('renders additional props to the th element', () => {
      expect(th.exists()).toBeTruthy();
      expect(th.prop('style').width).toEqual('50px');
    });

    it('renders a th to match the expected default style', () => {
      assertStyleMatch({
        backgroundColor: BaseTheme.table.header,
        borderBottom: `1px solid ${BaseTheme.table.secondary}`,
        borderLeft: `1px solid ${BaseTheme.colors.border}`,
        color: BaseTheme.colors.white,
        textAlign: 'right'
      }, th);
    });

    it('renders the sort icon to match the snapshot', () => {
      wrapper = mount(
        <Table>
          <TableRow>
            <TableHeader
              align='right'
              sortable
            />
          </TableRow>
        </Table>
      );
      th = wrapper.find('th').hostNodes();
      expect(th).toMatchSnapshot();
    });

    it('renders a th to match the expected default style when a width is provided', () => {
      wrapper = mount(
        <Table>
          <TableRow>
            <TableHeader
              align='right'
              sortable
              width='200'
            />
          </TableRow>
        </Table>
      );
      th = wrapper.find('th').hostNodes();

      assertStyleMatch({
        width: '200px'
      }, th);
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(<TableHeader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-header', 'bar', 'baz');
    });
  });
});
