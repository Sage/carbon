import React from 'react';
import { mount } from 'enzyme';
import SelectBridge from '.';
// import { test } from 'bowser';
// import Textbox from '../textbox';

/* global jest */
describe('SelectBridge', () => {
  // let wrapper;
  // let instance;
  const val = { value: 'Purple' };
  const fn = () => 'test';
  const ref = React.createRef();

  // beforeEach(() => {
  //   instance = TestUtils.renderIntoDocument(
  //     <SelectBridge
  //       ref={ ref }
  //       value={ val }
  //       visibleValue={ val }
  //       onChange={ fn } onBlur={ fn }
  //       onFocus={ fn }
  //     />
  //   );
  // });

  // it('renders component ', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  // test if mult val [], test if filter etc

  // beforeEach(() => {
  //   wrapper = shallow(
  //     <SelectBridge
  //       value={ val }
  //       visibleValue={ val }
  //       onChange={ fn }
  //       onBlur={ fn }
  //       onFocus={ fn }
  //     />
  //   );
  // });

  const wrapper = mount(
    <SelectBridge
      ref={ ref }
      value={ val }
      visibleValue={ val }
      onChange={ fn }
      onBlur={ fn }
      onFocus={ fn }
    />
  );


  // it('renders component with expected children and props', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });


  it('returns the correct prop data', () => {
    expect(wrapper.props().value).toEqual(val);
    // expect(wrapper.ref).toEqual(ref);
    expect(wrapper.props().visibleValue).toEqual(val);
    expect(wrapper.props().onChange).toEqual(fn);
    expect(wrapper.props().onFocus).toEqual(fn);
    expect(wrapper.props().onBlur).toEqual(fn);
  });

  // it('has the correct state', () => {
  //   expect(wrapper.instance().state.filter).toEqual(null);
  //   expect(wrapper.instance().state.open).toBeFalsy();
  // });

  // it('returns the correct inputProps data', () => {
  //   wrapper.visibleValue = 'foo';
  //   expect(wrapper.inputprops().className).toEqual(wrapper.inputClasses);
  //   expect(wrapper.inputprops().name).toBe(null);
  //   expect(wrapper.inputprops().readOnly).toBeTruthy();
  //   expect(wrapper.inputprops().value).toEqual('foo');
  // });

  it('it has a "dropdown" Icon child', () => {
    expect(wrapper.find('Icon').find({ type: 'dropdown' }).exists()).toBeTruthy();
  });
  /*
    <SelectBridge
      { ...this.props }
      ref={ (c) => { this._input = c; } }
      value={ isMultiValue ? this.props.value : this.props.value.value }
      visibleValue={ this.state.filter || visibleValue }
      onChange={ this.updateFilter }
      onBlur={ this.handleBlur }
      onFocus={ this.handleFocus }
    >
  */

  describe('multiple input values', () => {
    const wrapper2 = mount(
      <SelectBridge
        ref={ ref }
        value={ { val: [{ value: '1', label: 'Foo' }, { value: '2', label: 'bar' }] } }
        visibleValue={ { val: [{ value: '1', label: 'Foo' }, { value: '2', label: 'bar' }] } }
        onChange={ fn }
        onBlur={ fn }
        onFocus={ fn }
      />
    );

    console.log(wrapper2.props());
    it('has an array of visible values in state', () => {
      expect(wrapper2.props().visibleValue.length).toEqual(2);
    });
  });

  // describe('listHTML', () => {
  //   const instance = wrapper.instance();
  //   console.log(instance);
  //   it('returns the html', () => {
  //     expect(TestUtils.is(instance.labelHTML)).toBeTruthy();
  //   });
  // });
});
