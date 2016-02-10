import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import MultiActionButton from './multi-action-button';
import Icon from './../icon';

describe('MultiActionButton', () => {
  let twoItemsMultiActionButton;
  let handleMainButton = jasmine.createSpy("main");
  let handleSecondButton = jasmine.createSpy("second");

  beforeEach(() => {
    twoItemsMultiActionButton = TestUtils.renderIntoDocument(
      <MultiActionButton buttons={[{name: 'Main Button', handler: handleMainButton}, {name: 'Second Button', handler: handleSecondButton}]}/>
    )
  });

  describe('render', () => {
    it('sets default state', () => {
      expect(twoItemsMultiActionButton.state.showMoreButtons).toEqual(false);
    });

    it('renders main button', () =>{
      expect(twoItemsMultiActionButton.multiActionButtonProps.className).toEqual('ui-multi-action-button__block');
    })

    it('renders dropdown icon',() =>{
      let icon = TestUtils.scryRenderedComponentsWithType(twoItemsMultiActionButton, Icon);
      expect(icon[0].props.type).toEqual('dropdown');
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

   describe('mouse leave dropdown icon', () => {
    it('changes showMoreButtons state', () => {
      let block = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__block');
      TestUtils.Simulate.mouseLeave(block);
      expect(twoItemsMultiActionButton.state.showMoreButtons).toEqual(false);
    });
  });

  describe('click button', () => {
    it('the handler should be called', () => {
      let mainButton = TestUtils.findRenderedDOMComponentWithClass(twoItemsMultiActionButton, 'ui-multi-action-button__main-button');
      TestUtils.Simulate.click(mainButton);
      expect(handleMainButton).toHaveBeenCalled();
    });
  });
});
