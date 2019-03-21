import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes } from './documentation';
import { Menu, MenuItem, SubmenuBlock } from './menu';

storiesOf('Menu', module)
  .add('default', () => {
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
  }, {
    notes: { markdown: notes }
  });
