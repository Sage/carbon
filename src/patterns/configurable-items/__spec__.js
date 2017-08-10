import React from 'react';
import { shallow } from 'enzyme';
import ImmutableHelper from './../../utils/helpers/immutable';
import { rootTagTest } from './../../utils/helpers/tags/tags-specs';
import Dialog from './../../components/dialog';
import ConfigurableItemsStore from './store';
import ConfigurableItemsActions from './actions';
import ConfigurableItemsPattern from './configurable-items';
import ConfigurableItemsContent from './configurable-items-content';

describe('ConfigurableItemsPattern', () => {
  let wrapper;
  const onCancel = jasmine.createSpy('onCancel');
  const onSave = jasmine.createSpy('onSave');

  const itemsData = ImmutableHelper.parseJSON(
    [
      { id: 'item_code', locked: false, enabled: true },
      { id: 'description', locked: true, enabled: true },
      { id: 'ledger_account', locked: false, enabled: true },
      { id: 'period_type', locked: false, enabled: true },
      { id: 'period_rate_price', locked: false, enabled: true },
      { id: 'sales_price', locked: false, enabled: true },
      { id: 'cost_price', locked: false, enabled: true },
      { id: 'tax_rate', locked: false, enabled: false },
      { id: 'purchase_ledger_account', locked: false, enabled: false },
      { id: 'purchase_rate', locked: false, enabled: false },
      { id: 'period_rate_price_2', locked: false, enabled: false },
      { id: 'period_rate_price_3', locked: false, enabled: false },
      { id: 'sales_price_2', locked: false, enabled: false },
      { id: 'sales_price_3', locked: false, enabled: false }
    ]
  );

  describe('componentDidUpdate', () => {
    describe('when open state switches from false to true', () => {
      beforeEach(() => {
        ConfigurableItemsStore.data = ConfigurableItemsStore.data.set('open', false)
        wrapper = shallow(
          <ConfigurableItemsPattern
            itemsData={ { data: 'configurableItemsData' } }
            onCancel={ onCancel }
            onSave={ onSave }
          />,
          { lifecycleExperimental: true }
        );
        spyOn(ConfigurableItemsActions, 'updateData');
        let data = wrapper.state().configurableItemsStore.set('open', true);
        wrapper.setState({ configurableItemsStore: data });
      });
      it('calls ConfigurableItemsActions.updateData with configurableItemsData', () => {
        expect(ConfigurableItemsActions.updateData).toHaveBeenCalledWith(
          { data: 'configurableItemsData' }
        );
      });
    });

    describe('when open state switches from true to false', () => {
      beforeEach(() => {
        ConfigurableItemsStore.data = ConfigurableItemsStore.data.set('open', true)
        wrapper = shallow(
          <ConfigurableItemsPattern
            itemsData={ { data: 'configurableItemsData' } }
            onCancel={ onCancel }
            onSave={ onSave }
          />,
          { lifecycleExperimental: true }
        );
        spyOn(ConfigurableItemsActions, 'updateData');
        let data = wrapper.state().configurableItemsStore.set('open', false);
        wrapper.setState({ configurableItemsStore: data });
      });
      it('does not call ConfigurableItemsActions.updateData', () => {
        expect(ConfigurableItemsActions.updateData).not.toHaveBeenCalled();
      });
    });
  });

  describe('render', () => {
    describe('when there is items data in the store', () => {
      beforeEach(() => {
        ConfigurableItemsStore.data = ConfigurableItemsStore.data.set(
          'items_data', itemsData
        );
        ConfigurableItemsStore.data = ConfigurableItemsStore.data.set(
          'open', true
        );
        wrapper = shallow(
          <ConfigurableItemsPattern
            itemsData={ { data: 'configurableItemsData' } }
            onCancel={ onCancel }
            onSave={ onSave }
            title='Configure Items'
            data-element='bar'
            data-role='baz'
          />
        );
      });

      describe('Dialog', () => {
        let dialog, dialogProps;

        beforeEach(() => {
          dialog = wrapper.find(Dialog);
          dialogProps = dialog.props();
        });

        it('renders a dialog', () => {
          expect(dialog).toBeDefined();
        });

        it('has an onCancel prop that calls ConfigurableItemsActions.toggleDialogOpen', () => {
          spyOn(ConfigurableItemsActions, 'toggleDialogOpen')
          dialogProps.onCancel();
          expect(ConfigurableItemsActions.toggleDialogOpen).toHaveBeenCalled();
          expect(onCancel).toHaveBeenCalled();
        });

        it('renders a dialog with the title', () => {
          expect(dialogProps.title).toEqual('Configure Items');
        });

        it('includes the correct component, element and role data tags', () => {
          rootTagTest(wrapper, 'configurable-items-pattern', 'bar', 'baz');
        });

        describe('when there is itemsData in the store and open is true', () => {
          it('sets the dialog open prop to true', () => {
            expect(dialogProps.open).toEqual(true);
          });
        });
      });

      describe('ConfigurableItemsContent', () => {
        let pattern, patternProps;

        beforeEach(() => {
          pattern = wrapper.find(ConfigurableItemsContent);
          patternProps = pattern.props();
        });

        it('renders the ConfigurableItemsContent', () => {
          expect(pattern).toBeDefined();
        });

        it('renders the pattern with itemsData', () => {
          expect(patternProps.itemsData).toEqual(itemsData);
        });

        it('has an onCancel prop that calls ConfigurableItemsActions.toggleDialogOpen', () => {
          spyOn(ConfigurableItemsActions, 'toggleDialogOpen')
          patternProps.onCancel();
          expect(ConfigurableItemsActions.toggleDialogOpen).toHaveBeenCalled();
          expect(onCancel).toHaveBeenCalled();
        });

        it('triggers ConfigurableItemsActions.updateItem onChange', () => {
          spyOn(ConfigurableItemsActions, 'updateItem');
          patternProps.onChange(1);
          expect(ConfigurableItemsActions.updateItem).toHaveBeenCalledWith(1);
        });

        it('triggers ConfigurableItemsActions.reorderItems onDrag', () => {
          spyOn(ConfigurableItemsActions, 'reorderItems');
          patternProps.onDrag(1, 2);
          expect(ConfigurableItemsActions.reorderItems).toHaveBeenCalledWith(1, 2);
        });

        it('triggers ConfigurableItemsActions.updateData onReset', () => {
          spyOn(ConfigurableItemsActions, 'updateData');
          patternProps.onReset();
          expect(ConfigurableItemsActions.updateData).toHaveBeenCalledWith(
            { data: 'configurableItemsData' }
          );
        });

        it('calls the onSave prop with the event and items data from configurableItemsStore', () => {
          const event = {}
          patternProps.onSave(event);
          expect(onSave).toHaveBeenCalledWith(event, itemsData)
        });
      });
    });

    describe('when there is not items data in the store', () => {
      beforeEach(() => {
        ConfigurableItemsStore.reset();
        wrapper = shallow(
          <ConfigurableItemsPattern
            itemsData={ { data: 'configurableItemsData' } }
            onCancel={ onCancel }
            onSave={ onSave }
          />
        );
      });

      it('does not render ConfigurableItemsPattern', () => {
        const pattern = wrapper.find(ConfigurableItemsPattern);
        expect(pattern.length).toEqual(0);
      });

      describe('dialog', () => {
        let dialog, dialogProps;

        beforeEach(() => {
          dialog = wrapper.find(Dialog);
          dialogProps = dialog.props();
        });

        describe('when the open key in the store is true', () => {
          it('sets the dialog open prop to false', () => {
            expect(dialogProps.open).toEqual(false);
          });
        });
      });
    });

    describe('when the onCancel prop is not provided', () => {
      let pattern, patternProps
      beforeEach(() => {
        ConfigurableItemsStore.data = ConfigurableItemsStore.data.set(
          'items_data', itemsData
        );
        wrapper = shallow(
          <ConfigurableItemsPattern
            itemsData={ { data: 'configurableItemsData' } }
            onSave={ onSave }
          />
        );
        pattern = wrapper.find(ConfigurableItemsContent);
        patternProps = pattern.props();
      });

      it('does not try and call the onCancel prop', () => {
        spyOn(ConfigurableItemsActions, 'toggleDialogOpen')
        patternProps.onCancel();
        expect(ConfigurableItemsActions.toggleDialogOpen).toHaveBeenCalled();
      })
    })
  });
});
