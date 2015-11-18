import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Form from './index';
import Textbox from './../textbox';
import Validation from './../../utils/validations/presence';
import InputGrid from './../input-grid';
import ImmutableHelper from './../../utils/helpers/immutable';

describe('Form', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Form model='test' />
    );
  });

  describe('initialize', () => {
    it('sets the errorCount to 0', () => {
      expect(instance.state.errorCount).toEqual(0);
    });
  });

  describe('incrementErrorCount', () => {
    it('increments the state error count', () => {
      instance.setState({ errorCount: 2 });
      instance.incrementErrorCount();
      expect(instance.state.errorCount).toEqual(3);
    });
  });

  describe('decrementErrorCount', () => {
    it('increments the state error count', () => {
      instance.setState({ errorCount: 2 });
      instance.incrementErrorCount();
      expect(instance.state.errorCount).toEqual(3);
    });
  });

  describe('attachToForm', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form model='test'>
          <Textbox validations={ [Validation] } name='excludedBox' />
          <InputGrid
            name='grid'
            data={ ImmutableHelper.parseJSON([ { foo: 'bar' } ]) }
            updateRowHandler={ function(){} }
            deleteRowHandler={ function(){} }
            fields={ [
              <Textbox validations={ [Validation] } name='box1' />,
              <Textbox validations={ [Validation] } name='box2' />
            ] }
          />
        </Form>
      );
    });

    describe('when the component is a grid', () => {
      it('adds a key value pair to tables', () => {
        expect(instance.tables.grid).toBeTruthy();
      });
    });

    describe('when the component is a a element in a grid', () => {
      it('adds a input nested by namespace and row_id', () => {
        let keys = Object.keys(instance.inputs.grid);
        expect(Object.keys(instance.inputs.grid[keys[0]]).length).toEqual(2);
      });
    });

    describe('when the component is self contained', () => {
      it('adds a input by its name', () => {
        expect(instance.inputs.excludedBox).toBeTruthy();
      });
    });
  });

  describe('detachFromForm', () => {
    let textbox1;
    let textbox2;
    let grid;
    let excludedTextbox;

    beforeEach(() => {

      textbox1 = <Textbox validations={ [Validation] } name='box1' />; 
      textbox2 = <Textbox validations={ [Validation] } name='box2' />;
      excludedTextbox = <Textbox validations={ [Validation] } name='excludedBox' />;
      grid = <InputGrid
            name='grid'
            data={ ImmutableHelper.parseJSON([ { foo: 'bar' } ]) }
            updateRowHandler={ function(){} }
            deleteRowHandler={ function(){} }
            fields={ [ textbox1, textbox2 ] }
          />

      instance = TestUtils.renderIntoDocument(
        <Form model='test'>
          { excludedTextbox }
          { grid } 
        </Form>
      );
    });

    describe('when the component is a grid', () => {
      it('removes a key value pair to tables', () => {
        expect(instance.tables.grid).toBeTruthy();
        instance.detachFromForm(instance.tables.grid);
        expect(instance.tables.grid).toBeFalsy();
      });
    });

    describe('when the component is a a element in a grid', () => {
      it('removes a input nested by namespace and row_id', () => {
        let keys = Object.keys(instance.inputs.grid);
        instance.detachFromForm(instance.tables.grid);
        expect(Object.keys(instance.inputs.grid[keys[0]]).length).toEqual(2);
      });
    });

    describe('when the component is self contained', () => {
      it('removes a input by its name', () => {
        expect(instance.inputs.excludedBox).toBeTruthy();
        instance.detachFromForm(instance.inputs.excludedBox);
        expect(instance.inputs.excludedBox).toBeFalsy();
      });
    });
  });


  describe('handleOnSubmit', () => {
    describe('valid input', () => {
      it('submits the form', () => {
        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ errorCount: 0 });
      });
    });

    describe('invalid input', () => {
      it('does not not submit the form', () => {
        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            <Textbox validations={ [Validation] } name='test'/>
          </Form>
        );

        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ errorCount :1 });
      });
    });

    describe('submitting a input grid', () => {
      it('removes placeholders when the form is valid', () => {
        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            <InputGrid
              name='test'
              data={ ImmutableHelper.parseJSON([ { foo: 'bar' } ]) }
              updateRowHandler={ function(){} }
              deleteRowHandler={ function(){} }
              fields={ [<Textbox name='box' />] }
            />
          </Form>
        );

        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');

        spyOn(instance.tables.test, 'setState');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ errorCount : 0 });
        expect(instance.tables.test.setState).toHaveBeenCalledWith({ placeholder: false });
      });
    });
  });
  
  describe('htmlProps', () => {
    it('pulls out the model from props', () => {
      expect(instance.htmlProps().model).toBeFalsy();
    });

    it('sets the className', () => {
      expect(instance.htmlProps().className).toEqual('ui-form');
    });
  });

  describe('cancelForm', () => {
    describe('when window history is availiable', () => {
      it('redirects to the previous page', () => {
        spyOn(window.history, 'back')
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        TestUtils.Simulate.click(cancel);
        expect(window.history.back).toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the ui-form class', () => {
      expect(instance.mainClasses).toEqual('ui-form');
    });
  });

  describe('render', () => {
    it('renders a parent form', () => {
      let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form')
      expect(form.className).toEqual('ui-form'); 
    });

    it('renders a hidden CSRFToken field', () => {
      let csrf = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
      expect(csrf.type).toEqual('hidden');
      expect(csrf.readOnly).toBeTruthy();
    });

    describe('buttons', () => {
      let buttons;
      let buttonContainers;

      beforeEach(() => {
        buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
        buttonContainers = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      });

      it('renders two buttons', () => {
        expect(buttons.length).toEqual(2);
      });

      it('renders a secondary cancel button with cancelClasses', () => {
        expect(buttons[0].className).toEqual('ui-button ui-button--secondary');
        expect(buttonContainers[0].className).toEqual('ui-form__cancel');
      });

      it('renders a primary save button with saveClasses', () => {
        expect(buttons[1].className).toEqual('ui-button ui-button--primary');
        expect(buttonContainers[1].className).toEqual('ui-form__save');
      });
    });

    describe('Errors', () => {
      beforeEach(() => {
        instance.setState({ errorCount: 2});
      });

      it('displays an error message', () => {
        let summary = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-form__summary')
        expect(summary.textContent).toEqual('There are 2 errors');
      });

      it('adds a invalid CSS class on the Save button div', () => {
        let saveContainer = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[1];
        expect(saveContainer.className).toEqual('ui-form__save ui-form__save--invalid');
      });
    });
  });
});
