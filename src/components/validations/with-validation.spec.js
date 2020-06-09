import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { withValidation } from '.';
import guid from '../../utils/helpers/guid';
import VALIDATION_TYPES from './validation-types.config';

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
  if (value !== 1) {
    resolve(true);
  } else {
    reject(notZeroErr);
  }
});

const asyncValidation = value => new Promise((resolve, reject) => {
  const bound = Math.floor(Math.random() * 251);
  setTimeout(() => {
    if (value === 'foo') {
      resolve();
    } else {
      reject(asyncErr);
    }
  }, bound);
});

const failValidation = val => new Promise((resolve, reject) => {
  if (val !== 'foo') resolve(true);
  reject(failErr);
});

const context = { addInput: () => 'foo', removeInput: () => 'foo', adjustCount: () => 'foo' };

const MockComponent = props => <input { ...props } />;

const InputComponent = withValidation(MockComponent);

InputComponent.contextTypes = {
  addInput: PropTypes.func,
  removeInput: PropTypes.func,
  adjustCount: PropTypes.func
};

const WithNoDisplayName = withValidation(() => <input />);

const types = Object.keys(VALIDATION_TYPES);

const shallowRenderWithContext = props => shallow(
  <InputComponent name={ guid() } { ...props } />, { context }
);

const validations = [isNotZero, presence, asyncValidation];

