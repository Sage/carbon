import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Sidebar Component </p>
    <p>A sidebar overlaid at the right or left of a page.</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>
      import {'{ Sidebar }'} from {'"carbon-react/lib/components/sidebar"'}
    </StoryCode>
    <p>or</p>
    <StoryCode padded>
      import {'{ Sidebar, SidebarHeader }'} from {'"carbon-react/lib/components/sidebar"'}
    </StoryCode>

    <p>To render the Sidebar:</p>
    <StoryCode padded> {'<Sidebar onCancel={ closeSidebar } open={ false }/>'}</StoryCode>
    <p>
      Side bar is positioned on the right hand screen of the window by default. To position the sidebar on the left hand
      side pass <StoryCode padded>position={"'left'"}</StoryCode>to the component.
    </p>
    <p>
      The background behind the sidebar is disabled by default. To allow the user to interact with all the UI pass{' '}
      <StoryCode padded>enableBackgroundUI= {'{ true }'}</StoryCode> to the component.
    </p>
  </div>
);

export default info;
