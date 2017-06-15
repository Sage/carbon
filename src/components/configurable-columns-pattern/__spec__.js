import React from 'react';
import { shallow } from 'enzyme';
import ImmutableHelper from './../../utils/helpers/immutable';
import ConfigurableColumnsPattern from './configurable-columns-pattern';
import { ConfigurableColumns, ConfigurableColumnRow } from './../configurable-columns';

describe('ConfigurableColumnsPattern', () => {
  let wrapper
  let data = ImmutableHelper.parseJSON(
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
          data={data}
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

  describe('data', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          data={data}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('renders a ConfigurableColumnRow for each item in the data array', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      expect(configurableColumnRowWrapper.length).toEqual(3);
    });

    it('sets the onChange prop on each ConfigurableColumnRow', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      expect(configurableColumnRowWrapper.first().props().onChange());
      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('sets the rowIndex prop on each ConfigurableColumnRow', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      const indexes = configurableColumnRowWrapper.map((row => row.props().rowIndex));
      expect(indexes).toEqual([0, 1, 2])
    });

    it('sets the name prop on each ConfigurableColumnRow', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      const names = configurableColumnRowWrapper.map((row => row.props().name));
      expect(names).toEqual(['Foo', 'Bar', 'Baz'])
    });

    it('sets the locked prop on each ConfigurableColumnRow', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      const lockedProps = configurableColumnRowWrapper.map((row => row.props().locked));
      expect(lockedProps).toEqual([true, false, false])
    });

    it('sets the enabled prop on each ConfigurableColumnRow', () => {
      const configurableColumnRowWrapper = wrapper.find(ConfigurableColumnRow);
      const enabledProps = configurableColumnRowWrapper.map((row => row.props().enabled));
      expect(enabledProps).toEqual([true, true, false])
    });
  });

  describe('onDrag', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableColumnsPattern
          data={data}
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
          data={data}
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
          data={data}
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
        data={data}
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
});