describe('when the withValidations HOC wraps a component', () => {
  let wrapper, wrapper2;

  beforeEach(() => {
    wrapper = shallow(<InputComponent name='foo' />, { context });
  });

  it('matches the snapshot with the input component wrapped in the HOC with default props', () => {
    wrapper2 = shallowRenderWithContext({ name: 'foo ' });
    expect(wrapper2).toMatchSnapshot();
  });

  it('matches the snapshot when the HOC is passed an anonymous component with no name or display name', () => {
    wrapper2 = shallow(<WithNoDisplayName name='foo' />);
    expect(wrapper2).toMatchSnapshot();
  });

  it('calls the onBlur function to handle the blur event and start the validations of the component', () => {
    const spy = jasmine.createSpy('blurred');
    wrapper.instance().handleBlur();
    wrapper.setProps({ onBlur: spy });
    wrapper.instance().handleBlur();
    expect(spy).toHaveBeenCalled();
  });

  describe('when it validates a subset of validations', () => {
    it.each(types)('returns true when the %s array is empty', async (type) => {
      expect(await wrapper.instance().validate(type)).toEqual(true);
    });

    it('returns null when the given validation type is undefined', async() => {
      wrapper.setProps({
        foo: undefined
      });
      expect(await wrapper.instance().validate('foo')).toEqual(true);
    });

    it('resolves true when the validations array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[0]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the warnings array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[1]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the info array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[2]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves false when the validations array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[0]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('error', true);
    });

    it('resolves false when the warnings array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[1]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('warning', true);
    });

    it('resolves true when a validation fails but the validation is blocked', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      wrapper2.instance().blockValidation = true;
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[2]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves false when the info array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[2]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('info', true);
    });

    it('sets the error state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      wrapper2.setState({
        errorMessage: failErr.message
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().validate(types[0]);
      expect(spy1).toHaveBeenCalledWith({
        errorMessage: undefined
      });
      expect(spy2).toHaveBeenCalledWith('error');
    });

    it('sets the warnings state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      wrapper2.setState({
        warningMessage: failErr.message
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().validate(types[1]);
      expect(spy1).toHaveBeenCalledWith({
        warningMessage: undefined
      });
      expect(spy2).toHaveBeenCalledWith('warning');
    });

    it('sets the info state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      wrapper2.setState({
        infoMessage: failErr.message
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().validate(types[2]);
      expect(spy1).toHaveBeenCalledWith({
        infoMessage: undefined
      });
      expect(spy2).toHaveBeenCalledWith('info');
    });

    it('takes no action when an incorrect type with passing validations is passed to the function', async () => {
      wrapper.setProps({ fooType: validations, value: 'foo' });
      const spy = spyOn(wrapper.instance(), 'setState');
      const validate = await wrapper.instance().validate('fooType');
      expect(spy).not.toHaveBeenCalled();
      expect(validate).toEqual(true);
    });

    it('removes errors when the inputs validation passes', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      wrapper2.setState({
        errorMessage: failErr.message
      });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().validate(types[0]);
      expect(validate).toEqual(true);
      expect(spy).toHaveBeenCalledWith('error');
    });

    it('validates properly without context passed', async () => {
      const NoContextComponent = withValidation(MockComponent);
      const noContextWrapper = shallow(<NoContextComponent name='foo' validations={ presence } />, { context: null });
      const validateEmpty = await noContextWrapper.instance().validate('error');
      expect(validateEmpty).toEqual(false);
      noContextWrapper.setProps({ value: 'bar' });
      const validateFilled = await noContextWrapper.instance().validate(types[0]);
      expect(validateFilled).toEqual(true);
    });
  });

  describe('when the validate function is called', () => {
    let allValidationsFail, allValidationsPass, mixValidations;
    const failWrapper = shallow(<InputComponent name='foo' />, { context });
    const passWrapper = shallow(<InputComponent name='foo' />, { context });
    const mixWrapper = shallow(<InputComponent name='foo' />, { context });

    beforeEach(async () => {
      failWrapper.setProps({
        validations: [failValidation],
        warnings: [failValidation],
        info: failValidation,
        value: 'foo'
      });
      allValidationsFail = await failWrapper.instance().validate();

      passWrapper.setProps({
        validations: [presence],
        warnings: [presence],
        info: presence,
        value: 'foo'
      });
      allValidationsPass = await passWrapper.instance().validate();

      mixWrapper.setProps({
        validations: [presence],
        warnings: [failValidation],
        info: presence,
        value: 'foo'
      });
      mixValidations = await mixWrapper.instance().validate();
    });

    it('is called when the onBlur callback is triggered', () => {
      const spy = spyOn(wrapper.instance(), 'validate');
      wrapper.simulate('blur');
      expect(spy).toHaveBeenCalled();
    });

    it('resolves promises to true when all validation props are valid', async () => {
      expect(allValidationsPass).toEqual(true);
      expect(passWrapper.state().errorMessage).toEqual(undefined);
      expect(passWrapper.state().warningMessage).toEqual(undefined);
      expect(passWrapper.state().infoMessage).toEqual(undefined);
    });

    it('resolves true a validation prop is valid and false when it fails validation', async () => {
      expect(mixValidations).toEqual(false);
      expect(mixWrapper.state().errorMessage).toEqual(undefined);
      expect(mixWrapper.state().warningMessage).toEqual(failErr.message);
      expect(mixWrapper.state().infoMessage).toEqual(undefined);
    });

    it('sets the state for each of the failed validations subsets when they fail', async () => {
      expect(allValidationsFail).toEqual(false);
      expect(failWrapper.state().errorMessage).toEqual(failErr.message);
      expect(failWrapper.state().warningMessage).toEqual(failErr.message);
      expect(failWrapper.state().infoMessage).toEqual(failErr.message);
    });
  });

  describe('when the component mounts and unmounts', () => {
    it('registers itself on mount, when it has context and validations', () => {
      wrapper2 = shallowRenderWithContext({ validations: presence });
      const spy = spyOn(wrapper2.instance().context, 'addInput');
      wrapper2.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('does not register itself on mount, when it has no validations', () => {
      wrapper2 = shallowRenderWithContext();
      const spy = spyOn(wrapper2.instance().context, 'addInput');
      wrapper2.instance().componentDidMount();
      expect(spy).not.toHaveBeenCalled();
    });

    it('unregisters on unmount, when it has context and validations', () => {
      wrapper2 = shallowRenderWithContext({ validations: presence });
      const spy = spyOn(wrapper2.instance().context, 'removeInput');
      wrapper2.unmount();
      expect(spy).toHaveBeenCalled();
    });

    it('cannot perform the registration steps, when it has no context', () => {
      const NoContextComponent = withValidation(MockComponent);
      const noContextWrapper = shallow(<NoContextComponent name='foo' validations={ presence } />);
      expect(noContextWrapper.instance().checkValidations(['foo'])).toEqual(false);
    });

    it('cannot perform the unregistration steps, when it has no context', () => {
      const NoContextComponent = withValidation(MockComponent);
      const noContextWrapper = shallow(<NoContextComponent name='foo' validations={ presence } />);
      expect(() => noContextWrapper.unmount()).not.toThrowError();
    });
  });

  describe('when the component value changes', () => {
    const mockEvent = { target: { value: 'foo' } };
    it('resets the validation status when it is not already false', () => {
      wrapper.setState({
        infoMessage: presErr.message,
        warningMessage: presErr.message,
        errorMessage: presErr.message
      });
      wrapper.setProps({ onChange: ev => ev.target.value });
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.infoMessage).toEqual(undefined);
      expect(wrapper.instance().state.warningMessage).toEqual(undefined);
      expect(wrapper.instance().state.errorMessage).toEqual(undefined);
    });
  });

  describe('form state', () => {
    it('passes state value to form when no value prop is passed', async () => {
      const mockFunction = jest.fn();
      wrapper = shallow(<InputComponent addInputToFormState={ mockFunction } name='foo' />, { context });

      wrapper.setProps({
        validations: [failValidation],
        warnings: [failValidation],
        info: failValidation
      });
      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe('Using passed context during update of validation status', () => {
    it('does not call adjust count when no context is provided but there is state', async () => {
      wrapper = shallow(<InputComponent name='foo' />, {});
      wrapper.setState({ errorMessage: true, infoMessage: true, warningMessage: true });

      wrapper.setProps({
        validations: [presence],
        warnings: [presence],
        info: presence,
        value: 'foo'
      });
      const validate = await wrapper.instance().validate(types[0]);
      expect(validate).toEqual(true);
    });

    it('does not call adjust count when no context is provided and there is no state', async () => {
      wrapper = shallow(
        <InputComponent
          info={ presence } value=''
          name='foo'
        />,
        {}
      );
      const validate = await wrapper.instance().validate(types[2]);
      expect(validate).toEqual(false);
    });
  });

  it('does not invoke components onChange if it is not passed as a prop', () => {
    wrapper = shallow(<InputComponent name='foo' />, {});
    wrapper.simulate('change', { target: { value: 'newText' } });
  });
});
