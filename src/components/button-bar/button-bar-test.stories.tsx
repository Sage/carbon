import React from "react";
import Button from "../button";
import ButtonBar, { ButtonBarProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import {
  BUTTON_BAR_ICON_POSITIONS,
  BUTTON_BAR_SIZES,
} from "./button-bar.config";
import ButtonMinor from "../button-minor";

export default {
  title: "Button Bar/Test",
  includeStories: ["Default", "Preview"],
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true },
  },
};

const commonArgTypesButtonBar = {
  size: {
    options: BUTTON_BAR_SIZES,
    control: { type: "select" },
  },
  iconPosition: {
    options: BUTTON_BAR_ICON_POSITIONS,
    control: { type: "select" },
  },
};

const commonArgsButtonBar = {
  size: "medium",
  fullWidth: false,
  iconPosition: "before",
};

export const DefaultWithWrapper = (args: Partial<ButtonBarProps>) => {
  const WrappedComponent = () => {
    return (
      <>
        <Button iconType="bin">bar</Button>
        <Button iconType="csv">bar</Button>
        <Button iconType="pdf">bar</Button>
      </>
    );
  };

  return (
    <ButtonBar {...args}>
      <WrappedComponent />
      <IconButton onClick={() => undefined}>
        <Icon type="csv" />
      </IconButton>
    </ButtonBar>
  );
};

export const ButtonBarWithMinorButtonChildren = () => (
  <ButtonBar>
    <ButtonMinor iconType="search">Example ButtonMinor</ButtonMinor>
    <ButtonMinor iconType="pdf">Example ButtonMinor</ButtonMinor>
    <ButtonMinor iconType="csv">Example ButtonMinor</ButtonMinor>
  </ButtonBar>
);

export const Default = (args: Partial<ButtonBarProps>) => (
  <ButtonBar {...args}>
    <Button iconType="search">Example Button</Button>
    <Button iconType="pdf">Example Button</Button>
    <Button iconType="csv">Example Button</Button>
  </ButtonBar>
);

export const DefaultWithButtonMinor = (args: Partial<ButtonBarProps>) => (
  <ButtonBar {...args}>
    <ButtonMinor iconType="search">Example Button</ButtonMinor>
    <ButtonMinor iconType="pdf">Example Button</ButtonMinor>
    <ButtonMinor iconType="csv">Example Button</ButtonMinor>
  </ButtonBar>
);

export const Preview = () => {
  return (
    <>
      <ButtonBar ml={2} mt={2}>
        <IconButton onClick={() => {}}>
          <Icon type="pdf" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <Icon type="search" />
        </IconButton>
      </ButtonBar>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar key={`${size}-key`} size={size} ml={2} mt={2}>
          <Button iconType="pdf" />
          <Button iconType="csv" />
          <Button iconType="search" />
        </ButtonBar>
      ))}
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) => (
        <React.Fragment key={iconPosition}>
          {BUTTON_BAR_SIZES.map((size) => (
            <>
              <ButtonBar
                key={size + iconPosition}
                iconPosition={iconPosition}
                size={size}
                ml={2}
                mt={2}
              >
                <Button iconType="pdf">{iconPosition}</Button>
                <Button iconType="csv">{iconPosition}</Button>
                <Button iconType="search">{iconPosition}</Button>
              </ButtonBar>
            </>
          ))}
        </React.Fragment>
      ))}
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) => (
        <React.Fragment key={iconPosition}>
          {BUTTON_BAR_SIZES.map((size) => (
            <>
              <ButtonBar
                fullWidth
                key={`${size}${iconPosition}fullWidth`}
                iconPosition={iconPosition}
                size={size}
                ml={2}
                mt={2}
              >
                <Button iconType="pdf">{iconPosition}</Button>
                <Button iconType="csv">{iconPosition}</Button>
                <Button iconType="search">{iconPosition}</Button>
              </ButtonBar>
            </>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

Default.story = {
  name: "default",
  args: {
    ...commonArgsButtonBar,
  },
  argTypes: {
    ...commonArgTypesButtonBar,
  },
};

Preview.story = {
  name: "visual",
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
