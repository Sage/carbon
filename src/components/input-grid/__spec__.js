import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Immutable from 'immutable';
import ImmutableHelper from './../../utils/helpers/immutable';
import InputGrid from './input-grid';
import Form from './../form';

describe('InputGrid', () => {
  var form, instance;

  beforeEach(() => {
    function foo() {};
    function bar() {};

    form = TestUtils.renderIntoDocument(
      <Form>
        <InputGrid
          name="test-grid"
          data={ ImmutableHelper.parseJSON([{ foo: 'bar' }, { foo: 'qux' }]) }
          fields={ [ <input name='[{ROWID}][foo]' /> ] }
          updateRowHandler={ foo }
          deleteRowHandler={ bar } />
      </Form>
    );

    instance = TestUtils.findRenderedComponentWithType(form, InputGrid);
  });

  describe('contextTypes', () => {
    it('has form available to it', () => {
      expect(instance.context.form).toBeDefined();
    });
  });

  describe('properties on class', () => {
    it('defaults placeholderID to timestamp', () => {
      expect(typeof instance.placeholderID).toEqual("number");
    });

    it('defaults childPropsHaveChanged to false', () => {
      expect(instance.childPropsHaveChanged).toBeFalsy();
    });
  });

  describe('shouldComponentUpdate', () => {
    beforeEach(() => {
      instance.childrenHaveChanged = false;
    });

    describe('number of children have changed', () => {
      it('sets childrenHaveChanged to true and returns true', () => {
        let nextProps = {
          fields: [ <input name='[{ROWID}][foo]' />, <input name='[{ROWID}][bar]' /> ]
        };
        let _status = instance.shouldComponentUpdate(nextProps);
        expect(instance.childrenHaveChanged).toBeTruthy();
        expect(_status).toBeTruthy();
      });
    });

    describe('props on child have changed', () => {
      it('sets childrenHaveChanged to true and returns true', () => {
        let nextProps = {
          fields: [ <input name='[{ROWID}][foo]' foo="bar" /> ]
        };
        let _status = instance.shouldComponentUpdate(nextProps);
        expect(instance.childrenHaveChanged).toBeTruthy();
        expect(_status).toBeTruthy();
      });
    });

    describe('children have not changed', () => {
      it('sets childrenHaveChanged to false and returns true', () => {
        let nextProps = {
          fields: [ <input name='[{ROWID}][foo]' /> ]
        };
        let _status = instance.shouldComponentUpdate(nextProps);
        expect(instance.childrenHaveChanged).toBeFalsy();
        expect(_status).toBeTruthy();
      });
    });
  });

  describe('componentWillMount', () => {
    it('calls attachToForm', () => {
      spyOn(instance.context.form, 'attachToForm');
      instance.componentWillMount();
      expect(instance.context.form.attachToForm).toHaveBeenCalledWith(instance);
    });

    it('does not call attachToForm if there is no form', () => {
      instance.context.form = undefined;
      expect(instance.componentWillMount()).toEqual(false);
    });
  });

  describe('componentWillUnmount', () => {
    it('calls detachFromForm', () => {
      spyOn(instance.context.form, 'detachFromForm');
      instance.componentWillUnmount();
      expect(instance.context.form.detachFromForm).toHaveBeenCalledWith(instance);
    });

    it('does not call detachFromForm if there is no form', () => {
      instance.context.form = undefined;
      expect(instance.componentWillUnmount()).toEqual(false);
    });
  });

  describe('buildRows', () => {
    beforeEach(() => {
      spyOn(instance, 'regularRow');
      spyOn(instance, 'placeholderRow').and.callThrough();
    });

    it('creates a row for each line of data', () => {
      instance.buildRows();
      expect(instance.regularRow.calls.count()).toEqual(2);
    });

    it('create a placeholder row', () => {
      expect(instance.buildRows()[2].props.placeholder).toEqual('true');
      expect(instance.placeholderRow.calls.count()).toEqual(1);
    });

    describe('no placeholder', () => {
      it('does not render a placeholder if the state is set to false', () => {
        instance.setState({ placeholder: false });
        expect(instance.buildRows().length).toEqual(2);
        expect(instance.placeholderRow.calls.count()).toEqual(0);
      });
    });

    describe('with gutter', () => {
      beforeEach(() => {
        function foo() {};
        function bar() {};

        form = TestUtils.renderIntoDocument(
          <Form>
            <InputGrid
              name="test-grid"
              data={ ImmutableHelper.parseJSON([{ foo: 'bar' }, { foo: 'qux' }]) }
              fields={ [ <input name='[{ROWID}][foo]' /> ] }
              gutter={ { foo: <div /> } }
              updateRowHandler={ foo }
              deleteRowHandler={ bar } />
          </Form>
        );

        instance = TestUtils.findRenderedComponentWithType(form, InputGrid);
        spyOn(instance, 'gutterRow').and.callThrough();
      });

      it('creates a gutter row', () => {
        expect(instance.buildRows()[3].key).toEqual('gutter');
        expect(instance.gutterRow.calls.count()).toEqual(1);
      });
    });
  });

  describe('regularRow', () => {
    var originalValue;

    beforeEach(() => {
      originalValue = instance.placeholderID;
    });

    describe('if placeholderID matches rowID', () => {
      it('resets placeholderID to something new', () => {
        instance.regularRow(Immutable.Map({ _row_id: originalValue }));
        expect(instance.placeholderID).not.toEqual(originalValue);
      });
    });

    describe('if placeholderID does not match rowID', () => {
      it('leaves placeholderID as what it was', () => {
        instance.regularRow(Immutable.Map({ _row_id: 5 }));
        expect(instance.placeholderID).toEqual(originalValue);
      });
    });

    describe('it returns a row with the relevant props', () => {
      it('sets the correct props', () => {
        let data = Immutable.Map({ _row_id: 5 });
        let row = instance.regularRow(data);

        expect(row.props.name).toEqual(instance.props.name);
        expect(row.key).toEqual('5');
        expect(row.props.row_id).toEqual(5);
        expect(row.props.data).toEqual(data);
        expect(row.props.fields).toEqual(instance.props.fields);
        expect(row.props.forceUpdate).toEqual(instance.childrenHaveChanged);
        expect(row.props.deleteRowHandler).toEqual(instance.props.deleteRowHandler);
        expect(row.props.updateRowHandler).toEqual(instance.props.updateRowHandler);
      });
    });
  });

  describe('gutterRow', () => {
    it('returns a row with the correct props', () => {
      let row = instance.gutterRow();
      expect(row.key).toEqual('gutter');
      expect(row.props.fields).toEqual(instance.props.fields);
      expect(row.props.gutterFields).toEqual(instance.props.gutter);
      expect(row.props.forceUpdate).toEqual(false);
    });
  });

  describe('placeholderRow', () => {
    it('returns a row with the correct props', () => {
      let row = instance.placeholderRow();
      expect(row.key).toEqual(String(instance.placeholderID));
      expect(row.props.name).toEqual(instance.props.name);
      expect(row.props.placeholder).toEqual("true");
      expect(row.props.forceUpdate).toEqual(false);
      expect(row.props.row_id).toEqual(instance.placeholderID);
      expect(row.props.fields).toEqual(instance.props.fields);
      expect(row.props.updateRowHandler).toEqual(instance.props.updateRowHandler);
    });
  });

  describe('buildHeader', () => {
    beforeEach(() => {
      function foo() {};
      function bar() {};

      form = TestUtils.renderIntoDocument(
        <Form>
          <InputGrid
            name="test-grid"
            data={ ImmutableHelper.parseJSON([{ foo: 'bar' }, { foo: 'qux' }]) }
            fields={ [ <input name='[{ROWID}][first_name]' />, <input name='[{ROWID}][last_name]' label="Last Name" hidden='true' columnClasses="foo" /> ] }
            updateRowHandler={ foo }
            deleteRowHandler={ bar } />
        </Form>
      );

      instance = TestUtils.findRenderedComponentWithType(form, InputGrid);
    });

    it('builds an actions column', () => {
      expect(instance.buildHeader()[0].key).toEqual('actions');
    });

    it('builds a column for each field', () => {
      expect(instance.buildHeader().length).toEqual(3); // 2 fields plus actions column
    });

    it('applies hidden prop to any hidden headers', () => {
      expect(instance.buildHeader()[2].props.hidden).toEqual('true');
    });

    it('uses the label for the header name', () => {
      expect(instance.buildHeader()[2].props.children).toEqual('Last Name');
    });

    it('applies custom classes to the headers if supplied', () => {
      expect(instance.buildHeader()[2].props.className).toEqual('common-grid__header__cell ui-input-grid__header__cell foo');
    });
  });

  describe('render', () => {
    it('renders a table with decorated className', () => {
      var table = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'table')[0];
      expect(table.className).toEqual('common-grid ui-input-grid');
    });

    it('renders a thead with decorated className', () => {
      var thead = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'thead')[0];
      expect(thead).toBeDefined();
      expect(thead.className).toEqual('common-grid__header ui-input-grid__header');
    });

    it('renders a tbody', () => {
      var tbody = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tbody')[0];
      expect(tbody).toBeDefined();
    });

    it('renders a thead row', () => {
      var tr = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr')[0];
      expect(tr).toBeDefined();
      expect(tr.className).toEqual('common-grid__header__row ui-input-grid__header__row');
    });
  });
});
