import React from 'react';
import { shallow } from 'enzyme';
import ImmutableHelper from './../../../utils/helpers/immutable';
import ConfigurableItemsContent from './configurable-items-content';
import { ConfigurableItems, ConfigurableItemRow } from './../../../components/configurable-items';
import { rootTagTest } from './../../../utils/helpers/tags/tags-specs';

describe('ConfigurableItemsContent', () => {
  let wrapper
  let itemsData = ImmutableHelper.parseJSON(
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
        <ConfigurableItemsContent
          itemsData={itemsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onCancel prop through to the ConfigurableItems component', () => {
      const configurableItemsWrapper = wrapper.find(ConfigurableItems);
      expect(
        configurableItemsWrapper.find(ConfigurableItems).props().onCancel
      ).toEqual(onCancel);
    });
  });

  describe('itemsData', () => {
    let rows;

    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemsContent
          itemsData={itemsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
      rows = wrapper.find(ConfigurableItemRow);
    });
    it('renders a ConfigurableItemRow for each item in the itemsData array', () => {
      expect(rows.length).toEqual(itemsData.size);
    });

    it('sets the onChange prop on each ConfigurableItemRow', () => {
      expect(rows.first().props().onChange());
      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('sets the rowIndex prop on each ConfigurableItemRow', () => {
      const indexes = rows.map((row => row.props().rowIndex));
      expect(indexes).toEqual([0, 1, 2])
    });

    it('sets the name prop on each ConfigurableItemRow', () => {
      const names = rows.map((row => row.props().name));
      expect(names).toEqual(['Foo', 'Bar', 'Baz'])
    });

    it('sets the locked prop on each ConfigurableItemRow', () => {
      const lockedProps = rows.map((row => row.props().locked));
      expect(lockedProps).toEqual([true, false, false])
    });

    it('sets the enabled prop on each ConfigurableItemRow', () => {
      const enabledProps = rows.map((row => row.props().enabled));
      expect(enabledProps).toEqual([true, true, false])
    });
  });

  describe('onDrag', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemsContent
          itemsData={itemsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onDrag prop through to the ConfigurableItems component', () => {
      const configurableItemsWrapper = wrapper.find(ConfigurableItems);
      expect(configurableItemsWrapper.find(ConfigurableItems).props().onDrag).toEqual(onDrag);
    });
  });

  describe('onReset', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemsContent
          itemsData={itemsData}
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
    it('passes the onReset prop through to the ConfigurableItems component', () => {
      const configurableItemsWrapper = wrapper.find(ConfigurableItems);
      expect(configurableItemsWrapper.find(ConfigurableItems).props().onReset).toEqual(onReset);
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemsContent
          itemsData={itemsData}
          onCancel={onCancel}
          onChange={onChange}
          onClick={onClick}
          onDrag={onDrag}
          onSave={onSave}
          title='Foo'
        />
      );
    });
    it('passes the onSave prop through to the ConfigurableItems component', () => {
      const configurableItemsWrapper = wrapper.find(ConfigurableItems);
      expect(configurableItemsWrapper.find(ConfigurableItems).props().onSave).toEqual(onSave);
    });
  });

  describe('title', () => {
    wrapper = shallow(
      <ConfigurableItemsContent
        itemsData={itemsData}
        onCancel={onCancel}
        onChange={onChange}
        onClick={onClick}
        onDrag={onDrag}
        onSave={onSave}
        title='Foo'
      />
    );
    it('passes the title prop through to the ConfigurableItems component', () => {
      const configurableItemsWrapper = wrapper.find(ConfigurableItems);
      expect(configurableItemsWrapper.find(ConfigurableItems).props().title).toEqual('Foo');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <ConfigurableItemsContent
          itemsData={itemsData}
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
        rootTagTest(wrapper, 'configurable-items-content', 'bar', 'baz');
      });
    });
  });
});
