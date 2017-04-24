import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import SplitButton from './split-button';
import Icon from './../icon';
import Button from './../button';

describe('SplitButton', () => {
  let twoItemsSplitButton;
  let handleMainButton = jasmine.createSpy("main");
  let handleSecondButton = jasmine.createSpy("second");

  beforeEach(() => {
    twoItemsSplitButton = TestUtils.renderIntoDocument(
      <SplitButton className='test' text="mainButton" onClick={handleMainButton}>
        <Button className='second-button' onClick={handleSecondButton}>Second Button</Button>
      </SplitButton>
    )
  });

  describe('render with custom className', () => {
    it('sets default state', () => {
      expect(twoItemsSplitButton.state.showAdditionalButtons).toEqual(false);
    });

    it('renders main button', () =>{
      expect(twoItemsSplitButton.mainClasses).toEqual('carbon-split-button test');
    })

    it('renders dropdown icon',() =>{
      let icon = TestUtils.scryRenderedComponentsWithType(twoItemsSplitButton, Icon);
      expect(icon[0].props.type).toEqual('dropdown');
    })
  });

  describe('render without custom className', () => {
    let multiActionButton;

    beforeEach(() => {
      multiActionButton = TestUtils.renderIntoDocument(
        <SplitButton text="mainButton" onClick={handleMainButton}>
          <Button onClick={handleSecondButton}>Second Button</Button>
        </SplitButton>
      );
    });

    it('renders main button', () =>{
      expect(multiActionButton.mainClasses).toEqual('carbon-split-button');
    })

  });

  describe('mouse click dropdown toggle', () => {
    it('prevents default', () => {
      let ev = jasmine.createSpy();
      let toggle = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button__toggle');
      TestUtils.Simulate.click(toggle, { preventDefault: ev });
      expect(ev).toHaveBeenCalled();
    });
  });

  describe('mouse enter dropdown toggle', () => {
    it('changes showAdditionalButtons state', () => {
      let toggle = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button__toggle');
      TestUtils.Simulate.mouseEnter(toggle);
      expect(twoItemsSplitButton.state.showAdditionalButtons).toEqual(true);
    });

    it('renders more buttons', () => {
      let toggle = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button__toggle');
      TestUtils.Simulate.mouseEnter(toggle);
      twoItemsSplitButton.forceUpdate();
      let block = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button__additional-buttons');
      expect(block).not.toBe(null);
    });

    it('when disabled it does not change the state', () => {
      let multiActionButton = TestUtils.renderIntoDocument(
        <SplitButton text="mainButton" disabled={ true }>
          <Button>Second Button</Button>
        </SplitButton>
      );
      let toggle = TestUtils.findRenderedDOMComponentWithClass(multiActionButton, 'carbon-split-button__toggle');
      TestUtils.Simulate.mouseEnter(toggle);
      expect(twoItemsSplitButton.state.showAdditionalButtons).toEqual(false);
    });
  });

   describe('mouse leave split-button', () => {
    it('changes showAdditionalButtons state', () => {
      let block = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button');
      TestUtils.Simulate.mouseLeave(block);
      expect(twoItemsSplitButton.state.showAdditionalButtons).toEqual(false);
    });
  });

  describe('click button', () => {
    it('the handler should be called', () => {
      let toggle = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'carbon-split-button__toggle');
      TestUtils.Simulate.mouseEnter(toggle);
      twoItemsSplitButton.forceUpdate();
      let button = TestUtils.findRenderedDOMComponentWithClass(twoItemsSplitButton, 'second-button');
      TestUtils.Simulate.click(button);
      expect(handleSecondButton).toHaveBeenCalled();
    });
  });
});
