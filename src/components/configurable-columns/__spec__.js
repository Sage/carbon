import React from 'react';
import { shallow } from 'enzyme';
import { ConfigurableColumns } from './configurable-columns';
import Button from './../button';
import { DraggableContext } from './../drag-and-drop';
import Form from './../form';
import Heading from './../heading';

describe('ConfigurableColumns', () => {
  let wrapper
  let onCancel = () => { }
  let onClick = () => { }
  let onDrag = () => { }
  let onSave = () => { }

  describe('children', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumns
          onCancel={onCancel}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
        >
          <p className='child-node'>Foo</p>
        </ConfigurableColumns>
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
        <ConfigurableColumns
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
        <ConfigurableColumns
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
        <ConfigurableColumns
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
          <ConfigurableColumns
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onReset={onReset}
            onSave={onSave}
          />
        );
        form = wrapper.find(Form);
        resetButton = shallow(form.props().additionalActions).find('.carbon-button--reset')
      });

      it('passes a reset button, with an onClick prop, as additionalActions to the form', () => {
        expect(resetButton.length).toEqual(1);
        resetButton.simulate('click', { preventDefault: () => {} })
        expect(onResetSpy).toHaveBeenCalled();
      });
    });

    describe('when the onReset prop is not provided', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableColumns
            onCancel={onCancel}
            onClick={onClick}
            onDrag={onDrag}
            onSave={onSave}
          />
        );
        form = wrapper.find(Form);
      });

      it('does not pass additionalActions to the form', () => {
        expect(form.props().additionalActions).toBeNull();
      });
    })
  });
});
