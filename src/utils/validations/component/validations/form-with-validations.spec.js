import React from 'react';
import { shallow } from 'enzyme';
import { Object } from 'es6-shim';
import formWithValidation from './form-with-validations.hoc';

const error = Error('this value is required!');

const presence = value => new Promise((resolve, reject) => {
  if (value) return resolve(true);
  return reject(error);
});

const passValidation = () => new Promise((resolve) => {
  resolve(true);
});

const mockCountCall = (context, type, value) => {
  return context.adjustCount(type, value);
};

const mockRegisterChild = (context, name, validateFunction) => {
  context.addInput(name, validateFunction);
};
const mockUnregisterChild = (context, name) => context.removeInput(name);

const MockComponent = props => <div { ...props } />;

describe('formWithValidation', () => {
  let wrapper, context;

  const Child = MockComponent;
  const ValididationComp = formWithValidation(MockComponent);
  beforeEach(() => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          validations={ presence }
          warnings={ presence }
          info={ presence }
          value='foo'
        />
        <Child
          name='bar'
          validations={ presence }
          warnings={ presence }
          info={ presence }
          value=''
        />
      </ValididationComp>
    );
    context = wrapper.instance().getContext();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes context to allow inputs to register themselves', () => {
    wrapper.instance().props.children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.validations);
    });
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(2);
    wrapper.instance().props.children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).not.toEqual(undefined));
  });

  it('passes context to allow inputs to unregister themselves', () => {
    wrapper.instance().props.children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.validations);
    });
    wrapper.instance().props.children.forEach((child) => {
      return mockUnregisterChild(context, child.props.name);
    });
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(0);
    wrapper.instance().props.children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).toEqual(undefined));
  });

  it('adjusts the relevant count when failed error validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.validations);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'error', 1));
    });
    expect(wrapper.instance().state.errorCount).toEqual(1);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('adjusts the relevant count when failed warning validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.warnings);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'warning', 1));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(1);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('adjusts the relevant count when failed info validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'info', 1));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(1);
  });

  it('does not adjust the any count when failed wrong type passed', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'foo', 1));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('rejects when a child component fails its own validations', async () => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          validations={ passValidation }
        />
        <Child
          name='bar'
          validations={ presence }
        />
        <Child
          name='wiz'
          validations={ passValidation }
        />
      </ValididationComp>
    );

    context = wrapper.instance().getContext();
    const { children } = wrapper.instance().props;

    children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.validations);
    });
    expect(wrapper.instance().validate()).rejects.toEqual(error);
  });

  it('resolves when a child components passes its own validations', async () => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          validations={ passValidation }
        />
        <Child
          name='bar'
          validations={ passValidation }
        />
      </ValididationComp>
    );

    context = wrapper.instance().getContext();
    const { children } = wrapper.instance().props;

    children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.validations);
    });
    await expect(wrapper.instance().validate()).resolves.toEqual(true);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
