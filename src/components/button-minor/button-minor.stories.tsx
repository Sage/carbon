import React from "react";

import ButtonMinor from ".";

export const PrimaryButton = () => (
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

export const PrimaryDestructiveButton = () => (
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

export const PrimaryDisabledButton = () => (
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

export const PrimaryIconButton = () => (
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

export const PrimaryFullWidthButton = () => (
  <>
    <ButtonMinor mt={2} mb={2} buttonType="primary" fullWidth>
      Full Width
    </ButtonMinor>
  </>
);

export const PrimaryNoWrapButton = () => (
  <>
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" noWrap>
      Long button text
    </ButtonMinor>
  </>
);

export const SecondaryButton = () => (
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

export const SecondaryDestructiveButton = () => (
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

export const SecondaryDisabledButton = () => (
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

export const SecondaryIconButton = () => (
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

export const SecondaryFullWidthButton = () => (
  <>
    <ButtonMinor mt={2} mb={2} buttonType="secondary" fullWidth>
      Full Width
    </ButtonMinor>
  </>
);

export const SecondaryNoWrapButton = () => (
  <>
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="secondary" noWrap>
      Long button text
    </ButtonMinor>
  </>
);

export const TertiaryButton = () => (
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

export const TertiaryDestructiveButton = () => (
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

export const TertiaryDisabledButton = () => (
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

export const TertiaryIconButton = () => (
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

export const TertiaryFullWidthButton = () => (
  <>
    <ButtonMinor mt={2} mb={2} buttonType="tertiary" fullWidth>
      Full Width
    </ButtonMinor>
  </>
);

export const TertiaryNoWrapButton = () => (
  <>
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" noWrap>
      Long button text
    </ButtonMinor>
  </>
);

export const IconOnlyButton = () => (
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

export const IconOnlyWithTooltipButton = () => (
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
