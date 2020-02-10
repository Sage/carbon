import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { notes, Info } from './documentation';
import {
  ActionPopover, ActionPopoverDivider, ActionPopoverItem, ActionPopoverMenu
} from '.';
import { MenuItem } from './action-popover-item.component';
import { MenuButton } from './action-popover.style';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import {
  Table, TableRow, TableCell, TableHeader
} from '../table';

const StyledComponent = styled('div')``.render().type;


const submenu = (
  <ActionPopoverMenu>
    <ActionPopoverItem onClick={ action('sub menu 1') }>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem onClick={ action('sub menu 2') }>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem disabled onClick={ action('sub menu 3') }>
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

const submenuWithIcons = (
  <ActionPopoverMenu>
    <ActionPopoverItem icon='graph' onClick={ action('sub menu 1') }>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem icon='add' onClick={ action('sub menu 2') }>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem
      icon='print' disabled
      onClick={ action('sub menu 3') }
    >
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

function makeStory(storyName, themeSelector) {
  const component = () => (
    <Table isZebra>
      <TableRow>
        <TableHeader>First Name</TableHeader>
        <TableHeader>Last Name</TableHeader>
        <TableHeader>&nbsp;</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>Doe</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              disabled
              icon='graph'
              submenu={ submenu }
              onClick={ action('email') }
            >
              Business
            </ActionPopoverItem>
            <ActionPopoverItem icon='email' onClick={ action('email') }>Email Invoice</ActionPopoverItem>
            <ActionPopoverItem
              icon='print'
              onClick={ action('print') }
              submenu={ submenu }
            >
              Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon='pdf'
              submenu={ submenu }
              onClick={ action('pdf') }
            >
              Download PDF
            </ActionPopoverItem>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem icon='delete' onClick={ action('delete') }>Delete</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane</TableCell>
        <TableCell>Smith</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Jones</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon='csv'
              submenu={ submenuWithIcons }
              onClick={ action('csv') }
            >Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  );

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      text: Info,
      propTables: [ActionPopover, ActionPopoverMenu, MenuItem],
      propTablesExclude: [ActionPopoverItem, Table, TableRow, TableCell, TableHeader, MenuButton, StyledComponent]
    }
  };

  return [storyName, component, metadata];
}

storiesOf('Action Popover', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
