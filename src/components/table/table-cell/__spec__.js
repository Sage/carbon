import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableRow } from './../table';
import TableCell from './table-cell';
import Icon from './../../icon';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('TableRow', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow>
          <TableCell className="foo" align="right" style={{ width: "50px" }} />
        </TableRow>
      </Table>
    );
  });

  it('renders additional props to the td element', () => {
    let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');

    expect(td.style.width).toEqual("50px");
  });

  it('renders a td with correct classes', () => {
    let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');
    expect(td).toBeDefined();
    expect(td.className).toEqual('carbon-table-cell foo carbon-table-cell--align-right');
  });

  describe('with action', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow>
            <TableCell className="foo" action={ true } />
          </TableRow>
        </Table>
      );
    });

    it('renders a td with correct classes', () => {
      let td = TestUtils.findRenderedDOMComponentWithTag(instance, 'td');
      expect(td).toBeDefined();
      expect(td.className).toEqual('carbon-table-cell foo carbon-table-cell--action');
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<TableCell data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-cell', 'bar', 'baz');
    });
  });
});
