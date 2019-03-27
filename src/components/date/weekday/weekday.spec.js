import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import classicTheme from '../../../style/themes/classic';
import Weekday from './weekday.component';

describe('Weekday', () => {
  const shallowRender = (props, renderer = shallow) => {
    return renderer(<Weekday { ...props }>sample children</Weekday>);
  };

  it('renders presentational div and context provider for its children', () => {
    expect(shallowRender({ title: 'tile', className: 'class-name' }, TestRenderer.create)).toMatchSnapshot();
  });

  describe('classic theme', () => {
    it('applies custom styling', () => {
      expect(shallowRender({ theme: classicTheme }, TestRenderer.create)).toMatchSnapshot();
    });
  });
});
