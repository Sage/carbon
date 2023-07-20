import React from "react";
import { action } from "@storybook/addon-actions";

import Button, { ButtonProps } from ".";
import Box from "../box";
import { ICONS } from "../icon/icon-config";
import {
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "./button.config";
import { ButtonIconPosition, ButtonTypes } from "./button.component";

export default {
  title: "Button/Test",
  excludeStories: [
    "ButtonDifferentTypes",
    "generateButtons",
    "generateFullWidthButtonsStory",
    "generateButtonsNoWrapStory",
  ],
  parameters: {
    info: { disable: true },
  },
};

const commonArgTypes = {
  size: {
    options: BUTTON_SIZES,
    control: {
      type: "select",
    },
  },
  buttonType: {
    options: BUTTON_VARIANTS,
    control: {
      type: "select",
    },
  },
  iconType: {
    options: [...ICONS, ""],
    control: {
      type: "select",
    },
  },
  iconPosition: {
    options: BUTTON_ICON_POSITIONS,
    control: {
      type: "select",
    },
  },
  href: {
    control: {
      type: "text",
    },
  },
};

const commonArgs = {
  size: "medium",
  children: "Example Button",
  disabled: false,
  fullWidth: false,
  subtext: "",
  buttonType: "secondary",
  href: undefined,
  destructive: false,
  noWrap: false,
  iconPosition: "before",
};

export const ButtonStory = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => (
  <Button onClick={action("click")} subtext={subtext} {...args}>
    {children}
  </Button>
);

ButtonStory.story = {
  name: "default",
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
};

export const ButtonAsASiblingStory = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => {
  return (
    <div>
      <Button subtext={subtext} {...args} onClick={action("click")}>
        {children}
      </Button>
      <Button subtext={subtext} {...args} onClick={action("click")} ml={2}>
        {children}
      </Button>
    </div>
  );
};

ButtonAsASiblingStory.story = {
  name: "default as siblings",
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
};

export const generateButtons = (
  buttonType: ButtonTypes,
  iconPosition: ButtonIconPosition
) => {
  return (
    <Box>
      {(["add", "bin"] as const).map((iconType) => {
        const props: Partial<ButtonProps> = {
          buttonType,
          iconPosition,
          iconType,
        };
        return (
          <React.Fragment key={`${buttonType}-${iconPosition}-${iconType}`}>
            {BUTTON_SIZES.map((size) => (
              <React.Fragment
                key={`${buttonType}-${iconPosition}-${iconType}-${size}`}
              >
                <Button key="basic" size={size} {...props} ml={2}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    subtext="line two"
                    {...props}
                    ml={2}
                  >
                    {size}
                  </Button>
                )}
              </React.Fragment>
            ))}
            {BUTTON_SIZES.map((size) => (
              <React.Fragment
                key={`${buttonType}-${iconPosition}-${iconType}-${size}-destructive`}
              >
                <Button key="basic" size={size} destructive {...props} ml={2}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    destructive
                    subtext="line two"
                    {...props}
                    ml={2}
                  >
                    {size}
                  </Button>
                )}
              </React.Fragment>
            ))}
            {BUTTON_SIZES.map((size) => (
              <React.Fragment
                key={`${buttonType}-${iconPosition}-${iconType}-${size}-disabled`}
              >
                <Button key="basic" size={size} disabled {...props} ml={2}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    disabled
                    subtext="line two"
                    {...props}
                    ml={2}
                  >
                    {size}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export const generateButtonsNoWrapStory = (buttonType: ButtonTypes) => {
  return BUTTON_SIZES.map((size) => {
    return (
      <div key={`${buttonType}-${size}`}>
        <Box style={{ width: 100 }}>
          <Button buttonType={buttonType} noWrap size={size}>
            Long button text
          </Button>
          <Button buttonType={buttonType} size={size} iconType="bin">
            Long button text
          </Button>
          <Button
            buttonType={buttonType}
            size={size}
            iconType="bin"
            iconPosition="after"
          >
            Long button text
          </Button>
          <Button
            buttonType={buttonType}
            size="large"
            iconType="bin"
            subtext="Even longer button subtext"
          >
            Long button text
          </Button>
          <Button
            buttonType={buttonType}
            size="large"
            iconType="bin"
            iconPosition="after"
            subtext="Even longer button subtext"
          >
            Long button text
          </Button>
        </Box>
      </div>
    );
  });
};

export const NoWrapPrimaryButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("primary")}</Box>;
};

NoWrapPrimaryButtonsStory.storyName = "noWrap primary";

export const NoWrapSecondaryButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("secondary")}</Box>;
};

NoWrapSecondaryButtonsStory.storyName = "noWrap secondary";

export const NoWrapTertiaryButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("tertiary")}</Box>;
};

