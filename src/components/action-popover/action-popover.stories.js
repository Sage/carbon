import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { notes, Info } from './documentation';
import { ActionPopover, ActionPopoverDivider, ActionPopoverItem } from '.';
import { MenuButton } from './action-popover.style';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import {
  Table, TableRow, TableCell, TableHeader
} from '../table';

const StyledComponent = styled('div')``.render().type;

ActionPopover.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /action-popover\.component(?!spec)/
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
            <ActionPopoverItem icon='email' onClick={ action('email') }>Email Invoice</ActionPopoverItem>
            <ActionPopoverItem
              disabled icon='print'
              onClick={ action('print') }
            >Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem icon='pdf' onClick={ action('pdf') }>Download PDF</ActionPopoverItem>
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
            <ActionPopoverItem icon='csv' onClick={ action('csv') }>Download CSV</ActionPopoverItem>
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
      propTablesExclude: [Table, TableRow, TableCell, TableHeader, MenuButton, StyledComponent]
    }
  };

  return [storyName, component, metadata];
}

storiesOf('Action Popover', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
