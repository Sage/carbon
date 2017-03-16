import React from 'react';
import Row from './../row';
import { shallow } from 'enzyme';
import ComponentWithLabel from './component-with-label';

describe('ComponentWithLabel', () => {
 let wrapper, label, children;

 beforeEach(() => {
   wrapper = shallow(
     <ComponentWithLabel
       className='my-custom-class'
       columnSpan='6'
       label='My Label'
       labelAlignment='right'
       contentAlignment='left'
     >
       <p>This is some content</p>
     </ ComponentWithLabel>
   );
 });

  it('renders with main and custom classes', () => {
   expect(wrapper.find('carbon-component-with-label')).toBeTruthy();
   expect(wrapper.find('my-custom-class')).toBeTruthy();
  });

  it('first renders a Row with the right column span', () => {
    expect(wrapper.type()).toEqual(Row)
    expect(wrapper.props().columns).toEqual('10');
    expect(wrapper.props().columnSpan).toEqual('6');
  });

  describe('the label', () => {
    describe('when the labelAlignment prop is right', () => {
      it('contains a label with the expected props', () => {
        let label = wrapper.find('.carbon-component-with-label__label');
        expect(label.prop('columnSpan')).toEqual('3')
        expect(label.prop('columnAlign')).toEqual('right')
        expect(label.text()).toEqual('My Label')
      });
    });

    describe('when the labelAlignment prop is left', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ComponentWithLabel
           className='my-custom-class'
           columnSpan='6'
           label='My Label'
           labelAlignment='left'
           contentAlignment='left'
          >
            <p>This is some content</p>
          </ ComponentWithLabel>
        );
      });

      it('contains a label with the expected props', () => {
        let label = wrapper.find('.carbon-component-with-label__label');
        expect(label.prop('columnAlign')).toEqual('left')
      });
    });

    describe('when the labelAlignment prop is center', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ComponentWithLabel
           className='my-custom-class'
           columnSpan='6'
           label='My Label'
           labelAlignment='center'
           contentAlignment='left'
          >
            <p>This is some content</p>
          </ ComponentWithLabel>
        );
      });

      it('contains a label with the expected props', () => {
        let label = wrapper.find('.carbon-component-with-label__label');
        expect(label.prop('columnAlign')).toEqual('center')
      });
    });
  });

  describe('the content', () => {
    describe('when the contentAlignment prop is left', () => {
      it('renders the children as expected', () => {
        let children = wrapper.find('.carbon-component-with-label__content');
        expect(children.prop('columnSpan')).toEqual('7');
        expect(children.prop('columnAlign')).toEqual('left');
        expect(children.prop('children')).toEqual(<p>This is some content</p>);
      });
    });

    describe('when the contentAlignment prop is right', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ComponentWithLabel
           className='my-custom-class'
           columnSpan='6'
           label='My Label'
           labelAlignment='left'
           contentAlignment='right'
          >
            <p>This is some content</p>
          </ ComponentWithLabel>
        );
      });

      it('renders the children as expected', () => {
        let children = wrapper.find('.carbon-component-with-label__content');
        expect(children.prop('columnSpan')).toEqual('7');
        expect(children.prop('columnAlign')).toEqual('right');
        expect(children.prop('children')).toEqual(<p>This is some content</p>);
      });
    });

    describe('when the contentAlignment prop is center', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ComponentWithLabel
           className='my-custom-class'
           columnSpan='6'
           label='My Label'
           labelAlignment='left'
           contentAlignment='center'
          >
            <p>This is some content</p>
          </ ComponentWithLabel>
        );
      });

      it('renders the children as expected', () => {
        let children = wrapper.find('.carbon-component-with-label__content');
        expect(children.prop('columnSpan')).toEqual('7');
        expect(children.prop('columnAlign')).toEqual('center');
        expect(children.prop('children')).toEqual(<p>This is some content</p>);
      });
    });
  });


});
