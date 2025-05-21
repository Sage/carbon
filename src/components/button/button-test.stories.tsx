import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect } from "@storybook/test";

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
    "meta",
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
    <Box>
      <Button subtext={subtext} {...args} onClick={action("click")}>
        {children}
      </Button>
      <Button subtext={subtext} {...args} onClick={action("click")} ml={2}>
        {children}
      </Button>
    </Box>
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
  iconPosition: ButtonIconPosition,
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
      <Box key={`${buttonType}-${size}`}>
        <Box width="100px">
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
      </Box>
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

export const NoWrapGradientWhiteButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("gradient-white")}</Box>;
};

NoWrapGradientWhiteButtonsStory.storyName = "noWrap gradient-white";

export const NoWrapGradientGreyButtonsStory = () => {
  return <Box>{generateButtonsNoWrapStory("gradient-grey")}</Box>;
};

NoWrapGradientGreyButtonsStory.storyName = "noWrap gradient-grey";

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
            <Box key={`${buttonType}-${size}`}>
              <Box width="100px">
                <Button
                  buttonType={buttonType}
                  size={size}
                  iconType={binIcon}
                  aria-label={binIcon}
                />
              </Box>
            </Box>
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
      <Box key={`${buttonType}-${buttonType}`}>
        {BUTTON_SIZES.map((size) => (
          <Box key={`${buttonType}-${buttonType}-${size}`}>
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
          </Box>
        ))}
        {BUTTON_SIZES.map((size) => (
          <Box key={`${buttonType}-${buttonType}-${size}-destructive`}>
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
          </Box>
        ))}
        {BUTTON_SIZES.map((size) => (
          <Box key={`${buttonType}-${buttonType}-${size}-disabled`}>
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
          </Box>
        ))}
      </Box>
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

export const FullWidthGradientWhiteButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("gradient-white")}</Box>;
};

FullWidthGradientWhiteButtonsStory.storyName = "fullWidth gradient-white";

export const FullWidthGradientGreyButtonsStory = () => {
  return <Box>{generateFullWidthButtonsStory("gradient-grey")}</Box>;
};

FullWidthGradientGreyButtonsStory.storyName = "fullWidth gradient-grey";

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

export const GradientWhiteButtonIconBefore = () => {
  return <Box>{generateButtons("gradient-white", "before")}</Box>;
};

GradientWhiteButtonIconBefore.storyName = "gradient-white icon before";

export const GradientWhiteButtonIconAfter = () => {
  return <Box>{generateButtons("gradient-white", "after")}</Box>;
};

GradientWhiteButtonIconAfter.storyName = "gradient-white icon after";

export const GradientGreyButtonIconBefore = () => {
  return <Box>{generateButtons("gradient-grey", "before")}</Box>;
};

GradientGreyButtonIconBefore.storyName = "gradient-grey icon before";

export const GradientGreyButtonIconAfter = () => {
  return <Box>{generateButtons("gradient-grey", "after")}</Box>;
};

GradientGreyButtonIconAfter.storyName = "gradient-grey icon after";

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
    <Box>
      <Button buttonType="primary" {...props}>
        Primary
      </Button>
      <Button buttonType="secondary" {...props}>
        Secondary
      </Button>
      <Button buttonType="tertiary" {...props}>
        Tertiary
      </Button>
      <Button buttonType="gradient-white" {...props}>
        Gradient white
      </Button>
      <Button buttonType="gradient-grey" {...props}>
        Gradient Grey
      </Button>
    </Box>
  );
};

export const DisabledButtonsWithImageChildren = () => (
  <Box>
    <Button buttonType="primary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Primary
    </Button>
    <Button buttonType="secondary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Secondary
    </Button>
    <Button buttonType="tertiary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Tertiary
    </Button>
    <Button buttonType="gradient-white" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Gradient white
    </Button>
    <Button buttonType="gradient-grey" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Gradient Grey
    </Button>
    <br />
    <Button buttonType="primary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Primary
    </Button>
    <Button buttonType="secondary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Secondary
    </Button>
    <Button buttonType="tertiary" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Tertiary
    </Button>
    <Button buttonType="gradient-white" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Gradient white
    </Button>
    <Button buttonType="gradient-grey" disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 120 100"
      >
        <defs>
          <filter
            id="a"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              in="shadowOffsetOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          fillRule="evenodd"
          filter="url(#a)"
          transform="translate(26 16)"
        >
          <path
            fill="#255BC7"
            d="M62.097.05c-1.99.4-41.597 36.6-41.597 36.6l10.15 9.745s31.447-41.57 32.64-43.16c1.196-1.592.797-3.58-1.193-3.184z"
          />
          <path
            fill="#004089"
            d="M19.738 37.643s-3.245 1.39-4.82 3.545c-1.7 2.328-1.782 6.37-1.782 6.37l6.322 6.594s3.154-.18 6.078-2.08c2.925-1.898 4.318-4.48 4.318-4.48l-10.116-9.95z"
          />
          <path
            fill="#FFAB00"
            d="M12.58 48.447s-6.61 0-9.388 4.115C.412 56.678 4.976 60.516 0 65c7.563-2.694 11.09 1.55 14.7-.97 3.61-2.52 4.208-8.81 4.208-8.81l-6.327-6.773z"
          />
        </g>
      </svg>
      Gradient Grey
    </Button>
  </Box>
);

DisabledButtonsWithImageChildren.storyName =
  "disabled button with img children";

export const WithExternalLabels = () => (
  <>
    <h2 id="add-product">Add product addon</h2>
    <p id="hint-text">You will not be charged until you checkout</p>
    <Button
      buttonType="primary"
      iconType="add"
      aria-labelledby="add-product"
      aria-describedby="hint-text"
    />
  </>
);
WithExternalLabels.parameters = {
  chromatic: { disableSnapshot: true },
};

// Play Functions
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof Button>;

const ButtonDefaultComponent = () => {
  return (
    <Button mt={2} ml={2} buttonType="primary" size="small">
      Small
    </Button>
  );
};

export const ButtonClick: Story = {
  render: () => <ButtonDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonComponent = canvas.getByRole("button");

    await userEvent.click(buttonComponent);

    await waitFor(() => {
      expect(buttonComponent).toHaveFocus();
    });
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

ButtonClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ButtonHover: Story = {
  render: () => <ButtonDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonComponent = canvas.getByRole("button");

    await userEvent.hover(buttonComponent);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

ButtonHover.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: true,
  },
};
