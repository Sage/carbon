import React from 'react';
import Immutable from 'immutable';
import TestUtils from 'react-dom/test-utils';
import { Row, Column } from './row';
import { shallow } from 'enzyme';
import Logger from './../../utils/logger';

describe('Row', () => {

  describe('when column number is NOT passed', () => {
    let instance;
    let columns;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row className="foobar">
          <Column columnOffset={2}>Foo</Column>
          <Column columnSpan={3}>Bar</Column>
          { null }
          <Column className='extra-class'>Bar</Column>
          <Column columnAlign='center'>Bar</Column>
        </Row>
      );

      columns = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-column');
    });

    describe('render', () => {
      it('renders a parent div with calculated CSS classes', () => {
        let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row');
        expect(rowNode.className).toEqual('carbon-row carbon-row--gutter-medium foobar carbon-row--columns-4');
      });

      it('renders the correct amount of columns', () => {
        expect(columns.length).toEqual(4);
      });
    });

    describe('with immutable data', () => {
      it('renders the correct number of columns', () => {
        let data = Immutable.fromJS([
          { name: 'foo' }, { name: 'bar' }
        ]);

        instance = TestUtils.renderIntoDocument(
          <Row className="foobar">
            {
              data.map((item, index) => {
                return <Column key={`name-${index}`} >{ item.get('name') }</Column>;
              })
            }
          </Row>
        );

        columns = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-column');
        expect(columns.length).toEqual(2);
      });
    });

    describe('with no children', () => {
      it('allows render', () => {
        instance = TestUtils.renderIntoDocument(
          <Row>{ null }</Row>
        );
        let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row')
        expect(rowNode).toBeTruthy();
      });
    });

    describe('with no children in an array', () => {
      it('allows render', () => {
        let children = [];
        instance = TestUtils.renderIntoDocument(
          <Row>{ children }</Row>
        );
        let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row')
        expect(rowNode).toBeTruthy();
      });
    });

    describe('Column offset', () => {
      it('renders a div with an additional offset CSS class', () => {
        expect(columns[0].className).toEqual('carbon-column carbon-column--offset-2');
      });
    });

    describe('Column span', () => {
      it('renders a div with an additional span CSS class', () => {
        expect(columns[1].className).toEqual('carbon-column carbon-column--span-3');
      });
    });

    describe('Column classes', () => {
      it('renders a div with all additional column classes', () => {
        expect(columns[2].className).toEqual('carbon-column extra-class');
      });
    });

    describe('Column align', () => {
      it('renders a div with alignment class', () => {
        expect(columns[3].className).toEqual('carbon-column carbon-column--align-center');
      });
    });
  });

  describe('When column number is passed', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row columns="2">
          <Column>Foo</Column>
          <Column>Bar</Column>
        </Row>
      );
    });

    it('renders a parent div with calculated CSS classes', () => {
      let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row')
      expect(rowNode.className).toEqual('carbon-row carbon-row--gutter-medium carbon-row--columns-2');
    });
  });

  describe('when a custom gutter is passed', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row columns="2" gutter="small">
          <Column>Foo</Column>
          <Column>Bar</Column>
        </Row>
      );
    });

    it('applies custom class', () => {
      let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row');
      expect(rowNode.className).toEqual('carbon-row carbon-row--gutter-small carbon-row--columns-2');
    });
  });

  describe('when columnDivide is enabled', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row columns="2" columnDivide={ true }>
          <Column>Foo</Column>
          <Column>Bar</Column>
        </Row>
      );
    });

    it('applies custom class', () => {
      let rowNode = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-column')[0];
      expect(rowNode.className).toEqual('carbon-column carbon-column--column-divide');
    });
  });

  describe('When there is only 1 column', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row>
          <Column>Foo</Column>
        </Row>
      );
    });

    it('renders a parent div with calculated CSS classes', () => {
      let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-row')
      expect(rowNode.className).toEqual('carbon-row carbon-row--gutter-medium carbon-row--columns-1');
    });
  });

  describe('deprecated functionality', () => {
    beforeEach(() => {
      var process = { env: { NODE_ENV: 'development' } }
    });

    it('wraps the child in a column component', () => {
      let wrapper = shallow(<Row><div>Foo</div></Row>);
      expect(wrapper.find(Column).length).toEqual(1);
    });

    it('Calls the logger to report the deprecation', () => {
      spyOn(Logger, 'deprecate');
      let wrapper = shallow(<Row><div>Foo</div></Row>);
      expect(Logger.deprecate).toHaveBeenCalled();
    });
  });
});
