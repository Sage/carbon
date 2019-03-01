import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import formWithValidation from './form-with-validations.hoc';
// import Form from '../../../../components/form';
// import Input from '../../../../__experimental__/components/input';
// import withValidation from './with-validation.hoc';
// import withUniqueName from './with-unique-name.hoc';

const presErr = new Error('this value is required!');

const presence = value => new Promise((resolve, reject) => {
  if (value) {
    resolve(true);
  } else {
    reject(presErr);
  }
});

const notZeroErr = new Error('this is zero!');

const isNotZero = value => new Promise((resolve, reject) => {
  if (value === 0 || value === '0') {
    reject(notZeroErr);
  } else {
    resolve(true);
  }
});

// const mockValidation = (value, validations) => Promise(() => {
//   const validArr = Array.isArray(validations) ? validations : [validations];
//   const res = [];
//   validArr.map(valid => res.push(valid(value)));

//   return Promise.all(res);
// });

const mockCountCall = (type, value, context) => {
  return context.adjustCount(type, value);
};

const mockInputValidator = (types, value, validation) => new Promise((_, reject) => {
  // let noExit = true;
  let msg;
  // try {
  types.forEach((type) => {
    validation(value)
      .catch((e) => {
        console.log('catch', type);
        // mockCountCall(type, 1, context);
        // noExit = false;
        msg = e.message;
      });

    if (msg) reject(msg);
  });
  // } catch (e) {
  //   if (e.message !== 'error') throw e;
  // }
  // return noExit;
});

const mockRegisterChild = (context, name, validateFunction) => context.addInput(name, validateFunction);

const mockUnregisterChild = (context, name) => context.removeInput(name);

const MockComponent = props => <div { ...props } />;

