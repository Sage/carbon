import React from 'react';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import { shallow } from 'enzyme';
import CancelButton from './cancel-button';
import Button from './../../button';

describe('CancelButton', () => {
 let wrapper, clickSpy;

 beforeEach(() => {
   wrapper = shallow(
     <CancelButton
       cancelText='This is a cancel button'
     />
   );
 });

  describe('the standard class', () => {
    it('renders it', () => {
      let button = wrapper.find('.carbon-form-cancel__button');
      expect(wrapper.hasClass('carbon-form-cancel')).toBeTruthy();
    });
  });

  describe('the save text', () => {
    describe('when custom saveText is passed in', () => {
      it('renders it', () => {
        let button = wrapper.find('.carbon-form-cancel__button');
        expect(button.prop('children')).toEqual('This is a cancel button');
      });
    });

    describe('when no custom text is passed in', () => {
       beforeEach(() => {
         wrapper = shallow(<CancelButton />);
       });

      it('renders the default', () => {
        let button = wrapper.find('.carbon-form-cancel__button');
        expect(button.prop('children')).toEqual('Cancel');
      });
    });
  });

  describe('the button classes', () => {
    describe('when a custom class is passed in', () => {
      beforeEach(() => {
        wrapper = shallow(
         <CancelButton
           cancelButtonProps={ { className: 'my-custom-button-class' } }
         />
       );
     });

      it('outputs it', () => {
        expect(wrapper.find('.my-custom-button-class').exists()).toBeTruthy;
        expect(wrapper.find('.carbon-form-cancel__button')).toBeFalsy;
      });
    });
  });

  describe('clicking cancel', () => {
    describe('when the onClick event has been provided', () => {
      beforeEach(() => {
        clickSpy = jasmine.createSpy('clickSpy')
        wrapper = shallow(
         <CancelButton
           cancelClick={ clickSpy }
         />
        );
      });

      it('is triggered on click', () => {
       let button = wrapper.find('.carbon-form-cancel__button')
       expect(button.prop('onClick')).toEqual(clickSpy)
      });
    });
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
