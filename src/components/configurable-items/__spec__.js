import React from 'react';
import { shallow } from 'enzyme';
import { ConfigurableItems } from './configurable-items';
import Button from './../button';
import { DraggableContext } from './../drag-and-drop';
import Form from './../form';
import Heading from './../heading';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('ConfigurableItems', () => {
  let wrapper
  const onCancel = () => { }
  const onClick = () => { }
  const onDrag = () => { }
  const onSave = () => { }

  describe('children', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        >
          <p className='child-node'>Foo</p>
        </ConfigurableItems>
      );
    });
    it('renders child nodes', () => {
      const childNode = wrapper.find('.child-node');
      expect(childNode.length).toEqual(1);
    });
  });

  describe('onCancel', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );
    });
    it('passes the onCancel prop through to the Form onCancel prop', () => {
      expect(wrapper.find(Form).props().onCancel).toEqual(onCancel);
    });
  });

  describe('onDrag', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );
    });
    it('passes the onDrag prop through to the DraggableContext', () => {
      expect(wrapper.find(DraggableContext).props().onDrag).toEqual(onDrag);
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItems
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );
    });
    it('passes the onSave prop through to the Form onSubmit prop', () => {
      expect(wrapper.find(Form).props().onSubmit).toEqual(onSave);
    });
  });

  describe('onReset', () => {
    let form, resetButton
    let onResetSpy = jasmine.createSpy('onResetSpy')
    let onReset = () => { onResetSpy() }

    describe('when the onReset prop is provided', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItems
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onReset={onReset}
            onSave={onSave}
          />
        );
        form = wrapper.find(Form);
      });

      it('passes a reset button, with an onClick prop, as leftAlignedActions to the form', () => {
        resetButton = shallow(form.props().leftAlignedActions).find('.carbon-button--reset')
        expect(resetButton.length).toEqual(1);
        resetButton.simulate('click', { preventDefault: () => {} })
        expect(onResetSpy).toHaveBeenCalled();
      });
    });

    describe('when the onReset prop is not provided', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItems
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onSave={onSave}
          />
        );
        form = wrapper.find(Form);
      });

      it('does not pass leftAlignedActions to the form', () => {
        expect(form.props().leftAlignedActions).toBeNull();
      });
    })
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <ConfigurableItems
          data-element='bar'
          data-role='baz'
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        />
      );

      it('includes the correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'configurable-items', 'bar', 'baz');
      });
    });
  });
});
