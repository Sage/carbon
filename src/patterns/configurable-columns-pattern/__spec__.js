import React from 'react';
import { shallow } from 'enzyme';
import ImmutableHelper from './../../utils/helpers/immutable';
import ConfigurableColumnsPattern from './configurable-columns-pattern';
import { ConfigurableColumns, ConfigurableColumnRow } from './../../components/configurable-columns';
import { rootTagTest } from './../../utils/helpers/tags/tags-specs';

describe('ConfigurableColumnsPattern', () => {
  let wrapper
  let columnsData = ImmutableHelper.parseJSON(
    [
      { id: 1, name: 'Foo', locked: true, enabled: true },
      { id: 2, name: 'Bar', locked: false, enabled: true },
      { id: 3, name: 'Baz', locked: false, enabled: false }
    ]
  );
  let onCancel = () => { }
  let onChangeSpy = jasmine.createSpy('onChangeSpy')
  let onChange = (id) => { onChangeSpy(id) }
  let onClick = () => { }
  let onDrag = () => { }
  let onReset = () => { }
  let onSave = () => { }

  describe('onCancel', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onCancel prop through to the ConfigurableColumns component', () => {
      const configurableColumnsWrapper = wrapper.find(ConfigurableColumns);
      expect(
        configurableColumnsWrapper.find(ConfigurableColumns).props().onCancel
      ).toEqual(onCancel);
    });
  });

  describe('columnsData', () => {
    let configurableColumnRows;

    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
      configurableColumnRows = wrapper.find(ConfigurableColumnRow);
    });
    it('renders a ConfigurableColumnRow for each item in the columnsData array', () => {
      expect(configurableColumnRows.length).toEqual(columnsData.size);
    });

    it('sets the onChange prop on each ConfigurableColumnRow', () => {
      expect(configurableColumnRows.first().props().onChange());
      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('sets the rowIndex prop on each ConfigurableColumnRow', () => {
      const indexes = configurableColumnRows.map((row => row.props().rowIndex));
      expect(indexes).toEqual([0, 1, 2])
    });

    it('sets the name prop on each ConfigurableColumnRow', () => {
      const names = configurableColumnRows.map((row => row.props().name));
      expect(names).toEqual(['Foo', 'Bar', 'Baz'])
    });

    it('sets the locked prop on each ConfigurableColumnRow', () => {
      const lockedProps = configurableColumnRows.map((row => row.props().locked));
      expect(lockedProps).toEqual([true, false, false])
    });

    it('sets the enabled prop on each ConfigurableColumnRow', () => {
      const enabledProps = configurableColumnRows.map((row => row.props().enabled));
      expect(enabledProps).toEqual([true, true, false])
    });
  });

  describe('onDrag', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onDrag prop through to the ConfigurableColumns component', () => {
      const configurableColumnsWrapper = wrapper.find(ConfigurableColumns);
      expect(configurableColumnsWrapper.find(ConfigurableColumns).props().onDrag).toEqual(onDrag);
    });
  });

  describe('onReset', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onReset={onReset}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onReset prop through to the ConfigurableColumns component', () => {
      const configurableColumnsWrapper = wrapper.find(ConfigurableColumns);
      expect(configurableColumnsWrapper.find(ConfigurableColumns).props().onReset).toEqual(onReset);
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onSave prop through to the ConfigurableColumns component', () => {
      const configurableColumnsWrapper = wrapper.find(ConfigurableColumns);
      expect(configurableColumnsWrapper.find(ConfigurableColumns).props().onSave).toEqual(onSave);
    });
  });

  describe('title', () => {
    wrapper = shallow(
      <ConfigurableColumnsPattern
        columnsData={columnsData}
        onCancel={onCancel}
        onChange={onChange}
        onClick={onClick}
        onDrag={onDrag}
        onSave={onSave}
        title='Foo'
      />
    );
    it('passes the title prop through to the ConfigurableColumns component', () => {
      const configurableColumnsWrapper = wrapper.find(ConfigurableColumns);
      expect(configurableColumnsWrapper.find(ConfigurableColumns).props().title).toEqual('Foo');
    });
  });

  describe('html markup', () => {
    wrapper = shallow(
      <ConfigurableColumnsPattern
        columnsData={columnsData}
        onCancel={onCancel}
        onChange={onChange}
        onClick={onClick}
        onDrag={onDrag}
        onSave={onSave}
        title='Foo'
      />
    );
    it('renders an ordered list', () => {
      const orderedList = wrapper.find('ol');
      expect(orderedList.length).toEqual(1);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <ConfigurableColumnsPattern
          columnsData={columnsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
          data-element='bar'
          data-role='baz'
        />
      );

      it('includes the correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'configurable-columns-pattern', 'bar', 'baz');
      });
    });
  });
});
