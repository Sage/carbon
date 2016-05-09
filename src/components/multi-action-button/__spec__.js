import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import MultiActionButton from './multi-action-button';
import Icon from './../icon';
import Button from './../button';

describe('SplitButton', () => {
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
      expect(mainDiv.classList).toMatch('ui-split-button');
    });

    it('adds multi action button classes', () => {
      expect(mainDiv.classList).toMatch('ui-multi-action-button');
    });

    describe('when additional buttons are open', () => {
      it('adds a open class', () => {
        instance.setState({ showAdditionalButtons: true });
        mainDiv = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(mainDiv.classList).toMatch('ui-multi-action-button--open');
        expect(mainDiv.classList).toMatch('ui-split-button--open');
      });
    });
  });

  describe('additionalButtonsClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-split-button').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-multi-action-button').length).toEqual(1);
    });
  });

  describe('toggleButtonClasses', () => {
    it('adds all super classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-split-button__toggle').length).toEqual(1);
    });

    it('adds multi action button classes', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-multi-action-button__toggle').length).toEqual(1);
    });
  });
});
