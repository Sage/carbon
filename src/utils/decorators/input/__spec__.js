import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Input from './input';
import Icon from './../../../components/icon';
import Help from './../../../components/help';
import { shallow } from 'enzyme';

class TestClassOne extends React.Component {

  static safeProps = ['name'];

  get mainClasses() {
    return "testMain"
  }

  get inputClasses() {
    return "testInput"
  }

  render() {
    return <div></div>;
  }
}

class TestClassTwo extends React.Component {
  count = 0;

  shouldComponentUpdate(nextProps, nextState) {
    this.count++;
  }

  get inputProps() {
    let { ...props } = this.props;
    return props;
  }

  render() {
    return <div></div>;
  }
}

let ExtendedClassOne = Input(TestClassOne);
let ExtendedClassTwo = Input(TestClassTwo);
let klass = new ExtendedClassOne;

describe('Input', () => {
  let instance, instanceTwo, onChange, inputHelp;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
      name: 'foo'
    }));

    instanceTwo = TestUtils.renderIntoDocument(React.createElement(ExtendedClassTwo, {
      name: 'bar',
      'data-role': 'foo',
      'data-element': 'input'
    }));

    onChange = jasmine.createSpy('onChange');
  });

  describe('safeProps', () => {
    it('sets common safeprops', () => {
      expect(instanceTwo.constructor.safeProps).toEqual(['value']);
    });

    it('merges decorated component safeprops with common safeprops', () => {
      expect(instance.constructor.safeProps).toEqual(['name', 'value']);
    });
  });

  describe('componentDidMount', () => {
    describe('if prefix is not set', () => {
      it('does not set text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {}));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidMount();
        expect(instance.setTextIndentation).not.toHaveBeenCalled();
      });
    });

    describe('if prefix is set', () => {
      it('sets text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          prefix: "foo"
        }));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidMount();
        expect(instance.setTextIndentation).toHaveBeenCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    describe('if prefix has not changed', () => {
      it('does not set the text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          prefix: "foo"
        }));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidUpdate({ prefix: 'foo' });
        expect(instance.setTextIndentation).not.toHaveBeenCalled();
      });
    });

    describe('if prefix has changed', () => {
      it('sets the text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          prefix: "foo"
        }));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidUpdate({ prefix: 'bar' });
        expect(instance.setTextIndentation).toHaveBeenCalled();
      });
    });

    describe('if icon has not changed', () => {
      it('does not set the text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          icon: "foo"
        }));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidUpdate({ icon: 'foo' });
        expect(instance.setTextIndentation).not.toHaveBeenCalled();
      });
    });

    describe('if icon has changed', () => {
      it('sets the text indentation', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          icon: "foo"
        }));
        spyOn(instance, 'setTextIndentation');
        instance.componentDidUpdate({ icon: 'bar' });
        expect(instance.setTextIndentation).toHaveBeenCalled();
      });
    });
  });

  describe('shouldComponentUpdate', () => {
    it('returns true if props have changed', () => {
      let nextProps = { name: 'bar' };
      let nextState = instance.state;

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('returns true if state has changed', () => {
      let nextProps = instance.props;
      let nextState = [1,2,3];

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('returns false if neither state nor props have changed', () => {
      let nextProps = instance.props;
      let nextState = instance.state;

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeFalsy();
    });

    describe('when the component defines a shouldComponentUpdate function', () => {
      it('calls the components function as well', () => {
        let nextProps = { name: 'bar' };
        let nextState = instance.state;

        expect(instanceTwo.shouldComponentUpdate(nextProps, nextState)).toBeTruthy;
        instance.shouldComponentUpdate(nextProps, nextState);
        expect(instanceTwo.count).toEqual(1);
      });
    });
  });

  describe('_handleOnChange', () => {
    it('calls the components onChange handler if it has one', () => {
      instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
        onChange: onChange,
        name: 'foo'
      }));
      instance._handleOnChange('foo')
      expect(onChange).toHaveBeenCalledWith('foo', instance.props);
    });

    it('should not call the onChange handler if the component has no onChange handler', () => {
      instance._handleOnChange('foo')
      expect(onChange).not.toHaveBeenCalled()
    });
  });

  describe('mainClasses', () => {
    describe('When readOnly', () => {
      it('returns classes with readonly class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          onChange: onChange,
          name: 'foo',
          readOnly: true
        }));
        expect(instance.mainClasses).toEqual('testMain common-input common-input--readonly');
      });
    });

    describe('When the component includes main class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('testMain common-input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.mainClasses).toEqual('common-input');
      });
    });

    describe('When custom classes are added', () => {
      it('returns component and additional custom classes', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          className: 'foobar',
          name: 'foo'
        }));
        expect(instance.mainClasses).toEqual('testMain foobar common-input');
      });
    });

    describe('When an alignment is provided', () => {
      it('returns with a align class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          align: 'right',
          name: 'foo'
        }));
        expect(instance.mainClasses).toEqual('testMain common-input common-input--align-right');
      });
    });

    describe('When a prefix is provided', () => {
      it('returns with a prefix class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          prefix: 'foo'
        }));
        expect(instance.mainClasses).toEqual('testMain common-input common-input--with-prefix');
      });
    });

    describe('When disabled', () => {
      it('returns with a disabled class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          disabled: true
        }));
        expect(instance.mainClasses).toEqual('testMain common-input common-input--disabled');
      });
    });
  });

  describe('inputClasses', () => {
    describe('When the component includes input class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.inputClasses).toEqual('testInput common-input__input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.inputClasses).toEqual(' common-input__input');
      });
    });
  });

  describe('inputProps', () => {
    it('adds a data-element prop', () => {
      expect(instanceTwo.inputProps["data-element"]).toEqual("input");
    });

    it('deletes data-role prop - the role shouldnt get through to the HTML', () => {
      expect(instanceTwo.inputProps["data-role"]).toBe(undefined);
    });

    describe('when autoComplete is not defined', () => {
      it('disables autoComplete', () => {
        expect(instanceTwo.inputProps.autoComplete).toEqual("off");
      });
    });

    describe('when autoComplete is defined', () => {
      it('sets autoComplete', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          autoComplete: 'on'
        }));
        expect(instance.inputProps.autoComplete).toEqual("on");
      });
    });

    describe('when the component has its own onChange handler', () => {
      it('passes the change event through the Input change handler', () => {
        instanceTwo.inputProps.onChange = onChange;
        expect(instanceTwo.inputProps.onChange).toEqual(instanceTwo._handleOnChange);
      });
    });

    describe('when the component has its own onPaste handler', () => {
      it('passes the paste event to the input element', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          onPaste: () => {}
        }));

        expect(instance.inputProps.onPaste).toEqual(instance.props.onPaste);
      });
    });
  });

  describe('fieldProps', () => {
    it('adds a class name', () => {
      expect(instanceTwo.fieldProps.className).toEqual('common-input__field');
    });
  });

  describe('setTextIdentation', () => {
    it('sets the paddingLeft to the width + 11 px', () => {
      instance._input = { style: {} };
      instance._prefix = { offsetWidth: 20 };
      instance.setTextIndentation()
      expect(instance._input.style.paddingLeft).toEqual("31px");
    });

    it('resets padding left if prefix does not exist', () => {
      instance._input = { style: { paddingLeft: "31px" } };
      instance._prefix = undefined;
      instance.setTextIndentation()
      expect(instance._input.style.paddingLeft).toEqual("");
    });
  });


  describe('iconHTML', () => {
    it('returns a div with a icon', () => {
      instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
        icon: "foo"
      }));
      expect(instance.iconHTML.props.className).toEqual('common-input__input-icon');
      expect(instance.iconHTML.props.children).toEqual(<Icon type='foo' />);
    });
  });

  describe('inputHelpHTML', () => {
    beforeEach(() => {
      klass.props = {
        inputHelp: 'Here is some help'
      };
      inputHelp = shallow(klass.inputHelpHTML);
    });

    it('returns a div with a icon', () => {
      expect(inputHelp.props().className).toEqual('carbon-help common-input__input-help');
      let help = inputHelp.props().children;
      expect(help.props.tooltipMessage).toEqual('Here is some help');
      expect(help.props.tooltipPosition).toEqual('top');
      expect(help.props.tooltipAlign).toEqual('center');
      expect(help.props.type).toEqual('help');
    });
  });

  describe('prefixHTML', () => {
    describe('when prefix is defined', () => {
      it('returns a div with a prefix', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          prefix: "foo"
        }));
        instance.prefixHTML.ref("input");
        expect(instance.prefixHTML.props.className).toEqual('common-input__prefix');
        expect(instance._prefix).toEqual('input');
        expect(instance.prefixHTML.props.children).toEqual('foo');
      });
    });

    describe('when prefix is not defined', () => {
      it('returns nothing', () => {
        expect(instance.prefixHTML).toBe(undefined);
      });
    });
  });

  describe('fakeInput', () => {
    it('renders a div with classes and mouse over event', () => {
      instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
        fakeInput: true
      }));

      let input = instance.inputHTML.props.children[2];

      expect(input.props.className).toEqual('common-input__input--fake');
      expect(input.props.onMouseOver).toEqual(instance.inputProps.onMouseOver);
    });
  });
});
