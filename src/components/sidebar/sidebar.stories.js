import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Sidebar, SidebarHeader } from '.';
import Button from '../button';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

Sidebar.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /sidebar\.component(?!spec)/
);

SidebarHeader.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /sidebar-header\.component(?!spec)/
);


storiesOf('Sidebar', module)
  .addParameters({
    info: {
      propTablesExclude: [Button],
      text: info
    },
    notes: {
      markdown: notes
    }
  })
  .add('default', () => {
    const enableBackgroundUI = boolean('enableBackgroundUI', Sidebar.defaultProps.enableBackgroundUI);
    const position = select('position', OptionsHelper.alignBinary, Sidebar.defaultProps.position);
    const size = select('size', OptionsHelper.sizesFull, Sidebar.defaultProps.size);
    const open = boolean('open', Sidebar.defaultProps.open);
    return (
      <Sidebar
        enableBackgroundUI={ enableBackgroundUI } open={ open }
        position={ position } size={ size }
        onCancel={ action('cancel') }
      >
        <SidebarHeader>Header Content</SidebarHeader>
        Main Content
      </Sidebar>
    );
  })
  .add('with button', () => {
    const enableBackgroundUI = boolean('enableBackgroundUI', Sidebar.defaultProps.enableBackgroundUI);
    const position = select('position', OptionsHelper.alignBinary, Sidebar.defaultProps.position);
    const size = select('size', OptionsHelper.sizesFull, Sidebar.defaultProps.size);
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={ () => {
          setOpen(true);
        } }
        >Open sidebar
        </Button>
        <Sidebar
          key='sidebar'
          enableBackgroundUI={ enableBackgroundUI }
          open={ open }
          position={ position }
          size={ size }
          onCancel={ (e) => {
            setOpen(false);
            action('cancel')(e);
          } }
        >
          <SidebarHeader>Header Content</SidebarHeader>
          <div>
            <Button as='primary'>Test</Button>
            <Button as='secondary'>Last</Button>
          </div>
          Main Content
        </Sidebar>
      </>
    );
  });
