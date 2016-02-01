import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Pill from './pill';

describe('Pill', () => {
  let instance;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('click');

    instance = TestUtils.renderIntoDocument(
      <Pill
        children='My Text'
        className='customClass'
        onClick={ spy } />
    );
  });

  describe('render', () => {
    it('renders a span tag with the given children', () => {
      let pill = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-pill');

      expect(pill.length).toEqual(1);
      expect(pill[0].textContent).toEqual('My Text');
    });
  });

  describe('passing additional props', () => {
    it('adds props to the component', () => {
      let pill = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pill');

      TestUtils.Simulate.click(pill);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('classNames', () => {
    describe('type', () => {
      describe('when using the default', () => {
        it('adds a class of ui-pill--info', () => {
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-pill--info').length).toEqual(1);
        });
      });

      describe('when not using the default', () => {
        it('uses the passed type', () => {
          instance = TestUtils.renderIntoDocument(
            <Pill
              type='warning'
              children='My Text'/>
          );
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-pill--warning').length).toEqual(1);
        });
      });
    });

    describe('when passing a custom class', () => {
      it('adds the class to the component', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'customClass').length).toEqual(1);
      });
    });
  });
});
