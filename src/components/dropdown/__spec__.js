import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dropdown from './dropdown';
import Immutable from 'immutable';

describe('Dropdown', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Dropdown name="foo" options={ Immutable.fromJS([{}]) } value="1" />
    );
  });

  describe('constructor', () => {
    it('sets default class properties', () => {
      expect(instance.blockBlur).toBeFalsy();
      expect(instance.visibleValue).toBe('');
    });

    it('sets default state', () => {
      expect(instance.state.open).toBeFalsy();
      expect(instance.state.highlighted).toBe(null);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when next value does not equal current value', () => {
      it('resets visibleValue', () => {
        instance.visibleValue = "foobar";
        instance.componentWillReceiveProps({
          value: "2"
        });
        expect(instance.visibleValue).toBe(null);
      });
    });

    describe('when next value does equal current value', () => {
      it('resets visibleValue', () => {
        instance.visibleValue = "foobar";
        instance.componentWillReceiveProps({
          value: "1"
        });
        expect(instance.visibleValue).toBe("foobar");
      });
    });
  });

  describe('selectValue', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      spyOn(instance, 'emitOnChangeCallback');
    });

    it('sets blockBlur to false', () => {
      instance.blockBlur = true;
      instance.selectValue('10', 'foo');
      expect(instance.blockBlur).toBeFalsy();
    });

    it('calls setState', () => {
      instance.selectValue('10', 'foo');
      expect(instance.setState).toHaveBeenCalledWith({ open: false });
    });

    it('calls emitOnChangeCallback', () => {
      instance.selectValue('10', 'foo');
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('10', 'foo');
    });
  });

  describe('emitOnChangeCallback', () => {
    it('calls _handleOnChange', () => {
      spyOn(instance, '_handleOnChange');
      instance.emitOnChangeCallback('10', 'foo');
      expect(instance._handleOnChange).toHaveBeenCalledWith({
        target: {
          value: '10',
          visibleValue: 'foo'
        }
      });
    });
  });

  describe('handleSelect', () => {
    it('calls selectValue', () => {
      spyOn(instance, 'selectValue');
      instance.handleSelect({
        currentTarget: {
          getAttribute: function() { return 'foo' },
          textContent: 'bar'
        }
      });

      expect(instance.selectValue).toHaveBeenCalledWith('foo', 'bar');
    });
  });

  describe('handleMouseOverListItem', () => {
    it('calls setState', () => {
      spyOn(instance, 'setState');
      instance.handleMouseOverListItem({
        currentTarget: {
          getAttribute: function() { return 'foo' }
        }
      });

      expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'foo' });
    });
  });

  describe('handleMouseEnterList', () => {
    it('sets blockBlur to true', () => {
      instance.blockBlur = false;
      TestUtils.Simulate.mouseEnter(instance.refs.listBlock);
      expect(instance.blockBlur).toBeTruthy;
    });
  });

  describe('handleMouseLeaveList', () => {
    it('sets blockBlur to true', () => {
      instance.blockBlur = true;
      TestUtils.Simulate.mouseLeave(instance.refs.listBlock);
      expect(instance.blockBlur).toBeFalsy;
    });
  });

  describe('handleMouseDownOnList', () => {
    beforeEach(() => {
      spyOn(instance.refs.input, 'focus');
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('if target is the list', () => {
      it('calls focus on the input after a timeout', () => {
        TestUtils.Simulate.mouseDown(instance.refs.listBlock, {
          target: instance.refs.list
        });
        jasmine.clock().tick();
        expect(instance.refs.input.focus).toHaveBeenCalled();
      });
    });

    describe('if target is not the list', () => {
      it('does not call focus on the input', () => {
        TestUtils.Simulate.mouseDown(instance.refs.listBlock, {
          target: 'foo'
        });
        jasmine.clock().tick();
        expect(instance.refs.input.focus).not.toHaveBeenCalled();
      });
    });
  });

  describe('handleBlur', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
    });

    describe('if blur is blocked', () => {
      it('does not call setState', () => {
        instance.blockBlur = true;
        TestUtils.Simulate.blur(instance.refs.input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if blur is not blocked', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown options={ Immutable.fromJS([{ id: '1', name: 'foo' }, { id: '2', name: 'bar' }]) } value="1" />
        );
        spyOn(instance, 'setState');
        spyOn(instance, 'emitOnChangeCallback');
      });

      it('calls setState', () => {
        instance.blockBlur = false;
        TestUtils.Simulate.blur(instance.refs.input);
        expect(instance.setState).toHaveBeenCalledWith({ open: false });
      });

      describe('if highlighted matches value', () => {
        it('does not emit change', () => {
          spyOn(instance, 'highlighted').and.returnValue(instance.props.value);
          TestUtils.Simulate.blur(instance.refs.input);
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('if highlighted does not match value', () => {
        it('emits change', () => {
          spyOn(instance, 'highlighted').and.returnValue('2');
          TestUtils.Simulate.blur(instance.refs.input);
          expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('2', 'bar');
        });
      });
    });
  });

  describe('handleFocus', () => {
    it('calls setState', () => {
      spyOn(instance, 'setState');
      TestUtils.Simulate.focus(instance.refs.input);
      expect(instance.setState).toHaveBeenCalledWith({
        open: true
      });
    });

    describe('if readOnly', () => {
      it('does not call setState by focus', () => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } readOnly={ true } />
        );
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance.refs.input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if disabled', () => {
      it('does not call setState by focus', () => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } disabled={ true } />
        );
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance.refs.input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('nameByID', () => {
    describe('if there are no options', () => {
      it('returns the visible value', () => {
        expect(instance.nameByID()).toEqual(instance.visibleValue);
      });
    });

    describe('if there are options', () => {
      describe('if there is no value', () => {
        it('it returns the visible value', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.Map([]) } value="" />
          );
          expect(instance.nameByID()).toEqual(instance.visibleValue);
        });
      });

      describe('if there is a value', () => {
        describe('if a match is found', () => {
          it('returns the correct value', () => {
            instance = TestUtils.renderIntoDocument(
              <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } value="1" />
            );
            expect(instance.nameByID()).toEqual('foo');
          });
        });

        describe('if no match is found', () => {
          it('returns the visible value', () => {
            instance = TestUtils.renderIntoDocument(
              <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } value="2" />
            );
            expect(instance.nameByID()).toEqual(instance.visibleValue);
          });
        });
      });
    });
  });

  describe('handleKeyDown', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value="" />
      );
    });

    describe('if there is no list', () => {
      it('returns nothing', () => {
        expect(instance.handleKeyDown()).toBe(undefined);
      });
    });

    describe('if there is a list', () => {
      beforeEach(() => {
        instance.setState({ open: true });
      });

      describe('if return key', () => {
        let spy, opts;

        beforeEach(() => {
          spyOn(instance, 'selectValue');
          spy = jasmine.createSpy();
          opts = { which: 13, preventDefault: spy };
        });

        describe('if something is highlighted', () => {
          beforeEach(() => {
            instance.setState({ highlighted: 1 });
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
          });

          it('prevents default', () => {
            expect(spy).toHaveBeenCalled();
          });

          it('calls setValue', () => {
            expect(instance.selectValue).toHaveBeenCalledWith(1, 'foo');
          });
        });

        describe('if something is not highlighted', () => {
          it('does not prevent default', () => {
            instance.setState({ highlighted: 'abc' }); // value which does not exist
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
            expect(spy).not.toHaveBeenCalled();
          });
        });
      });

      describe('up arrow', () => {
        let spy, opts;

        beforeEach(() => {
          spy = jasmine.createSpy();
          opts = { which: 38, preventDefault: spy };
        });

        it('prevents default', () => {
          TestUtils.Simulate.keyDown(instance.refs.input, opts);
          expect(spy).toHaveBeenCalled();
        });

        describe('if there is a next sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 1 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 2 });
          });
        });

        describe('if there is no next sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 2 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 1 });
          });
        });
      });

      describe('down arrow', () => {
        let spy, opts;

        beforeEach(() => {
          spy = jasmine.createSpy();
          opts = { which: 40, preventDefault: spy };
        });

        it('prevents default', () => {
          TestUtils.Simulate.keyDown(instance.refs.input, opts);
          expect(spy).toHaveBeenCalled();
        });

        describe('if there is a previous sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 2 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 1 });
          });
        });

        describe('if there is no next sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 1 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance.refs.input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 2 });
          });
        });
      });
    });
  });

  describe('highlighted', () => {
    let opts;

    beforeEach(() => {
      opts = [{
        id: '1',
        name: 'foo'
      }, {
        id: '2',
        name: 'bar'
      }];
    });

    describe('if there is a highlighted state', () => {
      it('returns the highlighted state', () => {
        instance.setState({ highlighted: 'foo' });
        expect(instance.highlighted(opts)).toEqual('foo');
      });
    });

    describe('if there is no highlighted state', () => {
      describe('if there is a value', () => {
        it('returns the value', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="50" />
          );
          expect(instance.highlighted(opts)).toEqual('50');
        });
      });

      describe('if there is no value', () => {
        it('returns first option in the list', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="" />
          );
          expect(instance.highlighted(opts)).toEqual('1');
        });
      });

      describe('if there is no value and no options', () => {
        it('returns null', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="" />
          );
          expect(instance.highlighted([])).toBe(null);
        });
      });
    });
  });

  describe('inputProps', () => {
    it('returns the correct data', () => {
      instance.visibleValue = 'foo';
      expect(instance.inputProps.className).toEqual(instance.inputClasses);
      expect(instance.inputProps.name).toBe(null);
      expect(instance.inputProps.ref).toEqual("input");
      expect(instance.inputProps.readOnly).toBeTruthy();
      expect(instance.inputProps.value).toEqual('foo');
    });

    describe('if there is no visibleValue', () => {
      it('sets name to the name by id', () => {
        instance.visibleValue = null;
        spyOn(instance, 'nameByID');
        instance.inputProps;
        expect(instance.nameByID).toHaveBeenCalled();
      });
    });
  });

  describe('hiddenInputProps', () => {
    it('return the correct props', () => {
      expect(instance.hiddenInputProps).toEqual({
        ref: "hidden",
        type: "hidden",
        readOnly: true,
        name: "foo",
        value: instance.props.value
      });
    });
  });

  describe('options', () => {
    it('should return the options', () => {
      expect(instance.options).toEqual(instance.props.options.toJS());
    });
  });

  describe('mainClasses', () => {
    describe('if closed', () => {
      it('should return the main class', () => {
        expect(instance.mainClasses).toEqual('ui-dropdown common-input--with-icon common-input');
      });
    });

    describe('if open', () => {
      it('should return the main classes', () => {
        instance.setState({ open: true });
        expect(instance.mainClasses).toEqual('ui-dropdown ui-dropdown--open common-input--with-icon common-input');
      });
    });
  });

  describe('inputClasses', () => {
    it('should return the classes for the input', () => {
      expect(instance.inputClasses).toEqual('ui-dropdown__input common-input__input');
    });
  });

  describe('listBlockProps', () => {
    it('should return the correct options', () => {
      expect(instance.listBlockProps.key).toEqual('listBlock');
      expect(instance.listBlockProps.ref).toEqual('listBlock');
      expect(instance.listBlockProps.className).toEqual('ui-dropdown__list-block');
    });
  });

  describe('listProps', () => {
    it('should return the correct options', () => {
      expect(instance.listProps.key).toEqual('list');
      expect(instance.listProps.ref).toEqual('list');
      expect(instance.listProps.className).toEqual('ui-dropdown__list');
    });
  });

  describe('listHTML', () => {
    describe('if closed', () => {
      it('returns null', () => {
        expect(instance.listHTML).toBe(null);
      });
    });

    describe('if open', () => {
      it('returns the html', () => {
        instance.setState({ open: true });
        expect(TestUtils.isElement(instance.listHTML)).toBeTruthy();
      });
    });
  });

  describe('results', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dropdown name="foo" options={ Immutable.fromJS([{id: 1, name: 'foo'}, { id: 2, name: 'bar' }]) } value="1" />
      );
    });

    it('returns list of items', () => {
      expect(instance.results(instance.options).length).toEqual(2);
    });

    it('adds selected class', () => {
      expect(instance.results(instance.options)[0].props.className).toEqual('ui-dropdown__list__item ui-dropdown__list__item--highlighted ui-dropdown__list__item--selected');
    });

    it('adds highlighted class', () => {
      instance.setState({ highlighted: 2 });
      expect(instance.results(instance.options)[1].props.className).toEqual('ui-dropdown__list__item ui-dropdown__list__item--highlighted');
    });
  });

  describe('additionalInputContent', () => {
    it('returns the list', () => {
      expect(instance.additionalInputContent[1].props.className).toEqual('ui-dropdown__list-block');
    });

    describe('with suggest disabled', () => {
      it('returns the icon', () => {
        expect(instance.additionalInputContent[0].key).toEqual('label-icon');
      });
    });

    describe('with suggest enabled', () => {
      it('does not return the icon', () => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{id: 1, name: 'foo'}, { id: 2, name: 'bar' }]) } value="1" suggest={ true } />
        );
        expect(instance.additionalInputContent.length).toEqual(1);
        expect(instance.additionalInputContent[0].props.className).toEqual('ui-dropdown__list-block');
      });
    });
  });

  describe('render', () => {
    let dropdown;

    beforeEach(() => {
      dropdown = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-dropdown');
    });

    it('renders the label', () => {
      expect(dropdown.children[0].tagName).toEqual("LABEL");
    });

    it('renders the input', () => {
      expect(dropdown.children[1].tagName).toEqual("DIV");
      expect(dropdown.children[1].children[0].tagName).toEqual("INPUT");
    });

    it('renders the hidden input', () => {
      expect(dropdown.children[2].tagName).toEqual("INPUT");
    });
  });
});
