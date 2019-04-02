import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Navbar from './navbar.component';
import ButtonStyle from './button.style';

describe('Navbar', () => {
  let wrapper, onPreviousClick, onNextClick;
  describe('render', () => {
    beforeEach(() => {
      onPreviousClick = jest.fn();
      onNextClick = jest.fn();
      wrapper = shallow(
        <Navbar
          onPreviousClick={ onPreviousClick }
          onNextClick={ onNextClick }
          className='custom-class'
        />
      );
    });

    it('returns a previous button that calls onPreviousClick', () => {
      const prevButton = wrapper.find(ButtonStyle).at(0);
      prevButton.simulate('click');
      expect(onPreviousClick.mock.calls.length).toEqual(1);
    });

    it('returns a next button that calls onNextClick', () => {
      const prevButton = wrapper.find(ButtonStyle).at(1);
      prevButton.simulate('click');
      expect(onNextClick.mock.calls.length).toEqual(1);
    });

    it('applies the custom class name', () => {
      expect(wrapper.find('.custom-class').length).toEqual(1);
    });
  });

  describe('Navbar Button', () => {
    const render = (props) => {
      return TestRenderer.create(
        <ButtonStyle { ...props }>
          sample children
        </ButtonStyle>
      );
    };

    it('renders presentational div and context provider for its children', () => {
      expect(render()).toMatchSnapshot();
    });
  });
});
