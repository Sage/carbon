import React from 'react';
import { Example } from './example.component';

export default {
  title: 'Design System/Example',
  component: Example,
  parameters: {
    info: {
      disable: true
    }
  },
  viewMode: 'docs', // in 6.x this will make it so the docs is the default page for this story
  includeStories: [] // don't include these in the sidebar, we'll load them manually in the MDX file
};
// This is the future, don't use this yet.
export const csf = () => (
  <>
    <p>
      This method of importing will show the source code in
      <a href='https://github.com/storybookjs/storybook/issues/8444'>Storybook 6+</a>
    </p>
    <Example>Previews are not yet supported</Example>
  </>
);
