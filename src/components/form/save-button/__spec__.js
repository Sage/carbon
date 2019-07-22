import React from 'react';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import { shallow } from 'enzyme';
import SaveButton from './save-button';

describe('SaveButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SaveButton
        saving={ false }
      />
    );
  });

  it('renders the standard class', () => {
    expect(wrapper.hasClass('carbon-form-save')).toBeTruthy();
  });

  it('renders a custom class if provided', () => {
    wrapper = shallow(
      <SaveButton
        saving={ false }
        saveButtonProps={ { className: 'my-custom-button-class' } }
      />
    );

    expect(wrapper.find('.my-custom-button-class').exists()).toEqual(true);
    expect(wrapper.find('.carbon-form-save__button').exists()).toEqual(false);
  });

  it('renders the default text', () => {
    const button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('children')).toEqual('Save');
  });

  it('renders custom text when provided', () => {
    wrapper = shallow(
      <SaveButton
        saveText='This is a save button'
      />
    );

    const button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('children')).toEqual('This is a save button');
  });

  describe('when there are no errors or warnings', () => {
    it('renders with the expected class', () => {
      expect(wrapper.find('.carbon-form-save').exists()).toBeTruthy();
      expect(wrapper.find('.carbon-form-save--invalid').exists()).toBeFalsy();
    });
  });

  it('the button is enabled when the form is not saving', () => {
    expect(wrapper.props.disabled).toBeFalsy();
  });

  it('the button is disabled when the form is saving', () => {
    wrapper = shallow(
      <SaveButton
        saving
      />
    );

    const button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('disabled')).toBeTruthy();
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        wrapper = shallow(<SaveButton data-element='bar' data-role='baz' />);
        rootTagTest(wrapper, 'save', 'bar', 'baz');
      });
    });
  });
});