NoWrapTertiaryButtonsStory.storyName = "noWrap tertiary";

export const NoWrapDashedButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("dashed")}</Box>;
};

NoWrapDashedButtonsStory.storyName = "noWrap dashed";

export const NoWrapDarkBackgroundButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("darkBackground")}</Box>;
};

NoWrapDarkBackgroundButtonsStory.storyName = "noWrap darkBackground";

export const IconOnlyButtonsStory = () => {
  const binIcon = "bin";
  return (
    <Box>
      {BUTTON_VARIANTS.map((buttonType) => {
        return BUTTON_SIZES.map((size) => {
          return (
            <div key={`${buttonType}-${size}`}>
              <Box style={{ width: 100 }}>
                <Button
                  buttonType={buttonType}
                  size={size}
                  iconType={binIcon}
                  aria-label={binIcon}
                />
              </Box>
            </div>
          );
        });
      })}
    </Box>
  );
};

IconOnlyButtonsStory.storyName = "icon button";

export const generateFullWidthButtonsStory = (buttonType: ButtonTypes) => {
  const props = { buttonType, fullWidth: true };
  return (
    <Box>
      <div key={`${buttonType}-${buttonType}`}>
        {BUTTON_SIZES.map((size) => (
          <div key={`${buttonType}-${buttonType}-${size}`}>
            <Button key="basic" size={size} {...props} ml={2}>
              {size}
            </Button>
            <Button key="basic-icon" size={size} {...props} iconType="bin">
              {size}
            </Button>
            <Button
              key="basic-icon-after"
              size={size}
              {...props}
              iconType="bin"
              iconPosition="after"
              ml={2}
            >
              {size}
            </Button>
            {size === "large" && (
              <Box>
                <Button
                  key="subtext"
                  size={size}
                  subtext="line two"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon"
                  size={size}
                  subtext="line two"
                  iconType="bin"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon-after"
                  size={size}
                  subtext="line two"
                  iconType="bin"
                  iconPosition="after"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
              </Box>
            )}
          </div>
        ))}
        {BUTTON_SIZES.map((size) => (
          <div key={`${buttonType}-${buttonType}-${size}-destructive`}>
            <Button key="basic" size={size} destructive {...props} ml={2}>
              {size}
            </Button>
            <Button
              key="basic-icon"
              size={size}
              destructive
              iconType="bin"
              {...props}
              ml={2}
            >
              {size}
            </Button>
            <Button
              key="basic-icon-after"
              size={size}
              destructive
              iconType="bin"
              iconPosition="after"
              {...props}
            >
              {size}
            </Button>
            {size === "large" && (
              <>
                <Button
                  key="subtext"
                  size={size}
                  destructive
                  subtext="line two"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon"
                  size={size}
                  destructive
                  subtext="line two"
                  iconType="bin"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon-after"
                  size={size}
                  destructive
                  subtext="line two"
                  iconType="bin"
                  iconPosition="after"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
              </>
            )}
          </div>
        ))}
        {BUTTON_SIZES.map((size) => (
          <div key={`${buttonType}-${buttonType}-${size}-disabled`}>
            <Button key="basic" size={size} disabled {...props} ml={2}>
              {size}
            </Button>
            <Button
              key="basic-icon"
              size={size}
              disabled
              iconType="bin"
              {...props}
            >
              {size}
            </Button>
            <Button
              key="basic-icon-after"
              size={size}
              disabled
              iconType="bin"
              iconPosition="after"
              {...props}
              ml={2}
            >
              {size}
            </Button>
            {size === "large" && (
              <>
                <Button
                  key="subtext"
                  size={size}
                  disabled
                  subtext="line two"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon"
                  size={size}
                  disabled
                  subtext="line two"
                  iconType="bin"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
                <Button
                  key="subtext-icon-after"
                  size={size}
                  disabled
                  subtext="line two"
                  iconType="bin"
                  iconPosition="after"
                  {...props}
                  ml={2}
                >
                  {size}
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
};

export const FullWidthPrimaryButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("primary")}</Box>;
};

FullWidthPrimaryButtonsStory.storyName = "fullWidth primary";

export const FullWidthSecondaryButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("secondary")}</Box>;
};

FullWidthSecondaryButtonsStory.storyName = "fullWidth secondary";

export const FullWidthTertiaryButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("tertiary")}</Box>;
};

