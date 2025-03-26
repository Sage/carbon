import React from "react";

import Button, { ButtonProps } from ".";
import Box from "../box";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./button.config";
import { ButtonIconPosition, ButtonTypes } from "./button.component";

export const ButtonDefault = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => (
  <Button onClick={() => {}} subtext={subtext} {...args}>
    {children}
  </Button>
);

export const ButtonAsASiblingExample = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => {
  return (
    <div>
      <Button subtext={subtext} {...args} onClick={() => {}}>
        {children}
      </Button>
      <Button subtext={subtext} {...args} onClick={() => {}} ml={2}>
        {children}
      </Button>
    </div>
  );
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

export const generateButtonsNoWrapExample = (buttonType: ButtonTypes) => {
  return BUTTON_SIZES.map((size) => {
    return (
      <div key={`${buttonType}-${size}`}>
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
      </div>
    );
  });
};

export const NoWrapPrimaryButtonsExample = () => {
  return <Box>{generateButtonsNoWrapExample("primary")}</Box>;
};

export const NoWrapSecondaryButtonsExample = () => {
  return <Box>{generateButtonsNoWrapExample("secondary")}</Box>;
};

export const NoWrapTertiaryButtonsExample = () => {
  return <Box>{generateButtonsNoWrapExample("tertiary")}</Box>;
};

export const NoWrapDarkBackgroundButtonsExample = () => {
  return <Box>{generateButtonsNoWrapExample("darkBackground")}</Box>;
};

export const IconOnlyButtonsExample = () => {
  const binIcon = "bin";
  return (
    <Box>
      {BUTTON_VARIANTS.map((buttonType) => {
        return BUTTON_SIZES.map((size) => {
          return (
            <div key={`${buttonType}-${size}`}>
              <Box width="100px">
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

export const generateFullWidthButtonsExample = (buttonType: ButtonTypes) => {
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

export const FullWidthPrimaryButtonsExample = () => {
  return <Box>{generateFullWidthButtonsExample("primary")}</Box>;
};

export const FullWidthSecondaryButtonsExample = () => {
  return <Box>{generateFullWidthButtonsExample("secondary")}</Box>;
};

export const FullWidthTertiaryButtonsExample = () => {
  return <Box>{generateFullWidthButtonsExample("tertiary")}</Box>;
};

export const FullWidthDarkBackgroundButtonsExample = () => {
  return <Box>{generateFullWidthButtonsExample("darkBackground")}</Box>;
};

export const ButtonIconBefore = () => {
  return <Box>{generateButtons("primary", "before")}</Box>;
};

export const ButtonIconAfter = () => {
  return <Box>{generateButtons("primary", "after")}</Box>;
};

export const SecondaryButtonIconBefore = () => {
  return <Box>{generateButtons("secondary", "before")}</Box>;
};

export const SecondaryButtonIconAfter = () => {
  return <Box>{generateButtons("secondary", "after")}</Box>;
};

export const TertiaryButtonIconBefore = () => {
  return <Box>{generateButtons("tertiary", "before")}</Box>;
};

export const TertiaryButtonIconAfter = () => {
  return <Box>{generateButtons("tertiary", "after")}</Box>;
};

export const DarkBackgroundButtonIconBefore = () => {
  return <Box>{generateButtons("darkBackground", "before")}</Box>;
};

export const DarkBackgroundButtonIconAfter = () => {
  return <Box>{generateButtons("darkBackground", "after")}</Box>;
};

export const ButtonDifferentTypes = (props: Partial<ButtonProps>) => {
  return (
    <div>
      <Button buttonType="primary" data-testid="first-button" {...props}>
        Primary
      </Button>
      <Button buttonType="secondary" data-testid="second-button" {...props}>
        Secondary
      </Button>
      <Button buttonType="tertiary" data-testid="third-button" {...props}>
        Tertiary
      </Button>
      <Button buttonType="gradient-white" data-testid="fifth-button" {...props}>
        Gradient white
      </Button>
      <Button buttonType="gradient-grey" data-testid="sixth-button" {...props}>
        Gradient grey
      </Button>
    </div>
  );
};

export const PrimaryButton = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const PrimaryButtonDestructive = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const PrimaryButtonDisabled = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const PrimaryButtonIcon = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" iconType="print">
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const PrimaryButtonFullWidth = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const PrimaryButtonNoWrap = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const SecondaryButton = () => {
  return (
    <Box>
      <Button mt={2} size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDestructive = () => {
  return (
    <Box>
      <Button mt={2} destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDisabled = () => {
  return (
    <Box>
      <Button mt={2} size="small" disabled ml={2}>
        Small
      </Button>
      <Button mt={2} disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" disabled ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonIcon = () => {
  return (
    <Box>
      <Button mt={2} iconType="print" ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive iconType="delete" iconPosition="after" ml={2}>
        Medium
      </Button>
      <Button mt={2} disabled iconType="print" iconPosition="after" ml={2}>
        Medium
      </Button>
    </Box>
  );
};

export const SecondaryFullWidth = () => {
  return (
    <Box>
      <Button mt={2} buttonType="secondary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const SecondaryNoWrap = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const SecondaryButtonWhite = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Button size="small" isWhite>
        Small
      </Button>
      <Button ml={2} isWhite>
        Medium
      </Button>
      <Button size="large" isWhite>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButton = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonDestructive = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonDisabled = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonIcon = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const TertiaryButtonFullWidth = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const TertiaryButtonNoWrap = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="tertiary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const DarkBackgroundButton = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" size="small">
        Small
      </Button>
      <Button mt={2} buttonType="darkBackground" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="darkBackground" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonDisabled = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" disabled size="small">
        Small
      </Button>
      <Button mt={2} buttonType="darkBackground" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="darkBackground" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonIcon = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" iconType="add" size="small">
        Small
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        disabled
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        disabled
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonFullWidth = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonNoWrap = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const ButtonAsALink = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        Open in new tab
      </Button>
    </Box>
  );
};

export const ButtonIconOnly = () => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <Button mt={2} destructive ml={2} iconType="bin" aria-label="Delete" />
      <Button
        mt={2}
        disabled
        size="large"
        ml={2}
        iconType="bin"
        aria-label="Delete"
      />
    </Box>
  );
};

export const ButtonIconTooltipMessage = () => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        destructive
        ml={2}
        mt={2}
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        mt={2}
        ml={2}
        disabled
        size="large"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
    </Box>
  );
};
