import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
// import { Validations, validation } from '.';
import withUniqueName from './with-unique-name.hoc';
import withValidation from './with-validation.hoc';
// import Form from '../../../components/form';

describe('Validations component', () => {
  describe('withUniqueName HOC', () => {
    let wrapper;
    it('adds a name prop to a component passed as a paramater', () => {
      wrapper = shallow(React.createElement('div', [], []));
      expect(wrapper.props().name).toEqual(undefined);
      const InputComponent = withUniqueName(React.createElement('div', [], []));
      wrapper = shallow(<InputComponent />);
      expect(wrapper.props().name).not.toEqual(undefined);
    });

    it('allows the name prop to be overriden', () => {
      const InputComponent = withUniqueName(Component);
      wrapper = shallow(<InputComponent name='foo' />);
      expect(wrapper.props().name).toEqual('foo');
      wrapper = shallow(<InputComponent />);
      const { name } = wrapper.props();
      expect(wrapper.props().name).toEqual(name);
    });

    it('the generated name prop is persisted even after re-render', () => {
      const InputComponent = withUniqueName(Component);
      wrapper = shallow(<InputComponent />);
      const { name } = wrapper.props();
      for (let i = 0; i < 5; i++) {
        wrapper.update();
        expect(wrapper.props().name).toEqual(name);
      }
    });
  });

  describe('withValidation HOC', () => {
    let wrapper;

    it('has default prop values when nothing is passed in', () => {

    });

    fit('renders an element with the expected values from state', () => {
      const InputComponent = withValidation(Component);
      wrapper = shallow(<InputComponent />);
      expect(wrapper.state().value).toEqual('');
      console.log(wrapper.props());
      // expect(wrapper.props().children)
    });

    it('no action is taken when the component mounts with no context provided', () => { // maybe not needed

    });

    it('no action is taken when the component unmounts with no context provided', () => { // maybe not needed

    });

    describe('rendeValidationMarkup', () => {
      it('returns an Icon with info type when the state has info and no warning or validations', () => {

      });

      it('returns an Icon with info type when the state has warning and no validations', () => {

      });

      it('returns an Icon with info type when the state has validations', () => {

      });

      it('returns the children if no type has been set', () => {

      });
    });

    describe('runValidation', () => {
      it('resolves true when the array for a given validation type is empty', () => {

      });

      it('resolves true when the validations array is all valid', () => {

      });

      it('resolves true when the warning array is all valid', () => {

      });

      it('resolves true when the info array is all valid', () => {

      });

      it('resolves false when the validations array is not all valid', () => {

      });

      it('resolves false when the warning array is not all valid', () => {

      });

      it('resolves false when the info array is not all valid', () => {

      });
    });

    describe('validate', () => {
      it('calls the validation functions when the the component is blurred', () => {

      });

      it('only runs the validations checks when there is an error', () => {

      });

      it('only runs the warnings checks if all validations pass', () => {

      });

      it('only runs the info checks if all validations and warnings pass', () => {

      });
    });

    it('combins the two HOCs', () => {

    });
  });
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mount(
  //     <Validations
  //       validateForm={ console.log }
  //       validateField={ console.log }
  //     >
  //       <Form>
  //         <input />
  //       </Form>
  //     </Validations>
  //   );
  // });

  // it('error count is incremented when the update function is called with a positive integer', () => {
  //   expect(wrapper.instance().state.errorCount).toEqual(0);
  //   wrapper.instance().updateErrorCount(1);
  //   console.log(wrapper.debug());
  //   expect(wrapper.instance().state.errorCount).toEqual(0);
  // });

  // it('error count is decremented when the update function is called with a negative integer', () => {
  //   wrapper.instance().updateErrorCount(1);
  //   expect(wrapper.instance().state.errorCount).toEqual(1);
  //   wrapper.instance().updateErrorCount(-1);
  //   expect(wrapper.instance().state.errorCount).toEqual(0);
  // });

  // it('error count is not decremented below zero', () => {
  //   expect(wrapper.instance().state.errorCount).toEqual(0);
  //   wrapper.instance().updateErrorCount(-1);
  //   expect(wrapper.instance().state.errorCount).toEqual(0);
  // });
});
