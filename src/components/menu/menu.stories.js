import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import { Menu, MenuItem, SubmenuBlock } from './menu';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Menu.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /menu(?!spec)/
);

MenuItem.__docgenInfo = getDocGenInfo(
  require('./menu-item/docgenInfo.json'),
  /menu-item(?!spec)/
);

SubmenuBlock.__docgenInfo = getDocGenInfo(
  require('./submenu-block/docgenInfo.json'),
  /submenu-block(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const as = select('as', OptionsHelper.themesBinary, Menu.defaultProps.as);

    return (
      <Menu
        as={ as }
      >
        <MenuItem>
          Item One
        </MenuItem>
        <MenuItem submenu='Item Two'>
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem submenu='Item Two'>
          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <SubmenuBlock>
            <MenuItem icon='settings' href='#'>Sub Menu Item Two</MenuItem>
            <MenuItem href='#'>Sub Menu Item Three</MenuItem>
            <MenuItem divide href='#'>Sub Menu Item Four</MenuItem>
          </SubmenuBlock>
        </MenuItem>
      </Menu>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

storiesOf('Menu', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
