import React from 'react';
import TestRenderer from 'react-test-renderer';
import Navbar from './navbar';
import StyledButton from './button.style';
import { shallow } from 'enzyme';

describe('Navbar', () => {
  let wrapper, onPreviousClick, onNextClick
  describe('render', () => {
    beforeEach(() => {
      onPreviousClick = jest.fn();
      onNextClick = jest.fn();
      wrapper = shallow(
        <Navbar
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          className='custom-class'
        />
      )
    });

    it('returns a previous button that calls onPreviousClick', () => {
      const prevButton = wrapper.find('.DayPicker-NavButton--prev');
      prevButton.simulate('click');
      expect(onPreviousClick.mock.calls.length).toEqual(1);
    });

    it('returns a next button that calls onNextClick', () => {
      const prevButton = wrapper.find('.DayPicker-NavButton--next');
      prevButton.simulate('click');
      expect(onNextClick.mock.calls.length).toEqual(1);
    });

    it('applies the custom class name', () => {
      expect(wrapper.find('.custom-class').length).toEqual(1);
    });
  });

  describe('Navbar Button', () => {
    const shallowRender = (props, renderer = shallow) => {
      return renderer(
        <StyledButton { ...props }>
          sample children
        </StyledButton>
      );
    };

    it('renders presentational div and context provider for its children', () => {
      expect(shallowRender({}, TestRenderer.create)).toMatchSnapshot();
    });
  });
});
