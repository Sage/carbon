import React from 'react';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import { shallow, mount } from 'enzyme';
import SaveButton from './save-button';
import Button from './../../button';

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
    let button = wrapper.find('.carbon-form-save__button');
    expect(wrapper.hasClass('carbon-form-save')).toBeTruthy();
  });

  it('renders a custom class if provided', () => {
    wrapper = shallow(
      <SaveButton
        saving={ false }
        saveButtonProps={ { className: 'my-custom-button-class' } }
      />
    );

    expect(wrapper.find('.my-custom-button-class').exists()).toBeTruthy;
    expect(wrapper.find('.carbon-form-save__button')).toBeFalsy;
  });

  it('renders the default text', () => {
    let button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('children')).toEqual('Save');
  });

  it('renders custom text when provided', () => {
    wrapper = shallow(
      <SaveButton
        saveText='This is a save button'
      />
    );

    let button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('children')).toEqual('This is a save button');
  });

  describe('when there are no errors or warnings', () => {
    it('renders with the expected class', () => {
     expect(wrapper.find('.carbon-form-save').exists()).toBeTruthy();
     expect(wrapper.find('.carbon-form-save--invalid').exists()).toBeFalsy();
    });
  });

  describe('when there are errors or warnings', () => {
    beforeEach(() => {
      let errors = 2;
      let warnings = 1;
       wrapper = shallow(
         <SaveButton
           errors={ errors }
           warnings={ warnings }
           saving={ false }
         />
       );
     });

    it('renders with a default and invalid class', () => {
      expect(wrapper.hasClass('carbon-form-save')).toBeTruthy();
      expect(wrapper.hasClass('carbon-form-save--invalid')).toBeTruthy();
    });

    it('renders with form summary', () => {
      let summary = wrapper.find('.carbon-form-save__summary');
      expect(summary.prop('errors')).toEqual(2)
      expect(summary.prop('warnings')).toEqual(1)
    });
  });

  it('the button is enabled when the form is not saving', () => {
    expect(wrapper.props.disabled).toBeFalsy();
  });

  it('the button is disabled when the form is saving', () => {
    wrapper = shallow(
      <SaveButton
        saving={ true }
      />
    );

    let button = wrapper.find('.carbon-form-save__button');
    expect(button.prop('disabled')).toBeTruthy();
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<SaveButton data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'save', 'bar', 'baz');
      });
    });
  });
});
