import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { notes, Info } from './documentation';
import ActionPopover from '.';
import { MenuButton } from './action-popover.style';
import small from '../../style/themes/small';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import {
  Table, TableRow, TableCell, TableHeader
} from '../table';

const StyledComponent = styled('div')``.render().type;

ActionPopover.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /action-popover\.component(?!spec)/
);

storiesOf('Action Popover', module)
  .add('default', () => {
    return (
      <ThemeProvider theme={ small }>
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
                <ActionPopover.Item icon='email' onClick={ action('email') }>Email Invoice</ActionPopover.Item>
                <ActionPopover.Item
                  disabled icon='print'
                  onClick={ action('print') }
                >Print Invoice
                </ActionPopover.Item>
                <ActionPopover.Item icon='pdf' onClick={ action('pdf') }>Download PDF</ActionPopover.Item>
                <ActionPopover.Item icon='csv' onClick={ action('csv') }>Download CSV</ActionPopover.Item>
                <ActionPopover.Divider />
                <ActionPopover.Item icon='delete' onClick={ action('delete') }>Delete</ActionPopover.Item>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane</TableCell>
            <TableCell>Smith</TableCell>
            <TableCell>
              <ActionPopover>
                <ActionPopover.Item icon='csv' onClick={ action('csv') }>Download CSV</ActionPopover.Item>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Jones</TableCell>
            <TableCell>
              <ActionPopover>
                <ActionPopover.Item icon='csv' onClick={ action('csv') }>Download CSV</ActionPopover.Item>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </Table>
      </ThemeProvider>
    );
  }, {
    info: {
      text: Info,
      propTablesExclude: [ThemeProvider, Table, TableRow, TableCell, TableHeader, MenuButton, StyledComponent]
    },
    notes: { markdown: notes },
    knobs: {
      escapeHTML: false
    }
  });
