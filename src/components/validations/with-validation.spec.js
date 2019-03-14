import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { withValidation } from '.';
import guid from '../../utils/helpers/guid';
import Icon from '../icon';

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

const types = ['validations', 'warnings', 'info'];

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

  describe('when the component renders the validation icon', () => {
    it('returns an Icon with info type when the state has info and no warning or validations', () => {
      wrapper.setState({ hasInfo: true });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='info' />)).toEqual(true);
    });

    it('returns an Icon with warning type when the state has warning and no validations', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='warning' />)).toEqual(true);
    });

    it('returns an Icon with error type when the state has failed validations', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true, hasError: true });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='error' />)).toEqual(true);
    });

    it('returns the children if no type has been set', () => {
      wrapper.setProps({ children: <div /> });
      const markup = wrapper.instance().renderValidationMarkup();
      expect(markup).toEqual(undefined);
      expect(wrapper.contains(<Icon />)).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('returns the Icon when the component has an array of children', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true, hasError: true });
      wrapper.setProps({ children: [<div />, 'foo', <div />] });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='error' />)).toEqual(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when it validates a subset of validations', () => {
    it('returns null when the array for a given validation type is empty', () => {
      types.forEach((type) => {
        expect(wrapper.instance().runValidation(type)).toEqual(null);
      });
    });

    it('returns null when the a given validation type is undefined', () => {
      wrapper.setProps({
        foo: undefined
      });
      expect(wrapper.instance().runValidation('foo')).toEqual(null);
    });

    it('resolves true when the validations array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the warnings array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[1]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the info array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves false when the validations array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('validations', true);
    });

    it('resolves false when the warnings array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[1]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('warnings', true);
    });

    it('resolves true when a validation fails but the validation is blocked', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      wrapper2.instance().blockValidation = true;
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves false when the info array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('info', true);
    });

    it('sets the error state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      wrapper2.setState({
        hasError: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().runValidation(types[0]);
      expect(spy1).toHaveBeenCalledWith({
        hasError: false
      });
      expect(spy2).toHaveBeenCalledWith('validations');
    });

    it('sets the warnings state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      wrapper2.setState({
        hasWarning: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().runValidation(types[1]);
      expect(spy1).toHaveBeenCalledWith({
        hasWarning: false
      });
      expect(spy2).toHaveBeenCalledWith('warnings');
    });

    it('sets the info state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      wrapper2.setState({
        hasInfo: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().runValidation(types[2]);
      expect(spy1).toHaveBeenCalledWith({
        hasInfo: false
      });
      expect(spy2).toHaveBeenCalledWith('info');
    });

    it('takes no action when an incorrect type with passing validations is passed to the function', async () => {
      wrapper.setProps({ fooType: validations, value: 'foo' });
      const spy = spyOn(wrapper.instance(), 'setState');
      const validate = await wrapper.instance().runValidation('fooType');
      expect(spy).not.toHaveBeenCalled();
      expect(validate).toEqual(true);
    });

    it('removes errors when the inputs validation passes', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      wrapper2.setState({
        hasError: failErr
      });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(true);
      expect(spy).toHaveBeenCalledWith('validations');
    });
  });

  describe('when the validate function is called', () => {
    let allValidationsFail, allValidationsPass, mixValidations;
    const failWrapper = shallow(<InputComponent name='foo' />, { context });
    const passWrapper = shallow(<InputComponent name='foo' />, { context });
    const mixWrapper = shallow(<InputComponent name='foo' />, { context });

    beforeEach(() => {
      failWrapper.setProps({
        validations: [failValidation],
        warnings: [failValidation],
        info: failValidation,
        value: 'foo'
      });
      allValidationsFail = failWrapper.instance().validate();

      passWrapper.setProps({
        validations: [presence],
        warnings: [presence],
        info: presence,
        value: 'foo'
      });
      allValidationsPass = passWrapper.instance().validate();

      mixWrapper.setProps({
        validations: [presence],
        warnings: [failValidation],
        info: presence,
        value: 'foo'
      });
      mixValidations = mixWrapper.instance().validate();
    });

    it('is called when the onBlur callback is triggered', () => {
      const spy = spyOn(wrapper.instance(), 'validate');
      wrapper.simulate('blur');
      expect(spy).toHaveBeenCalled();
    });

    it('resolves promises to true when all validation props are valid', async () => {
      allValidationsPass.forEach(validation => expect(validation).resolves.toEqual(true));
      expect(passWrapper.state().hasError).toEqual(false);
      expect(passWrapper.state().hasWarning).toEqual(false);
      expect(passWrapper.state().hasInfo).toEqual(false);
    });

    it('resolves true a validation prop is valid and false when it fails validation', async () => {
      expect(mixValidations[0]).resolves.toEqual(true);
      expect(mixValidations[1]).resolves.toEqual(false);
      expect(mixValidations[2]).resolves.toEqual(true);
      expect(mixWrapper.state().hasError).toEqual(false);
      expect(mixWrapper.state().hasWarning).toEqual(failErr);
      expect(mixWrapper.state().hasInfo).toEqual(false);
    });

    it('sets the state for each of the failed validations subsets when they fail', async () => {
      allValidationsFail.forEach(validation => expect(validation).resolves.toEqual(false));
      expect(failWrapper.state().hasError).toEqual(failErr);
      expect(failWrapper.state().hasWarning).toEqual(failErr);
      expect(failWrapper.state().hasInfo).toEqual(failErr);
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
      wrapper.setState({ hasInfo: presErr, hasWarning: presErr, hasError: presErr });
      wrapper.setProps({ onChange: ev => ev.target.value });
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.hasInfo).toEqual(false);
      expect(wrapper.instance().state.hasWarning).toEqual(false);
      expect(wrapper.instance().state.hasError).toEqual(false);
    });

    it('does nothing when the validation status is already false', () => {
      wrapper.setState({ hasInfo: false, hasWarning: false, hasError: false });
      wrapper.setProps({ onChange: ev => ev.target.value });
      const spy = spyOn(wrapper.instance(), 'updateValidationStatus');
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.hasInfo).toEqual(false);
      expect(wrapper.instance().state.hasWarning).toEqual(false);
      expect(wrapper.instance().state.hasError).toEqual(false);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
