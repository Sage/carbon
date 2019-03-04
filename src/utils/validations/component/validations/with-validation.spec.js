import React from 'react';
import { shallow } from 'enzyme';
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

const checkState = (ids, state, res) => {
  Object.keys(state).forEach((key) => {
    if (ids.includes(key)) {
      ids.forEach(id => expect(state[id]).toEqual(res));
    } else {
      expect(state[key]).toEqual(!res);
    }
  });
};

const context = { addInput: () => 'foo', removeInput: () => 'foo', adjustCount: () => 'foo' };

const MockComponent = props => <div { ...props } />;

const InputComponent = withValidation(MockComponent);

const WithNoName = withValidation(() => <div />);

const shallowRenderWithContext = props => shallow(<InputComponent { ...props } />, { context });

const validations = [isNotZero, presence, asyncValidation];
const types = ['validations', 'warnings', 'info'];
const stateId = ['hasError', 'hasWarning', 'hasInfo'];

describe('Validations component', () => {
  let wrapper, wrapper2;

  beforeEach(() => {
    wrapper = shallow(<InputComponent />);
  });

  it('matches the snapshot when the component renders with default props', () => {
    wrapper2 = shallowRenderWithContext();
    expect(wrapper2).toMatchSnapshot();
  });

  it('matches the snapshot when the hoc is passed an anonymous function with no name or display name', () => {
    wrapper2 = shallow(<WithNoName />);
    expect(wrapper2).toMatchSnapshot();
  });

  describe('renderValidationMarkup', () => {
    it('returns an Icon with info type when the state has info and no warning or validations', () => {
      wrapper.setState({ hasInfo: true });
      checkState([stateId[2]], wrapper.state(), true);
      const markUp = wrapper.instance().renderValidationMarkup();
      const size = markUp.length;
      expect(markUp[size - 1].type.displayName).toEqual('Icon');
      expect(markUp[size - 1].props.type).toEqual('info');
      expect(wrapper).toMatchSnapshot();
    });

    it('returns an Icon with warning type when the state has warning and no validations', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true });
      checkState([stateId[2], stateId[1]], wrapper.state(), true);
      const markUp = wrapper.instance().renderValidationMarkup();
      const size = markUp.length;
      expect(markUp[size - 1].type.displayName).toEqual('Icon');
      expect(markUp[size - 1].props.type).toEqual('warning');
      expect(wrapper).toMatchSnapshot();
    });

    it('returns an Icon with error type when the state has validations', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true, hasError: true });
      checkState(stateId, wrapper.state(), true);
      const markUp = wrapper.instance().renderValidationMarkup();
      const size = markUp.length;
      expect(markUp[size - 1].type.displayName).toEqual('Icon');
      expect(markUp[size - 1].props.type).toEqual('error');
      expect(wrapper).toMatchSnapshot();
    });

    it('returns the children if no type has been set', () => {
      wrapper.setProps({ children: <div /> });
      const markUp = wrapper.instance().renderValidationMarkup();
      expect(Array.isArray(markUp)).toEqual(false);
      expect(markUp.type).toEqual('div');
      expect(wrapper).toMatchSnapshot();
    });

    it('returns the Icon when the component has an array of children', () => {
      wrapper.setState({ hasInfo: true, hasWarning: true, hasError: true });
      wrapper.setProps({ children: [<div />, 'foo', <div />] });
      const markUp = wrapper.instance().renderValidationMarkup();
      const size = markUp.length;
      expect(markUp[size - 1].type.displayName).toEqual('Icon');
      expect(markUp[size - 1].props.type).toEqual('error');
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('runValidation', () => {
    it('resolves true when the array for a given validation type is empty', () => {
      types.forEach((type) => {
        expect(wrapper.instance().runValidation(type)).resolves.toEqual(true);
      });
    });

    it('resolves true when the validations array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper.instance().runValidation(types[0]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the warning array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper.instance().runValidation(types[1]);
      expect(wrapper.props().validations).toEqual([]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves true when the info array is all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(wrapper2.props().validations).toEqual([]);
      expect(wrapper2.props().warnings).toEqual([]);
      expect(validate).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('resolves false when the validations array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[0]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('error', 1);
    });

    it('resolves false when the warning array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[1]);
      expect(wrapper2.props().validations).toEqual([]);
      expect(validate).toEqual(false);
      expect(wrapper2.props().info).toEqual([]);
      expect(spy).toHaveBeenCalledWith('warning', 1);
    });

    it('resolves false when the info array is not all valid', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: '' });
      const spy = spyOn(wrapper2.instance().context, 'adjustCount');
      const validate = await wrapper2.instance().runValidation(types[2]);
      expect(wrapper2.props().validations).toEqual([]);
      expect(wrapper2.props().warnings).toEqual([]);
      expect(validate).toEqual(false);
      expect(spy).toHaveBeenCalledWith('info', 1);
    });

    it('sets the error state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ validations: presence, value: 'foo' });
      wrapper2.setState({
        hasError: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      expect(wrapper2.instance().state.hasError).not.toEqual(false);
      await wrapper2.instance().runValidation(types[0]);
      expect(spy1).toHaveBeenCalledWith({
        hasError: false
      });
      expect(spy2).toHaveBeenCalledWith('error', -1);
    });

    it('sets the warning state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ warnings: presence, value: 'foo' });
      wrapper2.setState({
        hasWarning: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      expect(wrapper2.instance().state.hasWarning).not.toEqual(false);
      await wrapper2.instance().runValidation(types[1]);
      expect(spy1).toHaveBeenCalledWith({
        hasWarning: false
      });
      expect(spy2).toHaveBeenCalledWith('warning', -1);
    });

    it('sets the info state to false when validation passes after previously failing', async () => {
      wrapper2 = shallowRenderWithContext({ info: presence, value: 'foo' });
      wrapper2.setState({
        hasInfo: failErr
      });
      const spy1 = spyOn(wrapper2.instance(), 'setState');
      const spy2 = spyOn(wrapper2.instance().context, 'adjustCount');
      expect(wrapper2.instance().state.hasInfo).not.toEqual(false);
      await wrapper2.instance().runValidation(types[2]);
      expect(spy1).toHaveBeenCalledWith({
        hasInfo: false
      });
      expect(spy2).toHaveBeenCalledWith('info', -1);
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

    it('does not validate the warnings or info arrays if there is an error', async () => {
      wrapper.setProps({
        validations: failValidation,
        warnings: validations,
        info: validations,
        value: 'foo'
      });
      await wrapper.instance().validate();
      expect(wrapper.state().hasError).toEqual(failErr);
      expect(wrapper.state().hasWarning).toEqual(false);
      expect(wrapper.state().hasInfo).toEqual(false);
    });

    it('only runs the warnings checks if all validations pass', async () => {
      wrapper.setProps({
        validations,
        warnings: [failValidation],
        info: validations,
        value: 'foo'
      });
      await wrapper.instance().validate();
      expect(wrapper.state().hasError).toEqual(false);
      expect(wrapper.state().hasWarning).toEqual(failErr);
      expect(wrapper.state().hasInfo).toEqual(false);
    });

    it('only runs the info checks if all validations and warnings pass', async () => {
      wrapper.setProps({
        validations,
        warnings: validations,
        info: [failValidation],
        value: 'foo'
      });
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

  describe('Component registers using the context', () => {
    it('registers on mount, when it has context and validations', () => {
      wrapper2 = shallowRenderWithContext({ validations: presence });
      const spy = spyOn(wrapper2.instance().context, 'addInput');
      wrapper2.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('does not register on mount, when it has no validations', () => {
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

    it('does not unregister on unmount, when it has no validations', () => {
      wrapper2 = shallowRenderWithContext();
      const spy = spyOn(wrapper2.instance().context, 'removeInput');
      wrapper2.unmount();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
