import React from 'react';
import { shallow } from 'enzyme';
import { Pages, Page } from './pages';
import { Carousel } from './../carousel';

describe('Pages', () => {
  it('renders a carousel with the right props', () => {
    const wrapper = shallow(
      <Pages>
        <Page />
        <Page />
      </Pages>
    );

    expect(wrapper.type()).toEqual(Carousel);
    expect(wrapper.props().className).toEqual('carbon-pages');
    expect(wrapper.props().enableSlideSelector).toBeFalsy();
    expect(wrapper.props().enablePreviousButton).toBeFalsy();
    expect(wrapper.props().enableNextButton).toBeFalsy();
    expect(wrapper.props()['data-component']).toEqual('pages');
  });
});
