import React from 'react';
import { mount, shallow } from 'enzyme';
// import formWithValidation from './form-with-validations.hoc';
import { Object } from 'es6-shim';
import Form from '../../../../components/form';
import Textbox from '../../../../__experimental__/components/textbox';

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
  if (value !== 0) {
    resolve(true);
  } else {
    reject(notZeroErr);
  }
});

describe('formWithValidation', () => {
  let wrapper;
  // const MockedComponent = <Form><Textbox /></Form>;
  // const ValidatedFormComponent = formWithValidation(Component);

  beforeEach(() => {
    wrapper = mount(
      <Form>
        <Textbox name='foo1' validations={ presence } />
        <Textbox name='foo2' validations={ presence } />
        <Textbox name='foo3' validations={ presence } />
      </Form>
    );
  });

  // use dive() to check that inputs call addInput when they mount
  it('passes a callback prop to its children to register when they mount', () => {
    // await wrapper.update();
    // expect(spy).toHaveBeenCalled();
    // wrapper.props().children.forEach((child) => {
    //   child.shallow();
    // });
    const wrapper2 = shallow(
      <Form>
        <Textbox name='foo1' validations={ presence } />
      </Form>
    );
    const spy = spyOn(wrapper2.props().value, 'addInput');
    const child = wrapper2.find(Textbox).dive(wrapper2.instance().context);
    expect(child.length).toEqual(1);
    child.componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('passes a callback prop to its children to unregister when they umount', () => {
    // await wrapper.update();
    // expect(spy).toHaveBeenCalled();
    // wrapper.props().children.forEach((child) => {
    //   child.shallow();
    // });
    const wrapper2 = shallow(
      <Form>
        <Textbox name='foo1' validations={ presence } />
      </Form>
    );
    const spy = spyOn(wrapper2.instance(), 'removeInput');
    const child = wrapper2.find(Textbox).dive();
    console.log('child2 : ', child.debug());
    expect(child.length).toEqual(1);
    child.unmount();
    expect(spy).toHaveBeenCalled();
    console.log('child3 : ', child);
  });

  it('keeps an object record of the children inputs and their validations', () => {
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(3);
    wrapper.props().children
      .forEach(child => expect(wrapper.instance().inputs[child.props.name]).not.toEqual(undefined));
  });

  it('removes the input when a child unmounts', () => {
    const wrapper2 = mount(
      <Form>
        <Textbox name='foo1' validations={ presence } />
      </Form>
    );
    const child = mount(wrapper2.find(Form).props().children);
    const childName = child.props().name;
    // expect(child.length).toEqual(1);
    // console.log('child : ', child);
    // expect(Object.keys(wrapper2.instance().inputs).length).toEqual(1);
    // expect(wrapper2.instance().inputs[childName]).not.toEqual(undefined);
    // // child.unmount();
    // expect(wrapper2.instance().inputs[childName]).toEqual(undefined);
    // expect(child.length).toEqual(0);

    // expect(Object.keys(wrapper2.instance().inputs).length).toEqual(0);
    // wrapper2.unmount();
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

  // afterEach(() => {
  //   wrapper.unmount();
  // });
});
