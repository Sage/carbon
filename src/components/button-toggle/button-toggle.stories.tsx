import React from "react";
import { ComponentStory } from "@storybook/react";

import ButtonToggle from ".";
import ButtonToggleGroup from "../button-toggle-group";
import Box from "../box";

export const Default: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle name="default" value="foo">
      Foo
    </ButtonToggle>
    <ButtonToggle name="default" value="bar">
      Bar
    </ButtonToggle>
    <ButtonToggle name="default" value="baz">
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const DefaultWrappedText: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggle name="default" value="wraps" grouped>
      Some text that wraps
    </ButtonToggle>
    <ButtonToggle name="default" value="foobar" grouped>
      FooBar
    </ButtonToggle>
  </Box>
);

export const DefaultSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle name="sizes" value="foo" buttonIcon="add">
      Add
    </ButtonToggle>
    <ButtonToggle name="sizes" value="bar" buttonIcon="share">
      Share
    </ButtonToggle>
    <ButtonToggle name="sizes" value="baz" buttonIcon="tick">
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const DefaultLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle
      name="sizes"
      value="foo"
      buttonIcon="add"
      buttonIconSize="large"
    >
      Add
    </ButtonToggle>
    <ButtonToggle
      name="sizes"
      value="bar"
      buttonIcon="share"
      buttonIconSize="large"
    >
      Share
    </ButtonToggle>
    <ButtonToggle
      name="sizes"
      value="baz"
      buttonIcon="tick"
      buttonIconSize="large"
    >
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const iconOnly: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle name="sizes" value="foo" buttonIcon="add" aria-label="add" />
    <ButtonToggle
      name="sizes"
      value="bar"
      buttonIcon="share"
      aria-label="share"
    />
    <ButtonToggle
      name="sizes"
      value="baz"
      buttonIcon="tick"
      aria-label="tick"
    />
  </ButtonToggleGroup>
);

export const small: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle size="small" name="sizes" value="foo">
      Add
    </ButtonToggle>
    <ButtonToggle size="small" name="sizes" value="bar">
      Share
    </ButtonToggle>
    <ButtonToggle size="small" name="sizes" value="baz">
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const smallSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle size="small" name="sizes" value="foo" buttonIcon="add">
      Add
    </ButtonToggle>
    <ButtonToggle size="small" name="sizes" value="bar" buttonIcon="share">
      Share
    </ButtonToggle>
    <ButtonToggle size="small" name="sizes" value="baz" buttonIcon="tick">
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const smallLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle
      size="small"
      name="sizes"
      value="foo"
      buttonIcon="add"
      buttonIconSize="large"
    >
      Add
    </ButtonToggle>
    <ButtonToggle
      size="small"
      name="sizes"
      value="bar"
      buttonIcon="share"
      buttonIconSize="large"
    >
      Share
    </ButtonToggle>
    <ButtonToggle
      size="small"
      name="sizes"
      value="baz"
      buttonIcon="tick"
      buttonIconSize="large"
    >
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const large: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle size="large" name="sizes" value="foo">
      Add
    </ButtonToggle>
    <ButtonToggle size="large" name="sizes" value="bar">
      Share
    </ButtonToggle>
    <ButtonToggle size="large" name="sizes" value="baz">
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const largeSmallIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle size="large" name="sizes" value="foo" buttonIcon="add">
      Add
    </ButtonToggle>
    <ButtonToggle size="large" name="sizes" value="bar" buttonIcon="share">
      Share
    </ButtonToggle>
    <ButtonToggle size="large" name="sizes" value="baz" buttonIcon="tick">
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const largeLargeIcon: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle
      size="large"
      name="sizes"
      value="foo"
      buttonIcon="add"
      buttonIconSize="large"
    >
      Add
    </ButtonToggle>
    <ButtonToggle
      size="large"
      name="sizes"
      value="bar"
      buttonIcon="share"
      buttonIconSize="large"
    >
      Share
    </ButtonToggle>
    <ButtonToggle
      size="large"
      name="sizes"
      value="baz"
      buttonIcon="tick"
      buttonIconSize="large"
    >
      Tick
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const disabled: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="options">
    <ButtonToggle name="disabled" value="foo" disabled>
      Foo
    </ButtonToggle>
    <ButtonToggle name="disabled" value="bar" disabled>
      Bar
    </ButtonToggle>
    <ButtonToggle name="disabled" value="baz" disabled>
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const grouped: ComponentStory<typeof ButtonToggle> = () => (
  <ButtonToggleGroup id="button-toggle-group-id" name="grouped-options">
    <ButtonToggle name="grouped" value="foo" grouped>
      Foo
    </ButtonToggle>
    <ButtonToggle name="grouped" value="bar" grouped>
      Bar
    </ButtonToggle>
    <ButtonToggle name="grouped" value="baz" grouped>
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);
