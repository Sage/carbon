import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Pod from './pod.component';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Pod.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /pod\.js(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const border = boolean('border', Pod.defaultProps.border);
    const children = text('children', 'This is some example content for a Pod');
    const padding = select('padding', OptionsHelper.sizesPod, Pod.defaultProps.padding);
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

    const themeProp = {};
    if (name === 'classic') {
      themeProp.as = select('as', OptionsHelper.themesFull, Pod.defaultProps.as);
    } else {
      themeProp.podType = select('podType', OptionsHelper.themesFull, Pod.defaultProps.as);
    }

    return (
      <Pod
        border={ border }
        padding={ padding }
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
        { ...themeProp }
      >
        { children }
      </Pod>
    );
  };

  const metadata = {
    themeSelector,
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
  };

  return [name, component, metadata];
}

storiesOf('Pod', module)
  .addParameters({
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
