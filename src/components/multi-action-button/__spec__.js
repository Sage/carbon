import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import MultiActionButton from './multi-action-button';
import Icon from './../icon';
import Button from './../button';

describe('MultiActionButton', () => {
  let twoItemsMultiActionButton;
  let handleMainButton = jasmine.createSpy("main");
  let handleSecondButton = jasmine.createSpy("second");

  beforeEach(() => {
    twoItemsMultiActionButton = TestUtils.renderIntoDocument(
      <MultiActionButton className='test' name="mainButton" onClick={handleMainButton}>
        <Button className='second-button' onClick={handleSecondButton}>Second Button</Button>
      </MultiActionButton>
    )
  });

  describe('render with custom className', () => {
    it('sets default state', () => {
      expect(twoItemsMultiActionButton.state.showMoreButtons).toEqual(false);
    });

    it('renders main button', () =>{
      expect(twoItemsMultiActionButton.mainClasses).toEqual('ui-multi-action-button test');
    })

    it('renders dropdown icon',() =>{
      let icon = TestUtils.scryRenderedComponentsWithType(twoItemsMultiActionButton, Icon);
      expect(icon[0].props.type).toEqual('dropdown');
    })
  });

  describe('render without custom className', () => {
    let multiActionButton
    beforeEach(() => {
      multiActionButton = TestUtils.renderIntoDocument(
      <MultiActionButton name="mainButton" onClick={handleMainButton}>
        <Button onClick={handleSecondButton}>Second Button</Button>
      </MultiActionButton>)
    });

    it('renders main button', () =>{
      expect(multiActionButton.mainClasses).toEqual('ui-multi-action-button');
    })

  });

  describe('mouse enter dropdown icon', () => {
    it('changes showMoreButtons state', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__icon');
      TestUtils.Simulate.mouseEnter(icon);
      expect(twoItemsMultiActionButton.state.showMoreButtons).toEqual(true);
    });

    it('renders more buttons', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__icon');
      TestUtils.Simulate.mouseEnter(icon);
      twoItemsMultiActionButton.forceUpdate();
      let block = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__list-block');
      expect(block).not.toBe(null);
    });
  });

   describe('mouse leave multi-action-button', () => {
    it('changes showMoreButtons state', () => {
      let block = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button');
      TestUtils.Simulate.mouseLeave(block);
      expect(twoItemsMultiActionButton.state.showMoreButtons).toEqual(false);
    });
  });

  describe('click button', () => {
    it('the handler should be called', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__icon');
      TestUtils.Simulate.mouseEnter(icon);
      twoItemsMultiActionButton.forceUpdate();
      let button = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'second-button');
      TestUtils.Simulate.click(button);
      expect(handleSecondButton).toHaveBeenCalled();
    });
  });
});
