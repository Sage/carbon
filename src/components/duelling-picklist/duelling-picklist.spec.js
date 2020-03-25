import React from 'react';
import { mount } from 'enzyme';
import { CSSTransition } from 'react-transition-group';

import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';

import Icon from '../icon';

import {
  DuellingPicklist, Picklist, PicklistItem, PicklistDivider, PicklistPlaceholder
} from '.';

import {
  StyledDuellingPicklistOverlay, StyledPicklistItem, StyledButton, StyledLabel, StyledControl
} from './duelling-picklist.style';
import { areEqual } from './picklist.component';

const EmptyComponent = () => <div />;

describe('DuellingPicklist', () => {
  let wrapper;
  let onAdd;
  let onRemove;

  const notSelectedItems = [
    { key: '1', title: 'content 1' },
    { key: '2', title: 'content 2' },
    { key: '3', title: 'content 3' }
  ];

  const selectedItems = [
    { key: '1', title: 'content 1' },
    { key: '2', title: 'content 2' },
    { key: '3', title: 'content 3' }
  ];

  const render = ({
    disabled,
    selected = selectedItems,
    notSelected = notSelectedItems,
    leftControls,
    rightControls,
    leftLabel,
    rightLabel,
    placeholder
  }) => {
    wrapper = mount(
      <DuellingPicklist
        disabled={ disabled }
        leftControls={ leftControls }
        leftLabel={ leftLabel }
        rightControls={ rightControls }
        rightLabel={ rightLabel }
      >
        <Picklist
          disabled={ disabled }
          placeholder={ placeholder }
        >
          {notSelected.map(item => (
            <PicklistItem
              key={ item.key }
              type='add'
              item={ item }
              onChange={ onAdd }
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
        <PicklistDivider />
        <Picklist
          disabled={ disabled }
          placeholder={ placeholder }
        >
          {selected.map(item => (
            <PicklistItem
              key={ item.key }
              type='remove'
              item={ item }
              onChange={ onRemove }
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
      </DuellingPicklist>
    );
  };

  beforeEach(() => {
    onAdd = jest.fn();
    onRemove = jest.fn();
    render({});
  });

  describe('Styles', () => {
    it('renders overlay if DuellingPicklistOverlay has disabled prop set', () => {
      render({ disabled: true });

      assertStyleMatch({
        opacity: '0.2',
        pointerEvents: 'none',
        userSelect: 'none'
      }, wrapper.find(StyledDuellingPicklistOverlay));

      render({ disabled: false });

      assertStyleMatch({
        opacity: undefined,
        pointerEvents: undefined,
        userSelect: undefined
      }, wrapper.find(StyledDuellingPicklistOverlay));
    });

    it('renders PickListItem with properly colored button and proper icon', () => {
      const AddButton = wrapper.find(PicklistItem).find({ type: 'add' }).at(0);
      assertStyleMatch({
        backgroundColor: baseTheme.colors.primary
      }, AddButton.find('button'));
      assertStyleMatch({
        backgroundColor: baseTheme.colors.secondary
      }, AddButton.find('button'), { modifier: ':hover' });
      expect(AddButton.find(Icon).props().type).toBe('add');

      const RemoveButton = wrapper.find(PicklistItem).find({ type: 'remove' }).at(0);
      assertStyleMatch({
        backgroundColor: baseTheme.colors.error
      }, RemoveButton.find('button'));
      assertStyleMatch({
        backgroundColor: baseTheme.colors.destructive.hover
      }, RemoveButton.find('button'), { modifier: ':hover' });
      expect(RemoveButton.find(Icon).props().type).toBe('remove');
    });

    it('PicklistItem with type add has no animation', () => {
      expect(wrapper.find(Picklist).at(0).find(CSSTransition).at(0)
        .props().enter).toBe(false);
    });

    it('PicklistItem with type remove has animation', () => {
      expect(wrapper.find(Picklist).at(1).find(CSSTransition).at(0)
        .props().enter).toBe(undefined);
    });
  });

  describe('functionality', () => {
    it.each([[0, 1], [1, 2], [2, 0], [0, 1]])(
      'focuses on next PicklistItem in a loop when down arrow is pressed',
      (focused, nextFocused) => {
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(focused)
          .props()
          .onKeyDown({ which: 40, preventDefault: () => { } });

        expect(wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(nextFocused)).toBeFocused();
      }
    );

    it.each([[0, 2], [2, 1], [1, 0], [0, 2]])(
      'focuses on next PicklistItem in a loop when up arrow is pressed',
      (focused, nextFocused) => {
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(focused)
          .props()
          .onKeyDown({ which: 38, preventDefault: () => { } });

        expect(wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(nextFocused)).toBeFocused();
      }
    );

    it.each([[0, 2], [1, 2], [2, 2]])(
      'focuses on last PicklistItem when end key is pressed',
      (focused, nextFocused) => {
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(focused)
          .props()
          .onKeyDown({ which: 35, preventDefault: () => { } });

        expect(wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(nextFocused)).toBeFocused();
      }
    );

    it.each([[0, 0], [1, 0], [2, 0]])(
      'focuses on first PicklistItem when home key is pressed',
      (focused, nextFocused) => {
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(focused)
          .props()
          .onKeyDown({ which: 36, preventDefault: () => { } });

        expect(wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(nextFocused)).toBeFocused();
      }
    );

    it(
      'does nothing when other key is pressed',
      () => {
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(0)
          .props()
          .onKeyDown({ which: 87, preventDefault: () => { } });

        expect(wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(0)).toBeFocused();
      }
    );

    it('calls passed onChange function with proper item passed as an argument when clicked on the button', () => {
      wrapper.find(Picklist).at(0).find(PicklistItem).at(0)
        .find(StyledButton)
        .props()
        .onClick();

      expect(onAdd.mock.calls[0][0]).toEqual({ key: '1', title: 'content 1' });
    });

    it.each([['space', 32], ['enter', 13]])(
      'calls passed onChange function with proper item passed as an argument when %s key pressed',
      (key, which) => {
        wrapper.find(Picklist).at(0).find(PicklistItem).at(0)
          .find(StyledPicklistItem)
          .props()
          .onKeyDown({ which, preventDefault: () => { } });

        expect(onAdd.mock.calls[0][0]).toEqual({ key: '1', title: 'content 1' });
      }
    );

    it('renders custom empty placeholder when no Picklist child provided', () => {
      render({ selected: [], placeholder: <EmptyComponent /> });
      expect(wrapper.find(Picklist).at(1).find(EmptyComponent)).toHaveLength(1);
    });

    it('renders PicklistPlaceholder with proper text when no Picklist child provided', () => {
      render({ selected: [], placeholder: <PicklistPlaceholder text='Empty' /> });
      expect(wrapper.find(Picklist).at(1).find(PicklistPlaceholder).contains('Empty')).toBe(true);
    });

    it('renders left label when leftLabel prop is provided', () => {
      render({ leftLabel: 'Left Label' });
      expect(wrapper.find(DuellingPicklist).find(StyledLabel).at(0).props().children).toBe('Left Label');
    });

    it('renders right label when rightLabel prop is provided', () => {
      render({ rightLabel: 'Right Label' });
      expect(wrapper.find(DuellingPicklist).find(StyledLabel).at(1).props().children).toBe('Right Label');
    });

    it('renders left controls when leftControls prop is provided', () => {
      const ControlComp = () => <div />;
      render({ leftControls: <ControlComp /> });
      expect(wrapper.find(DuellingPicklist).find(StyledControl).at(0).find(ControlComp)).toHaveLength(1);
    });

    it('renders right controls when rightControls prop is provided', () => {
      const ControlComp = () => <div />;
      render({ rightControls: <ControlComp /> });
      expect(wrapper.find(DuellingPicklist).find(StyledControl).at(1).find(ControlComp)).toHaveLength(1);
    });

    describe('rerender', () => {
      it.each([
        ['happens when number of children is changed', [<div />], false],
        ['does not happen when number of children stays the same', [<div />, <div />], true]
      ])('%s', (desc, children, isEqual) => {
        const prevProps = { children: [<div />, <div />] };
        const nextProps = { children };
        expect(areEqual(prevProps, nextProps)).toBe(isEqual);
      });

      it.each([
        ['happens when disabled prop is changed', false],
        ['does not happen when disabled prop stays the same', true]
      ])('%s', (desc, disabled) => {
        const prevProps = { children: [<div />], disabled: true };
        const nextProps = { children: [<div />], disabled };
        expect(areEqual(prevProps, nextProps)).toBe(disabled);
      });
    });
  });
});
