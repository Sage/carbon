import React from 'react';
import { StoryHeader, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A draggable context component</p>

    <StoryHeader>How to use a draggable context in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCodeBlock>
      {'import {'}
      {'  DraggableContext,'}
      {'  WithDrop,'}
      {'  WithDrag'}
      {'} from "carbon-react/lib/components/drag-and-drop";'}
    </StoryCodeBlock>

    <p>A draggable context is used to define an area in the page where drag and drop can be used.</p>

    <p>You also need to use WithDrop and WithDrag:</p>

    <StoryCodeBlock>
      {'<DraggableContext onDrag={ onItemMoved }>'}
      {'  <ol>'}
      {'    {items.map((item, index) => {'}
      {'      return ('}
      {'        <WithDrop index={ index }>'}
      {'          <li>'}
      {'            <WithDrag><span>{ item.content }</span></WithDrag>'}
      {'          </li>'}
      {'        </WithDrop>'}
      {'      );'}
      {'    })}'}
      {'  </ol>'}
      {'</DraggableContext>'}
    </StoryCodeBlock>
  </div>
);

export default Info;
