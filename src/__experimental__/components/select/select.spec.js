import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from '.';

describe('Select', () => {
  const value = { val: { value: '1', label: 'foo' } };
  const ev1 = { target: { value: '2', label: 'bar' } };
  const fn = (x) => {
    x.setState({ val: ev1.target });
  };

  const wrapper = mount(
    <Select
      onChange={ fn }
      value={ value }
      label='foo'
      validations={ [{}] }
    />
  );
  describe('single value', () => {
    it('renders component that has props with expected values', () => {
      expect(wrapper.props().onChange).toEqual(fn);
      expect(wrapper.props().label).toEqual('foo');
      expect(wrapper.props().value).toEqual(value);
    });
  });

  describe('multiple values', () => {
    let wrapper2;
    const values = {
      val: [
        { value: '1', label: 'foo' },
        { value: '2', label: 'bar' },
        { value: '3', label: 'wiz' }
      ]
    };
    const ev3 = { target: { value: '4', label: 'new!' } };
    const fn2 = (x) => {
      x.instance().setState({ val: ev3.target });
    };

    beforeEach(() => {
      wrapper2 = mount(
        <Select
          onChange={ fn2 }
          value={ values }
          label='foo'
          validations={ [{}] }
        />
      );
    });

    it('renders component that has props with expected values', () => {
      expect(wrapper2.props().onChange).toEqual(fn2);
      expect(wrapper2.props().label).toEqual('foo');
      expect(wrapper2.props().value).toEqual(values);
    });

    it('component has value prop with multiple elements', () => {
      expect(wrapper2.prop('value').val.length).toEqual(3);
      expect(wrapper2.prop('value').val[0].value).toEqual('1');
      expect(wrapper2.prop('value').val[0].label).toEqual('foo');
      expect(wrapper2.prop('value').val[1].value).toEqual('2');
      expect(wrapper2.prop('value').val[1].label).toEqual('bar');
      expect(wrapper2.prop('value').val[2].value).toEqual('3');
      expect(wrapper2.prop('value').val[2].label).toEqual('wiz');
    });

    it('to have single InputPresentation and Input components as children', () => {
      const pres = wrapper2.find('InputPresentation');
      const input = wrapper2.find('Input');
      expect(pres.exists()).toBeTruthy();
      expect(input.exists()).toBeTruthy();
      expect(pres.length).toEqual(1);
      expect(input.length).toEqual(1);
      expect(pres.find('Input').exists).toBeTruthy();
    });

    // probs test in separate describe block
    it('calls renderMultiValues', () => {
      const wrapper3 = shallow(
        <Select
          onChange={ fn }
          value={ [
            { value: '1', label: 'foo' },
            { value: '2', label: 'bar' },
            { value: '3', label: 'wiz' }
          ] }
          label='foo'
          validations={ [{}] }
        />
      );
      const fnCall = spyOn(wrapper3.instance(), 'renderMultiValues');
      wrapper3.update();
      expect(fnCall).toBeTruthy();
      expect(fnCall).toBeCalled();
    });

    it('renders the multiple values as Pill components', () => {
      const multiValsElems = shallow(wrapper2.instance().renderMultiValues(values.val));
      const pills = multiValsElems.find('Pill');
      expect(pills.exists()).toBeTruthy();
      expect(pills.length).toEqual(3);
      expect(pills.at(0).props().children).toEqual(values.val[0].label);
      expect(pills.at(1).props().children).toEqual(values.val[1].label);
      expect(pills.at(2).props().children).toEqual(values.val[2].label);
    });

    it('updates filter state', () => {
      const mockedEvent = { target: { value: 'foo' } };
      const input = wrapper2.find('input');
      wrapper2.instance().updateFilter(mockedEvent);
      expect(input.value).toEqual('foo');
    });
  });

  describe('focus functions', () => {
    describe('if focus is not blocked', () => {
      const wrap = mount(
        <Select
          onChange={ fn }
          value={ { value: '1', label: 'foo' } }
          label='foo'
          validations={ [{}] }
        >
          <div className='option-children'>test1</div>
          <div className='option-children'>test2</div>
          <div className='option-children'>test3</div>
        </Select>
      );
      // const portalRoot = document.querySelector('.carbon-portal');

      it('does not render a Portal with the children as options when input is not focused', () => {
        expect(wrap.find('Portal').exists()).toEqual(false);
        expect(
          wrap.containsMatchingElement(
            <div className='option-children'>test1</div>,
            <div className='option-children'>test2</div>,
            <div className='option-children'>test3</div>
          )
        ).toBeFalsy();
      });

      it('renders a Portal with the children as options when input is focused', () => {
        wrap.find('input').simulate('focus');
        expect(wrap.find('Portal').exists()).toEqual(true);
        expect(
          wrap.containsMatchingElement(
            <div className='option-children'>test1</div>,
            <div className='option-children'>test2</div>,
            <div className='option-children'>test3</div>
          )
        ).toBeTruthy();
      });

      it('does not renders a Portal with the children as options onBlur', () => {
        wrap.find('input').simulate('blur');
        expect(wrap.find('Portal').exists()).toEqual(false);
        expect(
          wrap.containsMatchingElement(
            <div className='option-children'>test1</div>,
            <div className='option-children'>test2</div>,
            <div className='option-children'>test3</div>
          )
        ).toBeFalsy();
      });
    });
  });

  describe('Mock `getBoundingClientRect`', () => {
    // beforeEach(() => {
    //   Element.prototype.getBoundingClientRect = jest.fn(() => {
    //     return {
    //       width: 120,
    //       height: 120,
    //       top: 0,
    //       left: 0,
    //       bottom: 0,
    //       right: 0
    //     };
    //   });
    // });

    const wrap = mount(
      <React.Fragment>
        <Select
          onChange={ fn }
          value={ { value: '1', label: 'foo' } }
          label='foo'
          validations={ [{}] }
        >
          <div className='option-children'>test1</div>
        </Select>
      </React.Fragment>
    );
    document.body.appendChild(wrap.find());

    // const dim = 120;
    // const pos = 0;
    // const parent = shallow(
    //   <div height={ 120 } width={ 240 }>
    //     { wrap }
    //   </div>
    // );

    it('should mock `getBoundingClientRect`', () => {
      const element = wrap.instance()._inputElement;
      // const rect = element.getBoundingClientRect();
      // element.setAttribute('style', `left: ${0}; top: ${0}; width: ${120}; position: relative;`);
      spyOn(wrap.instance(), 'positionList');
      wrap.find('input').simulate('focus');
      // const list = wrap.instance()._list;
      // console.log('parent  ==> ', parent.getBoundingClientRect());
      console.log('element ==> ', element.getBoundingClientRect());
      expect(wrap.instance().positionList).toHaveBeenCalled();
      expect(wrap.instance()._list.getBoundingClientRect().width).toEqual(0); // don't leave this like this!
    });
  });
});
