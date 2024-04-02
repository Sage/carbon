import React from "react";
import ButtonMinor, { ButtonMinorProps } from "./button-minor.component";

const Default = (props: ButtonMinorProps) => <ButtonMinor {...props} />;

const ButtonMinorCustom = (props: ButtonMinorProps) => (
  <ButtonMinor {...props}>Example Button</ButtonMinor>
);
const ButtonMinorDifferentTypes = (props: ButtonMinorProps) => {
  return (
    <div>
      <ButtonMinor buttonType="primary" {...props}>
        Primary
      </ButtonMinor>
      <ButtonMinor buttonType="secondary" {...props}>
        Secondary
      </ButtonMinor>
      <ButtonMinor buttonType="tertiary" {...props}>
        Tertiary
      </ButtonMinor>
    </div>
  );
};

export { Default, ButtonMinorCustom, ButtonMinorDifferentTypes };

export const PrimaryButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="medium">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};

export const PrimaryDestructiveButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        destructive
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};

export const PrimaryDisabledButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        disabled
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};

export const PrimaryIconButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};

export const PrimaryFullWidthButton = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="primary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};

export const PrimaryNoWrapButton = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" noWrap>
      Long button text
    </ButtonMinor>
  );
};

export const SecondaryButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2}>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large">
        Large
      </ButtonMinor>
    </>
  );
};

export const SecondaryDestructiveButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="large">
        Large
      </ButtonMinor>
    </>
  );
};

export const SecondaryDisabledButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small" disabled>
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large" disabled>
        Large
      </ButtonMinor>
    </>
  );
};

export const SecondaryIconButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};

export const SecondaryFullWidthButton = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="secondary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};

export const SecondaryNoWrapButton = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="secondary" noWrap>
      Long button text
    </ButtonMinor>
  );
};

export const TertiaryButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};

export const TertiaryDestructiveButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};

export const TertiaryDisabledButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};

export const TertiaryIconButton = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};

export const TertiaryFullWidthButton = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="tertiary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};

export const TertiaryNoWrapButton = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" noWrap>
      Long button text
    </ButtonMinor>
  );
};

export const IconOnlyButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        size="large"
        iconType="bin"
        aria-label="Delete"
      />
    </>
  );
};

export const IconOnlyWithTooltipButton = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        size="large"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
    </>
  );
};
