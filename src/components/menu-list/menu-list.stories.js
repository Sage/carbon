import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './documentation';
import { MenuList, MenuListItem } from './menu-list';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

MenuList.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /menu-list\.js(?!spec)/
);

MenuListItem.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /menu-list-item\.js(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const title = text('title', '');
    const collapsible = title ? boolean('collapsible', true) : undefined;
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
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('MenuList', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
