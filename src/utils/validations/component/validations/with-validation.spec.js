import React from 'react';
import { shallow } from 'enzyme';
import { withValidation } from '.';
import Icon from '../../../../components/icon';

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

const MockComponent = props => <div { ...props } />;

const InputComponent = withValidation(MockComponent);

const WithNoName = withValidation(() => <input />);

const types = ['error', 'warning', 'info'];

const shallowRenderWithContext = props => shallow(
  <InputComponent validationTypes={ types } { ...props } />, { context }
);

const validations = [isNotZero, presence, asyncValidation];

describe('Validations component', () => {
  let wrapper, wrapper2;

  beforeEach(() => {
    wrapper = shallow(<InputComponent validationTypes={ types } />, { context });
  });

  it('matches the snapshot with the input component wrapped in the HOC with default props', () => {
    wrapper2 = shallowRenderWithContext();
    expect(wrapper2).toMatchSnapshot();
  });

  it('matches the snapshot when the HOC is passed an anonymous component with no name or display name', () => {
    wrapper2 = shallow(<WithNoName />);
    expect(wrapper2).toMatchSnapshot();
  });

  it('calls the onBlur function to handle the blur event and start the validations of the component', () => {
    const spy = jasmine.createSpy('blurred');
    wrapper.instance().handleBlur();
    expect(spy).not.toHaveBeenCalled();
    wrapper.setProps({ onBlur: spy });
    wrapper.instance().handleBlur();
    expect(spy).toHaveBeenCalled();
  });

  describe('renderValidationMarkup', () => {
    it('returns an Icon with info type when the state has info and no warning or errors', () => {
      wrapper.setState({ hasInfo: true });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='info' />)).toEqual(true);
    });

    it('returns an Icon with warning type when the state has warning and no errors', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true });
      wrapper.instance().renderValidationMarkup();
      expect(wrapper.contains(<Icon type='warning' />)).toEqual(true);
    });

    it('returns an Icon with error type when the state has errors', () => {
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

  describe('runValidation', () => {
    it('resolves true when the array for a given validation type is empty', () => {
      types.forEach((type) => {
        expect(wrapper.instance().runValidation(type)).resolves.toEqual(true);
      });
    });

    it('resolves true when the errors array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ error: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the warning array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warning: presence, value: 'foo' });
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

    it('resolves false when the errors array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ error: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('error', presErr);
    });

    it('resolves false when the warning array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warning: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[1]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('warning', presErr);
    });

    it('resolves false when the info array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('info', presErr);
    });

    it('sets the error state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ error: presence, value: 'foo' });
      wrapper2.setState({
        hasError: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().runValidation(types[0]);
      expect(spy1).toHaveBeenCalledWith({
        hasError: false
      });
      expect(spy2).toHaveBeenCalledWith('error');
    });

    it('sets the warning state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ warning: presence, value: 'foo' });
      wrapper2.setState({
        hasWarning: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      await wrapper2.instance().runValidation(types[1]);
      expect(spy1).toHaveBeenCalledWith({
        hasWarning: false
      });
      expect(spy2).toHaveBeenCalledWith('warning');
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

    it('takes no action when an incorrect type with failing validations is passed to the function', async () => {
      wrapper.setProps({ fooType: failValidation, value: 'foo' });
      const spy = spyOn(wrapper.instance(), 'setState');
      const validate = await wrapper.instance().runValidation('fooType');
      expect(spy).not.toHaveBeenCalled();
      expect(validate).toEqual(false);
    });

    it('resolves false when there is no adjust count passed in the context', () => {
      wrapper = shallow(<InputComponent errors={ presence } value='foo' />);
      expect(wrapper.instance().runValidation('validations')).resolves.toEqual(false);
    });

    it('it removes errors when the inputs validation passes', async () => {
      wrapper2 = shallowRenderWithContext({ error: presence, value: 'foo' });
      wrapper2.setState({
        hasError: failErr
      });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(true);
      expect(spy).toHaveBeenCalledWith('error');
    });
  });

  describe('validate', () => {
    it('calls the validation functions when the the component is blurred', () => {
      const spy = spyOn(wrapper.instance(), 'validate');
      wrapper.simulate('blur');
      expect(spy).toHaveBeenCalled();
    });

    it('returns true if the types param does not include errors, warnings or info', async () => {
      const spy = spyOn(wrapper.instance(), 'runValidation');
      const validate = await wrapper.instance().validate(['foo']);
      expect(spy).not.toHaveBeenCalled();
      expect(validate).toEqual(true);
    });

    it('does not validate the warnings or info arrays if there is an error', async () => {
      wrapper.setProps({
        error: failValidation,
        warning: validations,
        info: validations,
        value: 'foo'
      });
      await wrapper.instance().validate();
      expect(wrapper.state().hasError).toEqual(failErr);
      expect(wrapper.state().hasWarning).toEqual(false);
      expect(wrapper.state().hasInfo).toEqual(false);
    });

    it('only runs the warnings checks if all errors validation passes', async () => {
      wrapper.setProps({
        error: validations,
        warning: [failValidation],
        info: validations,
        value: 'foo'
      });
      await wrapper.instance().validate();
      expect(wrapper.state().hasError).toEqual(false);
      expect(wrapper.state().hasWarning).toEqual(failErr);
      expect(wrapper.state().hasInfo).toEqual(false);
    });

    it('only runs the info checks if all errors and warnings validations pass', async () => {
      wrapper.setProps({
        error: validations,
        warning: validations,
        info: [failValidation],
        value: 'foo'
      });
      await wrapper.instance().validate();
      expect(wrapper.state().hasError).toEqual(false);
      expect(wrapper.state().hasWarning).toEqual(false);
      expect(wrapper.state().hasInfo).toEqual(failErr);
    });
  });

  describe('Component registers using the context', () => {
    it('registers itself on mount, when it has context and validations', () => {
      wrapper2 = shallowRenderWithContext({ error: presence });
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
      wrapper2 = shallowRenderWithContext({ error: presence });
      const spy = spyOn(wrapper2.instance().context, 'removeInput');
      wrapper2.unmount();
      expect(spy).toHaveBeenCalled();
    });

    it('does not unregister on unmount, when it has no validations', () => {
      wrapper2 = shallowRenderWithContext();
      const spy = spyOn(wrapper2.instance().context, 'removeInput');
      wrapper2.unmount();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
