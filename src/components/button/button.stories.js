import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from ".";

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean("has icon", false);
  return {
    iconType: hasIcon
      ? select("iconType", [...OptionsHelper.icons, ""], "")
      : undefined,
    iconPosition: hasIcon
      ? select(
          "iconPosition",
          [...OptionsHelper.buttonIconPositions],
          defaultPosition
        )
      : undefined,
  };
};
const getKnobs = () => {
  const size = select(
    "size",
    OptionsHelper.sizesRestricted,
    Button.defaultProps.size
  );
  return {
    children: text("children", "Example Button"),
    disabled: boolean("disabled", Button.defaultProps.disabled),
    onClick: (ev) => action("click")(ev),
    size,
    fullWidth: boolean("fullWidth", false),
    subtext:
      size === OptionsHelper.sizesRestricted[2]
        ? text("subtext", Button.defaultProps.subtext)
        : undefined,
    buttonType: select(
      "buttonType",
      OptionsHelper.buttonTypes,
      Button.defaultProps.as
    ),
    destructive: boolean("destructive", false),
    noWrap: boolean("noWrap", false),
    ...getIconKnobs(),
  };
};
export const knobs = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return <Button {...props}>{children}</Button>;
};
export const asASibling = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return (
    <div>
      <Button {...props}>{children}</Button>
      <Button {...props} ml={2}>
        {children}
      </Button>
    </div>
  );
};
const generateButtons = (buttonType, iconPosition) => () => {
  return (
    <>
      {["", ...OptionsHelper.icons].map((iconType) => {
        const props = { iconPosition, buttonType, iconType };
        return (
          <div key={`${buttonType}-${iconPosition}-${iconType}`}>
            {OptionsHelper.sizesRestricted.map((size) => (
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
            {OptionsHelper.sizesRestricted.map((size) => (
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
            {OptionsHelper.sizesRestricted.map((size) => (
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
          </div>
        );
      })}
    </>
  );
};
export const primaryButtonsIconsBefore = generateButtons("primary", "before");
export const primaryButtonsIconsAfter = generateButtons("primary", "after");
export const secondaryButtonsIconsBefore = generateButtons(
  "secondary",
  "before"
);
export const secondaryButtonsIconsAfter = generateButtons("secondary", "after");
export const tertiaryButtonsIconsBefore = generateButtons("tertiary", "before");
export const tertiaryButtonsIconsAfter = generateButtons("tertiary", "after");
export const dashedButtonsIconsBefore = generateButtons("dashed", "before");
export const dashedButtonsIconsAfter = generateButtons("dashed", "after");
export const darkBackgroundButtonsIconsBefore = generateButtons(
  "darkBackground",
  "before"
);
export const darkBackgroundButtonsIconsAfter = generateButtons(
  "darkBackground",
  "after"
);

export const noWrapButtons = () => {
  const noWrap = boolean("noWrap", true);
  return (
    <>
      {OptionsHelper.buttonTypes.map((buttonType) => {
        return OptionsHelper.sizesRestricted.map((size) => {
          return (
            <div style={{ width: 100 }}>
              <Button buttonType={buttonType} noWrap={noWrap} size={size}>
                Long button text
              </Button>
              <Button
                buttonType={buttonType}
                noWrap={noWrap}
                size={size}
                iconType="bin"
              >
                Long button text
              </Button>
              <Button
                buttonType={buttonType}
                noWrap={noWrap}
                size={size}
                iconType="bin"
                iconPosition="after"
              >
                Long button text
              </Button>
              <Button
                buttonType={buttonType}
                noWrap={noWrap}
                size="large"
                iconType="bin"
                subtext="Even longer button subtext"
              >
                Long button text
              </Button>
              <Button
                buttonType={buttonType}
                noWrap={noWrap}
                size="large"
                iconType="bin"
                iconPosition="after"
                subtext="Even longer button subtext"
              >
                Long button text
              </Button>
            </div>
          );
        });
      })}
    </>
  );
};

export const fullWidthButtons = () => {
  return (
    <>
      {OptionsHelper.buttonTypes.map((buttonType) => {
        const props = { buttonType, fullWidth: true };
        return (
          <React.Fragment key={`${buttonType}-${buttonType}`}>
            {OptionsHelper.sizesRestricted.map((size) => (
              <React.Fragment key={`${buttonType}-${buttonType}-${size}`}>
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
                  <>
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
                  </>
                )}
              </React.Fragment>
            ))}
            {OptionsHelper.sizesRestricted.map((size) => (
              <React.Fragment
                key={`${buttonType}-${buttonType}-${size}-destructive`}
              >
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
              </React.Fragment>
            ))}
            {OptionsHelper.sizesRestricted.map((size) => (
              <React.Fragment
                key={`${buttonType}-${buttonType}-${size}-disabled`}
              >
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
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default {
  component: Button,
  title: "Design System/Button/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: false,
    },
    knobs: { escapeHTML: false },
  },
};

primaryButtonsIconsBefore.story = {
  name: "primary buttons icons before",
};

primaryButtonsIconsAfter.story = {
  name: "primary buttons icons after",
};

secondaryButtonsIconsBefore.story = {
  name: "secondary buttons icons before",
};

secondaryButtonsIconsAfter.story = {
  name: "secondary buttons icons after",
};

tertiaryButtonsIconsBefore.story = {
  name: "tertiary buttons icons before",
};

tertiaryButtonsIconsAfter.story = {
  name: "tertiary buttons icons after",
};

dashedButtonsIconsBefore.story = {
  name: "dashed buttons icons before",
};

dashedButtonsIconsAfter.story = {
  name: "dashed buttons icons after",
};

darkBackgroundButtonsIconsBefore.story = {
  name: "darkBackground buttons icons before",
};

darkBackgroundButtonsIconsAfter.story = {
  name: "darkBackground buttons icons after",
};

asASibling.story = {
  name: "as a sibling",
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

knobs.story = {
  name: "knobs",
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

fullWidthButtons.story = {
  name: "full width buttons",
};
