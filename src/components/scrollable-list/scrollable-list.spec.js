import React from 'react';
import { mount } from 'enzyme';
import ScrollableList from './scrollable-list.component';
import {
  hoverList,
  selectedItemOf,
  childrenFrom,
  listFrom,
  keyboard,
  assertKeyboardTraversal,
  assertHoverTraversal,
  click
} from '../../__spec_helper__/test-utils';
import renderListItems from './test-utils';
import 'jest-styled-components';

describe('ScrollableList', () => {
  const initialItem = 0;
  const childCount = 20;
  const lastItem = childCount - 1;
  const onLazyLoad = jest.fn();

  let scrollableList;
  let listMakeup = { num: childCount };
  let hoverListItem;
  let assertMouseOverAll;
  let assertKeyboardOverAll;
  let onSelect;

  const mountComponent = (props, children) => {
    let childrenToRender = children;
    if (scrollableList && scrollableList.hostNodes().length) scrollableList.unmount();
    if (children === undefined) childrenToRender = renderListItems({ num: 3 });

    scrollableList = mount(
      <ScrollableList { ...props }>
        { childrenToRender }
      </ScrollableList>
    );
  };

  afterEach(() => {
    if (scrollableList.hostNodes().length) scrollableList.unmount();
  });

  describe('componentWillReceiveProps', () => {
    const renderScrollableList = ({ change, alwaysHighlight = false }) => {
      mountComponent({ alwaysHighlight, keyNavigation: true });
      const highlighted = alwaysHighlight ? 0 : -1;
      keyboard.pressDownArrow();
      keyboard.pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(highlighted + 2);
      scrollableList.setProps({ children: renderListItems({ num: (3 + change) }) });
      return scrollableList;
    };

    it('does not reset the highlighted element when the number of children does not change', () => {
      scrollableList = renderScrollableList({ change: 0 });
      expect(selectedItemOf(scrollableList)).toEqual(1);
    });

    it('resets the highlighted element when the number of children changes', () => {
      scrollableList = renderScrollableList({ change: -2 });
      expect(selectedItemOf(scrollableList)).toEqual(-1);
    });

    it('selects the first element when the number of children changes and alwaysHighlight is enabled', () => {
      scrollableList = renderScrollableList({ change: -2, alwaysHighlight: true });
      expect(selectedItemOf(scrollableList)).toEqual(0);
    });
  });

  describe('Basic functionality', () => {
    beforeEach(() => {
      onSelect = jest.fn();
      mountComponent({
        alwaysHighlight: true,
        keyNavigation: true,
        onSelect,
        onLazyLoad
      }, renderListItems(listMakeup));

      hoverListItem = hoverList(scrollableList);
      assertMouseOverAll = assertHoverTraversal(listMakeup);
      assertKeyboardOverAll = assertKeyboardTraversal(listMakeup);
    });

    describe('mouse events', () => {
      it('selects items with mouse over', () => {
        hoverListItem(2);
        expect(selectedItemOf(scrollableList)).toEqual(2);
      });

      it('mouse over works reliably over all items in list', () => {
        assertMouseOverAll(scrollableList);
      });

      it('onSelect is called on clicking an item', () => {
        click(childrenFrom(listFrom(scrollableList)).at(0));
        expect(onSelect).toBeCalled();
      });

      it('unblocks mouse hover when mouse is moved on scrollable list', () => {
        scrollableList.setState({ selectedItem: 5 });
        keyboard.pressUpArrow();
        expect(selectedItemOf(scrollableList)).toEqual(4);
        hoverListItem(2);
        expect(selectedItemOf(scrollableList)).toEqual(4);
        scrollableList.find('ul').at(0).props().onMouseMove();
        hoverListItem(2);
        expect(selectedItemOf(scrollableList)).toEqual(2);
      });
    });

    describe('main functionality', () => {
      it('renders a list of items', () => {
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(childCount);
      });

      it('accepts a single child', () => {
        mountComponent({}, <div />);
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(1);
      });

      it('renders nothing if no children are passed', () => {
        mountComponent({}, null);
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(0);
      });

      it('highlights the first item on mount if alwaysHighlight is enabled', () => {
        mountComponent({ alwaysHighlight: true });
        expect(selectedItemOf(scrollableList)).toEqual(0);
      });

      it('does not highlight the  first item on mount if alwaysHighlight is disabled', () => {
        mountComponent({ alwaysHighlight: false });
        expect(selectedItemOf(scrollableList)).toEqual(-1);
      });

      it('does not throw error when highlighting item and there are no children', () => {
        expect(() => mount(<ScrollableList alwaysHighlight />)).not.toThrowError();
        expect(() => mount(<ScrollableList alwaysHighlight>{ [] }</ScrollableList>)).not.toThrowError();
      });
    });

    describe('keyboard navigation', () => {
      it('is activated by a keyNavigation prop', () => {
        mountComponent({ alwaysHighlight: true }, renderListItems({ num: childCount }));
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('supports down navigation', () => {
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
      });

      it('supports up navigation', () => {
        scrollableList.setState({ selectedItem: initialItem + 1 });
        keyboard.pressUpArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('supports home button navigation', () => {
        scrollableList.setState({ selectedItem: 5 });
        keyboard.pressHome();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('supports end button navigation', () => {
        keyboard.pressEnd();
        expect(selectedItemOf(scrollableList)).toEqual(19);
      });

      it('does not throw error trying to update scroll if list is not present', () => {
        scrollableList.instance().scrollBox.current = undefined;
        expect(() => keyboard.pressUpArrow()).not.toThrowError();
      });

      it('does not throw error trying to update scroll if list has no children', () => {
        scrollableList.instance().scrollBox.current = { children: [] };
        expect(() => keyboard.pressUpArrow()).not.toThrowError();
      });

      it('blocks mouse hover selection when using keyboard navigation', () => {
        scrollableList.setState({ selectedItem: 5 });
        keyboard.pressUpArrow();
        expect(selectedItemOf(scrollableList)).toEqual(4);
        hoverListItem(2);
        expect(selectedItemOf(scrollableList)).toEqual(4);
      });

      describe('when is loopable', () => {
        it('scrolls as the selected item goes beyond the max-height of the list', () => {
          scrollableList.setProps({ isLoopable: true });
          const numOfItems = 20;
          const listHeight = 100;
          const itemHeight = 10;
          const list = {
            offsetHeight: listHeight,
            children: [...Array(numOfItems).keys()].map(() => {
              return { offsetHeight: itemHeight, offsetTop: 0 };
            }),
            scrollTop: 0
          };
          list.children[lastItem].offsetTop = listHeight + 1;
          scrollableList.instance().scrollBox.current = list;

          keyboard.pressUpArrow();
          expect(list.scrollTop).toEqual(numOfItems * itemHeight - listHeight);
        });

        it('jumps to the bottom of list when up key pressed at first item', () => {
          scrollableList.setProps({ isLoopable: true });
          keyboard.pressUpArrow();
          expect(selectedItemOf(scrollableList)).toEqual(lastItem);
        });

        it('jumps back to the top of list when down key pressed at last item', () => {
          scrollableList.setProps({ isLoopable: true });
          scrollableList.setState({ selectedItem: lastItem });
          keyboard.pressDownArrow();
          expect(selectedItemOf(scrollableList)).toEqual(initialItem);
        });

        it('keyboard events reliably traverse the list', () => {
          scrollableList.setProps({ isLoopable: true });
          assertKeyboardOverAll(scrollableList);
        });
      });

      describe('when is not loopable', () => {
        it('scrolls as the selected item goes beyond the max-height of the list', () => {
          const numOfItems = 20;
          const listHeight = 100;
          const itemHeight = 10;
          const list = {
            offsetHeight: listHeight,
            children: [...Array(numOfItems).keys()].map(() => {
              return { offsetHeight: itemHeight, offsetTop: 0 };
            }),
            scrollTop: 0
          };
          list.children[lastItem].offsetTop = listHeight + 1;
          scrollableList.instance().scrollBox.current = list;
          for (let index = 0; index < numOfItems; index++) {
            keyboard.pressDownArrow();
          }
          expect(list.scrollTop).toEqual(numOfItems * itemHeight - listHeight);
        });

        it('does nothing when up key pressed at first item', () => {
          keyboard.pressUpArrow();
          expect(selectedItemOf(scrollableList)).toEqual(initialItem);
        });

        it('does nothing when down key pressed at last item', () => {
          scrollableList.setState({ selectedItem: lastItem });
          keyboard.pressDownArrow();
          expect(selectedItemOf(scrollableList)).toEqual(lastItem);
        });

        it('keyboard events reliably traverse the list', () => {
          assertKeyboardOverAll(scrollableList);
        });
      });

      it('calls an onSelect callback on pressing the enter key', () => {
        keyboard.pressEnter();
        expect(onSelect).toHaveBeenCalledWith(initialItem);
      });

      it('does nothing when other keys are pressed', () => {
        keyboard.pressRightArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('can be deactivated after the component is mounted', () => {
        scrollableList.setProps({ keyNavigation: false });
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('can be activated after the component is mounted', () => {
        mountComponent({ alwaysHighlight: true }, renderListItems({ num: childCount }));
        scrollableList.setProps({ keyNavigation: true });
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
      });

      it('removes the keypress event listener when unmounted', () => {
        scrollableList.unmount();
        expect(keyboard.pressDownArrow()).toThrowError();
      });

      it('triggers select on tab if something is highlighted', () => {
        expect(onSelect).not.toHaveBeenCalled();
        keyboard.pressTab();
        expect(onSelect).toHaveBeenCalledWith(0);
      });

      it('does not trigger select if nothing is highlighted', () => {
        onSelect = jest.fn();
        mountComponent({ keyNavigation: true, onSelect });
        expect(onSelect).not.toHaveBeenCalled();
        keyboard.pressTab();
        expect(onSelect).not.toHaveBeenCalled();
      });
    });
  });

  describe('mixed child nodes', () => {
    beforeEach(() => {
      listMakeup = {
        nonSelectables: [0, 2, 4],
        num: 5
      };
      mountComponent({
        alwaysHighlight: true,
        keyNavigation: true,
        onSelect,
        onLazyLoad
      }, renderListItems(listMakeup));
      hoverListItem = hoverList(scrollableList);
    });

    it('accepts non-selectable elements', () => {
      expect(childrenFrom(listFrom(scrollableList)).length).toBe(listMakeup.num);
    });

    it('does not select non-selectable items', () => {
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
    });

    it('mouseover does not select non-selectable items', () => {
      hoverListItem(2);
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
    });

    it('skips non-selectable items on keyboard down navigation', () => {
      keyboard.pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 3);
    });

    it('skips non-selectable items on keyboard up navigation', () => {
      scrollableList.setState({ selectedItem: 3 });
      keyboard.pressUpArrow();
      expect(selectedItemOf(scrollableList)).toEqual(1);
    });
  });

  describe('custom elements which are selectable', () => {
    beforeEach(() => {
      listMakeup = {
        customSelectables: [0, 2, 4],
        num: 5
      };
      assertMouseOverAll = assertHoverTraversal(listMakeup);
      assertKeyboardOverAll = assertKeyboardTraversal(listMakeup);
      mountComponent({
        alwaysHighlight: true,
        keyNavigation: true,
        onSelect,
        onLazyLoad
      }, renderListItems(listMakeup));
    });

    it('allows custom elements to become selectable when passed isSelectable prop', () => {
      expect(selectedItemOf(scrollableList)).toBe(initialItem);
    });

    it('does not affect keyboard navigation', () => {
      assertKeyboardOverAll(scrollableList);
    });

    it('does not affect mouseover functionality', () => {
      assertMouseOverAll(scrollableList);
    });
  });

  describe('style', () => {
    it('has a default max-height', () => {
      expect(scrollableList).toHaveStyleRule('max-height', '180px');
    });

    it('has a default max-height which is overridable by a prop', () => {
      scrollableList.setProps({ maxHeight: '200px' });
      expect(scrollableList).toHaveStyleRule('max-height', '200px');
    });
  });

  describe('lazy loading', () => {
    it('accepts a callback which is called when scroll nears the end of item list', () => {
      scrollableList.simulate('scroll', { target: { scrollHeight: 400, scrollTop: 101 } });
      expect(onLazyLoad).toBeCalled();
    });

    it('does not trigger onLazyLoad when the scrollTop is not beyond the scrollHeight', () => {
      onLazyLoad.mockReset();
      scrollableList.simulate('scroll', { target: { scrollHeight: 400, scrollTop: 99 } });
      expect(onLazyLoad).not.toBeCalled();
    });

    it('does not attempt to call a lazy load callback if one is not provided', () => {
      scrollableList.setProps({ onLazyLoad: undefined });
      expect(() => scrollableList.simulate('scroll')).not.toThrowError();
    });
  });
});
