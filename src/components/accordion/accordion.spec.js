import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { simulate, assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';

import Textbox from '../../__experimental__/components/textbox';
import { Accordion } from '.';
import {
  StyledAccordionContainer,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContent,
  StyledAccordionContentContainer
} from './accordion.style';
import AccordionGroup from './accordion-group.component';

const contentHeight = 200;

const isExpanded = (wrapper) => {
  assertStyleMatch({
    transform: undefined
  }, wrapper.find(StyledAccordionIcon));
  assertStyleMatch({
    visibility: undefined,
    maxHeight: `${contentHeight}px`
  }, wrapper.find(StyledAccordionContentContainer));
};

const isCollapsed = (wrapper) => {
  assertStyleMatch({
    transform: 'rotate(90deg)'
  }, wrapper.find(StyledAccordionIcon));
  assertStyleMatch({
    visibility: 'hidden',
    maxHeight: '0px'
  }, wrapper.find(StyledAccordionContentContainer));
};

describe('Accordion', () => {
  let wrapper;

  const render = (props) => {
    wrapper = mount(<Accordion title='Title' { ...props } />);
    jest.spyOn(
      wrapper.find(StyledAccordionContent).getDOMNode(), 'scrollHeight', 'get'
    ).mockImplementation(() => contentHeight);
  };


  beforeEach(() => {
    render();
  });

  describe('controlled behaviour', () => {
    it('mounts expanded when expanded prop is passed as true', () => {
      act(() => render({ expanded: true }));
      wrapper.update();
      isExpanded(wrapper);
    });

    it('mounts collapsed when expanded prop is passed as false', () => {
      render({ expanded: false });
      isCollapsed(wrapper);
    });

    it('fires provided onChange prop when clicked on the header area', () => {
      const onChange = jest.fn();
      render({ onChange, expanded: false });
      const ev = {};
      wrapper.find(StyledAccordionTitleContainer).prop('onClick')(ev);
      expect(onChange).toHaveBeenCalledWith(ev, true);
    });

    it.each(
      [['enter', 13], ['space', 32]]
    )('fires provided onChange prop when $s key is pressed on the header area', (key, keyCode) => {
      const onChange = jest.fn();
      render({ onChange, expanded: false });
      const ev = { which: keyCode };
      wrapper.find(StyledAccordionTitleContainer).prop('onKeyDown')(ev);
      expect(onChange).toHaveBeenCalledWith(ev, true);
    });
  });

  describe('uncontrolled behaviour', () => {
    it('mounts expanded when defaultExpanded prop is passed as true', () => {
      act(() => render({ defaultExpanded: true }));
      wrapper.update();
      isExpanded(wrapper);
    });

    it('mounts collapsed when defaultExpanded prop is not passed at all', () => {
      isCollapsed(wrapper);
    });

    it('toggles expansion state when clicking on the header area', () => {
      act(() => wrapper.find(StyledAccordionTitleContainer).prop('onClick')());
      wrapper.update();
      isExpanded(wrapper);
      act(() => wrapper.find(StyledAccordionTitleContainer).prop('onClick')());
      wrapper.update();
      isCollapsed(wrapper);
    });

    it.each(
      [['enter', 13], ['space', 32]]
    )('toggles expansion state when pressing %s key on the header area', (key, keyCode) => {
      act(() => wrapper.find(StyledAccordionTitleContainer).prop('onKeyDown')({ which: keyCode }));
      wrapper.update();
      isExpanded(wrapper);
      act(() => wrapper.find(StyledAccordionTitleContainer).prop('onKeyDown')({ which: keyCode }));
      wrapper.update();
      isCollapsed(wrapper);
    });

    it('does not toggle expansion state when keys other than enter or space pressed on the header area', () => {
      act(() => wrapper.find(StyledAccordionTitleContainer).prop('onKeyDown')({ which: 10 }));
      wrapper.update();
      isCollapsed(wrapper);
    });
  });

  describe('layout', () => {
    it(`renders header area with justify-content: space-between and flex-direction: "row-reverse"
      when iconAlign is set to "left"`,
    () => {
      render({ iconAlign: 'left' });
      assertStyleMatch({
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse'
      }, wrapper.find(StyledAccordionTitleContainer));
    });

    it('renders header area with justify-content: space-between when iconAlign is set to "right"', () => {
      assertStyleMatch({
        justifyContent: 'space-between'
      }, wrapper.find(StyledAccordionTitleContainer));
    });

    it('renders accordion with white background and border when type is set to "primary" (default)', () => {
      assertStyleMatch({
        backgroundColor: baseTheme.colors.white,
        border: `1px solid ${baseTheme.accordion.border}`
      }, wrapper.find(StyledAccordionContainer));
    });

    it('renders accordion with transparent background and no border when type is set to "secondary" (default)', () => {
      render({ type: 'secondary' });
      assertStyleMatch({
        backgroundColor: 'transparent',
        border: undefined
      }, wrapper.find(StyledAccordionContainer));
    });

    it('renders icon rotated when accordion is collapsed', () => {
      render({ expanded: false });
      assertStyleMatch({
        transform: 'rotate(90deg)'
      }, wrapper.find(StyledAccordionIcon));
    });

    it('renders accordion content container with visibility: hidden when is not expanded', () => {
      assertStyleMatch({
        visibility: 'hidden'
      }, wrapper.find(StyledAccordionContentContainer));
    });
  });

  describe('style overrides', () => {
    const randomStyleObject = {
      backgroundColor: 'red',
      display: 'flex',
      fontSize: '200px'
    };
    beforeEach(() => {
      render({
        styleOverride: {
          root: randomStyleObject,
          headerArea: randomStyleObject,
          icon: randomStyleObject,
          header: randomStyleObject,
          content: randomStyleObject
        }
      });
    });

    it('renders root element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAccordionContainer));
    });

    it('renders header area element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAccordionTitleContainer));
    });

    it('renders icon element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAccordionIcon));
    });

    it('renders header element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAccordionTitle));
    });

    it('renders content element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAccordionContent));
    });
  });
});

