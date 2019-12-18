import React from 'react';
import { shallow } from 'enzyme';
import { StyledPage } from './page.style.js';
import Page from './page.component';
import FullScreenHeading from '../../dialog-full-screen/full-screen-heading';

describe('Pages', () => {
  it('renders a page with a full screen heading', () => {
    const wrapper = shallow(
      <Page
        transitionName={ () => {} }
        title='My Title'
        data-element='carbon-page-content'
      >
        My Content
      </Page>
    );
    const fullScrenHeading = wrapper.find(FullScreenHeading);
    expect(wrapper.find(StyledPage).props()['data-element']).toEqual('carbon-page-content');
    expect(wrapper.find(StyledPage).props()['data-component']).toEqual('page');
    expect(fullScrenHeading.props().children).toEqual('My Title');
    expect(wrapper.find(StyledPage).props().children[1].props.children.props.children).toEqual('My Content');
  });
});
