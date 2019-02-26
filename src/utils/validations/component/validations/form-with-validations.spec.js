import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
// import formWithValidation from './form-with-validations.hoc';
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

describe('formWithValidation', () => {
  let wrapper;
  // const MockedComponent = <Form><Textbox /></Form>;
  // const ValidatedFormComponent = formWithValidation(Component);

  beforeEach(() => {
    wrapper = mount(
      <Form>
        <Textbox validations={ presence } />
        <Textbox validations={ presence } />
        <Textbox id='0' validations={ presence } />
      </Form>
    );
  });

  // use dive() to check that inputs call addInput when they mount
  it('passes a callback prop to its children to register when they mount', () => {
    const spy = spyOn(wrapper.instance(), 'addInput');
    expect(spy).toHaveBeenCalled();
  });

  it('passes a callback prop to its children to unregister when they umount', () => {

  });

  it('keeps a record the children inputs and their validations', () => {
    expect(Object.keys(wrapper.instance().inputs).length).toEqual(3);
  });

  it('removes the input when a child unmounts', () => {
    // console.log(wrapper.instance().props.children[0]);
    // const child = mount(<Textbox />);
    // const w2 = mount(
    const w2 = TestUtils.renderIntoDocument(<Form><Textbox /></Form>);
    // );
    // console.log(child.debug());
    // w2.instance().removeInput(child.props().name);
    // expect(Object.keys(wrapper.instance().inputs).length).toEqual(2);
    // const spy = spyOn(wrapper.instance(), 'removeInput');
    // wrapper.unmount();
    // expect(spy).toHaveBeenCalled();
    // const child = wrapper.getDOMNode(wrapper.find('[id="0"]'));
    console.log(w2);
    // wrapper.find('[id="0"]').unmount();]
    // child.componentWillUnmount();
    console.log(wrapper.find('[id="0"]').hostNodes().length);
  });

  it('passes the validations down to the children as props', () => {
    wrapper.props().children.forEach(child => expect(child.props.validations).toEqual(presence));
  });

  // afterEach(() => {
  //   wrapper.unmount();
  // });
});
