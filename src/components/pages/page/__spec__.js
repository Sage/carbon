import React from 'react';
import { shallow } from 'enzyme';
import { Page } from './../pages';
import FullScreenHeading from './../../dialog-full-screen/full-screen-heading';
import AppWrapper from './../../app-wrapper';

describe('Pages', () => {
  it('renders a page with a full screen heading', () => {
    const wrapper = shallow(
      <Page title={ 'My Title' }>
        My Content
      </Page>
    );
    const fullScrenHeading = wrapper.find(FullScreenHeading),
        content = wrapper.find('.carbon-page__content');

    expect(wrapper.props().className).toEqual('carbon-page');
    expect(wrapper.props()['data-component']).toEqual('page');
    expect(fullScrenHeading.props().children).toEqual('My Title');
    expect(content.props().children).toEqual(<AppWrapper>My Content</AppWrapper>);
  });
});
