import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import InputValidation from './index';
import Form from 'components/form';

let validationOne = {
  validate: function() {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

let validationTwo = {
  validate: function() {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

let validationThree = {
  validate: function() {
    return false;
  },

  message: function() {
    return 'foo';
  }
};

let form = {
  model: 'model_2',
  attachToForm: function() {},
  detachFromForm: function() {},
  decrementErrorCount: function() {},
  incrementErrorCount: function() {}
}

class DummyInput extends React.Component {
  componentWillMount() {
    this.count++;
  }

  componentWillUnmount() {
    this.count--;
  }

  render() {
    return <div></div>;
  }
}

let Component = InputValidation(DummyInput);

fdescribe('InputValidation', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(Component));
  });

  describe('constructor', () => {
    it('instatiates state with some defaults', () => {
      expect(instance.state.valid).toBeTruthy();
      expect(instance.state.errorMessage).toBe(null);
    });
  });

  describe('componentWillMount', () => {
    describe('when the component has a componentWillMount method', () => {
      it('uses the components method', () => {
        instance.count = 1;
        instance.componentWillMount();
        expect(instance.count).toEqual(2);
      });
    });

    describe('When validations are present on the input', () => {
      it('attaches the input to the form', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          validations: [validationOne]
        }));
        instance.context.form = form;
        spyOn(instance.context.form, 'attachToForm');
        instance.componentWillMount();
        expect(instance.context.form.attachToForm).toHaveBeenCalledWith(instance);
      });
    });

    describe('When no validations are present on the input', () => {
      it('does not attach the input to the form', () => {
        instance.context.form = form;
        spyOn(instance.context.form, 'attachToForm');
        instance.componentWillMount();
        expect(instance.context.form.attachToForm).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('when the component has a componentWillUnmount method', () => {
      it('uses the components method', () => {
        instance.count = 2;
        instance.componentWillUnmount();
        expect(instance.count).toEqual(1);
      });
    });

    describe('When validations are present on the input', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          validations: [validationOne]
        }));
        instance.context.form = form;
      });

      describe('when the input is invalid', () => {
        it('decrements the error count', () => {
          instance.state.valid = false;
          spyOn(instance.context.form, 'decrementErrorCount');
          instance.componentWillUnmount();
          expect(instance.context.form.decrementErrorCount).toHaveBeenCalled();
        });
      });

      describe('when the input is valid', () => {
        it('detaches the input from the form', () => {
          spyOn(instance.context.form, 'detachFromForm');
          instance.componentWillUnmount();
          expect(instance.context.form.detachFromForm).toHaveBeenCalledWith(instance);
        });

        it('does not decrement the error count', () => {
          spyOn(instance.context.form, 'decrementErrorCount');
          instance.componentWillUnmount();
          expect(instance.context.form.decrementErrorCount).not.toHaveBeenCalled();
        });
      });
    });

    describe('When no validations are present on the input', () => {
      it('does not detach the input from the form', () => {
        instance.context.form = form;
        spyOn(instance.context.form, 'detachFromForm');
        instance.componentWillUnmount();
        expect(instance.context.form.detachFromForm).not.toHaveBeenCalled();
      });
    });
  });

  describe('validate', () => {
    describe('when validations are present on the input', () => {
      describe('when the input does not have a value set', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(React.createElement(Component, {
            validations: [validationOne],
            value: null,
            name: 'foo'
          }));
        });

        it('warns that a value should be set', () => {
          spyOn(console, 'warn');
          instance.validate();
          expect(console.warn).toHaveBeenCalledWith("Validations require a value property to be set to work correctly. See the render for the input with name 'foo'.");
        });
      });

      describe('when the input has a value', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(React.createElement(Component, {
            validations: [validationOne, validationTwo, validationThree],
            value: 'foo'
          }));
          instance.context.form = form;
          spyOn(validationOne, 'validate').and.callThrough();
          spyOn(validationTwo, 'validate').and.callThrough();
          spyOn(validationThree, 'validate').and.callThrough();
        });

        it('calls validate for each validation', () => {
          instance.validate();
          expect(validationOne.validate).toHaveBeenCalledWith(instance.props.value);
          expect(validationTwo.validate).toHaveBeenCalledWith(instance.props.value);
          expect(validationThree.validate).toHaveBeenCalledWith(instance.props.value);
        });

        describe('when the inputs state is currently valid', () => {
          describe('when the input has a form', () => {
            it('calls incrementErrorCount', () => {
              spyOn(instance.context.form, 'incrementErrorCount');
              instance.validate();
              expect(instance.context.form.incrementErrorCount).toHaveBeenCalled();
            });
          });

          describe('when the input does not have a form', () => {
            it('is still able to validate', () => {
              instance.context.form = null;
              expect(instance.validate()).toBeFalsy();
            });
          });

          it('calls setState', () => {
            spyOn(instance, 'setState');
            instance.validate();
            expect(instance.setState).toHaveBeenCalledWith({ errorMessage: 'foo', valid: false });
          });
        });

        describe('when the inputs state is not valid', () => {
          it('does not call setState', () => {
            instance.setState({ valid: false });
            spyOn(instance, 'setState');
            instance.validate();
            expect(instance.setState).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when no validations have been set on the input', () => {
      it('defaults the input validity to true', () => {
        let valid = instance.validate();
        expect(valid).toBeTruthy();
      });
    });
  });

  describe('_handleBlur', () => {
    it('calls validate on blur of the input', () => {
      spyOn(instance, 'validate');
      instance._handleBlur();
      expect(instance.validate).toHaveBeenCalled();
    });
  });
  //
  // describe('_handleFocus', () => {
  //   describe('when the input is invalid and the field gets focus', () => {
  //
  //   });
  // });
  //
  // describe('validationHTML', () => {
  //
  // });
  //
  // describe('mainClasses', () => {
  //
  // });
  //
  // describe('inputClasses', () => {
  //
  // });
  //
  // describe('inputProps', () => {
  //
  // });

});
