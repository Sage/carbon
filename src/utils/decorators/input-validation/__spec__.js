import React from 'react';
import InputValidation from './index';
import Form from 'components/form';

class Basic {
  props = {
    name: 'foo',
    value: 'bar'
  };

  context = {
    form: {
      model: 'model_1',
      attachToForm: function() {},
      detachFromForm: function() {},
      decrementErrorCount: function() {}
    }
  }

  state = {};

  componentWillMount() {
    this.count++;
  }

  componentWillUnmount() {
    this.count--;
  }
}

class Validations {
  props = {
    name: 'baz',
    value: 'qux',
    validations: [Presence]
  };

  context = {
    form: {
      model: 'model_2',
      attachToForm: function() {},
      detachFromForm: function() {},
      decrementErrorCount: function() {}
    }
  };

  state = {};
}

fdescribe('InputValidation', () => {
  let instanceBasic, instanceValidation, instanceValidationArray;

  beforeEach(() => {
    let ExtendedClass = InputValidation(Basic);
    instanceBasic = new ExtendedClass;

    let ExtendedClassTwo = InputValidation(Validations);
    instanceValidation = new ExtendedClassTwo;
  });

  describe('constructor', () => {
    it('instatiates state with some defaults', () => {
      expect(instanceBasic.state.valid).toBeTruthy();
      expect(instanceBasic.state.errorMessage).not.toBeDefined;
    });
  });

  describe('componentWillMount', () => {
    describe('when the component has a componentWillMount method', () => {
      it('uses the components method', () => {
        instanceBasic.count = 1;
        instanceBasic.componentWillMount();
        expect(instanceBasic.count).toEqual(2);
      });
    });

    describe('When validations are present on the input', () => {
      it('attaches the input to the form', () => {
        spyOn(instanceValidation.context.form, 'attachToForm');
        instanceValidation.componentWillMount();
        expect(instanceValidation.context.form.attachToForm).toHaveBeenCalledWith(instanceValidation);
      });
    });

    describe('When no validations are present on the input', () => {
      it('does not attach the input to the form', () => {
        spyOn(instanceBasic.context.form, 'attachToForm');
        instanceBasic.componentWillMount();
        expect(instanceBasic.context.form.attachToForm).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('when the component has a componentWillUnmount method', () => {
      it('uses the components method', () => {
        instanceBasic.count = 2;
        instanceBasic.componentWillUnmount();
        expect(instanceBasic.count).toEqual(1);
      });
    });

    describe('When validations are present on the input', () => {
      describe('when the input is invalid', () => {
        it('decrements the error count', () => {
          instanceValidation.state.valid = false;
          spyOn(instanceValidation.context.form, 'decrementErrorCount');
          instanceValidation.componentWillUnmount();
          expect(instanceValidation.context.form.decrementErrorCount).toHaveBeenCalled();
        });
      });

      describe('when the input is valid', () => {
        it('detaches the input from the form', () => {
          spyOn(instanceValidation.context.form, 'detachFromForm');
          instanceValidation.componentWillUnmount();
          expect(instanceValidation.context.form.detachFromForm).toHaveBeenCalledWith(instanceValidation);
        });

        it('does not decrement the error count', () => {
          spyOn(instanceValidation.context.form, 'decrementErrorCount');
          instanceValidation.componentWillUnmount();
          expect(instanceValidation.context.form.decrementErrorCount).not.toHaveBeenCalled();
        });
      });
    });

    describe('When no validations are present on the input', () => {
      it('does not detach the input from the form', () => {
        spyOn(instanceBasic.context.form, 'detachFromForm');
        instanceBasic.componentWillUnmount();
        expect(instanceBasic.context.form.detachFromForm).not.toHaveBeenCalled();
      });
    });
  });

  describe('validate', () => {
    describe('when validations are present on the input', () => {

      it('checks if the field is valid', () => {
        
      });

      describe('when the input field is invalid', () => {


      });
    });

    describe('when no validations have been set on the input', () => {
      it('defaults the input validity to true', () => {
        let valid = instanceBasic.validate();
        expect(valid).toBeTruthy();
      });
    });
  });

    // describe('when no value is defined on the input', () => {
    //   it('outputs a warning message to the console', () => {
    //     // spyOn(instanceValidation.props.validations, 'validate').and.returnValue(true);
    //     debugger
    //     // expect(instanceValidation.props.validations.validate).toHaveBeenCalledWith(instanceValidation.props.value).andReturn;
    //     // expect(console.warn).toHaveBeenCalled();
    //   });
    // });

    describe('when value is defined on the input', () => {

    });

    describe('when the input is not valid', () => {

    });

    describe('when the input is valid', () => {

    });

  describe('_handleBlur', () => {
    it('calls validate on blur of the input', () => {
      spyOn(instanceValidation, 'validate');
      instanceValidation._handleBlur();
      expect(instanceValidation.validate).toHaveBeenCalled();
    });
  });

  describe('_handleFocus', () => {
    describe('when the input is invalid and the field gets focus', () => {

    });
  });

  describe('validationHTML', () => {

  });

  describe('mainClasses', () => {

  });

  describe('inputClasses', () => {

  });

  describe('inputProps', () => {

  });

});
