import React from 'react';
import { mount } from 'enzyme';
import ScrollableList from './';
import 'jest-styled-components';

const renderItems = (num) => [...Array(num).keys()].map((_, i) => <div>{`Item: ${i}`}</div>);

const keyPress = (key) => { 
  const ev = new KeyboardEvent('keydown', { key });
  document.dispatchEvent(ev);
};

const buildPressEvents = (keys) => keys.reduce((acc, key) => {
  acc[`press${key}`] = () => keyPress(key);
  return acc;
}, {});

const go = buildPressEvents(['ArrowUp', 'ArrowDown', 'Enter']);


const pressUpArrow = () => keyPress('ArrowUp');
const pressDownArrow = () => keyPress('ArrowDown');
const pressEnter = () => keyPress('Enter');

const selectedItemOf = (wrapper) => wrapper.state().selectedItem;

const onSelect = jest.fn();
const onLazyLoad = jest.fn();

describe('ScrollableList', () => {
  let scrollableList, initialItem = 0, childCount = 10, lastItem = childCount - 1;

  beforeEach(() => {
    scrollableList = mount(
      <ScrollableList 
        keyNavigation
        onSelect={onSelect}
        onLazyLoad={onLazyLoad}
      >
        {renderItems(childCount)}
      </ScrollableList>
    );
  });

  describe('main functionality', () => {
    it('renders a list of items', () => {
      expect(scrollableList.find('ul').children().length).toBe(childCount);
    });
  });

  describe('keyboard navigation', () => {
    it('is activated by a keyNavigation prop', () => {
      scrollableList = mount(
        <ScrollableList>
          {renderItems(childCount)}
        </ScrollableList>
      )
      pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem);
    });

    it('supports down navigation', () => {
      pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
    });

    it('supports up navigation', () => {
      scrollableList.setState({ selectedItem: initialItem + 1 });
      pressUpArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem);
    });

    it('jumps to the bottom of list when up key pressed at first item', () => {
      pressUpArrow();
      expect(selectedItemOf(scrollableList)).toEqual(lastItem);
    });

    it('jumps back to the top of list when down key pressed at last item', () => {
      scrollableList.setState({ selectedItem: lastItem });
      pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem);
    });

    it('calls an onSelect callback on pressing the enter key', () => {
      pressEnter();
      expect(onSelect).toBeCalled();
    })
  })

  describe('style', () => {
    it('has a default max-height', () => {
      expect(scrollableList).toHaveStyleRule('max-height', '180px');
    });
    
    it('has a default max-height which is overridable by a prop', () => {
      scrollableList.setProps({ maxHeight: '200px' });
      expect(scrollableList).toHaveStyleRule('max-height', '200px');
    });
  })

  describe('lazy loading', () => {
    it('accepts a callback which is called when scroll nears the end of item list', () => {
      scrollableList.simulate('scroll');
      expect(onLazyLoad).toBeCalled();
    });
  });

  describe('dls', () => {
    it('follows the design language system', () => {
      // TODO
    });
  });
})