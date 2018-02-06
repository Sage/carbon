import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import InputValidation from './input-validation';
import InputLabel from './../input-label';
import Dialog from './../../../components/dialog';
import Browser from './../../helpers/browser';

/* global jest */

const validationOne = {
  validate: function() {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

const validationTwo = {
  validate: function() {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

const validationThree = {
  validate: function() {
    return false;
  },

  message: function() {
    return 'foo';
  }
};

const warningOne = {
  validate: function(value, props, updateWarning) {
    return false;
  },

  message: function() {
    return 'foo';
  }
};

const warningTwo = {
  validate: function(value, props, updateWarning) {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

const infoOne = {
  validate: function(value, props, updateInfo) {
    return false;
  },

  message: function() {
    return 'foo';
  }
};

const infoTwo = {
  validate: function(value, props, updateInfo) {
    return true;
  },

  message: function() {
    return 'foo';
  }
};

const form = {
  attachToForm: function() {},
  decrementErrorCount: function() {},
  decrementWarningCount: function() {},
  detachFromForm: function() {},
  getActiveInput: function() {},
  incrementErrorCount: function() {},
  incrementWarningCount: function() {},
  inputs: { "123": {} },
  model: 'model_2',
  setActiveInput: function() {}
};

class DummyInputWithoutLifecycleMethods extends React.Component {
  render() {
    return <div ref={ (c) => { this._target = c } }><input { ...this.inputProps } />{ this.validationHTML }</div>;
  }
}

class DummyInput extends DummyInputWithoutLifecycleMethods {
  _guid = "123"

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

class LabelClass extends React.Component {
  render() {
    return <div>{ this.validationHTML }</div>;
  }
}

// Required to test icon positioning
const LabelComponent = InputLabel(InputValidation(LabelClass));

const SimpleComponent = InputValidation(DummyInputWithoutLifecycleMethods);
const Component = InputValidation(DummyInput);

describe('InputValidation', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(Component));
  });

  describe('constructor', () => {
    it('instatiates state with some defaults', () => {
      expect(instance.state.valid).toBeTruthy();
      expect(instance.state.warning).toBeFalsy();
      expect(instance.state.info).toBeFalsy();
      expect(instance.state.errorMessage).toBe(null);
      expect(instance.state.warningMessage).toBe(null);
      expect(instance.state.infoMessage).toBe(null);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when invalid', () => {
      beforeEach(() => {
        instance.setState({ valid: false, warning: true, info: true });
        spyOn(instance, 'setState').and.callThrough();
        spyOn(instance, '_handleContentChange');
      });

      describe('when becoming disabled', () => {
        it('calls setState', () => {
          instance.componentWillReceiveProps({ disabled: true });
          expect(instance._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when not becoming disabled', () => {
        it('does not call setState', () => {
          instance.componentWillReceiveProps({ disabled: false });
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });

      describe('when the next value matches the current value', () => {
        it('does not call validate', () => {
          spyOn(instance, 'validate');
          instance.componentWillReceiveProps({ value: instance.props.value });
          expect(instance.validate).not.toHaveBeenCalled();
        });
      });

      describe('when the next value does not match the current value', () => {
        it('does not call validate if it is the currently active input', () => {
          const wrapper = mount(<Component />);
          instance = wrapper.instance();
          instance.context.form = form;
          spyOn(instance.context.form, 'getActiveInput').and.returnValue(instance);
          spyOn(instance, 'validate');
          wrapper.setState({ valid: false });
          wrapper.setProps({ value: 'foo' });
          instance.componentWillReceiveProps({ value: 'foo' });
          expect(instance.validate).not.toHaveBeenCalled();
        });

        it('calls validate with the next value', () => {
          spyOn(instance, 'validate');
          instance.componentWillReceiveProps({ value: 'foo' });
          expect(instance.validate).toHaveBeenCalledWith('foo');
        });

        it('calls warning with the next value', () => {
          spyOn(instance, 'warning');
          instance.componentWillReceiveProps({ value: 'foo' });
          expect(instance.warning).toHaveBeenCalledWith('foo');
        });

        it('calls info with the next value', () => {
          spyOn(instance, 'info');
          instance.componentWillReceiveProps({ value: 'foo' });
          expect(instance.info).toHaveBeenCalledWith('foo');
        });

        describe('when it returns valid', () => {
          it('resets valid to be truthy', () => {
            spyOn(instance, 'validate').and.returnValue(true);
            instance.componentWillReceiveProps({ value: 'foo' });
            expect(instance.setState).toHaveBeenCalledWith({ valid: true });
            expect(instance._handleContentChange).toHaveBeenCalled();
          });
        });

        describe('when it returns invalid', () => {
          it('does not modify the validity', () => {
            spyOn(instance, 'validate').and.returnValue(false);
            spyOn(instance, 'warning').and.returnValue(true);
            instance.componentWillReceiveProps({ value: 'foo' });
            expect(instance.setState).not.toHaveBeenCalled();
            expect(instance._handleContentChange).not.toHaveBeenCalled();
          });
        });

        describe('when it is valid but has a warning state', () => {
          beforeEach(() => {
            instance.setState({ valid: true, warning: true });
          });

          it('calls warning with the next value', () => {
            spyOn(instance, 'warning');
            instance.componentWillReceiveProps({ value: 'foo' });
            expect(instance.warning).toHaveBeenCalledWith('foo');
          });

          describe('when no longer has a warning state', () => {
            it('set warning to be false', () => {
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'warning').and.returnValue(false);
              instance.componentWillReceiveProps({ value: 'foo' });
              expect(instance.setState).toHaveBeenCalledWith({ warning: false });
              expect(instance._handleContentChange).toHaveBeenCalled();
            });
          });

          describe('when it still has a warning state', () => {
            it('does not modify the validity', () => {
              instance.setState.calls.reset();
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'warning').and.returnValue(true);
              instance.componentWillReceiveProps({ value: 'foo' });
              expect(instance.setState).not.toHaveBeenCalled();
              expect(instance._handleContentChange).not.toHaveBeenCalled();
            });
          });
        });

        describe('when it is valid but has an info state', () => {
          beforeEach(() => {
            instance.setState({ valid: true, info: true });
          });

          it('calls info with the next value', () => {
            spyOn(instance, 'info');
            instance.componentWillReceiveProps({ value: 'foo' });
            expect(instance.info).toHaveBeenCalledWith('foo');
          });

          describe('when it no longer has an info state', () => {
            it('set the info state to be false', () => {
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'info').and.returnValue(false);
              instance.componentWillReceiveProps({ value: 'foo' });
              expect(instance.setState).toHaveBeenCalledWith({ info: false });
              expect(instance._handleContentChange).toHaveBeenCalled();
            });
          });

          describe('when it still has an info state', () => {
            it('does not modify the validity', () => {
              instance.setState.calls.reset();
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'info').and.returnValue(true);
              instance.componentWillReceiveProps({ value: 'foo' });
              expect(instance.setState).not.toHaveBeenCalled();
              expect(instance._handleContentChange).not.toHaveBeenCalled();
            });
          });
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

  describe('positionMessage', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    describe('when icon does not exist yet', () => {
      it('returns undefined', () => {
        instance.setState({ valid: false });
        instance.validationIcon = undefined;
        expect(instance.positionMessage()).toEqual(undefined);
      });
    });

    describe('when the component is valid', () => {
      it('does nothing', () => {
        instance.setState({ valid: true });
        expect(instance.positionMessage.bind(instance)).not.toThrow();
      });
    });

    describe('when the component is invalid', () => {
      describe('when there is no icon or message', () => {
        it('does nothing', () => {
          instance.setState({ valid: false });
          spyOn(ReactDOM, 'findDOMNode').and.returnValue(null);
          expect(instance.positionMessage.bind(instance)).not.toThrow();
        });
      });

      describe('when there is an icon and message', () => {
        describe('when onscreen', () => {
          it('sets the correct left position and removes flipped class', () => {
            const removeClassSpy = jasmine.createSpy();
            const addClassSpy = jasmine.createSpy();

            instance.setState({ valid: false, errorMessage: 'foo' });

            spyOn(Browser, 'getWindow').and.returnValue({
              innerWidth: 1800
            });
            instance.validationMessage = {
              classList: {
                add: addClassSpy,
                remove: removeClassSpy
              },
              offsetHeight: 30,
              style: {
                left: 10,
                top: 10
              },
              getBoundingClientRect: () => {
                return {
                  width: 100,
                  height: 30
                };
              }
            };

            instance.validationIcon._target = {
              getBoundingClientRect: () => {
                return {
                  left: 700,
                  top: 100,
                  width: 20,
                  height: 20
                };
              },
              offsetLeft: 20,
              offsetWidth: 10,
              offsetTop: 30
            };
            spyOn(instance, 'setState');
            instance.positionMessage();
            const messageClasses = instance.validationHTML[1].props.children.props.children.props.className;
            expect(messageClasses).not.toMatch('common-input__message--flipped');
            expect(instance.validationMessage.style.left).toEqual('710px');
            expect(instance.validationMessage.style.top).toEqual('50px');
          });
        });

        describe('when offscreen', () => {
          let wrapper;
          beforeEach(() => {
            wrapper = mount(
              <Dialog open>
                <Component validations={ [validationThree] } />
              </Dialog>
            );
          });

          it('sets the class to flipped', () => {
            const addClassSpy = jasmine.createSpy();
            const removeClassSpy = jasmine.createSpy();
            const instance = wrapper.find(Component).instance();
            instance.setState({
              valid: false,
              errorMessage: 'foo'
            });
            instance.validationMessage = {
              offsetWidth: 0,
              offsetHeight: 30,
              style: {
                left: 0,
                top: 0
              },
              classList: {
                add: addClassSpy,
                remove: removeClassSpy
              },
              getBoundingClientRect: () => {
                return {
                  top: 0,
                  left: 0,
                  width: 300,
                  height: 30
                };
              }
            };
            instance.validationIcon._target = {
              offsetLeft: 20,
              offsetWidth: 10,
              offsetTop: 30,
              getBoundingClientRect: () => {
                return {
                  top: 100,
                  left: 900,
                  width: 20,
                  height: 20
                };
              }
            };
            instance._window = {
              innerWidth: -1
            };
            instance.positionMessage();
            wrapper.update();
            expect(wrapper.find('.common-input__message').props().className).toMatch('common-input__message--flipped');
          });
        });
      });
    });
  });

  describe('componentWillMount', () => {
    describe('when the component does not have a componentWillMount method', () => {
      it('still works', () => {
        const simpleInstance = TestUtils.renderIntoDocument(React.createElement(SimpleComponent));
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
      });

      describe('when the input is invalid', () => {
        it('calls handleContentChange', () => {
          instance.state.valid = false;
          spyOn(instance, '_handleContentChange');
          instance.componentWillUnmount();
          expect(instance._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when the input has a warning', () => {
        it('calls handleContentChange', () => {
          instance.state.warning = true;
          spyOn(instance, '_handleContentChange');
          instance.componentWillUnmount();
          expect(instance._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when the input has an info state', () => {
        it('calls handleContentChange', () => {
          instance.state.info = true;
          spyOn(instance, '_handleContentChange');
          instance.componentWillUnmount();
          expect(instance._handleContentChange).toHaveBeenCalled();
        });
      });

      describe('when the input is in a form', () => {
        beforeEach(() => {
          instance.context.form = form;
        });

        it('detaches the input from the form', () => {
          spyOn(instance.context.form, 'detachFromForm');
          instance.componentWillUnmount();
          expect(instance.context.form.detachFromForm).toHaveBeenCalledWith(instance);
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
          expect(validationOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateValidation);
          expect(validationTwo.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateValidation);
          expect(validationThree.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateValidation);
        });

        describe('when the second validation fails', () => {
          it('stops validating', () => {
            instance = TestUtils.renderIntoDocument(React.createElement(Component, {
              validations: [validationOne, validationThree, validationTwo],
              value: 'foo'
            }));
            instance.validate();
            expect(validationOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateValidation);
            expect(validationThree.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateValidation);
            expect(validationTwo.validate).not.toHaveBeenCalled();
          });
        });

        describe('when called with a custom value', () => {
          it('calls validate for each validation', () => {
            instance.validate('foo');
            expect(validationOne.validate).toHaveBeenCalledWith('foo', instance.props, instance.updateValidation);
            expect(validationTwo.validate).toHaveBeenCalledWith('foo', instance.props, instance.updateValidation);
            expect(validationThree.validate).toHaveBeenCalledWith('foo', instance.props, instance.updateValidation);
          });
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
            it('notifies the tab that it is invalid', () => {
              const spy = jasmine.createSpy();
              instance.context.tab = { setValidity: spy };
              instance.validate();

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

  describe('message hide functions', () => {
    describe('showMessage', () => {
      beforeEach(() => {
        instance.context.form = form;
        spyOn(instance.context.form, 'setActiveInput');
      });

      describe('triggers state change and function call', () => {
        it('if not valid', () => {
          instance.setState({
            valid: false,
            warning: false
          });
          spyOn(instance, 'setState');
          instance.showMessage();
          expect(instance.setState).toHaveBeenCalledWith({
            messageShown: true,
            immediatelyHideMessage: false
          }, instance.positionMessage);
          expect(instance.context.form.setActiveInput).toHaveBeenCalledWith(instance);
        });

        it('if warning', () => {
          instance.setState({
            valid: true,
            warning: true
          });
          spyOn(instance, 'setState');
          instance.showMessage();
          expect(instance.setState).toHaveBeenCalledWith({
            messageShown: true,
            immediatelyHideMessage: false
          }, instance.positionMessage);
          expect(instance.context.form.setActiveInput).toHaveBeenCalledWith(instance);
        });

        it('if info', () => {
          instance.setState({
            valid: true,
            info: true
          });
          spyOn(instance, 'setState');
          instance.showMessage();
          expect(instance.setState).toHaveBeenCalledWith({
            messageShown: true,
            immediatelyHideMessage: false
          }, instance.positionMessage);
          expect(instance.context.form.setActiveInput).toHaveBeenCalledWith(instance);
        });

        describe('when there is no form', () => {
          it('does not call setActiveInput', () => {
            instance.context.form = null;
            instance.setState({
              valid: false,
              warning: false
            });
            spyOn(instance, 'setState');
            instance.showMessage();
            expect(instance.setState).toHaveBeenCalledWith({
              messageShown: true,
              immediatelyHideMessage: false
            }, instance.positionMessage);
            expect(form.setActiveInput).not.toHaveBeenCalledWith(instance);
          });
        });
      });

      describe("doesn't trigger state change and function call", () => {
        it('if valid and not a warning', () => {
          instance.setState({
            valid: true,
            warning: false
          });
          spyOn(instance, 'setState');
          instance.showMessage();
          expect(instance.setState).not.toHaveBeenCalled();
          expect(instance.context.form.setActiveInput).not.toHaveBeenCalled();
        });
      });
    });

    describe('hideMessage', () => {
      describe('triggers state change and function call', () => {
        it('if not valid', () => {
          instance.setState({
            valid: false,
            warning: false
          });
          spyOn(instance, 'setState');
          instance.hideMessage();
          expect(instance.setState).toHaveBeenCalledWith({
            messageShown: false
          });
        });
        it('if warning', () => {
          instance.setState({
            valid: true,
            warning: true
          });
          spyOn(instance, 'setState');
          instance.hideMessage();
          expect(instance.setState).toHaveBeenCalledWith({
            messageShown: false
          });
        });
      });
      describe("doesn't trigger state change and function call", () => {
        it('if valid and not a warning', () => {
          instance.setState({
            valid: true,
            warning: false
          });
          spyOn(instance, 'setState');
          instance.hideMessage();
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });
    });

    describe('immediatelyHideMessage', () => {
      it('sets state to hide message instantly', () => {
        spyOn(instance, 'setState');
        instance.immediatelyHideMessage();

        expect(instance.setState).toHaveBeenCalledWith({
          messageShown: false,
          immediatelyHideMessage: true
        });
      });

      it('sets state to hide message instantly', () => {
        spyOn(instance, 'setState').and.callThrough();
        instance.setState({
          valid: false,
          warning: false,
          messageShown: true
        });

        instance.immediatelyHideMessage();

        expect(instance.setState).toHaveBeenCalledWith({
          messageShown: false,
          immediatelyHideMessage: true
        });
      });
    });
  });

  describe('warning', () => {
    describe('when warnings are present on the input', () => {
      describe('when the input has a value', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(React.createElement(Component, {
            warnings: [warningTwo, warningOne],
            value: 'foo'
          }));
          instance.context.form = form;
          spyOn(warningOne, 'validate').and.callThrough();
          spyOn(warningTwo, 'validate').and.callThrough();
        });

        it('calls warning for each warning', () => {
          instance.warning();
          expect(warningOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateWarning);
          expect(warningTwo.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateWarning);
        });

        describe('when the first warning fails', () => {
          it('stops warning', () => {
            instance = TestUtils.renderIntoDocument(React.createElement(Component, {
              warnings: [warningOne, validationTwo],
              value: 'foo'
            }));
            instance.warning();
            expect(warningOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateWarning);
            expect(warningTwo.validate).not.toHaveBeenCalled();
          });
        });

        describe('when called with a custom value', () => {
          it('calls warning for each warning', () => {
            instance.warning('bar');
            expect(warningOne.validate).toHaveBeenCalledWith('bar', instance.props, instance.updateWarning);
            expect(warningTwo.validate).toHaveBeenCalledWith('bar', instance.props, instance.updateWarning);
          });
        });

        describe('when the inputs state is currently no warning', () => {
          describe('when the input has a form', () => {
            it('calls incrementWarningCount', () => {
              spyOn(instance.context.form, 'incrementWarningCount');
              instance.warning();
              expect(instance.context.form.incrementWarningCount).toHaveBeenCalled();
            });
          });

          describe('when the input is within a tab', () => {
            it('sets the notfies the tab that there is warning', () => {
              let spy = jasmine.createSpy('warningSpy');
              instance.context.tab = { setWarning: spy };
              instance.warning();
              expect(spy).toHaveBeenCalledWith(true);
            });
          });

          describe('when the input does not have a form', () => {
            it('is still able to set warning', () => {
              instance.context.form = null;
              expect(instance.warning).not.toThrowError();
            });
          });

          it('calls setState', () => {
            spyOn(instance, 'setState');
            instance.warning();
            expect(instance.setState).toHaveBeenCalledWith({ warningMessage: 'foo', warning: true });
          });
        });

        describe('when the inputs state has warning', () => {
          it('does not call setState', () => {
            instance.setState({ warning: true });
            spyOn(instance, 'setState');
            instance.warning();
            expect(instance.setState).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when no warnings have been set on the input', () => {
      it('defaults the input warnings to true', () => {
        let valid = instance.warning();
        expect(valid).toBeTruthy();
      });
    });
  });

  describe('info', () => {
    describe('when the info prop is present on the input', () => {
      describe('when the input has a value', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mount(React.createElement(Component, {
            info: [infoTwo, infoOne],
            value: 'foo'
          }));
          instance = wrapper.instance();
          instance.context.form = form;
          spyOn(infoTwo, 'validate').and.callThrough();
          spyOn(infoOne, 'validate').and.callThrough();
        });

        it('calls the info function for each element inside the info prop array', () => {
          instance.info();
          expect(infoOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateInfo);
          expect(infoTwo.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateInfo);
        });

        describe('when calling the info function on the first element fails', () => {
          it('stops info', () => {
            wrapper = shallow(React.createElement(Component, {
              info: [infoOne, infoTwo],
              value: 'foo'
            }));
            instance = wrapper.instance();
            instance.info();
            expect(infoOne.validate).toHaveBeenCalledWith(instance.props.value, instance.props, instance.updateInfo);
            expect(infoTwo.validate).not.toHaveBeenCalled();
          });
        });

        describe('when called with a custom value', () => {
          it('calls the info function for each element inside the info prop array', () => {
            instance.info('bar');
            expect(infoOne.validate).toHaveBeenCalledWith('bar', instance.props, instance.updateInfo);
            expect(infoTwo.validate).toHaveBeenCalledWith('bar', instance.props, instance.updateInfo);
          });
        });

        describe('when the input state has no info', () => {
          it('calls setState', () => {
            spyOn(instance, 'setState');
            instance.info();
            expect(instance.setState).toHaveBeenCalledWith({ infoMessage: 'foo', info: true });
          });
        });

        describe('when the input state has info', () => {
          it('does not call setState', () => {
            instance.setState({ warning: true });
            spyOn(instance, 'setState');
            instance.warning();
            expect(instance.setState).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when no info prop is present on the input', () => {
      it('defaults the input info to true', () => {
        let valid = instance.info();
        expect(valid).toBeTruthy();
      });
    });
  });

  describe('_handleBlur', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('calls validate on blur of the input', () => {
      spyOn(instance, 'validate');
      instance._handleBlur();
      jest.runTimersToTime(0);
      expect(instance.validate).toHaveBeenCalled();
    });

    describe('when message is locked', () => {
      it('unlocks it', () => {
        instance.setState({ messageLocked: true });
        spyOn(instance, 'setState');
        instance._handleBlur();
        jest.runTimersToTime(0);
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

      it('should position the message', () => {
        instance.setState({ valid: false });
        spyOn(instance, 'positionMessage');
        instance._handleFocus();
        expect(instance.positionMessage).toHaveBeenCalled();
      });
    });

    describe('when the input is invalid and the field gets focus but message is already locked', () => {
      it('should not call setState', () => {
        instance.setState({ valid: false, messageLocked: true });
        spyOn(instance, 'setState');
        instance._handleFocus();
        expect(instance.setState).not.toHaveBeenCalledWith({ messageLocked: true });
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

  describe('onMouseOver', () => {
    it('calls positionMessage', () => {
      instance.setState({ valid: false });
      spyOn(instance, 'positionMessage');
      instance.fieldProps.onMouseOver();
      expect(instance.positionMessage).toHaveBeenCalled();
    });
  });

  describe('_handleContentChange', () => {
    describe('when the input is invalid and key down occurs', () => {
      it('should call setState to lock the message', () => {
        instance.setState({ valid: false, warning: true });
        spyOn(instance, 'setState');
        instance._handleContentChange();
        expect(instance.setState).toHaveBeenCalledWith({ errorMessage: null, messageShown: false, valid: true, warning: false, info: false });
      });
    });

    describe('when the input is valid and key down occurs', () => {
      it('should not call setState', () => {
        instance.setState({ valid: true, warning: false });
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

      it('should call decrementWarningCount', () => {
        instance.setState({ warning: true });
        instance.context.form = form;
        spyOn(instance.context.form, 'decrementWarningCount');
        instance._handleContentChange();

        expect(instance.context.form.decrementWarningCount).toHaveBeenCalled();
      });
    });

    describe('when the input is within a tab', () => {
      it('calls resetTab', () => {
        instance.context.tab = {};
        instance.setState({ valid: false });
        spyOn(instance, 'resetTab');
        instance._handleContentChange();
        expect(instance.resetTab).toHaveBeenCalled();
      });
    });

    describe('when the input does not have a form', () => {
      it('should not throw an error', () => {
        instance.setState({ valid: false, warning: true });
        expect(instance._handleContentChange).not.toThrow();
      });
    });
  });

  describe('resetTab', () => {
    it('notifies the tab of the new validations state', () => {
      instance.setState({ valid: false });
      let spy = jasmine.createSpy();
      instance.context.tab = { setValidity: spy };
      instance.resetTab();

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('notifies the tab of the new warnings state', () => {
      instance.setState({ warning: true });
      let spy = jasmine.createSpy('warningSpy');
      instance.context.tab = { setWarning: spy };
      instance.resetTab();

      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('validationHTML', () => {
    describe('the field is valid', () => {
      it('returns null', () => {
        instance.setState({ valid: true, warning: false, info: false});
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
        instance.setState({ messageLocked: true });
      });

      it('returns an error icon', () => {
        expect(instance.validationHTML[0].props.type).toEqual('error');
        expect(instance.validationHTML[0].props.className).toEqual('common-input__icon common-input__icon--error');
      });

      it('returns a div for the error message', () => {
        const portalChildren = instance.validationHTML[1].props.children.props;
        expect(portalChildren.className).toEqual('common-input__message-wrapper');

        expect(portalChildren.children.props.className).toEqual('common-input__message common-input__message--error common-input__message--shown');
        expect(portalChildren.children.props.children).toEqual('foo');
      });

      describe('if a label width prop has been applied', () => {
        describe('when the label is right aligned', () => {
          it('sets the appropriate right style', () => {
            let instanceLabel = TestUtils.renderIntoDocument(
              <LabelComponent labelWidth={ 20 } align='right' validations={ [validationThree] } value='foo'/>
            );
            instanceLabel.validate();
            let icon = instanceLabel.validationIcon;
            expect(icon.props.style.right).toEqual('80%');
          });
        });

        describe('when the label is left aligned', () => {
          it('sets the appropriate left style', () => {
            let instanceLabel = TestUtils.renderIntoDocument(
              <LabelComponent labelWidth={ 20 } align='left' validations={ [validationThree] } value='foo'/>
            );
            instanceLabel.validate();
            let icon = instanceLabel.validationIcon
            expect(icon.props.style.left).toEqual('80%');
          });
        });
      });

      describe('when the message is locked', () => {
        it('adds a shown class', () => {
          instance.setState({ messageLocked: true });
          instance.showMessage();
          expect(instance.validationMessage.classList).toContain('common-input__message--shown');
        });
      });
    });

    describe('there is an warning', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(React.createElement(Component, {
          warnings: [warningOne],
          value: 'foo'
        }));

        instance.warning();
        instance.setState({ messageLocked: true });
      });

      it('returns an warning icon', () => {
        expect(instance.validationHTML[0].props.type).toEqual('warning');
        expect(instance.validationHTML[0].props.className).toEqual('common-input__icon common-input__icon--warning');
      });

      it('returns a div for the warning message', () => {
        const portalElement = instance.validationHTML[1].props.children.props;
        expect(portalElement.className).toEqual('common-input__message-wrapper');

        expect(portalElement.children.props.className).toEqual('common-input__message common-input__message--warning common-input__message--shown');
        expect(portalElement.children.props.children).toEqual('foo');
      });
    });

    describe('there is info', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(React.createElement(Component, {
          info: [infoOne],
          value: 'foo'
        }));
        instance = wrapper.instance();
        instance.info();
        instance.setState({ messageShown: true });
      });

      it('returns an info icon', () => {
        expect(instance.validationHTML[0].props.type).toEqual('info');
        expect(instance.validationHTML[0].props.className).toEqual('common-input__icon common-input__icon--info');
      });

      it('returns a div for the info message', () => {
        const portalElement = instance.validationHTML[1].props.children.props;
        expect(portalElement.className).toEqual('common-input__message-wrapper');
        expect(portalElement.children.props.children).toEqual('foo');
        expect(instance.validationHTML[0].props.className).toEqual('common-input__icon common-input__icon--info');
      });

      describe('when the message is locked', () => {
        it('adds a show class', () => {
          instance.setState({ messageLocked: true });
          instance.showMessage();
          expect(instance.validationMessage.classList).toContain('common-input__message--shown');
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

  describe('isAttachedToForm', () => {
    describe('if no form', () => {
      it('returns false', () => {
        instance.context.form = null;
        expect(instance.isAttachedToForm).toBeFalsy();
      });
    });

    describe('if input is not attached to form', () => {
      it('returns false', () => {
        instance.context.form = {
          inputs: {}
        };
        expect(instance.isAttachedToForm).toBeFalsy();
      });
    });

    describe('if input is attached to form', () => {
      it('returns true', () => {
        instance.context.form = {
          inputs: { "123": {} }
        };
        expect(instance.isAttachedToForm).toBeTruthy();
      });
    });
  });

  describe('displayName', () => {
    class Foo extends React.Component { // eslint-disable-line react/no-multi-comp
      bar = () => {
        return 'bar';
      }
    }

    const displayName = 'FooClass';

    describe('when ComposedComponent.displayName is defined', () => {
      beforeEach(() => {
        Foo.displayName = displayName;
      });
      afterEach(() => {
        Foo.displayName = undefined;
      });

      it('sets Component.displayName to ComposedComponent.displayName', () => {
        const DecoratedComponent = InputValidation(Foo);
        expect(DecoratedComponent.displayName).toBe(displayName);
      });
    });

    describe('when ComposedComponent.displayName is undefined', () => {
      it('sets Component.displayName to ComposedComponent.name', () => {
        const DecoratedComponent = InputValidation(Foo);
        expect(DecoratedComponent.displayName).toBe('Foo');
      });
    });
  });
});
