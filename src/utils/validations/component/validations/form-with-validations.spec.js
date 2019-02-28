import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import formWithValidation from './form-with-validations.hoc';
import Form from '../../../../components/form';
import Textbox from '../../../../__experimental__/components/textbox';
import Input from '../../../../__experimental__/components/input';
import withValidation from './with-validation.hoc';
import withUniqueName from './with-unique-name.hoc';

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

describe('formWithValidation', () => {
  let wrapper;
  // const MockedComponent = <Form><Textbox /></Form>;
  // const ValidatedFormComponent = formWithValidation(Component);

  // beforeEach(() => {
  //   wrapper = mount(
  //     <Form>
  //       <Textbox name='foo1' validations={ presence } />
  //       <Textbox name='foo2' validations={ presence } />
  //       <Textbox name='foo3' validations={ presence } />
  //     </Form>
  //   );
  // });

  it('keeps an object record of the children inputs and their validations', () => {
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(3);
    wrapper.props().children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).not.toEqual(undefined));
  });

  fit('removes the input when a child unmounts', () => {
    const wrapper2 = mount(
      <div>
        <Form>
          <Textbox name='foo1' validations={ presence } />
        </Form>
      </div>
    );
    const form = wrapper2.find(Form);
    const child = mount(form.props().children, { context: form.instance().getContext() });
    const childName = child.props().name;
    expect(child.length).toEqual(1);
    expect(Object.keys(form.instance().inputs).length).toEqual(1);
    expect(form.instance().inputs[childName]).not.toEqual(undefined);
    // console.log('inputs : ', wrapper2.instance().inputs);
    // console.log(wrapper2.instance().inputs[child.props().name]);
    child.unmount();
    // expect(wrapper2.instance().inputs[childName]).toEqual(undefined);
    // expect(child.length).toEqual(0);
    // console.log('inputs : ', wrapper2.instance().inputs);

    // expect(Object.keys(wrapper2.instance().inputs).length).toEqual(0);
    // wrapper2.unmount();
  });

  const mockValidation = () => 'foo';

  it('does not validate children that have been been registered', () => {
    const ValididationComp = formWithValidation(Component);
    const w2 = shallow(
      <ValididationComp />
    );
    const Child = withUniqueName(withValidation(Input));
    const mockChildren = [
      shallow(<Child validations={ mockValidation } value='0' />, w2.instance().getContext()),
      shallow(<Child validations={ isNotZero } value='0' />, w2.instance().getContext())
    ];
    // const childrenToAdd = [];
    // mockChildren.forEach((c) => {
    //   childrenToAdd.push(c);
    //   w2.setProps({ children: childrenToAdd });
    // });
    // mockChildren[0].instance().componentWillUnmount();
    console.log(w2.instance().inputs);
    // w2.setProps({ children: mockChildren });
    console.log(mockChildren[0].instance());
  });

  it('passes the validations down to the children as props', () => {
    wrapper.props().children.forEach(child => expect(child.props.validations).toEqual(presence));
  });

  it('runs the validations and increments the error count when an input fails', async () => {
    const wrapper2 = mount(
      <Form>
        <Textbox
          validations={ presence }
          warnings={ presence }
          value=''
        />
        <Textbox
          validations={ presence }
          value='1'
        />
        <Textbox
          validations={ presence }
          value='1'
        />
      </Form>
    );
    wrapper2.find('Textbox').forEach(el => console.log(el.debug()));

    await wrapper2.instance().validate().then(async () => {
      expect(wrapper2.instance().state.errorCount).toEqual(1);
    }).catch(async () => {
      const x = wrapper2.instance().state.errorCount;
      console.log(x);
      expect(x).toEqual(1);
    });
    console.log('state ====> ', wrapper.instance().state);
  });

  it('runs the validations and increments the warning count when an input fails', async () => {
    const wrapper2 = mount(
      <Form>
        <Textbox
          warnings={ presence }
          value=''
        />
        <Textbox
          warnings={ presence }
          value='1'
        />
        <Textbox
          warnings={ presence }
          value='1'
        />
      </Form>
    );

    wrapper2.find('Textbox').forEach(el => console.log(el.props()));

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
      <Form>
        <Textbox info={ presence } value='' />
        <Textbox info={ presence } value='1' />
        <Textbox info={ presence } value='1' />
      </Form>
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
    wrapper.find('Textbox').forEach(el => console.log(el.debug()));
  });

  describe('validate', () => {
    it('rejects if a child input has a failed validation', () => {
      const wrapper2 = shallow(
        <Form>
          <Textbox
            validations={ [isNotZero] }
            value={ 0 }
            name='foo'
          />
        </Form>
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
