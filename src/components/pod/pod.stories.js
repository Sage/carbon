import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pod from './pod';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Pod', module)
  .add('default', () => {
    const border = boolean('border', Pod.defaultProps.border);
    const children = text('children', 'This is some example content for a Pod');
    const padding = select('padding', OptionsHelper.sizesPod, Pod.defaultProps.padding);
    const as = select('as', OptionsHelper.themesFull, Pod.defaultProps.as);
    const title = text('title', '');
    const subtitle = text('subtitle', '');
    const alignTitle = title ? select('alignTitle', OptionsHelper.alignFull, Pod.defaultProps.alignTitle) : undefined;
    const description = text('description', '');
    const footer = text('footer', '');
    const onEdit = boolean('onEdit', false);
    const editContentFullWidth = onEdit ? boolean('editContentFullWidth', false) : undefined;
    const displayEditButtonOnHover = onEdit ? boolean('displayEditButtonOnHover', false) : undefined;
    const triggerEditOnContent = onEdit ? boolean('triggerEditOnContent', false) : undefined;
    const internalEditButton = onEdit ? boolean('internalEditButton', false) : undefined;

    return (
      <Pod
        border={ border }
        padding={ padding }
        as={ as }
        title={ title }
        subtitle={ subtitle }
        alignTitle={ alignTitle }
        description={ description }
        footer={ footer }
        onEdit={ onEdit ? action('edit') : undefined }
        editContentFullWidth={ editContentFullWidth }
        displayEditButtonOnHover={ displayEditButtonOnHover }
        triggerEditOnContent={ triggerEditOnContent }
        internalEditButton={ internalEditButton }
      >
        { children }
      </Pod>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Pod widget.</p>

          <p>This widget is a provides a wrapper in which to render other widgets.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Pod from "carbon-react/lib/components/pod";'}
          </StoryCode>

          <p>To render the Pod:</p>

          <StoryCode padded>
            {'<Pod />'}
          </StoryCode>
        </div>
      )
    },
    notes: { markdown: notes }
  });
