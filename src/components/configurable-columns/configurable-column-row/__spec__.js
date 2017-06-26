import React from 'react';
import { shallow } from 'enzyme';
import ConfigurableColumnRow from './configurable-column-row';
import Checkbox from './../../checkbox';
import Icon from './../../icon';
import { WithDrag, WithDrop } from './../../drag-and-drop';

describe('ConfigurableColumnRow', () => {
  let wrapper
  let onChange = () => { }

  describe('classNames', () => {
    beforeEach(() => {
      wrapper = shallow(<ConfigurableColumnRow />);
      wrapper.instance().context = { dragAndDropActiveIndex: 1 }
    })

    describe('when the dragAndDropActiveIndex is the same as the rowIndex', () =>{
      beforeEach(() => {
        wrapper.setProps({rowIndex: 1})
      });
      it('adds configurable-column-row--dragged to the classes', () => {
        expect(wrapper.find('.configurable-column-row--dragged').length).toEqual(1);
      });
    });

    describe('when the dragAndDropActiveIndex is the same as the rowIndex', () =>{
      beforeEach(() => {
        wrapper.setProps({rowIndex: 2})
      });
      it('does not add configurable-column-row--dragged to the classes', () => {
        expect(wrapper.find('.configurable-column-row--dragged').length).toEqual(0);
      });
    });
  });

  describe('onChange', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnRow onChange={onChange} />
      );
    });
    it('passes the onChange prop through to the Checkbox onChange prop', () => {
      expect(wrapper.find(Checkbox).props().onChange).toEqual(onChange);
    });
  });

  describe('enabled', () => {
    describe('when the row is enabled', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableColumnRow enabled={true} />
        );
      });

      it('sets the Checkbox value to true', () => {
        expect(wrapper.find(Checkbox).props().value).toBeTruthy();
      });
    });

    describe('when the row is not enabled', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableColumnRow enabled={false} />
        );
      });

      it('sets the Checkbox value to false', () => {
        expect(wrapper.find(Checkbox).props().value).toBeFalsy();
      });
    });
  });

  describe('locked', () => {
    describe('when the row is locked', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableColumnRow locked={true} />
        );
      });

      it('sets the Checkbox as disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeTruthy();
      });
    });

    describe('when the row is not locked', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableColumnRow locked={false} />
        );
      });

      it('does not set the Checkbox as disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeFalsy();
      });
    });
  });

  describe('name', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnRow name='Foo' />
      );
    });

    it('sets the Checkbox label prop', () => {
      expect(wrapper.find(Checkbox).props().label).toEqual('Foo')
    });
  });

  describe('rowIndex', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnRow rowIndex={2} />
      );
    });
    it('sets the index prop on the WithDrop component', () => {
      expect(wrapper.find(WithDrop).props().index).toEqual(2)
    });
  });

  describe('icon', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnRow name='Foo' />
      );
    });

    it('renders a drag vertical icon', () => {
      expect(wrapper.find(Icon).props().type).toEqual('drag_vertical')
    });
  });

  describe('list item markup', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnRow name='Foo' />
      );
    });

    it('renders an <li>', () => {
      expect(wrapper.find('li').length).toEqual(1)
    });
  })
});