describe('formWithValidation', () => {
  let wrapper, context;

  const Child = MockComponent;
  const ValididationComp = formWithValidation(Component);
  beforeEach(() => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo1'
          validations={ presence }
          value='foo'
        />
        <Child
          name='foo2'
          validations={ presence }
          value='foo'
        />
      </ValididationComp>
    );
    context = wrapper.instance().getContext();
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

  fit('increments the count when an error is detected', async () => {
    wrapper = shallow(
      <ValididationComp>
        <Child
          name='foo1'
          validations={ presence }
          value=''
        />
      </ValididationComp>
    );
    const child = wrapper.instance().props.children;
    // wrapper.instance().props.children.forEach((child) => {
    mockRegisterChild(context, child.props.name, child.props.validations);
    // });
    // wrapper.instance().props.children.forEach((child) => {
    //   return mockCountCall(['error', 'warning', 'info'], child.props.value, child.props.validations, context);
    // });
    // expect(wrapper.instance().state.errorCount).toEqual(0);
    // const failChild = (
    //   <Child
    //     name='foo3'
    //     validations={ presence }
    //     value=''
    //   />
    // );
    // wrapper.setProps({
    //   children: [
    //     ...wrapper.instance().props.children,
    //     failChild
    //   ]
    // });
    // mockRegisterChild(context, failChild.props.name, failChild.props.validations);
    // console.log(wrapper.instance().state);
    // wrapper.instance().props.children.forEach((child) => {
    //   return mockCountCall('error', child.props.value, child.props.validations, context);
    // });
    const res = await mockInputValidator(['error'], child.props.value, child.props.validations);

    // await expect(
    //   mockInputValidator(['error'], child.props.value, child.props.validations, context)
    // ).rejects.toEqual(presErr.message);
    const count = wrapper.instance().state.errorCount;
    // wrapper.update();
    console.log('state : ', wrapper.instance());

    res.then(() => {
      expect(count).toEqual(0);
    })
      .catch(() => {
        mockCountCall('error', 1, context);
        expect(count).toEqual(1);
      });
  });

  it('does not validate children that have been been registered', () => {
    wrapper = shallow(
      <ValididationComp />
    );
    const mockChildren = [
      shallow(
        <Child
          name='foo1'
          validations={ presence }
          value='0'
        />,
        { context: wrapper.instance().getContext() }
      ),
      shallow(
        <Child
          name='foo2'
          validations={ isNotZero }
          value='0'
        />,
        { context: wrapper.instance().getContext() }
      )
    ];
    // const childrenToAdd = [];
    // mockChildren.forEach((c) => {
    //   childrenToAdd.push(c);
    //   wrapper.setProps({ children: childrenToAdd });
    // });
    // mockChildren[0].instance().componentWillUnmount();
    console.log(wrapper.instance().inputs);
    // wrapper.setProps({ children: mockChildren });
    console.log(mockChildren[0].instance());
    mockChildren[0].unmount();
    console.log(mockChildren[0].instance());
  });

  it('passes the validations down to the children as props', () => {
    wrapper.props().children.forEach(child => expect(child.props.validations).toEqual(presence));
  });

  it('runs the validations and increments the error count when an input fails', async () => {
    const wrapper2 = mount(
      <ValididationComp>
        <Child
          validations={ presence }
          warnings={ presence }
          value=''
        />
        <Child
          validations={ presence }
          value='1'
        />
        <Child
          validations={ presence }
          value='1'
        />
      </ValididationComp>
    );
    wrapper2.find('Child').forEach(el => console.log(el.debug()));

    await wrapper2.instance().validate().then(async () => {
      expect(wrapper2.instance().state.errorCount).toEqual(1);
    }).catch(async () => {
      const x = wrapper2.instance().state.errorCount;
      console.log(x);
      expect(x).toEqual(1);
    });
    expect.assertions(1);
    console.log('state ====> ', wrapper.instance().state);
  });

  it('runs the validations and increments the warning count when an input fails', async () => {
    const wrapper2 = mount(
      <ValididationComp>
        <Child
          warnings={ presence }
          value=''
        />
        <Child
          warnings={ presence }
          value='1'
        />
        <Child
          warnings={ presence }
          value='1'
        />
      </ValididationComp>
    );

    wrapper2.find('Child').forEach(el => console.log(el.props()));

    await wrapper2.instance().validate().then(async () => {
      // console.log(wrapper.instance().state);
      expect(wrapper2.instance().state.warningCount).toEqual(1);
    }).catch(async () => {
      const x = wrapper2.instance().state.warningCount;
      console.log(x);
      expect(x).toEqual(1);
      // await console.log(wrapper.instance().state);
    });
  });

  it('runs the validations and increments the info count when an input fails', async () => {
    const wrapper2 = mount(
      <ValididationComp>
        <Child info={ presence } value='' />
        <Child info={ presence } value='1' />
        <Child info={ presence } value='1' />
      </ValididationComp>
    );

    await wrapper2.instance().validate().then(async () => {
      expect(wrapper2.instance().state.infoCount).toEqual(1);
    }).catch(async () => {
      expect(wrapper2.instance().state.infoCount).toEqual(1);
    });
  });

  it('adjustCount', () => {
    wrapper.instance().adjustCount('info', 1);
    expect(wrapper.state().infoCount).toEqual(1);
    wrapper.find('Child').forEach(el => console.log(el.debug()));
  });

  describe('validate', () => {
    it('rejects if a child input has a failed validation', () => {
      const wrapper2 = shallow(
        <ValididationComp>
          <Child
            validations={ [isNotZero] }
            value={ 0 }
            name='foo'
          />
        </ValididationComp>
      );

      // wrapper2.instance().validate().then(async () => {
      //   expect(wrapper2.instance().state.errorCount).toEqual(1);
      // }).catch(async () => {
      //   expect(wrapper2.instance().state.errorCount).toEqual(1);
      // });
      wrapper2.instance().validate();
      console.log('state ====> ', wrapper.instance().state);
    });
  });
  // afterEach(() => {
  //   wrapper.unmount();
  // });
});
