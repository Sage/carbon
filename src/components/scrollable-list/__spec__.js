import React from 'react';
import { mount } from 'enzyme';
import ScrollableList from './scrollable-list.component';
import { 
  hoverList,
  selectedItemOf,
  childrenFrom,
  listFrom,
  renderListItems,
  keyboard,
  traverseListObject,
  assertKeyboardTraversal,
  assertHoverTraversal,
  click
} from './test-utils';
import 'jest-styled-components';

const onSelect = jest.fn();
const onLazyLoad = jest.fn();

describe('ScrollableList', () => {
  let scrollableList, 
    initialItem = 0, 
    childCount = 20, 
    lastItem = childCount - 1,
    listMakeup = { num: childCount },
    hoverListItem,
    assertMouseOverAll,
    assertKeyboardOverAll,
    traverseList;

  describe('Basic functionality', () => {
    beforeEach(() => {
      scrollableList = mount(
        <ScrollableList 
          keyNavigation
          onSelect={onSelect}
          onLazyLoad={onLazyLoad}
        >
          {renderListItems(listMakeup)}
        </ScrollableList>
      );

      hoverListItem = hoverList(scrollableList);
      traverseList = traverseListObject(childCount);
      assertMouseOverAll = assertHoverTraversal(listMakeup);
      assertKeyboardOverAll = assertKeyboardTraversal(listMakeup);
    });

    describe('mouse events', () => {
      it('selects items with mouse over', () => {
        hoverListItem(2);
        expect(selectedItemOf(scrollableList)).toEqual(2)
      })

      it('mouse over works reliably over all items in list', () => {
        assertMouseOverAll(scrollableList);
      })

      it('onSelect is called on clicking an item', () => {
        click(childrenFrom(listFrom(scrollableList)).at(0));
        expect(onSelect).toBeCalled();
      })
    })
  
    describe('main functionality', () => {
      it('renders a list of items', () => {
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(childCount);
      });

      it('accepts a single child', () => {
        scrollableList = mount(
          <ScrollableList>
            <div></div>
          </ScrollableList>
        )
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(1)
      });

      it('renders nothing if no chilren are passed', () => {
        scrollableList = mount(<ScrollableList />);
        expect(childrenFrom(listFrom(scrollableList)).length).toBe(0);
      })
    });
  
    describe('keyboard navigation', () => {
      it('is activated by a keyNavigation prop', () => {
        scrollableList = mount(
          <ScrollableList>
            {renderListItems({ num: childCount })}
          </ScrollableList>
        )
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

      it('scrolls as the selected item goes beyond the max-height of the list', () => {
        const spy = jest.spyOn(scrollableList.instance(), 'setScrollTop');
        traverseList();
        expect(spy).toBeCalled();
      })
  
      it('jumps to the bottom of list when up key pressed at first item', () => {
        keyboard.pressUpArrow();
        expect(selectedItemOf(scrollableList)).toEqual(lastItem);
      });
  
      it('jumps back to the top of list when down key pressed at last item', () => {
        scrollableList.setState({ selectedItem: lastItem });
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      });

      it('keyboard events reliably traverse the list', () => {
        assertKeyboardOverAll(scrollableList);
      })
  
      it('calls an onSelect callback on pressing the enter key', () => {
        keyboard.pressEnter();
        expect(onSelect).toBeCalled();
      });

      it('does nothing when other keys are pressed', () => {
        keyboard.pressRightArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      })

      it('can be deactivated after the component is mounted', () => {
        scrollableList.setProps({ keyNavigation: false });
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem);
      })

      it('can be activated after the component is mounted', () => {
        scrollableList = mount(
          <ScrollableList>
            { renderListItems({ num: childCount }) }
          </ScrollableList>
        )
        scrollableList.setProps({ keyNavigation: true });
        keyboard.pressDownArrow();
        expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
      });

      it('removes the keypress event listener when unmounted', () => {
        const spy = jest.spyOn(scrollableList.instance(), 'handleUnmount');
        scrollableList.unmount();
        
        expect(spy).toBeCalled();
      })
    })
  })

  describe('mixed child nodes', () => {
    const listMakeup = {
      nonSelectables: [0,2,4],
      num: 5
    },
      assertMouseOverAll = assertHoverTraversal(listMakeup),
      assertKeyboardOverAll = assertKeyboardTraversal(listMakeup);

    beforeEach(() => {
      scrollableList = mount(
        <ScrollableList
          keyNavigation
          onSelect={onSelect}
          onLazyLoad={onLazyLoad}  
        >
          { renderListItems(listMakeup) }
        </ScrollableList>
      )
      hoverListItem = hoverList(scrollableList);
    })

    it('accepts non-selectable elements', () => {
      expect(childrenFrom(listFrom(scrollableList)).length).toBe(listMakeup.num);
    })

    it('does not select non-selectable items', () => {
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
    });

    it('mouseover does not select non-selectable items', () => {
      hoverListItem(2);
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 1);
    })

    it('skips non-selectable items on keyboard up navigation', () => {
      keyboard.pressDownArrow();
      expect(selectedItemOf(scrollableList)).toEqual(initialItem + 3);
    });

    it('skips non-selectable items on keyboard down navigation', () => {
      keyboard.pressUpArrow();
      expect(selectedItemOf(scrollableList)).toEqual(3);
    })
  })

  describe('custom elements which are selectable', () => {
    const listMakeup = {
      customSelectables: [0,2,4],
      num: 5
    },
      assertMouseOverAll = assertHoverTraversal(listMakeup),
      assertKeyboardOverAll = assertKeyboardTraversal(listMakeup);
      
    beforeEach(() => {
      scrollableList = mount(
        <ScrollableList 
          keyNavigation
          onSelect={onSelect}
          onLazyLoad={onLazyLoad}
        >
          { renderListItems(listMakeup) }
        </ScrollableList>
      )
    });

    it('allows custom elements to become selectable when passed isSelectable prop', () => {
      expect(selectedItemOf(scrollableList)).toBe(initialItem);
    });

    it('does not affect keyboard navigation', () => {
      assertKeyboardOverAll(scrollableList);
    })

    it('does not affect mouseover functionality', () => {
      assertMouseOverAll(scrollableList);
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

    it('does not attempt to call a lazy load callback if one is not provided', () => {
      scrollableList = mount(
        <ScrollableList 
          keyNavigation
          onSelect={onSelect}
        >
          { renderListItems({ num: 20 }) }
        </ScrollableList>
      )
      scrollableList.simulate('scroll');
      expect(onLazyLoad).not.toBeCalled();
    });
  });
});
