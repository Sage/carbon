import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import InputValidation from './input-validation';
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

class DummyInputWithoutLifecycleMethods extends React.Component {
  render() {
    return <div>{ this.validationHTML }</div>;
  }
}

class DummyInput extends DummyInputWithoutLifecycleMethods {
  componentDidUpdate() {
  }

  componentWillMount() {
    this.count++;
  }

  componentWillUnmount() {
    this.count--;
  }

  onBlur = () => {
  }

  onFocus = () => {
  }

  get inputProps() {
    return {
      onBlur: this.onBlur,
      onFocus: this.onFocus
    };
  }
}

let SimpleComponent = InputValidation(DummyInputWithoutLifecycleMethods);
let Component = InputValidation(DummyInput);

describe('InputValidation', () => {
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

  describe('componentWillReceiveProps', () => {
    describe('when invalid', () => {
      beforeEach(() => {
        instance.setState({ valid: false });
        spyOn(instance, 'setState');
      });

      describe('when becoming disabled', () => {
        it('calls setState', () => {
          instance.componentWillReceiveProps({ disabled: true });
          expect(instance.setState).toHaveBeenCalledWith({ valid: true });
        });
      });

      describe('when not becoming disabled', () => {
        it('does not call setState', () => {
          instance.componentWillReceiveProps({ disabled: false });
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });
    });

    describe('when valid', () => {
      beforeEach(() => {
        instance.setState({ valid: true });
        spyOn(instance, 'setState');
      });

      it('does not call setState', () => {
        instance.componentWillReceiveProps({ disabled: true });
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    describe('when the component is valid', () => {
      it('does nothing', () => {
        instance.setState({ valid: true });
        expect(instance.componentDidUpdate.bind(instance)).not.toThrow();
      });
    });

    describe('when the component is invalid', () => {
      describe('when there is no icon or message', () => {
        it('does nothing', () => {
          instance.setState({ valid: false });
          spyOn(ReactDOM, 'findDOMNode').and.returnValue(null);
          expect(instance.componentDidUpdate.bind(instance)).not.toThrow();
        });
      });

      describe('when there is an icon and message', () => {
        describe('when onscreen', () => {
          it('sets the correct left position', () => {
            instance.setState({ valid: false, errorMessage: 'foo' });
            instance.refs.validationMessage = {
              offsetHeight: 30,
              style: {
                left: 10,
                top: 10
              },
              getBoundingClientRect: function() {
                return {
                  left: 10
                };
              }
            };
            spyOn(ReactDOM, 'findDOMNode').and.returnValue({
              offsetLeft: 20,
              offsetWidth: 10,
              offsetTop: 30
            });
            instance.componentDidUpdate();
            expect(instance.refs.validationMessage.style.left).toEqual('25px');
          });
        });

        describe('when offscreen', () => {
          it('sets the class to flipped', () => {
            instance.setState({ valid: false, errorMessage: 'foo' });
            instance.refs.validationMessage = {
              offsetWidth: 0,
              offsetHeight: 30,
              style: {
                left: 0,
                top: 0
              },
              getBoundingClientRect: function() {
                return {
                  left: 0
                };
              }
            };
            spyOn(ReactDOM, 'findDOMNode').and.returnValue({
              offsetLeft: 20,
              offsetWidth: 10,
              offsetTop: 30
            });
            instance._window = {
              innerWidth: -1
            };
            instance.componentDidUpdate();
            expect(instance.refs.validationMessage.className).toContain('common-input__message--flipped');
          });
        });
      });
    });
  });

  describe('componentWillMount', () => {
    describe('when the component does not have a componentWillMount method', () => {
      it('still works', () => {
        let simpleInstance = TestUtils.renderIntoDocument(React.createElement(SimpleComponent));
        expect(simpleInstance.componentWillMount()).toBe(undefined);
      });
    });

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
    describe('when the component does not have a componentWillUnmount method', () => {
      it('still works', () => {
        let simpleInstance = TestUtils.renderIntoDocument(React.createElement(SimpleComponent));
        expect(simpleInstance.componentWillUnmount()).toBe(undefined);
      });
    });

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
          expect(validationOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props);
          expect(validationTwo.validate).toHaveBeenCalledWith(instance.props.value, instance.props);
          expect(validationThree.validate).toHaveBeenCalledWith(instance.props.value, instance.props);
        });

        describe('when the inputs state is currently valid', () => {
          describe('when the input has a form', () => {
            it('calls incrementErrorCount', () => {
              spyOn(instance.context.form, 'incrementErrorCount');
              instance.validate();
              expect(instance.context.form.incrementErrorCount).toHaveBeenCalled();
            });
          });

          describe('when the input is within a tab', () => {
            it('sets the notfies the tab that it is invalid', () => {
              let spy = jasmine.createSpy();
              instance.context.tab = { setValidity: spy };
              instance.validate()

              expect(spy).toHaveBeenCalledWith(false);
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

    describe('when message is locked', () => {
      it('unlocks it', () => {
        instance.setState({ messageLocked: true });
        spyOn(instance, 'setState');
        instance._handleBlur();
        expect(instance.setState).toHaveBeenCalledWith({ messageLocked: false });
      });
    });

    describe('when message is not locked', () => {
      it('does nothing', () => {
        instance.setState({ messageLocked: false });
        spyOn(instance, 'setState');
        instance._handleBlur();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('_handleFocus', () => {
    describe('when the input is invalid and the field gets focus', () => {
      it('should call setState to lock the message', () => {
        instance.setState({ valid: false });
        spyOn(instance, 'setState');
        instance._handleFocus();
        expect(instance.setState).toHaveBeenCalledWith({ messageLocked: true });
      });
    });

    describe('when the input is valid and the field gets focus', () => {
      it('should not call setState', () => {
        instance.setState({ valid: true });
        spyOn(instance, 'setState');
        instance._handleFocus();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('_handleContentChange', () => {
    describe('when the input is invalid and key down occurs', () => {
      it('should call setState to lock the message', () => {
        instance.setState({ valid: false });
        spyOn(instance, 'setState');
        instance._handleContentChange();
        expect(instance.setState).toHaveBeenCalledWith({ errorMessage: null, valid: true });
      });
    });

    describe('when the input is valid and key down occurs', () => {
      it('should not call setState', () => {
        instance.setState({ valid: true });
        spyOn(instance, 'setState');
        instance._handleContentChange();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('when the input has a form', () => {
      it('should call decrementErrorCount', () => {
        instance.setState({ valid: false });
        instance.context.form = form;
        spyOn(instance.context.form, 'decrementErrorCount');
        instance._handleContentChange();

        expect(instance.context.form.decrementErrorCount).toHaveBeenCalled();
      });
    });

    describe('when the input is within a tab', () => {
      it('notifies the tab of the new validations state', () => {
        instance.setState({ valid: false });
        let spy = jasmine.createSpy();
        instance.context.tab = { setValidity: spy };
        instance._handleContentChange();

        expect(spy).toHaveBeenCalledWith(true);
      });
    });

    describe('when the input does not have a form', () => {
      it('should not throw an error', () => {
        instance.setState({ valid: false });
        expect(instance._handleContentChange).not.toThrow();
      });
    });
  });

  describe('validationHTML', () => {
    describe('there is no error message', () => {
      it('returns null', () => {
        instance.setState({ valid: false });
        expect(instance.validationHTML).toBe(null);
      });
    });

    describe('the field is valid', () => {
      it('returns null', () => {
        instance.setState({ valid: true });
        expect(instance.validationHTML).toBe(null);
      });
    });

    describe('there is an error', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          validations: [validationThree],
          value: 'foo'
        }));

        instance.validate();
      });

      it('returns an error icon', () => {
        expect(instance.validationHTML[0].props.type).toEqual('error');
        expect(instance.validationHTML[0].props.className).toEqual('common-input__icon common-input__icon--error');
      });

      it('returns a div for the error message', () => {
        expect(instance.validationHTML[1].props.className).toEqual('common-input__message-wrapper');

        expect(instance.validationHTML[1].props.children.props.className).toEqual('common-input__message common-input__message--error');
        expect(instance.validationHTML[1].props.children.props.children).toEqual('foo');
      });

      describe('when the message is locked', () => {
        it('adds a locked class', () => {
          instance.setState({ messageLocked: true });
          expect(instance.refs.validationMessage.classList).toContain('common-input__message--locked');
        });
      });
    });
  });

  describe('mainClasses', () => {
    describe('when there is an error', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          validations: [validationThree],
          value: 'foo'
        }));

        instance.validate();
      });

      it('returns with an error class', () => {
        expect(instance.mainClasses).toMatch('common-input--error');
      });
    });

    describe('when there is no error', () => {
      beforeEach(() => {
        instance.validate();
      });

      it('returns with an error class', () => {
        expect(instance.mainClasses).not.toMatch('common-input--error');
      });
    });
  });

  describe('inputClasses', () => {
    describe('when there is an error', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          validations: [validationThree],
          value: 'foo'
        }));

        instance.validate();
      });

      it('returns with an error class', () => {
        expect(instance.inputClasses).toMatch('common-input__input--error');
      });
    });

    describe('when there is no error', () => {
      beforeEach(() => {
        instance.validate();
      });

      it('returns with an error class', () => {
        expect(instance.inputClasses).not.toMatch('common-input__input--error');
      });
    });
  });

  describe('inputProps', () => {
    describe('with no super inputProps', () => {
      it('still works', () => {
        let simpleInstance = TestUtils.renderIntoDocument(React.createElement(SimpleComponent));
        expect(simpleInstance.inputProps).toBeDefined();
      });
    });

    it('sets an onBlur event of chained functions', () => {
      spyOn(instance, '_handleBlur');
      spyOn(instance, 'onBlur');
      instance.inputProps.onBlur();
      expect(instance._handleBlur).toHaveBeenCalled();
      expect(instance.onBlur).toHaveBeenCalled();
    });

    it('sets an onFocus event of chained functions', () => {
      spyOn(instance, '_handleFocus');
      spyOn(instance, 'onFocus');
      instance.inputProps.onFocus();
      expect(instance._handleFocus).toHaveBeenCalled();
      expect(instance.onFocus).toHaveBeenCalled();
    });
  });
});
