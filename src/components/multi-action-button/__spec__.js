import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import MultiActionButton from './multi-action-button';
import Icon from './../icon';
import Button from './../button';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('MultiActionButton', () => {
  let instance,
      handleSecondButton = jasmine.createSpy("second"),
      handleFirstButton= jasmine.createSpy("first");

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MultiActionButton className='test' text="Main Button">
        <Button className='first-button' onClick={handleFirstButton}>First Button</Button>
        <Button className='second-button' onClick={handleSecondButton}>Second Button</Button>
      </MultiActionButton>
    )
  });

  describe('mainClasses', () => {
    let mainDiv;

    beforeEach(() => {
      mainDiv = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    });

    it('adds all super classes', () => {
      expect(mainDiv.classList).toContain('carbon-split-button');
    });

    it('adds multi action button classes', () => {
      expect(mainDiv.classList).toContain('carbon-multi-action-button');
    });

    describe('when additional buttons are open', () => {
      it('adds a open class', () => {
        instance.setState({ showAdditionalButtons: true });
        mainDiv = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(mainDiv.classList).toContain('carbon-multi-action-button--open');
        expect(mainDiv.classList).toContain('carbon-split-button--open');
      });
    });
  });

  describe('additionalButtonsClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-split-button').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button').length).toEqual(1);
    });

    it('adds right aligned class', () => {
      instance = TestUtils.renderIntoDocument(<MultiActionButton align="right" text="Main Button" />);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button--align-right').length).toEqual(1);
    });
  });

  describe('toggleButtonClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-split-button__toggle').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-multi-action-button__toggle').length).toEqual(1);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <MultiActionButton data-element='bar' data-role='baz' text='Test'>
          <Button>Test</Button>
        </MultiActionButton>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'multi-action-button', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <MultiActionButton text='Test'>
          <Button>Test</Button>
        </MultiActionButton>
      );
      wrapper.setState({ showAdditionalButtons: true })

      elementsTagTest(wrapper, [
        'additional-buttons',
        'main-button'
      ]);
    });
  });
});
