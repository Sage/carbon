import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Row from './row';

describe('Row', () => {

  describe('when column number is NOT passed', () => {
    let instance;
    let columns;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row className="foobar">
          <div columnOffset={2}>Foo</div>
          <div columnSpan={3}>Bar</div>
          <div columnClasses='extra-class'>Bar</div>
          <div columnAlign='center'>Bar</div>
        </Row>
      );

      columns = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-row__column');
    });

    describe('render', () => {
      it('renders a parent div with calculated CSS classes', () => {
        let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-row')
        expect(rowNode.className).toEqual('ui-row foobar ui-row--columns-4');
      });

      it('renders the correct amount of columns', () => {
        expect(columns.length).toEqual(4);
      });
    });

    describe('Column offset', () => {
      it('renders a div with an additional offset CSS class', () => {
        expect(columns[0].className).toEqual('ui-row__column ui-row__column--offset-2');
      });
    });

    describe('Column span', () => {
      it('renders a div with an additional span CSS class', () => {
        expect(columns[1].className).toEqual('ui-row__column ui-row__column--span-3');
      });
    });

    describe('Column classes', () => {
      it('renders a div with all additional column classes', () => {
        expect(columns[2].className).toEqual('ui-row__column extra-class');
      });
    });

    describe('Column align', () => {
      it('renders a div with alignment class', () => {
        expect(columns[3].className).toEqual('ui-row__column ui-row__column--align-center');
      });
    });
  });

  describe('When column number is passed', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row columns={2}>
          <div>Foo</div>
          <div>Bar</div>
        </Row>
      );
    });

    it('renders a parent div with calculated CSS classes', () => {
      let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-row')
      expect(rowNode.className).toEqual('ui-row ui-row--columns-2');
    });
  });

  describe('When there is only 1 column', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Row>
          <div>Foo</div>
        </Row>
      );
    });

    it('renders a parent div with calculated CSS classes', () => {
      let rowNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-row')
      expect(rowNode.className).toEqual('ui-row ui-row--columns-1');
    });
  });
});
