import React from 'react';
import TestUtils from 'react-dom/test-utils';
import DropdownFilter from './dropdown-filter';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ImmutableHelper from './../../utils/helpers/immutable';
import BrowserHelper from './../../utils/helpers/browser';


describe('DropdownFilter', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" />
    );
  });

  describe('constructor', () => {
    it('sets default class properties', () => {
      expect(instance.openingList).toBeFalsy();
    });

    describe('when not in freetext mode', () => {
      it('sets default filter', () => {
        expect(instance.state.filter).toBeNull();
      });
    });

    describe('when in freetext mode', () => {
      describe('when freetext value not set', () => {
        it('sets default filter', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
          );
          expect(instance.state.filter).toBeNull();
        });
      });

      describe('when freetext value set', () => {
        it('sets filter to value', () => {
          let value = 'abc';

          instance = TestUtils.renderIntoDocument(
            <DropdownFilter
              name="foo"
              options={ Immutable.fromJS([]) }
              value=""
              visibleValue={ value }
              freetext={ true }
            />
          );
          expect(instance.state.filter).toEqual(value);
        });
      });
    });
  });

  describe('componentWillUpdate', () => {
    describe('if list is opening', () => {
      it('sets openingList to true', () => {
        instance.componentWillUpdate({}, { open: true });
        expect(instance.openingList).toBeTruthy();
      });
    });

    describe('if list is not opening', () => {
      it('does not set openingList to true', () => {
        instance.componentWillUpdate({}, { open: false });
        expect(instance.openingList).toBeFalsy();
      });
    });
  });

  describe('selectValue', () => {
    it('removes filter', () => {
      spyOn(instance, 'setState');
      instance.selectValue();
      expect(instance.setState).toHaveBeenCalledWith({ filter: null });
    });

    describe('when in freetext mode', () => {
      it('sets filter to visible value', () => {
        let visible = 'Value';

        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
        );
        spyOn(instance, 'setState');
        instance.selectValue('', visible);
        expect(instance.setState).toHaveBeenCalledWith({ filter: visible });
      });
    });
  });

  describe('handleVisibleChange', () => {
    describe('when in suggest mode', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" suggest={ true } />
        );
        spyOn(instance, 'setState');
      });

      describe('when character length is 0', () => {
        it('closes the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: '' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: '',
            highlighted: null
          });
        });
      });

      describe('when character length is greater than 0', () => {
        it('opens the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: 'a' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: true,
            filter: 'a',
            highlighted: null
          });
        });
      });
    });

    describe('when in freetext mode', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
        );
        spyOn(instance, 'setState');
      });

      describe('when character length is 0', () => {
        it('closes the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: '' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: '',
            highlighted: null
          });
        });
      });

      describe('when character length is greater than 0', () => {
        it('opens the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: 'a' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: true,
            filter: 'a',
            highlighted: null
          });
        });
      });
    });

    describe('when not in suggest or freetext mode', () => {
      it('calls setState with the filter even with no chars', () => {
        spyOn(instance, 'setState');
        TestUtils.Simulate.change(instance._input, {
          target: { value: '' }
        });
        expect(instance.setState).toHaveBeenCalledWith({
          filter: '',
          highlighted: null,
          open: true
        });
      });
    });

    describe('when in create mode', () => {
      it('triggers emitOnChangeCallback', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" create={ function() {} } />
        );
        spyOn(instance, 'emitOnChangeCallback');
        TestUtils.Simulate.change(instance._input, {
          target: { value: 'foo' }
        });
        expect(instance.emitOnChangeCallback).toHaveBeenCalledWith("", 'foo');
      });
    });
  });

  describe('handleBlur', () => {
    describe('if blur is blocked', () => {
      it('does not call setState', () => {
        spyOn(instance, 'setState');
        instance.blockBlur = true;
        instance.handleBlur();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if blur is not blocked', () => {
      describe('if in create mode', () => {
        it('preserves filter', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" create={ function() {} } />
          );
          spyOn(instance, 'setState');
          instance.handleBlur();
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: instance.state.filter
          });
        });
      });

      describe('if in freetext mode', () => {
        let optid = '1',
            optnm = 'foobar',
            options = [{ id: optid, name: optnm }];

        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS(options) } value="1" freetext={ true } />
          );
        });

        it('preserves filter', () => {
          spyOn(instance, 'setState');
          instance.handleBlur();
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: instance.state.filter
          });
        });

        describe('when text matches an option name', () => {
          it('selects the option', () => {
            instance.setState({ filter: optnm });
            spyOn(instance, 'selectValue');
            instance.handleBlur();
            expect(instance.selectValue).toHaveBeenCalledWith(optid, optnm);
          });
        });

        describe('when text matches an option name but has a different case', () => {
          it('selects the option', () => {
            instance.setState({ filter: 'FoObAr' });
            spyOn(instance, 'selectValue');
            instance.handleBlur();
            expect(instance.selectValue).toHaveBeenCalledWith(optid, optnm);
          });
        });

        describe('when text does not match an option name', () => {
          it('emits change event with text value', () => {
            let text = 'Other';
            instance.setState({ filter: text });
            spyOn(instance, 'emitOnChangeCallback');
            instance.handleBlur();
            expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('', text);
          });
        });

        describe('when option does not have a name', () => {
          beforeEach(() => {
            options.push({ id: '2', name: null });
            instance = TestUtils.renderIntoDocument(
              <DropdownFilter name="foo" options={ Immutable.fromJS(options) } value="1" freetext={ true } />
            );
          });

          it('does not select the empty option', () => {
            instance.setState({ filter: 'foo' });
            spyOn(instance, 'emitOnChangeCallback');
            instance.handleBlur();
            expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('', 'foo');
          });
        });
      });

      describe('if not in create or freetext mode', () => {
        it('calls setState', () => {
          spyOn(instance, 'setState');
          instance.handleBlur();
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: null
          });
        });
      });

      describe('if highlighted matches value', () => {
        it('does not call emitOnChangeCallback', () => {
          spyOn(instance, 'emitOnChangeCallback');
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when there is no highlighted option', () => {
        it('does not call emitOnChangeCallback', () => {
          spyOn(instance, 'highlighted').and.returnValue(null);
          spyOn(instance, 'emitOnChangeCallback');
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when onBlur is set', () => {
        it('calls onBlur', () => {
          let onBlur = jasmine.createSpy('onBlur');

          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" onBlur={ onBlur } />
          );
          instance.handleBlur();
          expect(onBlur).toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleFocus', () => {
    describe('if in suggest mode', () => {
      it('does not call setState', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" suggest={ true } />
        );
        spyOn(instance, 'setState');
        instance.handleFocus();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if in freetext mode', () => {
      it('does not call setState', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
        );
        spyOn(instance, 'setState');
        instance.handleFocus();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if not in suggest or freetext mode', () => {
      it('calls setState', () => {
        spyOn(instance, 'setState');
        instance.handleFocus();
        expect(instance.setState).toHaveBeenCalledWith({ open: true });
      });

      describe('but focus is blocked', () => {
        it('does not call setState', () => {
          spyOn(instance, 'setState');
          instance.blockFocus = true;
          instance.handleFocus();
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });
    });

    it('calls setSelectionRange', () => {
      spyOn(instance._input, 'setSelectionRange');
      instance.handleFocus();
      expect(instance._input.setSelectionRange).toHaveBeenCalledWith(0, instance._input.value.length);
    });
  });

  describe('handleCreate', () => {
    let spy, ev;

    beforeEach(() => {
      ev = {};
      spy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" create={ spy } />
      );
      spyOn(instance, 'setState');
      instance.handleCreate(ev);
    });

    it('calls setState', () => {
      expect(instance.setState).toHaveBeenCalledWith({ open: false });
    });

    it('calls spy', () => {
      expect(spy).toHaveBeenCalledWith(ev, instance);
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

      instance = TestUtils.renderIntoDocument(
        <DropdownFilter options={ Immutable.fromJS(opts) } value="50" />
      );
    });

    describe('if highlighted is set in state', () => {
      it('returns the highlighted state', () => {
        instance.setState({ highlighted: '99' });
        expect(instance.highlighted(opts)).toEqual('99');
      });
    });

    describe('if highlighted is not set in state', () => {
      describe('if there is no filter state and there is a value', () => {
        it('returns the value', () => {
          expect(instance.highlighted(opts)).toEqual('50');
        });
      });

      describe('if there is a filter state', () => {
        it('returns first value in the list', () => {
          instance.setState({ filter: 'bar' });
          expect(instance.highlighted(opts)).toEqual('1');
        });
      });

      describe('if there is no options', () => {
        it('returns null', () => {
          instance.setState({ filter: 'bar' });
          expect(instance.highlighted([])).toEqual(null);
        });
      });
    });
  });

  describe('prepareList', () => {
    let opts;

    beforeEach(() => {
      opts = [{ name: 'foo' }, { name: 'foobar' }, { name: 'nope' }];
    });

    describe('if filter is not set', () => {
      it('returns the options passed to it', () => {
        instance.setState({ filter: null });
        expect(instance.prepareList(opts)).toEqual(opts);
      });
    });

    describe('if filter is set', () => {
      beforeEach(() => {
        instance.setState({ filter: 'foo' });
      });

      describe('if not in suggest or freetext mode and list is opening', () => {
        it('returns the options passed to it', () => {
          instance.openingList = true;
          expect(instance.prepareList(opts)).toEqual(opts);
        });
      });

      describe('if not in suggest or freetext mode and list is not opening', () => {
        it('filters the list', () => {
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if filter contains invalid characters', () => {
        it('still filters the list', () => {
          instance.setState({ filter: '[]()$£&%' });
          expect(instance.prepareList(opts).length).toEqual(0);
        });
      });

      describe('if in suggest mode and list is opening', () => {
        it('filters the list', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" suggest={ true } />
          );
          instance.openingList = true;
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if in suggest mode and list is not opening', () => {
        it('filters the list', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" suggest={ true } />
          );
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if in freetext mode and list is opening', () => {
        it('filters the list', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
          );
          instance.openingList = true;
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if in freetext mode and list is not opening', () => {
        it('filters the list', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
          );
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });
    });
  });

  describe('results', () => {
    describe('if there are no items', () => {
      it('adds no items option', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.results([]).type).toEqual('li');
        expect(instance.results([]).props.className).toEqual('carbon-dropdown__list-item carbon-dropdown__list-item--no-results');
        expect(instance.results([]).props.children).toEqual('No results match "foo"');
      });
    });

    describe('if there are items', () => {
      it('does not add no items option', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.results([{}, {}]).length).toEqual(2);
      });
    });
  });

  describe('listHTML', () => {
    describe('if not in create mode', () => {
      it('does not add a create option', () => {
        expect(instance.listHTML.length).toEqual(1);
      });
    });

    describe('if in create mode', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" create={ function() {} } />
        );
      });

      describe('if closed', () => {
        it('does not add a create option', () => {
          expect(instance.listHTML.length).toEqual(1);
        });
      });

      describe('if open', () => {
        beforeEach(() => {
          instance.setState({ open: true });
        });

        describe('if there is a filter', () => {
          it('adds create option with correct text', () => {
            instance.setState({ filter: "foo" });
            expect(instance.listHTML[1].props.children).toEqual('Create "foo"');
          });
        });

        describe('if there is no filter', () => {
          it('adds create option with correct text', () => {
            expect(instance.listHTML[1].props.children).toEqual('Create New');
          });
        });
      });
    });
  });

  describe('showArrow', () => {
    describe('when in suggest mode', () => {
      it('returns false', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" suggest={ true } />
        );
        expect(instance.showArrow()).toBeFalsy();
      });
    });

    describe('when in freetext mode', () => {
      it('returns false', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
        );
        expect(instance.showArrow()).toBeFalsy();
      });
    });

    describe('when not in suggest or freetext mode', () => {
      it('returns true', () => {
        expect(instance.showArrow()).toBeTruthy();
      });
    });
  });

  describe('options', () => {
    it('calls prepareList', () => {
      spyOn(instance, 'prepareList');
      instance.options;
      expect(instance.prepareList).toHaveBeenCalledWith(instance.props.options.toJS());
    });
  });

  describe('mainClasses', () => {
    it('returns with filter class', () => {
      expect(instance.mainClasses).toMatch('carbon-dropdown-filter');
    });
  });

  describe('inputClasses', () => {
    describe('if in create mode', () => {
      it('does not add the class', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" create={ function() {} } />
        );
        expect(instance.inputClasses).not.toMatch('carbon-dropdown__input--filtered');
      });
    });

    describe('if in freetext mode', () => {
      it('does not add the class', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
        );
        expect(instance.inputClasses).not.toMatch('carbon-dropdown__input--filtered');
      });
    });

    describe('if there is no filter', () => {
      it('does not add the class', () => {
        instance.setState({ filter: null });
        expect(instance.inputClasses).not.toMatch('carbon-dropdown__input--filtered');
      });
    });

    describe('if not in create or freetext mode and there is a filter', () => {
      it('does adds the class', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.inputClasses).toMatch('carbon-dropdown__input--filtered');
      });
    });
  });

  describe('inputProps', () => {
    describe('when readOnly is set as a prop', () => {
      it('sets the value', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" readOnly={ true } />
        );
        expect(instance.inputProps.readOnly).toBeTruthy();
      });
    });

    describe('when readOnly is not set as a prop', () => {
      it('sets it to false', () => {
        expect(instance.inputProps.readOnly).toBeFalsy();
      });
    });

    describe('when filter is not set', () => {
      it('does not use the filter value', () => {
        instance.visibleValue = 'foo';
        expect(instance.inputProps.value).toEqual('foo');
      });

      describe('and freetext value is present', () => {
        it('displays freetext value', () => {
          let value = 'foo';

          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } visibleValue={ value } freetext={ true } />
          );
          expect(instance.inputProps.value).toEqual(value);
        });
      });
    });

    describe('when filter is set', () => {
      it('uses the filter value', () => {
        instance.visibleValue = 'foo';
        instance.setState({ filter: 'bar' });
        expect(instance.inputProps.value).toEqual('bar');
      });
    });
  });

  describe('highlightMatches', () => {
    describe('with a value', () => {
      it('alters the markup when matches are found', () => {
        let markup = instance.highlightMatches("foobarfooqux", "foo");
        expect(markup[0].type).toEqual("span");
        expect(markup[0].props.children).toEqual("");
        expect(markup[1].type).toEqual("strong");
        expect(markup[1].props.children.type).toEqual("u");
        expect(markup[1].props.children.props.children).toEqual("foo");
        expect(markup[2].type).toEqual("span");
        expect(markup[2].props.children.length).toEqual(3);
      });
    });

    describe('without a value', () => {
      it('returns the original value', () => {
        expect(instance.highlightMatches("foobar", "")).toEqual("foobar");
      });
    });

    describe('no matched', () => {
      it('returns the original value', () => {
        expect(instance.highlightMatches("foobar", "zzz")).toEqual("foobar");
      });
    });
  });

  describe('render', () => {
    let inputs;

    describe('when not in freetext mode', () => {
      it('only renders one hidden input', () => {
        inputs = TestUtils.findAllInRenderedTree(instance, (node) => {
          return TestUtils.isDOMComponent(node) &&
            node.tagName.toLowerCase() === 'input' &&
            node.type.toLowerCase() === 'hidden';
        });
        expect(inputs.length).toEqual(1);
      });
    });

    describe('when in freetext mode', () => {
      describe('when freetextName not set', () => {
        it('only renders one hidden input', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([]) } value="1" freetext={ true } />
          );
          inputs = TestUtils.findAllInRenderedTree(instance, (node) => {
            return TestUtils.isDOMComponent(node) &&
              node.tagName.toLowerCase() === 'input' &&
              node.type.toLowerCase() === 'hidden';
          });
          expect(inputs.length).toEqual(1);
        });
      });

      describe('when freetextName set', () => {
        let name = 'my_input_name';

        it('renders a second hidden input for freetext', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter
              name="foo"
              options={ Immutable.fromJS([]) }
              value="1"
              freetext={ true }
              freetextName={ name }
            />
          );
          inputs = TestUtils.findAllInRenderedTree(instance, (node) => {
            return TestUtils.isDOMComponent(node) &&
              node.tagName.toLowerCase() === 'input' &&
              node.type.toLowerCase() === 'hidden';
          });
          expect(inputs.length).toEqual(2);
          expect(inputs[1].name).toEqual(name);
        });
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <DropdownFilter
          data-element='bar'
          options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
          path='test'
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dropdown-filter', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      describe("when closed", () => {
        let wrapper = shallow(
          <DropdownFilter
            fieldHelp='test'
            label='test'
            open={ true }
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );

        elementsTagTest(wrapper, [
          'help',
          'hidden-input',
          'input',
          'label',
        ]);
      });
      describe("when open", () => {
        let wrapper = shallow(
          <DropdownFilter
            create={ () => {} }
            fieldHelp='test'
            label='test'
            open={ true }
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true });

        elementsTagTest(wrapper, [
          'create',
          'help',
          'hidden-input',
          'input',
          'label',
          'option'
        ]);
      });
    });
  });

  describe('the create link', () => {
    let createLink, wrapper, createLinkProps;

    beforeEach(() => {
      wrapper = shallow(
        <DropdownFilter
          create={function() {}}
          fieldHelp='test'
          label='test'
          options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
          path='test'
        />
      );
      wrapper.setState({ open: true })
      createLink = wrapper.find('.carbon-dropdown__action');
      expect(createLink.length).toEqual(1);
      createLinkProps = createLink.props();
    });

    it('calls handleCreate onClick', () => {
      expect(createLinkProps.onClick).toEqual(wrapper.instance().handleCreate);
    });

    it('calls handleCreate onKeyPress', () => {
      expect(createLinkProps.onKeyPress).toEqual(wrapper.instance().handleCreate);
    });

    it('calls handleCreateBlur onBlur', () => {
      expect(createLinkProps.onBlur).toEqual(wrapper.instance().handleCreateBlur);
      createLinkProps.onBlur();
      expect(wrapper.state.open).toBeFalsy();
      expect(wrapper.instance().blockBlur).toBeFalsy();
    });

    it('has a tabIndex of 0', () => {
      expect(createLinkProps.tabIndex).toEqual('0');
    });
  });

  describe('onUpArrow', () => {
    let createLink, wrapper, createLinkProps;

    describe('when the create prop is set', () => {
      beforeEach(() => {
        wrapper = shallow(
          <DropdownFilter
            create={function() {}}
            fieldHelp='test'
            label='test'
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true })
      });

      it('sets blockBlur to true', () => {
        const list = BrowserHelper.getDocument().createElement('ul');
        const li = BrowserHelper.getDocument().createElement('li')
        list.appendChild(li)
        let nextValue = wrapper.instance().onUpArrow(list, null);
        expect(wrapper.instance().blockBlur).toBeTruthy();
      });
    });

    describe('when the create prop is not set', () => {
      beforeEach(() => {
        wrapper = shallow(
          <DropdownFilter
            fieldHelp='test'
            label='test'
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true })
      });

      it('it does not set blockBlur to true', () => {
        const list = BrowserHelper.getDocument().createElement('ul');
        const li = BrowserHelper.getDocument().createElement('li')
        list.appendChild(li)
        let nextValue = wrapper.instance().onUpArrow(list, null);
        expect(wrapper.instance().blockBlur).toBeFalsy();
      });
    });
  });

  describe('onDownArrow', () => {
    let createLink, wrapper, createLinkProps;

    describe('when the create prop is set', () => {
      beforeEach(() => {
        wrapper = shallow(
          <DropdownFilter
            create={function() {}}
            fieldHelp='test'
            label='test'
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true })
      });

      it('sets blockBlur to true', () => {
        const list = BrowserHelper.getDocument().createElement('ul');
        const li = BrowserHelper.getDocument().createElement('li')
        list.appendChild(li)
        let nextValue = wrapper.instance().onDownArrow(list, null);
        expect(wrapper.instance().blockBlur).toBeTruthy();
      });
    });

    describe('when the create prop is not set', () => {
      beforeEach(() => {
        wrapper = shallow(
          <DropdownFilter
            fieldHelp='test'
            label='test'
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true })
      });

      it('it does not set blockBlur to true', () => {
        const list = BrowserHelper.getDocument().createElement('ul');
        const li = BrowserHelper.getDocument().createElement('li')
        list.appendChild(li)
        let nextValue = wrapper.instance().onDownArrow(list, null);
        expect(wrapper.instance().blockBlur).toBeFalsy();
      });
    });
  });
});
