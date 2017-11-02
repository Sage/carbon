import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

import ButtonToggleGroup from './button-toggle-group';
import ButtonToggle from './../button-toggle';

describe('ButtonToggleGroup', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <ButtonToggleGroup
        label={ 'Label' }
        value={ 'foo' }
      >
        <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
      </ButtonToggleGroup>
    );
  });

  describe('componentWillReceiveProps', () => {
    describe('when invalid', () => {
      beforeEach(() => {
        instance.setState({ valid: false, warning: true, info: true });
        spyOn(instance, 'setState').and.callThrough();
        spyOn(instance, '_handleContentChange');
      });

      describe('when the next value matches the current value', () => {
        it('does not call validate', () => {
          spyOn(instance, 'validate');
          instance.componentWillReceiveProps({ value: instance.props.value });
          expect(instance.validate).not.toHaveBeenCalled();
        });
      });

      describe('when the next value does not match the current value', () => {
        it('calls validate with the next value', () => {
          spyOn(instance, 'validate');
          instance.componentWillReceiveProps({ value: 'bar' });
          expect(instance.validate).toHaveBeenCalledWith('bar');
        });

        it('calls warning with the next value', () => {
          spyOn(instance, 'warning');
          instance.componentWillReceiveProps({ value: 'bar' });
          expect(instance.warning).toHaveBeenCalledWith('bar');
        });

        it('calls info with the next value', () => {
          spyOn(instance, 'info');
          instance.componentWillReceiveProps({ value: 'bar' });
          expect(instance.info).toHaveBeenCalledWith('bar');
        });

        describe('when it returns valid', () => {
          it('resets valid to be truthy', () => {
            spyOn(instance, 'validate').and.returnValue(true);
            instance.componentWillReceiveProps({ value: 'bar' });
            expect(instance.setState).toHaveBeenCalledWith({ valid: true });
            expect(instance._handleContentChange).toHaveBeenCalled();
          });
        });

        describe('when it returns invalid', () => {
          it('does not modify the validity', () => {
            spyOn(instance, 'validate').and.returnValue(false);
            spyOn(instance, 'warning').and.returnValue(true);
            instance.componentWillReceiveProps({ value: 'bar' });
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
            instance.componentWillReceiveProps({ value: 'bar' });
            expect(instance.warning).toHaveBeenCalledWith('bar');
          });

          describe('when no longer has a warning state', () => {
            it('set warning to be false', () => {
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'warning').and.returnValue(false);
              instance.componentWillReceiveProps({ value: 'bar' });
              expect(instance.setState).toHaveBeenCalledWith({ warning: false });
              expect(instance._handleContentChange).toHaveBeenCalled();
            });
          });

          describe('when it still has a warning state', () => {
            it('does not modify the validity', () => {
              instance.setState.calls.reset();
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'warning').and.returnValue(true);
              instance.componentWillReceiveProps({ value: 'bar' });
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
            instance.componentWillReceiveProps({ value: 'bar' });
            expect(instance.info).toHaveBeenCalledWith('bar');
          });

          describe('when it no longer has an info state', () => {
            it('set the info state to be false', () => {
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'info').and.returnValue(false);
              instance.componentWillReceiveProps({ value: 'bar' });
              expect(instance.setState).toHaveBeenCalledWith({ info: false });
              expect(instance._handleContentChange).toHaveBeenCalled();
            });
          });

          describe('when it still has an info state', () => {
            it('does not modify the validity', () => {
              instance.setState.calls.reset();
              spyOn(instance, 'validate').and.returnValue(true);
              spyOn(instance, 'info').and.returnValue(true);
              instance.componentWillReceiveProps({ value: 'bar' });
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

  describe('mainClasses', () => {
    describe('when no additional classes are passed through', () => {
      it('returns carbon-button-toggle-group and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('carbon-button-toggle-group common-input');
      });
    });

    describe('when no additional classes are passed through', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <ButtonToggleGroup
            className={ 'test-class' }
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
      });

      it('returns carbon-button-toggle-group and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('carbon-button-toggle-group test-class common-input');
      });
    });
  });

  describe('render', () => {
    it('renders a parent div', () => {
      const groupNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(groupNode.classList[0]).toEqual('carbon-button-toggle-group');
    });

    describe('when the child components have an id prop', () => {
      it('is decorated with a label', () => {
        const label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
        expect(label.getAttribute('for')).toEqual('test');
      });
    });

    describe('when the child components do not have an id prop', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <ButtonToggleGroup
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
      });

      it('is decorated with a label', () => {
        const label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
        expect(label.getAttribute('for')).toBeNull();
      });
    });

    it('is decorated with a validation if a error is present', () => {
      instance.setState({ errorMessage: 'Error', valid: false });
      const errorDiv = TestUtils.findRenderedDOMComponentWithClass(instance, 'common-input__message--error');
      expect(errorDiv.textContent).toEqual('Error');
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(
      <ButtonToggleGroup
        className={ 'test-class' }
        label={ 'Label' }
        value={ 'foo' }
        data-element='bar'
        data-role='baz'
      >
        <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
      </ButtonToggleGroup>
    );

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'button-toggle-group', 'bar', 'baz');
    });
  });
});
