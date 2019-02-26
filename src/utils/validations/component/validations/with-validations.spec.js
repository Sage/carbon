import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
// import withUniqueName from './with-unique-name.hoc';
import withValidation from './with-validation.hoc';

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
  describe('withValidation HOC', () => {
    let wrapper;

    const InputComponent = withValidation(Component);

    beforeEach(() => {
      wrapper = shallow(<InputComponent />);
    });

    it('matchessnapshpt test', () => {
      const Inputs = [0, 1, 2].map(() => withValidation(Component));
      const wrapper2 = shallow(
        <div>
          { Inputs }
        </div>
      );
      expect(wrapper2).toMatchSnapshot();
    });

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
        const validate = await wrapper.instance().runValidation(types[0]);
        expect(validate).toEqual(true);
      });

      it('resolves true when the warning array is all valid', async () => {
        wrapper.setProps({ warning: validations });
        wrapper.setState({ value: 'foo' });
        const validate = await wrapper.instance().runValidation(types[1]);
        expect(wrapper.props().validations).toEqual([]);
        expect(validate).toEqual(true);
      });

      it('resolves true when the info array is all valid', async () => {
        wrapper.setProps({ info: validations });
        wrapper.setState({ value: 'foo' });
        const validate = await wrapper.instance().runValidation(types[2]);
        expect(wrapper.props().validations).toEqual([]);
        expect(wrapper.props().warnings).toEqual([]);
        expect(validate).toEqual(true);
      });

      it('resolves false when the validations array is not all valid', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[0]);
        expect(validate).toEqual(false);
      });

      it('resolves false when the warning array is not all valid', async () => {
        wrapper.setProps({ warnings: validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[1]);
        expect(wrapper.props().validations).toEqual([]);
        expect(validate).toEqual(false);
        expect(wrapper.props().info).toEqual([]);
      });

      it('resolves false when the info array is not all valid', async () => {
        wrapper.setProps({ info: validations });
        wrapper.setState({ value: 'bar' });
        const validate = await wrapper.instance().runValidation(types[2]);
        expect(wrapper.props().validations).toEqual([]);
        expect(wrapper.props().warnings).toEqual([]);
        expect(validate).toEqual(false);
      });

      it('sets the error state to false when validation passes after previously failing', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({
          value: 'foo',
          hasError: failErr
        });
        const spy = spyOn(wrapper.instance(), 'setState');
        expect(wrapper.instance().state.hasError).not.toEqual(false);
        await wrapper.instance().runValidation(types[0]);
        expect(spy).toHaveBeenCalledWith({
          hasError: false
        });
      });

      it('sets the warning state to false when validation passes after previously failing', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({
          value: 'foo',
          hasWarning: failErr
        });
        const spy = spyOn(wrapper.instance(), 'setState');
        expect(wrapper.instance().state.hasWarning).not.toEqual(false);
        await wrapper.instance().runValidation(types[1]);
        expect(spy).toHaveBeenCalledWith({
          hasWarning: false
        });
      });

      it('sets the error state to false when validation passes after previously failing', async () => {
        wrapper.setProps({ validations });
        wrapper.setState({
          value: 'foo',
          hasInfo: failErr
        });
        const spy = spyOn(wrapper.instance(), 'setState');
        expect(wrapper.instance().state.hasInfo).not.toEqual(false);
        await wrapper.instance().runValidation(types[2]);
        expect(spy).toHaveBeenCalledWith({
          hasInfo: false
        });
      });

      it('takes no action when an incorrect type with passing validations is passed to the function', async () => {
        wrapper.setProps({ fooType: validations });
        wrapper.setState({
          value: 'foo'
        });
        const spy = spyOn(wrapper.instance(), 'setState');
        const validate = await wrapper.instance().runValidation('fooType');
        expect(spy).not.toHaveBeenCalled();
        expect(validate).toEqual(true);
      });

      it('takes no action when an incorrect type with failing validations is passed to the function', async () => {
        wrapper.setProps({ fooType: failValidation });
        wrapper.setState({
          value: 'foo'
        });
        const spy = spyOn(wrapper.instance(), 'setState');
        const validate = await wrapper.instance().runValidation('fooType');
        expect(spy).not.toHaveBeenCalled();
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
          validations: failValidation,
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

    it('handles the expected action if the on blur prop is passed down', () => {
      const spy = jasmine.createSpy('blurred');
      wrapper.instance().handleBlur();
      expect(spy).not.toHaveBeenCalled();
      wrapper.setProps({ onBlur: spy });
      wrapper.instance().handleBlur();
      expect(spy).toHaveBeenCalled();
    });

    it('handles the change event when the input value is updated', () => {
      const event = {
        preventDefault() {},
        target: { value: 'bar' }
      };
      const spy = spyOn(wrapper.instance(), 'setState');
      wrapper.simulate('change', event);
      expect(spy).toHaveBeenCalledWith({
        value: event.target.value
      });
    });
  });
});
