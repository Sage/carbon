import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import notes from './notes.md';
import { MenuList, MenuListItem } from './menu-list';

storiesOf('MenuList', module)
  .add('default', () => {
    const title = text('title', 'Menu List Title');
    const collapsible = title ? text('collapsible', true) : undefined;
    const filterPlaceholder = text('filterPlaceholder', '');
    const initiallyOpen = boolean('initiallyOpen', true);
    const filter = boolean('filter', true);

    return (
      <MenuList
        title={ title }
        collapsible={ collapsible }
        filterPlaceholder={ filterPlaceholder }
        initiallyOpen={ initiallyOpen }
      >
        <MenuListItem>
          Menu Item One
        </MenuListItem>
        <MenuListItem>
          <MenuList
            title='Menu Item Two'
            filter={ filter }
          >
            <MenuListItem name='First Sub Item'>
              First Sub Item
            </MenuListItem>
            <MenuListItem name='Second Sub Item'>
              Second Sub Item
            </MenuListItem>
            <MenuListItem name='Third Sub Item'>
              Third Sub Item
            </MenuListItem>
          </MenuList>
        </MenuListItem>
        <MenuListItem>
          Menu Item Three
        </MenuListItem>
        <MenuListItem>
          Menu Item Four
        </MenuListItem>
      </MenuList>
    );
  }, {
    notes: { markdown: notes }
  });
