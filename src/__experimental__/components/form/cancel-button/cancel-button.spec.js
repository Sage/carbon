import React from 'react';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs';
import CancelButton from './cancel-button.component';

describe('CancelButton', () => {
  let wrapper, clickFunction;

  beforeEach(() => {
    wrapper = shallow(<CancelButton />);
  });

  it('renders the standard class', () => {
    expect(wrapper.hasClass('carbon-form-cancel')).toBeTruthy();
  });

  it('renders a custom class if provided', () => {
    wrapper = shallow(
      <CancelButton
        cancelButtonProps={ { className: 'my-custom-button-class' } }
      />
    );
    expect(wrapper.find('.my-custom-button-class').exists()).toEqual(true);
    expect(wrapper.find('.carbon-form-cancel__button').exists()).toEqual(false);
  });

  it('renders the default text', () => {
    const button = wrapper.find('.carbon-form-cancel__button');
    expect(button.prop('children')).toEqual('Cancel');
  });

  it('renders custom text when provided', () => {
    wrapper = shallow(
      <CancelButton
        cancelText='This is a cancel button'
      />
    );

    const button = wrapper.find('.carbon-form-cancel__button');
    expect(button.prop('children')).toEqual('This is a cancel button');
  });

  it('adds the onClick prop to the button', () => {
    clickFunction = () => { };
    wrapper = shallow(
      <CancelButton
        cancelClick={ clickFunction }
      />
    );

    const button = wrapper.find('.carbon-form-cancel__button');
    expect(button.prop('onClick')).toEqual(clickFunction);
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        wrapper = shallow(<CancelButton data-element='bar' data-role='baz' />);
        rootTagTest(wrapper, 'cancel', 'bar', 'baz');
      });
    });
  });
});
