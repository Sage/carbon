/* eslint-disable multiline-ternary */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pill from './pill.component';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';
import classic from '../../style/themes/classic';
import { THEMES } from '../../style/themes';

const getKnobs = (theme) => {
  // eslint-disable multiline-ternary
  const styledAs = (theme === THEMES.classic)
    ? select('as', OptionsHelper.colors, Pill.defaultProps.as)
    : select('as', OptionsHelper.pillColours, OptionsHelper.pillColours[0]);

  return {
    children: text('children', 'Pill'),
    as: styledAs,
    fill: boolean('fill', Pill.defaultProps.fill),
    onDelete: boolean('onDelete', false),
    theme
  };
};

storiesOf('Pill', module)
  .add(THEMES.classic, () => {
    const {
      children,
      as,
      fill,
      onDelete
    } = getKnobs(THEMES.classic);

    return (
      <ThemeProvider theme={ classic }>
        <Pill
          as={ as }
          fill={ fill }
          onDelete={ onDelete ? action('delete') : null }
        >
          {children}
        </Pill>
      </ThemeProvider>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Pill widget.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Pill from "carbon-react/lib/components/pill"'}
          </StoryCode>

          <p>To render a Pager:</p>

          <StoryCode padded>
            {'<Pill as="warning">My warning text</Pill>'}
          </StoryCode>

          <p>Additionally you can pass optional props to the Pill component</p>

          <p>
              &ndash; as: Customizes the appearence of the pill changing the colour
              (see the iconColorSets for possible values).
          </p>
        </div>
      )
    },
    notes: { markdown: notes }
  }).add('default', () => {
    const {
      children,
      as,
      fill,
      onDelete
    } = getKnobs();
    return (
      <Pill
        as={ as }
        fill={ fill }
        onDelete={ onDelete ? action('delete') : null }
      >
        {children}
      </Pill>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Pill widget.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Pill from "carbon-react/lib/components/pill"'}
          </StoryCode>

          <p>To render a Pager:</p>

          <StoryCode padded>
            {'<Pill as="warning">My warning text</Pill>'}
          </StoryCode>

          <p>Additionally you can pass optional props to the Pill component</p>

          <p>
                &ndash; as: Customizes the appearence of the pill changing the colour
                (see the iconColorSets for possible values).
          </p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
