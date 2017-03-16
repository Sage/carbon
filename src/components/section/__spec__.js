import React from 'react';
import { shallow } from 'enzyme';
import Section from './section';

describe('Section', () => {
  let wrapper, children;

  beforeEach(() => {
    wrapper = shallow(
      <Section
        className='my__custom-class'
        title="My Section Title"
      >
        <p>This is some content</p>
      </Section>
    );
  });

  it('renders with main and custom classes', () => {
    expect(wrapper.find('.carbon-section')).toBeTruthy()
    expect(wrapper.find('.my__custom-class')).toBeTruthy()
  });

  it('renders a title', () => {
    let title = wrapper.find('.carbon-section__title')
    expect(title.text()).toEqual('My Section Title')
  });

  it('renders the children content', () => {
    expect(wrapper.contains(<p>This is some content</p>)).toBeTruthy();
  });
});
