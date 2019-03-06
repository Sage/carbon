import React from 'react';
import { shallow } from 'enzyme';
import { withValidations } from '.';

const error = Error('this value is required!');

const presence = value => new Promise((resolve, reject) => {
  if (value) return resolve(true);
  return reject(error);
});

const passValidation = () => new Promise((resolve) => {
  resolve(true);
});

const mockCountCall = (context, type, validationResult) => {
  return context.adjustCount(type, validationResult);
};

const mockRegisterChild = (context, name, validateFunction) => {
  context.addInput(name, validateFunction);
};

const mockUnregisterChild = (context, name) => context.removeInput(name);

const MockComponent = props => <div { ...props } />;

describe('formWithValidation', () => {
  let wrapper, context;

  const Child = MockComponent;
  const ValididationComp = withValidations(MockComponent);
  beforeEach(() => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          errors={ presence }
          warnings={ presence }
          info={ presence }
          value='foo'
        />
        <Child
          name='bar'
          errors={ presence }
          warnings={ presence }
          info={ presence }
          value=''
        />
      </ValididationComp>
    );
    context = wrapper.instance().getContext();
  });

  it('matches the snapshot, rendering with default props when the HOC is passed a component with children', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes context to allow inputs to register themselves', () => {
    wrapper.instance().props.children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.errors);
    });
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(2);
    wrapper.instance().props.children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).not.toEqual(undefined));
  });

  it('passes context to allow inputs to unregister themselves', () => {
    wrapper.instance().props.children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.errors);
    });
    wrapper.instance().props.children.forEach((child) => {
      return mockUnregisterChild(context, child.props.name);
    });
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(0);
    wrapper.instance().props.children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).toEqual(undefined));
  });

  it('adjusts the error count when failed error validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.errors);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'error', error));
    });
    expect(wrapper.instance().state.errorCount).toEqual(1);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('adjusts the warning count when failed warning validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.warnings);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'warning', error));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(1);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('adjusts the info count when failed info validation is detected', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'info', error));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(1);
  });

  it('does not adjust any of the counts when an invalid validation type is passed to the component', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => mockCountCall(context, 'foo', error));
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('does not decrement a count unless the relevant state value is greater than or equal to zero', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => {
        mockCountCall(context, 'error');
        mockCountCall(context, 'warning');
        mockCountCall(context, 'info');
      });
    });
    expect(wrapper.instance().state.errorCount).toEqual(0);
    expect(wrapper.instance().state.warningCount).toEqual(0);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('decrements the count when the state value is greater or equal to zero and there is no failures', async () => {
    const { children } = wrapper.instance().props;
    const { inputs } = wrapper.instance();
    wrapper.setState({ errorCount: 3, warningCount: 2, infoCount: 1 });
    await children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.info);
      return inputs[child.props.name](child.props.value).catch(() => {
        mockCountCall(context, 'error');
        mockCountCall(context, 'warning');
        mockCountCall(context, 'info');
      });
    });
    expect(wrapper.instance().state.errorCount).toEqual(2);
    expect(wrapper.instance().state.warningCount).toEqual(1);
    expect(wrapper.instance().state.infoCount).toEqual(0);
  });

  it('rejects with error when a child component fails its own errors validations', async () => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          errors={ passValidation }
        />
        <Child
          name='bar'
          errors={ presence }
        />
        <Child
          name='wiz'
          errors={ passValidation }
        />
      </ValididationComp>
    );

    context = wrapper.instance().getContext();
    const { children } = wrapper.instance().props;

    children.forEach((child) => {
      mockRegisterChild(context, child.props.name, child.props.errors);
    });
    expect(wrapper.instance().validateRegisteredInputs()).rejects.toEqual(error);
  });

  it('resolves true when a child components passes its own errors validations', async () => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo'
          errors={ passValidation }
        />
        <Child
          name='bar'
          errors={ passValidation }
        />
      </ValididationComp>
    );

    context = wrapper.instance().getContext();
    const { children } = wrapper.instance().props;

    children.forEach((child) => {
      return mockRegisterChild(context, child.props.name, child.props.errors);
    });
    await expect(wrapper.instance().validateRegisteredInputs()).resolves.toEqual(true);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
