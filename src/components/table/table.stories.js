import React from 'react';
import { storiesOf } from '@storybook/react';
import { State } from '@sambego/storybook-state';
import classic from '../../style/themes/classic';
import small from '../../style/themes/small';
import { notes, info } from './documentation';
import TableWrapper from './table-story-helpers/table-story-wrapper.component';
import {
  commonKnobs,
  classicKnobs,
  dlsKnobs,
  inputKnobs
} from './table-story-helpers/table-story-knobs';

storiesOf('Table', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const tableProps = {
      ...commonKnobs(),
      ...classicKnobs(),
      contextTheme: classic
    };

    return (
      <TableWrapper { ...tableProps } />
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  })
  .add(
    'default',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs(),
        contextTheme: small
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  )
  .add(
    'classic with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...classicKnobs(),
        ...inputKnobs(),
        contextTheme: classic
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  )
  .add(
    'default with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs(),
        ...inputKnobs(),
        contextTheme: small
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
