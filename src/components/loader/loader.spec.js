import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import Loader from './loader.component';
import StyledLoader from './loader.style';

function render(props) {
  return shallow(<Loader { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledLoader { ...props } />);
}

describe('Loader', () => {
  let wrapper;
  it('renders as expected', () => {
    assertStyleMatch(
      {
        textAlign: 'center'
      },
      renderStyles().toJSON()
    );
    expect(render().children()).toHaveLength(3);
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
  });
});
