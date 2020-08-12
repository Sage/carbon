import React from 'react';
import { shallow } from 'enzyme';
import Box from './box.component';

const ChildComponent = () => <div />;

const render = props => shallow(
  <Box { ...props }>
    <ChildComponent />
  </Box>
);

describe('Internal Box component', () => {
  let wrapper;

  it('renders passed in children', () => {
    wrapper = render();
    expect(wrapper.find(ChildComponent).exists()).toBe(true);
  });

  it('passes margin props to child component', () => {
    wrapper = render({
      m: 2,
      mt: 2,
      mb: 2,
      mr: 2,
      ml: 2,
      mx: 2,
      my: 2
    });
    expect(wrapper.find(ChildComponent).props().m).toEqual(2);
    expect(wrapper.find(ChildComponent).props().mt).toEqual(2);
    expect(wrapper.find(ChildComponent).props().mb).toEqual(2);
    expect(wrapper.find(ChildComponent).props().mr).toEqual(2);
    expect(wrapper.find(ChildComponent).props().ml).toEqual(2);
    expect(wrapper.find(ChildComponent).props().mx).toEqual(2);
    expect(wrapper.find(ChildComponent).props().my).toEqual(2);
  });

  it('passes padding props to child component', () => {
    wrapper = render({
      p: 2,
      pt: 2,
      pb: 2,
      pr: 2,
      pl: 2,
      px: 2,
      py: 2
    });
    expect(wrapper.find(ChildComponent).props().p).toEqual(2);
    expect(wrapper.find(ChildComponent).props().pt).toEqual(2);
    expect(wrapper.find(ChildComponent).props().pb).toEqual(2);
    expect(wrapper.find(ChildComponent).props().pr).toEqual(2);
    expect(wrapper.find(ChildComponent).props().pl).toEqual(2);
    expect(wrapper.find(ChildComponent).props().px).toEqual(2);
    expect(wrapper.find(ChildComponent).props().py).toEqual(2);
  });
  
});