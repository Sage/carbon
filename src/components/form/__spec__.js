import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Form from './form';
import Textbox from './../textbox';
import Validation from './../../utils/validations/presence';
import InputGrid from './../input-grid';
import TableRow from './../table-row';
import ImmutableHelper from './../../utils/helpers/immutable';
import Dialog from './../dialog';

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

    it('sets the isSubmitting to to false', () => {
      expect(instance.state.isSubmitting).toBeFalsy();
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
      instance.decrementErrorCount();
      expect(instance.state.errorCount).toEqual(1);
    });
  });

  describe('attachToForm', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form model='test'>
          <Textbox validations={ [Validation()] } name='excludedBox' value='' />
          <InputGrid
            name='grid'
            data={ ImmutableHelper.parseJSON([ { foo: 'bar' } ]) }
            updateRowHandler={ function(){} }
            deleteRowHandler={ function(){} }
            fields={ [
              <Textbox validations={ [Validation()] } name='box1' value='foo' />,
              <Textbox validations={ [Validation()] } name='box2' value='foo' />
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

    describe('when the component is an element in a grid', () => {
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
      textbox1 = <Textbox validations={ [Validation()] } name='box1' value='' />;
      textbox2 = <Textbox validations={ [Validation()] } name='box2' value='' />;
      excludedTextbox = <Textbox validations={ [Validation()] } name='excludedBox' value='' />;

      grid = <InputGrid
            name='grid'
            data={ ImmutableHelper.parseJSON([ { box1: 'bar' } ]) }
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
      it('removes a key value pair from tables', () => {
        expect(instance.tables.grid).toBeTruthy();
        instance.detachFromForm(instance.tables.grid);
        expect(instance.tables.grid).toBeFalsy();
      });
    });

    describe('when the component is a row in a grid', () => {
      let regular;

      beforeEach(() => {
        let regularTable = document.createElement('table');
        regularTable.innerHTML = '<tbody></tbody>';

        regular = ReactDOM.render((<TableRow
              name='regular'
              key='regular_1'
              namespace='namespace'
              row_id='row_id'
              data={ ImmutableHelper.parseJSON({ foo: 'text', bar: '1.00' }) }
              fields={ [ textbox1, textbox2 ] }
              />), regularTable.children[0]);

        instance.attachToForm(regular);
      });

      it('removes a input nested by namespace and row_id', () => {
        expect(instance.inputs.namespace.row_id.regular).toBeTruthy();
        instance.detachFromForm(regular);
        expect(instance.inputs.namespace.row_id.regular).toBeFalsy();
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

  describe('serialize', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form model='model'>
          <Textbox name='test' value='foo' />
        </Form>
      );
    });

    it('without opts it returns a string', () => {
      expect(instance.serialize()).toEqual('model%5Btest%5D=foo');
    });

    it('with opts it returns a hash', () => {
      expect(instance.serialize({ hash: true })).toEqual({ model: { test: 'foo' } });
    });
  });

  describe('handleOnSubmit', () => {
    describe('valid input', () => {
      it('submits the form', () => {
        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            <Textbox validations={ [Validation()] } name='test' value='Valid' />
          </Form>
        );

        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ isSubmitting: true });
      });
    });

    describe('invalid input', () => {
      it('does not not submit the form', () => {
        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            <Textbox validations={ [Validation()] } name='test' value='' />
          </Form>
        );

        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ errorCount: 1 });
      });
    });

    describe('when a beforeFormValidation prop is passed', () => {
      it('calls the beforeFormValidation', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form beforeFormValidation={ spy } model='test'>
            <Textbox validations={ [Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when a afterFormValidation prop is passed', () => {
      it('calls the afterFormValidation', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form afterFormValidation={ spy } model='test'>
            <Textbox validations={ [Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('submitting a input grid', () => {
      it('removes placeholder when the form is valid', () => {
        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            <InputGrid
              name='test'
              data={ ImmutableHelper.parseJSON([ { box: 'bar' } ]) }
              updateRowHandler={ function(){} }
              deleteRowHandler={ function(){} }
              fields={ [<Textbox validation={ [Validation()] } name='box' />] }
            />
          </Form>
        );

        spyOn(instance, 'setState');
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');

        spyOn(instance.tables.test, 'setState');
        TestUtils.Simulate.submit(form);
        expect(instance.setState).toHaveBeenCalledWith({ isSubmitting: true });
        expect(instance.tables.test.setState).toHaveBeenCalledWith({ placeholder: false });
      });

      it('checks the validation of each field', () => {
        let baseData = ImmutableHelper.parseJSON(
          [ { box1: 'bar', box2: '' } ]
        );

        let textbox1 = <Textbox validations={ [Validation()] } name='box1' value='' />;
        let textbox2 = <Textbox validations={ [Validation()] } name='box2' value='' />;

        let grid = <InputGrid
          name='grid'
          data={ baseData }
          updateRowHandler={ function(){} }
          deleteRowHandler={ function(){} }
          fields={ [ textbox1, textbox2 ] } />

        instance = TestUtils.renderIntoDocument(
          <Form model='test'>
            { grid }
          </Form>
          );

        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.errorCount).toEqual(1);
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
        spyOn(instance._window.history, 'back')
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        TestUtils.Simulate.click(cancel);
        expect(instance._window.history.back).toHaveBeenCalled();
      });
    });

    describe('when window history is not availiable', () => {
      it('throws an error', () => {
        instance._window = {};
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        expect(function() { TestUtils.Simulate.click(cancel) }).toThrowError('History is not defined. This is normally configured by the react router');
      });
    });

    describe('when the form is inside a dialog', () => {
      it('uses the dialogs cancel handler instead', () => {
        let spy = jasmine.createSpy('cancelDialogHandler');
        let nestedInstance = TestUtils.renderIntoDocument(
          <Dialog
            title="test"
            open={ true }
            cancelDialogHandler={ spy }>

            <Form model="contact">
              <Textbox
                name="name"
                onChange={ function() {} }
                value={ 'foo' } />
            </Form>
          </Dialog>
        )
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(nestedInstance, 'button')[0];
        TestUtils.Simulate.click(cancel);
        expect(spy).toHaveBeenCalled();
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

    describe('CSRF', () => {
      let csrf;

      beforeEach(() => {
        let fakeMeta1 = { getAttribute() {} },
            fakeMeta2 = { getAttribute() {} };

        spyOn(fakeMeta1, 'getAttribute').and.returnValue('csrf-param')
        spyOn(fakeMeta2, 'getAttribute').and.returnValue('csrf-token')
        spyOn(instance._document, 'getElementsByTagName').and.returnValue( [ fakeMeta1, fakeMeta2 ] );

        instance = TestUtils.renderIntoDocument(<Form model='test' />);

        csrf = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      });

      it('renders a hidden CSRFToken field', () => {
        expect(csrf.type).toEqual('hidden');
        expect(csrf.readOnly).toBeTruthy();
      });

      describe('when meta tag name == csrf-param', () => {
        it('adds the meta tag content as the name of the input field', () => {
          expect(csrf.name).toEqual('csrf-param');
        });
      });

      describe('when meta tag name == csrf-token', () => {
        it('adds the meta tag content as the value of the input field', () => {
          expect(csrf.value).toEqual('csrf-token');
        });
      });
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

      it('renders an undisabled save button if not submitting', () => {
        expect(buttons[1].disabled).toBeFalsy();
      });

      it('renders a disabled save button if isSubmitting', () => {
        instance.setState({ isSubmitting: true });
        expect(buttons[1].disabled).toBeTruthy();
      });
    });

    describe('Cancel Button', () => {
      describe('when cancel prop is false', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Form cancel={false} model='test' />
          );
        });

        it('does not show a cancel button', () => {
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(1);
        });
      });

      describe('when cancel props is true (default)', () => {
        it('does show a cancel button', () => {
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(2);
        });
      });
    });

    describe('errorMessage', () => {
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
