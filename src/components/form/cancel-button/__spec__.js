import React from 'react';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import { shallow } from 'enzyme';
import CancelButton from './cancel-button';
import Button from './../../button';

describe('CancelButton', () => {
  let wrapper, clickFunction;

  beforeEach(() => {
    wrapper = shallow(<CancelButton/>);
  });

  it('renders the standard class', () => {
    let button = wrapper.find('.carbon-form-cancel__button');
    expect(wrapper.hasClass('carbon-form-cancel')).toBeTruthy();
  });

  it('renders a custom class if provided', () => {
    wrapper = shallow(
      <CancelButton
        cancelButtonProps={ { className: 'my-custom-button-class' } }
      />
    );

    expect(wrapper.find('.my-custom-button-class').exists()).toBeTruthy;
    expect(wrapper.find('.carbon-form-cancel__button')).toBeFalsy;
  });

  it('renders the default text', () => {
    let button = wrapper.find('.carbon-form-cancel__button');
    expect(button.prop('children')).toEqual('Cancel');
  });

  it('renders custom text when provided', () => {
    wrapper = shallow(
       <CancelButton
         cancelText='This is a cancel button'
       />
     );

    let button = wrapper.find('.carbon-form-cancel__button');
    expect(button.prop('children')).toEqual('This is a cancel button');
  });

  it('adds the onClick prop to the button', () => {
    clickFunction = () => { };
    wrapper = shallow(
      <CancelButton
        cancelClick={ clickFunction }
      />
    );

    let button = wrapper.find('.carbon-form-cancel__button')
    expect(button.prop('onClick')).toEqual(clickFunction)
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<CancelButton data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'cancel', 'bar', 'baz');
      });
    });
  });
});