FullWidthTertiaryButtonsStory.storyName = "fullWidth tertiary";

export const FullWidthDashedButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("dashed")}</Box>;
};

FullWidthDashedButtonsStory.storyName = "fullWidth dashed";

export const FullWidthDarkBackgroundButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("darkBackground")}</Box>;
};

FullWidthDarkBackgroundButtonsStory.storyName = "fullWidth darkBackground";

export const ButtonIconBefore = () => {
  return <Box>{generateButtons("primary", "before")}</Box>;
};

ButtonIconBefore.storyName = "primary icon before";

export const ButtonIconAfter = () => {
  return <Box>{generateButtons("primary", "after")}</Box>;
};

ButtonIconAfter.storyName = "primary icon after";

export const SecondaryButtonIconBefore = () => {
  return <Box>{generateButtons("secondary", "before")}</Box>;
};

SecondaryButtonIconBefore.storyName = "secondary icon before";

export const SecondaryButtonIconAfter = () => {
  return <Box>{generateButtons("secondary", "after")}</Box>;
};

SecondaryButtonIconAfter.storyName = "secondary icon after";

export const TertiaryButtonIconBefore = () => {
  return <Box>{generateButtons("tertiary", "before")}</Box>;
};

TertiaryButtonIconBefore.storyName = "tertiary icon before";

export const TertiaryButtonIconAfter = () => {
  return <Box>{generateButtons("tertiary", "after")}</Box>;
};

TertiaryButtonIconAfter.storyName = "tertiary icon after";

export const DashedButtonIconBefore = () => {
  return <Box>{generateButtons("dashed", "before")}</Box>;
};

DashedButtonIconBefore.storyName = "dashed icon before";

export const DashedButtonIconAfter = () => {
  return <Box>{generateButtons("dashed", "after")}</Box>;
};

DashedButtonIconAfter.storyName = "dashed icon after";

export const DarkBackgroundButtonIconBefore = () => {
  return <Box>{generateButtons("darkBackground", "before")}</Box>;
};

DarkBackgroundButtonIconBefore.storyName = "darkBackground icon before";

export const DarkBackgroundButtonIconAfter = () => {
  return <Box>{generateButtons("darkBackground", "after")}</Box>;
};

DarkBackgroundButtonIconAfter.storyName = "darkBackground icon after";

export const ButtonDifferentTypes = (props: Partial<ButtonProps>) => {
  return (
    <div>
      <Button buttonType="primary" {...props}>
        Primary
      </Button>
      <Button buttonType="secondary" {...props}>
        Secondary
      </Button>
      <Button buttonType="tertiary" {...props}>
        Tertiary
      </Button>
      <Button buttonType="dashed" {...props}>
        Dashed
      </Button>
    </div>
  );
};
