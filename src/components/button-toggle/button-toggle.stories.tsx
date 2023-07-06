import React from "react";
import { ComponentStory } from "@storybook/react";

import { ButtonToggle, ButtonToggleGroup } from ".";
import Box from "../box";

export const Default: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Default example">
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const DefaultWrappedText: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Wrapped text example">
      <ButtonToggle value="wraps" grouped>
        Some text that wraps
      </ButtonToggle>
      <ButtonToggle value="foobar" grouped>
        FooBar
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const DefaultSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Small icon example">
      <ButtonToggle value="foo" buttonIcon="add">
        Add
      </ButtonToggle>
      <ButtonToggle value="bar" buttonIcon="share">
        Share
      </ButtonToggle>
      <ButtonToggle value="baz" buttonIcon="tick">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const DefaultLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Large icon example">
      <ButtonToggle value="foo" buttonIcon="add" buttonIconSize="large">
        Add
      </ButtonToggle>
      <ButtonToggle value="bar" buttonIcon="share" buttonIconSize="large">
        Share
      </ButtonToggle>
      <ButtonToggle value="baz" buttonIcon="tick" buttonIconSize="large">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const iconOnly: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Icon only example">
      <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
      <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
      <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
    </ButtonToggleGroup>
  </Box>
);

export const small: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Small example">
      <ButtonToggle size="small" value="foo">
        Add
      </ButtonToggle>
      <ButtonToggle size="small" value="bar">
        Share
      </ButtonToggle>
      <ButtonToggle size="small" value="baz">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const smallSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Small with small icon example"
    >
      <ButtonToggle size="small" value="foo" buttonIcon="add">
        Add
      </ButtonToggle>
      <ButtonToggle size="small" value="bar" buttonIcon="share">
        Share
      </ButtonToggle>
      <ButtonToggle size="small" value="baz" buttonIcon="tick">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const smallLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Small with large icon example"
    >
      <ButtonToggle
        size="small"
        value="foo"
        buttonIcon="add"
        buttonIconSize="large"
      >
        Add
      </ButtonToggle>
      <ButtonToggle
        size="small"
        value="bar"
        buttonIcon="share"
        buttonIconSize="large"
      >
        Share
      </ButtonToggle>
      <ButtonToggle
        size="small"
        value="baz"
        buttonIcon="tick"
        buttonIconSize="large"
      >
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const large: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Large example">
      <ButtonToggle size="large" value="foo">
        Add
      </ButtonToggle>
      <ButtonToggle size="large" value="bar">
        Share
      </ButtonToggle>
      <ButtonToggle size="large" value="baz">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const largeSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Large with small icon example"
    >
      <ButtonToggle size="large" value="foo" buttonIcon="add">
        Add
      </ButtonToggle>
      <ButtonToggle size="large" value="bar" buttonIcon="share">
        Share
      </ButtonToggle>
      <ButtonToggle size="large" value="baz" buttonIcon="tick">
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const largeLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Large with large icon example"
    >
      <ButtonToggle
        size="large"
        value="foo"
        buttonIcon="add"
        buttonIconSize="large"
      >
        Add
      </ButtonToggle>
      <ButtonToggle
        size="large"
        value="bar"
        buttonIcon="share"
        buttonIconSize="large"
      >
        Share
      </ButtonToggle>
      <ButtonToggle
        size="large"
        value="baz"
        buttonIcon="tick"
        buttonIconSize="large"
      >
        Tick
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const disabled: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Disabled example">
      <ButtonToggle value="foo" disabled>
        Foo
      </ButtonToggle>
      <ButtonToggle value="bar" disabled>
        Bar
      </ButtonToggle>
      <ButtonToggle value="baz" disabled>
        Baz
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const grouped: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup id="button-toggle-group-id" label="Grouped example">
      <ButtonToggle value="foo" grouped>
        Foo
      </ButtonToggle>
      <ButtonToggle value="bar" grouped>
        Bar
      </ButtonToggle>
      <ButtonToggle value="baz" grouped>
        Baz
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);
