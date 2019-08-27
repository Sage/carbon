import React from 'react';
import { shallow } from 'enzyme';
import Page from './page.component';
import FullScreenHeading from './../../dialog-full-screen/full-screen-heading';
import AppWrapper from './../../app-wrapper';

describe('Pages', () => {
  it('renders a page with a full screen heading', () => {
    const wrapper = shallow(
      <Page title={ 'My Title' } data-element='carbon-page__content'>
        My Content
      </Page>
    );
    const fullScrenHeading = wrapper.find(FullScreenHeading),
          content = wrapper.find('[data-element="carbon-page__content"]').first();

    expect(wrapper.props()['data-element']).toEqual('carbon-page__content');
    expect(wrapper.props()['data-component']).toEqual('page');
    expect(fullScrenHeading.props().children).toEqual('My Title');
    expect(wrapper.props().children[1].props.children.props.children).toEqual('My Content');
  });
});
