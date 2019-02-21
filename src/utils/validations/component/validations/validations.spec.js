import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
// import { Validations, validation } from '.';
import withUniqueName from './with-unique-name.hoc';
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
      const InputComponent = withUniqueName(Comment);
      wrapper = shallow(<InputComponent name='foo' />);
      expect(wrapper.props().name).toEqual('foo');
      wrapper = shallow(<InputComponent />);
      expect(wrapper.props().name).not.toEqual('foo');
    });

    it('the generated name prop is persisted even after re-render', () => {
      const InputComponent = withUniqueName(Comment);
      wrapper = shallow(<InputComponent />);
      const { name } = wrapper.props();
      for (let i = 0; i < 5; i++) {
        wrapper.update();
        expect(wrapper.props().name).toEqual(name);
      }
    });

    describe('withValidation HOC', () => {

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
