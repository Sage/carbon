import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import withUniqueName from './with-unique-name.hoc';
import withValidation from './with-validation.hoc';
import Form from '../../../../components/form';

const presErr = new Error('this value is required!');
const notZeroErr = new Error('this is zero!');
const asyncErr = new Error('not foo!');
const failErr = new Error("It's foo!");

const presence = value => new Promise((resolve, reject) => {
  if (value) {
    resolve(true);
  } else {
    reject(presErr);
  }
});

const isNotZero = value => new Promise((resolve, reject) => {
  if (value !== 0) {
    resolve(true);
  } else {
    reject(notZeroErr);
  }
});

const asyncValidation = value => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value === 'foo') {
      resolve();
    } else {
      reject(asyncErr);
    }
  }, 200);
});

const failValidation = val => new Promise((resolve, reject) => {
  if (val !== 'foo') resolve(true);
  reject(failErr);
});

const validations = [isNotZero, presence, asyncValidation];
const types = ['validations', 'warnings', 'info'];

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
      const InputComponent = withUniqueName(new Form());
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

    const InputComponent = withValidation(Component); // new Form()

    beforeEach(() => {
      wrapper = shallow(<InputComponent />);
    });

    it('has default prop values when nothing is passed in', () => {

    });

    it('renders an element with the expected values from state', () => {
      // const InputComponent = withValidation(Component); // new Form()
      // wrapper = shallow(<InputComponent />);
      expect(wrapper.state().value).toEqual('');
      // expect(wrapper.props().children)
    });

    // it('no action is taken when the component mounts with no context provided', () => { // maybe not needed

    // });

    // it('no action is taken when the component unmounts with no context provided', () => { // maybe not needed

    // });

    describe('renderValidationMarkup', () => {
      it('returns an Icon with info type when the state has info and no warning or validations', () => {
        wrapper.setState({ hasInfo: true });
        expect(wrapper.state().hasWarning).toEqual(false);
        expect(wrapper.state().hasError).toEqual(false);
        expect(wrapper.state().hasInfo).toEqual(true);
        const markUp = wrapper.instance().renderValidationMarkup();
        const size = markUp.length;
        expect(markUp[size - 1].type.displayName).toEqual('Icon');
        expect(markUp[size - 1].props.type).toEqual('info');
      });

      it('returns an Icon with info type when the state has warning and no validations', () => {
        wrapper.setState({ hasInfo: true });
        wrapper.setState({ hasWarning: true });
        expect(wrapper.state().hasError).toEqual(false);
        expect(wrapper.state().hasWarning).toEqual(true);
        expect(wrapper.state().hasInfo).toEqual(true);
        const markUp = wrapper.instance().renderValidationMarkup();
        const size = markUp.length;
        expect(markUp[size - 1].type.displayName).toEqual('Icon');
        expect(markUp[size - 1].props.type).toEqual('warning');
      });

      it('returns an Icon with info type when the state has validations', () => {
        wrapper.setState({ hasInfo: true });
        wrapper.setState({ hasWarning: true });
        wrapper.setState({ hasError: true });
        expect(wrapper.state().hasError).toEqual(true);
        expect(wrapper.state().hasWarning).toEqual(true);
        expect(wrapper.state().hasInfo).toEqual(true);
        const markUp = wrapper.instance().renderValidationMarkup();
        const size = markUp.length;
        expect(markUp[size - 1].type.displayName).toEqual('Icon');
        expect(markUp[size - 1].props.type).toEqual('error');
      });

      it('returns the children object if no type has been set', () => {
        wrapper.setProps({ children: <div /> });
        const markUp = wrapper.instance().renderValidationMarkup();
        expect(Array.isArray(markUp)).toEqual(false);
        expect(markUp.type).toEqual('div');
      });
    });

    describe('runValidation', () => {
      it('resolves true when the array for a given validation type is empty', () => {
        expect(wrapper.instance().runValidation('validations')).resolves.toEqual(true);
      });

      it('resolves true when the validations array is all valid', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({ value: 'foo' });
        const validate = await wrapper.instance().runValidation(types[0]); // write a helper
        expect(validate).toEqual(true);
      });

      it('resolves true when the warning array is all valid', async () => {
        wrapper.setProps({ warning: validations });
        wrapper.setState({ value: 'foo' });
        const validate = await wrapper.instance().runValidation(types[1]); // write a helper
        expect(wrapper.props().validations).toEqual([]);
        expect(validate).toEqual(true);
      });

      it('resolves true when the info array is all valid', async () => {
        wrapper.setProps({ info: validations });
        wrapper.setState({ value: 'foo' });
        const validate = await wrapper.instance().runValidation(types[2]); // write a helper
        expect(wrapper.props().validations).toEqual([]);
        expect(wrapper.props().warnings).toEqual([]);
        expect(validate).toEqual(true);
      });

      it('resolves false when the validations array is not all valid', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[0]); // write a helper
        expect(validate).toEqual(false);
      });

      it('resolves false when the warning array is not all valid', async () => {
        wrapper.setProps({ warnings: validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[1]); // write a helper
        expect(wrapper.props().validations).toEqual([]);
        expect(validate).toEqual(false);
      });

      it('resolves false when the info array is not all valid', async () => {
        wrapper.setProps({ info: validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[2]); // write a helper
        expect(wrapper.props().validations).toEqual([]);
        expect(wrapper.props().warnings).toEqual([]);
        expect(validate).toEqual(false);
      });
    });

    describe('validate', () => {
      it('calls the validation functions when the the component is blurred', () => {
        const spy = spyOn(wrapper.instance(), 'validate');
        wrapper.simulate('blur');
        expect(spy).toHaveBeenCalled();
      });

      it('returns true if the types param does not include validations, warnings or info', async () => {
        const spy = spyOn(wrapper.instance(), 'runValidation');
        const validate = await wrapper.instance().validate(['foo']);
        expect(spy).not.toHaveBeenCalled();
        expect(validate).toEqual(true);
      });

      // pass an array of all the validations and assert that it fails on the index
      it('does not validate the warnings or info arrays if there is an error', async () => {
        wrapper.setProps({
          validations: [failValidation],
          warnings: validations,
          info: validations
        });
        wrapper.setState({ value: 'foo' });
        await wrapper.instance().validate();
        expect(wrapper.state().hasError).toEqual(failErr);
        expect(wrapper.state().hasWarning).toEqual(false);
        expect(wrapper.state().hasInfo).toEqual(false);
      });

      it('only runs the warnings checks if all validations pass', async () => {
        wrapper.setProps({
          validations,
          warnings: [failValidation],
          info: validations
        });
        wrapper.setState({ value: 'foo' });
        await wrapper.instance().validate();
        expect(wrapper.state().hasError).toEqual(false);
        expect(wrapper.state().hasWarning).toEqual(failErr);
        expect(wrapper.state().hasInfo).toEqual(false);
      });

      it('only runs the info checks if all validations and warnings pass', async () => {
        wrapper.setProps({
          validations,
          warnings: validations,
          info: [failValidation]
        });
        wrapper.setState({ value: 'foo' });
        await wrapper.instance().validate();
        expect(wrapper.state().hasError).toEqual(false);
        expect(wrapper.state().hasWarning).toEqual(false);
        expect(wrapper.state().hasInfo).toEqual(failErr);
      });
    });

    it('combines the two HOCs', () => {

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
