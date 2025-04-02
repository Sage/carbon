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

export const Default = (args: Partial<ButtonBarProps>) => (
  <>
    <ButtonBar {...args} mb={2}>
      <Button iconType="search">Example Button</Button>
      <Button iconType="pdf">Example Button</Button>
      <Button iconType="csv">Example Button</Button>
    </ButtonBar>
    <ButtonBar {...args}>
      <ButtonMinor iconType="search">Example ButtonMinor</ButtonMinor>
      <ButtonMinor iconType="pdf">Example ButtonMinor</ButtonMinor>
      <ButtonMinor iconType="csv">Example ButtonMinor</ButtonMinor>
    </ButtonBar>
  </>
);
Default.story = {
  args: {
    ...commonArgsButtonBar,
  },
  argTypes: {
    ...commonArgTypesButtonBar,
  },
};

export const WithDisabledButtons = (args: Partial<ButtonBarProps>) => (
  <>
    <ButtonBar {...args} mb={2}>
      <IconButton disabled onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="search" />
      </IconButton>
    </ButtonBar>
    <ButtonBar {...args} mb={2}>
      <Button iconType="search" disabled>
        Example Button
      </Button>
      <Button iconType="pdf">Example Button</Button>
      <Button iconType="csv">Example Button</Button>
    </ButtonBar>
    <ButtonBar {...args} mb={2}>
      <Button iconType="search">Example Button</Button>
      <Button iconType="pdf" disabled>
        Example Button
      </Button>
      <Button iconType="csv">Example Button</Button>
    </ButtonBar>
    <ButtonBar {...args} mb={2}>
      <ButtonMinor iconType="search" disabled>
        Example ButtonMinor
      </ButtonMinor>
      <ButtonMinor iconType="pdf">Example ButtonMinor</ButtonMinor>
      <ButtonMinor iconType="csv">Example ButtonMinor</ButtonMinor>
    </ButtonBar>
    <ButtonBar {...args}>
      <ButtonMinor iconType="search">Example ButtonMinor</ButtonMinor>
      <ButtonMinor iconType="pdf" disabled>
        Example ButtonMinor
      </ButtonMinor>
      <ButtonMinor iconType="csv">Example ButtonMinor</ButtonMinor>
    </ButtonBar>
  </>
);
WithDisabledButtons.story = {
  args: {
    ...commonArgsButtonBar,
  },
  argTypes: {
    ...commonArgTypesButtonBar,
  },
};

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
      <div>
        {BUTTON_BAR_SIZES.map((size) => (
          <ButtonBar key={`${size}-key`} size={size} ml={2} mt={2}>
            <ButtonMinor iconType="pdf" />
            <ButtonMinor iconType="csv" />
            <ButtonMinor iconType="search" />
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
                  <ButtonMinor iconType="pdf">{iconPosition}</ButtonMinor>
                  <ButtonMinor iconType="csv">{iconPosition}</ButtonMinor>
                  <ButtonMinor iconType="search">{iconPosition}</ButtonMinor>
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
                  <ButtonMinor iconType="pdf">{iconPosition}</ButtonMinor>
                  <ButtonMinor iconType="csv">{iconPosition}</ButtonMinor>
                  <ButtonMinor iconType="search">{iconPosition}</ButtonMinor>
                </ButtonBar>
              </>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
Preview.story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
