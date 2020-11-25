import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
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
    href: text("href"),
    to: text("to"),
    destructive: boolean("destructive", false),
    ...getIconKnobs(),
  };
};
export const knobs = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return (
    <Router>
      <Button
        {...props}
        renderRouterLink={(routerProps) => (
          <RouterLink {...routerProps} style={{ textDecoration: "none" }} />
        )}
      >
        {children}
      </Button>
    </Router>
  );
};
export const asASibling = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return (
    <div>
      <Router>
        <Button
          {...props}
          renderRouterLink={(routerProps) => (
            <RouterLink {...routerProps} style={{ textDecoration: "none" }} />
          )}
        >
          {children}
        </Button>
        <Button
          {...props}
          renderRouterLink={(routerProps) => (
            <RouterLink {...routerProps} style={{ textDecoration: "none" }} />
          )}
        >
          {children}
        </Button>
      </Router>
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
                <Button key="basic" size={size} {...props}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    subtext="line two"
                    {...props}
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
                <Button key="basic" size={size} destructive {...props}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    destructive
                    subtext="line two"
                    {...props}
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
                <Button key="basic" size={size} disabled {...props}>
                  {size}
                </Button>
                {size === "large" && (
                  <Button
                    key="subtext"
                    size={size}
                    disabled
                    subtext="line two"
                    {...props}
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

export const fullWidthButtons = () => {
  return (
    <>
      {OptionsHelper.buttonTypes.map((buttonType) => {
        const props = { buttonType, fullWidth: true };
        return (
          <React.Fragment key={`${buttonType}-${buttonType}`}>
            {OptionsHelper.sizesRestricted.map((size) => (
              <React.Fragment key={`${buttonType}-${buttonType}-${size}`}>
                <Button key="basic" size={size} {...props}>
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
                    >
                      {size}
                    </Button>
                    <Button
                      key="subtext-icon"
                      size={size}
                      subtext="line two"
                      iconType="bin"
                      {...props}
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
                <Button key="basic" size={size} destructive {...props}>
                  {size}
                </Button>
                <Button
                  key="basic-icon"
                  size={size}
                  destructive
                  iconType="bin"
                  {...props}
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
                <Button key="basic" size={size} disabled {...props}>
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
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

primaryButtonsIconsBefore.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

primaryButtonsIconsAfter.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

secondaryButtonsIconsBefore.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

secondaryButtonsIconsAfter.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

tertiaryButtonsIconsBefore.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

tertiaryButtonsIconsAfter.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

dashedButtonsIconsBefore.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

dashedButtonsIconsAfter.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

darkBackgroundButtonsIconsBefore.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

darkBackgroundButtonsIconsAfter.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

asASibling.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

knobs.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

fullWidthButtons.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
