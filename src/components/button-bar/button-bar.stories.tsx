import React from "react";
import { ComponentStory } from "@storybook/react";

import ButtonBar from ".";
import Button from "../button";
import ButtonMinor from "../button-minor";

import Icon from "../icon";
import IconButton from "../icon-button";

export const buttonBarSizes: ComponentStory<typeof ButtonBar> = () => (
  <>
    <ButtonBar size="small" ml={2} mt={2}>
      <ButtonMinor>Small</ButtonMinor>
      <ButtonMinor>Small</ButtonMinor>
      <ButtonMinor>Small</ButtonMinor>
    </ButtonBar>
    <ButtonBar ml={2} mt={2}>
      <Button>Medium</Button>
      <Button>Medium</Button>
      <Button>Medium</Button>
    </ButtonBar>
    <ButtonBar size="large" ml={2} mt={2}>
      <Button>Large</Button>
      <Button>Large</Button>
      <Button>Large</Button>
    </ButtonBar>
    <ButtonBar size="large" ml={2} mt={2}>
      <Button subtext="subtext 1">Large</Button>
      <Button subtext="subtext 2">Large</Button>
      <Button subtext="subtext 3">Large</Button>
    </ButtonBar>
  </>
);

export const buttonBarIcons: ComponentStory<typeof ButtonBar> = () => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;
  const BUTTON_BAR_ICON_POSITIONS = ["before", "after"] as const;

  return (
    <>
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) =>
        BUTTON_BAR_SIZES.map((size) => (
          <ButtonBar
            iconPosition={iconPosition}
            size={size}
            key={size + iconPosition}
            ml={2}
            mt={2}
          >
            <Button iconType="csv">{iconPosition}</Button>
            <Button iconType="pdf">{iconPosition}</Button>
            <Button iconType="delete">{iconPosition}</Button>
          </ButtonBar>
        ))
      )}
    </>
  );
};

export const buttonBarIconsOnly: ComponentStory<typeof ButtonBar> = () => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;

  return (
    <>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar size={size} key={size} ml={2} mt={2}>
          <Button iconType="pdf" />
          <Button iconType="csv" />
          <Button iconType="delete" />
        </ButtonBar>
      ))}
    </>
  );
};

export const buttonBarIconButtons: ComponentStory<typeof ButtonBar> = () => (
  <ButtonBar ml={2} mt={2}>
    <IconButton onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onClick={() => {}}>
      <Icon type="pdf" />
    </IconButton>
    <IconButton onClick={() => {}}>
      <Icon type="bin" />
    </IconButton>
  </ButtonBar>
);

export const buttonBarFullWidth: ComponentStory<typeof ButtonBar> = () => (
  <>
    <ButtonBar fullWidth size="small" ml={2} mt={2}>
      <Button fullWidth>Small full width</Button>
      <Button>Small full width</Button>
      <Button>Small full width</Button>
    </ButtonBar>
    <ButtonBar fullWidth ml={2} mt={2}>
      <Button buttonType="primary">Medium full width</Button>
      <Button>Medium full width</Button>
      <Button>Medium full width</Button>
    </ButtonBar>
    <ButtonBar fullWidth size="large" ml={2} mt={2}>
      <Button>Large full width</Button>
      <Button>Large full width</Button>
      <Button>Large full width</Button>
    </ButtonBar>
  </>
);
