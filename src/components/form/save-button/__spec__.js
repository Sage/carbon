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
       saveText='This is a save button'
       saving={ false }
     />
   );
 });

  describe('the save text', () => {
    describe('when custom saveText is passed in', () => {
      it('renders it', () => {
        let button = wrapper.find('.carbon-form-save__button');
        expect(button.prop('children')).toEqual('This is a save button');
        expect(button.prop('disabled')).toBeFalsy();
      });
    });

    describe('when no custom text is passed in', () => {
       beforeEach(() => {
         wrapper = shallow(<SaveButton saving={ false } />);
       });

      it('renders the default', () => {
        let button = wrapper.find('.carbon-form-save__button');
        expect(button.prop('children')).toEqual('Save');
        expect(button.prop('disabled')).toBeFalsy();
      });
    });
  });

  describe('the button classes', () => {
    describe('when a custom class is passed in', () => {
      beforeEach(() => {
        wrapper = shallow(
         <SaveButton
           saveText='This a save button'
           saving={ false }
           saveButtonProps={ { className: 'my-custom-button-class' } }
         />
       );
     });

      it('outputs it', () => {
        expect(wrapper.find('.my-custom-button-class').exists()).toBeTruthy;
        expect(wrapper.find('.carbon-form-save__button')).toBeFalsy;
      });
    });
  });

  describe('when there are no errors or warnings', () => {
    it('renders with a main class', () => {
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
           saveText='This a save'
           errors={ errors }
           warnings={ warnings }
           saving={ false }
         />
       );
     });

    it('renders with a main class and invalid class', () => {
      expect(wrapper.hasClass('carbon-form-save')).toBeTruthy();
      expect(wrapper.hasClass('carbon-form-save--invalid')).toBeTruthy();
    });

    it('renders with form summary', () => {
      let summary = wrapper.find('.carbon-form-save__summary');
      expect(summary.prop('errors')).toEqual(2)
      expect(summary.prop('warnings')).toEqual(1)
    });
  });

  describe('the saving behaviour', () => {
    describe('when the form is not saving', () => {
      it('the button is enabled', () => {
        expect(wrapper.props.disabled).toBeFalsy();
      });
    });

    describe('when the form is saving', () => {
      beforeEach(() => {
       wrapper = shallow(
         <SaveButton
           saveText='This a save'
           saving={ true }
         />
       );
     });

      it('the button is disabled', () => {
        let button = wrapper.find('.carbon-form-save__button');
        expect(button.prop('disabled')).toBeTruthy();
      });
    });
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
