import React from 'react';
import { shallow } from 'enzyme';
import Section from './section';

describe('Section', () => {
  let instance, section, children;

  beforeEach(() => {
    instance = shallow(
      <Section
        className='my__custom-class'
        title="My Section Title"
      >
        <p>This is some content</p>
      </ Section>
    );
  });

  it('renders with main and custom classes', () => {
    expect(instance.hasClass('carbon-section')).toBeTruthy();
    expect(instance.hasClass('my__custom-class')).toBeTruthy();
  });

  it('first renders a h2 with the title', () => {
    expect(instance.children().get(0)).toEqual(<h2>My Section Title</h2>)
  });

  it('second renders the children content', () => {
    expect(instance.children().get(1)).toEqual(<p>This is some content</p>);
  });
});