describe('AccordionGroup', () => {
  let wrapper;

  const render = () => {
    wrapper = mount(
      <AccordionGroup>
        <Accordion title='Title_1' defaultExpanded>
          <Textbox label='Textbox in an Accordion' />
        </Accordion>
        <Accordion title='Title_2' defaultExpanded>
          <Textbox label='Textbox in an Accordion' />
        </Accordion>
        <Accordion title='Title_3' defaultExpanded>
          <Textbox label='Textbox in an Accordion' />
        </Accordion>
      </AccordionGroup>
    );
  };

  beforeEach(() => {
    render();
  });

  it.each(
    [[0, 1], [1, 2], [2, 0], [0, 1]]
  )('focuses on the next Accordion in a loop when down arrow is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressDownArrow(wrapper.find(StyledAccordionTitleContainer).at(focused));
    expect(wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)).toBeFocused();
  });


  it.each(
    [[0, 2], [2, 1], [1, 0], [0, 2]]
  )('focuses on the previous Accordion in a loop when up arrow is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressUpArrow(wrapper.find(StyledAccordionTitleContainer).at(focused));
    expect(wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)).toBeFocused();
  });

  it.each(
    [[0, 0], [1, 0], [2, 0]]
  )('focuses on the first Accordion when \'home\' key is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressHome(wrapper.find(StyledAccordionTitleContainer).at(focused));
    expect(wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)).toBeFocused();
  });

  it.each(
    [[0, 2], [1, 2], [2, 2]]
  )('focuses on the last Accordion when \'end\' key is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressEnd(wrapper.find(StyledAccordionTitleContainer).at(focused));
    expect(wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)).toBeFocused();
  });

  it('validates the incorrect children prop', () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const InvalidComponent = React.forwardRef(() => <div />);
    mount(
      <AccordionGroup>
        <InvalidComponent />
        <InvalidComponent />
      </AccordionGroup>
    );

    const expected = 'Warning: Failed prop type: `AccordionGroup` only accepts children of'
        + ' type `Accordion`.\n    in AccordionGroup';

    expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
  });
});
