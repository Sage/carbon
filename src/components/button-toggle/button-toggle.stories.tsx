import React from "react";
import { ComponentStory } from "@storybook/react";

import { ButtonToggle, ButtonToggleGroup, ButtonToggleProps } from ".";
import Box from "../box";

export const Default: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" label="Default example">
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);

export const DefaultMinor: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Default example"
      isMinor
    >
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

export const DefaultWrappedTextMinor: ComponentStory<
  typeof ButtonToggle
> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Wrapped text example"
      isMinor
    >
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
);

export const DefaultSmallIconMinor: ComponentStory<
  typeof ButtonToggle
> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Small icon example"
    isMinor
  >
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
);

export const DefaultLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const DefaultLargeIconMinor: ComponentStory<
  typeof ButtonToggle
> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Large icon example"
    isMinor
  >
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
);

export const iconOnly: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" label="Icon only example">
    <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
    <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
    <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
  </ButtonToggleGroup>
);

export const small: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const smallMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" label="Small example" isMinor>
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
);

export const smallSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const smallSmallIconMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Small with small icon example"
    isMinor
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
);

export const smallLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const smallLargeIconMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Small with large icon example"
    isMinor
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
);

export const large: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const largeMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" label="Large example" isMinor>
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
);

export const largeSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const largeSmallIconMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Large with small icon example"
    isMinor
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
);

export const largeLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const largeLargeIconMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Large with large icon example"
    isMinor
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
);

export const disabled: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const disabledMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Disabled example"
    isMinor
  >
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
);

export const grouped: ComponentStory<typeof ButtonToggle> = () => (
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
);

export const groupedMinor: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Grouped example"
    isMinor
  >
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
);
