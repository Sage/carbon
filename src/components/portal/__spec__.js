import React from 'react';
import { shallow } from 'enzyme';
import Portal from './portal';
import ReactPortal from 'react-portal';

describe('Portal', () => {
  let child, wrapper, reactPortal;

  beforeEach(() => {
    wrapper = shallow(
      <Portal open>
        <p className='child-element'></p>
      </Portal>
    );
  });

  it('renders an instance of ReactPortal', () => {
    reactPortal = wrapper.find(ReactPortal);
    expect(reactPortal.length).toEqual(1);
    expect(reactPortal.props().isOpened).toBeTruthy();
  });

  it('renders children props', () => {
    child = wrapper.find('.child-element');
    expect(child.length).toEqual(1);
  });
});
